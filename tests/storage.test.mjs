import test from 'node:test';
import assert from 'node:assert/strict';
import 'fake-indexeddb/auto';
import {readState,writeState,backup} from '../src/core/storage.js';
import {freshState,validateBackup} from '../src/core/engine.js';
test('IndexedDB persists actual profile, and validated JSON restores it',async()=>{const s=freshState();s.vocabulary.push({word:'evidence',meaning:'bukti',stage:-1,due:100,reviews:0});s.bookmarks.push('S011');await writeState(s);const restored=await readState();assert.deepEqual(restored,s);const parsed=validateBackup(JSON.parse(backup(restored)));assert.deepEqual(parsed,s);parsed.preferences.theme='dark';await writeState(parsed);assert.equal((await readState()).preferences.theme,'dark');});
test('database schema version 1 upgrades without erasing its stored vocabulary',async()=>{
 await new Promise((resolve,reject)=>{const r=indexedDB.deleteDatabase('ruang-toefl');r.onsuccess=resolve;r.onerror=()=>reject(r.error);});
 const original=freshState();original.schemaVersion=1;delete original.completedLessons;original.vocabulary=[{word:'trace',meaning:'jejak',stage:0,due:100,reviews:1}];
 await new Promise((resolve,reject)=>{const r=indexedDB.open('ruang-toefl',1);r.onupgradeneeded=()=>r.result.createObjectStore('state');r.onsuccess=()=>{const db=r.result,tx=db.transaction('state','readwrite');tx.objectStore('state').put(original,'profile');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};});
 const restored=await readState();assert.equal(restored.schemaVersion,2);assert.equal(restored.vocabulary[0].word,'trace');assert.deepEqual(restored.completedLessons,[]);
});
