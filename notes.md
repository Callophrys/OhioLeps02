mkdir OhioLeps02
cd OhioLeps02
pnpm create svelte@latest frontend
pnpm exec create svelte@latest frontend
pnpm help
npx create svelte@latest frontend
pnpm create svelte@latest frontend
pnpm exec sv create svelte@latest frontend
npx sv create svelte@latest frontend
npx sv create frontend
cd frontend
git init; git add -A; git commit -m "Initial commit" │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm install
pnpm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npm install @capacitor/android @capacitor/ios
npm install @capacitor/android
pnpm exec cap add ios
pnpm install @capacitor/android
pnpm install @capacitor/ios
pnpm exec cap add @capacitor/ios
pnpm exec cap add @capacitor/android
pnpm add @capacitor-community/speech-recognition @capacitor-community/sqlite
mkdir backend
cd backend
pnpm install express sqlite3 dotenv
pnpm install nodemon -D
cd .. │ D:\Dev\OhioLeps02\backend │ ... │
cd OhioLeps02\ │ D:\Dev │ ... │
cd frontend\ │ D:\Dev\OhioLeps02 │ ... │
pnpm run dev │ D:\Dev\OhioLeps02\frontend │ ... │



backend\
(1 or 2)
pnpm init

(2 or 1)
pnpm add express sqlite3 dotenv
pnpm add -D nodemon

(3) Add to package.json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

(4 run - dev)
pnpm dev

(4 run - prod)
pnpm start

(BONUS)
pnpm workspace
...and:
pnpm install

...so now: to run the scripts in just the package.json for the filter:
pnpm --filter frontend dev
pnpm --filter backend dev
