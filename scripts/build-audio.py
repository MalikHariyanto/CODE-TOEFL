"""Produce original scripts with a local, pinned eSpeak NG engine. No cloud API."""
import os, sys, json, ctypes, pathlib, subprocess, tempfile, wave, hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0,os.environ.get('TOEFL_TOOLS','/workspace/.toefl-tools'))
import espeakng_loader
lib=espeakng_loader.load_library()
lib.espeak_Initialize.argtypes=[ctypes.c_int,ctypes.c_int,ctypes.c_char_p,ctypes.c_int]
rate=lib.espeak_Initialize(2,0,espeakng_loader.get_data_path().encode(),0)
if rate<=0: raise RuntimeError('Cannot initialize verified eSpeak NG data')
CALLBACK=ctypes.CFUNCTYPE(ctypes.c_int,ctypes.POINTER(ctypes.c_short),ctypes.c_int,ctypes.c_void_p)
chunks=[]
@CALLBACK
def collect(samples,count,events):
 if count: chunks.append(ctypes.string_at(samples,count*2))
 return 0
lib.espeak_SetSynthCallback(collect)
lib.espeak_SetVoiceByName.argtypes=[ctypes.c_char_p]
lib.espeak_Synth.argtypes=[ctypes.c_void_p,ctypes.c_size_t,ctypes.c_uint,ctypes.c_int,ctypes.c_uint,ctypes.c_uint,ctypes.c_void_p,ctypes.c_void_p]
voices={'Man':'en-us+m3','Woman':'en-us+f3','Speaker':'en-us','Narrator':'en-us+m1'}
raw=subprocess.check_output(['node','--input-type=module','-e',"import {listeningStimuli,listening} from './src/data/listening.js'; console.log(JSON.stringify({stimuli:listeningStimuli,questions:listening}));"],cwd=ROOT)
data=json.loads(raw)
manifest_path=ROOT/'src/data/audio-manifest.json'
manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
data['stimuli'].append({'id':'CHECK','kind':'talk','audio':'audio/check.mp3','turns':[['Speaker','This is the audio check. If you can hear this sentence clearly, you are ready to begin.']]})
for s in data['stimuli']:
 turns=[['Narrator', 'Listen to the following '+('talk.' if s['kind']=='talk' else 'conversation.')]]+s['turns']
 # Short conversations include the spoken question, as in Part A.
 if s['kind']=='short':
  turns += [['Narrator',q['prompt']] for q in data['questions'] if q['stimulus']==s['id']]
 # Group question stems are displayed in sequence after a shared recording.
 digest=hashlib.sha256(json.dumps(turns,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
 target=ROOT/'public'/s['audio']; target.parent.mkdir(exist_ok=True,parents=True)
 if target.exists() and manifest.get(s['id'],{}).get('scriptSha256')==digest: continue
 chunks=[]
 for speaker,text in turns:
  voice=voices[speaker]
  if lib.espeak_SetVoiceByName(voice.encode())!=0: raise RuntimeError('Voice unavailable: '+voice)
  lib.espeak_SetParameter(1,150 if s['kind']=='talk' else 157,0)
  b=text.encode('utf-8'); lib.espeak_Synth(b,len(b)+1,0,1,0,1,None,None);lib.espeak_Synchronize()
  chunks.append(bytes(int(rate*.45)*2))
 pcm=b''.join(chunks)
 with tempfile.TemporaryDirectory() as d:
  wav=pathlib.Path(d)/'speech.wav'
  with wave.open(str(wav),'wb') as f: f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(pcm)
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(wav),'-codec:a','libmp3lame','-b:a','48k',str(target)],check=True)
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(target)]))
 manifest[s['id']]={'audioStatus':'ready','duration':round(duration,3),'scriptSha256':digest,'fileSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'voices':sorted({voices[t[0]] for t in turns}),'engine':'eSpeak NG 1.52 / espeakng-loader 0.2.4','synthetic':True}
 print(s['id'],round(duration,1),'seconds',flush=True)
manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
