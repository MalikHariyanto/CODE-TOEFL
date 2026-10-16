import fs from 'node:fs';
import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/browser',timeout:60000,use:{baseURL:'http://127.0.0.1:4173/CODE-TOEFL/',launchOptions:{executablePath:process.env.TOEFL_CHROMIUM||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']},headless:true},webServer:{command:'npm run build && npm run preview -- --port 4173 --strictPort',url:'http://127.0.0.1:4173/CODE-TOEFL/',timeout:30000,reuseExistingServer:false},workers:1,reporter:'list'});
