import {test,expect} from '@playwright/test';
import {grammarChapters} from '../../src/data/grammar.js';
async function openDesk(page){await page.goto('./');await page.getByRole('link',{name:'Grammar dari nol',exact:true}).click();}

test('grammar desk searches by confusion and explains an incorrect answer before a new attempt',async({page})=>{
 await openDesk(page);await expect(page.getByRole('heading',{name:'Ngerti kalimatnya. Kenali polanya.'})).toBeVisible();
 await expect(page.locator('.grammar-chapter')).toHaveCount(11);
 await page.getByLabel('Gue bingung di…').fill('studies');await page.getByRole('button',{name:'Cari pembahasan',exact:true}).click();
 const chapter=page.locator('.grammar-chapter').filter({has:page.getByRole('heading',{name:'Study atau studies?',exact:true})});await chapter.getByRole('button',{name:'Buka pembahasan →'}).click();
 const first=page.locator('[data-grammar-check="agreement-0"]');await expect(first.locator('.academic-help')).toHaveCount(0);
 await first.getByRole('radio',{name:'C is study',exact:true}).check();await first.getByRole('button',{name:'Periksa jawaban',exact:true}).click();
 await expect(first.getByRole('status')).toContainText('Belum tepat');await expect(first.getByRole('status')).toContainText('Is + study bukan bentuk yang tepat');
 await first.getByRole('radio',{name:'B studies',exact:true}).check();await first.getByRole('button',{name:'Periksa lagi',exact:true}).click();await expect(first.getByRole('status')).toContainText('Tepat. Ini alasannya.');
 const transfer=page.locator('[data-grammar-check="agreement-1"]');await expect(transfer.locator('.academic-help')).toContainText('curah hujan');await expect(transfer.locator('.academic-help dt')).toHaveText(['findings','substantial','rainfall','indicate']);
 await transfer.getByRole('radio',{name:'A indicate',exact:true}).check();await transfer.getByRole('button',{name:'Periksa jawaban',exact:true}).click();await expect(transfer.getByRole('status')).toContainText('Of the study hanya keterangan');
 await page.getByRole('button',{name:'← Semua pembahasan',exact:true}).first().click();await chapter.getByRole('button',{name:'Buka pembahasan →'}).click();await expect(first.getByRole('status')).toContainText('Tepat.');
 await page.reload();await page.getByRole('link',{name:'Grammar dari nol',exact:true}).click();await page.getByLabel('Gue bingung di…').fill('tidak-ada-topik-ini');await page.getByRole('button',{name:'Cari pembahasan',exact:true}).click();await expect(page.getByText('Pembahasan belum ditemukan.',{exact:false})).toBeVisible();
});

test('every grammar chapter accepts both correct checks and links to the next chapter',async({page})=>{
 await openDesk(page);await page.locator('.grammar-chapter').first().getByRole('button',{name:'Buka pembahasan →'}).click();
 for(const c of grammarChapters){
  await expect(page.getByRole('heading',{name:c.title,exact:true})).toBeVisible();
  for(let i=0;i<c.checks.length;i++){
   const form=page.locator(`[data-grammar-check="${c.id}-${i}"]`);
   await form.locator(`input[value="${c.checks[i].answer}"]`).check();await form.getByRole('button',{name:'Periksa jawaban',exact:true}).click();
   await expect(form.getByRole('status')).toContainText('Tepat. Ini alasannya.');
  }
  if(c!==grammarChapters.at(-1))await page.locator('.grammar-next .primary').click();
 }
 await page.getByRole('button',{name:'Buka materi Structure →'}).click();await expect(page.getByLabel('Kelompok materi')).toHaveValue('structure');
});

test('grammar help stays readable on mobile, supports keyboard and dark theme',async({page})=>{
 await page.setViewportSize({width:390,height:844});await openDesk(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Mulai dari sini →'}).click();
 await expect(page.locator('.grammar-examples')).toBeVisible();await expect(page.locator('.grammar-desk .academic-help')).toHaveCount(2); // sample and laboratory in separate checks
 await page.getByText('Kenali istilah grammar',{exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('.grammar-terms p')).toBeVisible();
 await page.getByRole('button',{name:'Aktifkan tema gelap',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 const contrast=await page.locator('.grammar-concept').evaluate(el=>{
  const luminance=color=>{const rgb=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;});return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;};
  const text=luminance(getComputedStyle(el.querySelector('p')).color),bg=luminance(getComputedStyle(el).backgroundColor);
  return (Math.max(text,bg)+0.05)/(Math.min(text,bg)+0.05);
 });expect(contrast).toBeGreaterThan(4.5);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'/tmp/grammar-desk-mobile.png',fullPage:true});
});
