import fs from 'node:fs';
import {defineConfig} from '@playwright/test';
const buildCommand=process.env.VERCEL==='1'?'npm run build:vercel':'npm run build';
const appURL='http://127.0.0.1:4173'+(process.env.VERCEL==='1'?'/':'/CODE-TOEFL/');
export default defineConfig({testDir:'tests/browser',timeout:60000,use:{baseURL:appURL,launchOptions:{executablePath:process.env.TOEFL_CHROMIUM||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']},headless:true},webServer:{command:buildCommand+' && npm run preview -- --port 4173 --strictPort',url:appURL,timeout:30000,reuseExistingServer:false},workers:1,reporter:'list'});
