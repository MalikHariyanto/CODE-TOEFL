import {defineConfig} from 'vite';
// Vercel serves the app at the domain root. GitHub project Pages uses a subpath.
// VERCEL is supplied automatically by Vercel for its build environment.
export const appBase=process.env.VERCEL==='1'?'/':'/CODE-TOEFL/';
export default defineConfig({base:appBase,server:{host:'0.0.0.0'},build:{target:'es2022'}});
