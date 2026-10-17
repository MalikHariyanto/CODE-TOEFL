import {test,expect} from '@playwright/test';

test('production HTML loads JavaScript and CSS from the deployment base, and refresh keeps actual progress',async({page,baseURL})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto('./');expect(response.status()).toBe(200);
 await expect(page.getByRole('heading',{name:'Selamat datang di ruang belajar.',exact:true})).toBeVisible();await expect(page.getByRole('status').filter({hasText:'Menyiapkan ruang belajar'})).toHaveCount(0);
 const assets=await page.locator('script[src],link[rel="stylesheet"][href]').evaluateAll(els=>els.map(el=>el.src||el.href));expect(assets.length).toBeGreaterThanOrEqual(2);
 for(const url of assets){expect(url.startsWith(baseURL)).toBe(true);const r=await page.request.get(url);expect(r.status()).toBe(200);expect(r.headers()['content-type']).not.toContain('text/html');}
 expect(await page.locator('.sidebar').evaluate(el=>getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
 await page.getByRole('link',{name:'Kosakata',exact:true}).click();await page.getByLabel('Cari kata atau frasa').fill('evidence');await page.getByRole('button',{name:'Cari di kamus lokal',exact:true}).click();await page.getByRole('button',{name:'Simpan ke kosakata',exact:true}).click();await expect(page.getByRole('dialog')).not.toBeVisible();await page.reload();await page.getByRole('link',{name:'Kosakata',exact:true}).click();await expect(page.locator('.word-row').getByText('bukti',{exact:true})).toBeVisible();expect(errors).toEqual([]);
});

test('audio uses the correct root or subpath and is served as media',async({page,baseURL})=>{
 await page.goto('./');await page.getByRole('link',{name:'Pengaturan',exact:true}).click();await page.getByLabel('Saya ingin menggunakan arsip audio sintetis').check();await expect(page.locator('#toast')).toContainText('Arsip sintetis diaktifkan');await page.getByRole('link',{name:'Ruang tes',exact:true}).click();await page.getByRole('button',{name:'Siapkan diagnostik →',exact:true}).click();const src=await page.locator('#sound-check').getAttribute('src');expect(new URL(src,baseURL).href).toBe(new URL('audio/check.mp3',baseURL).href);const response=await page.request.get(src);expect(response.status()).toBe(200);expect(response.headers()['content-type']).toContain('audio/');expect((await response.body()).length).toBeGreaterThan(1000);
});
