mkdir OhioLeps02 │ D:\Dev │ ... │
cd OhioLeps02 │ D:\Dev │ ... │
pnpm create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
pnpm exec create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
pnpm help │ D:\Dev\OhioLeps02 │ ... │
npx create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
pnpm create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
pnpm exec sv create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
npx sv create svelte@latest frontend │ D:\Dev\OhioLeps02 │ ... │
npx sv create frontend │ D:\Dev\OhioLeps02 │ ... │
cd frontend\ │ D:\Dev\OhioLeps02 │ ... │
git init; git add -A; git commit -m "Initial commit" │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm install │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm install @capacitor/core @capacitor/cli │ D:\Dev\OhioLeps02\frontend │ ... │
npx cap init │ D:\Dev\OhioLeps02\frontend │ ... │
npx cap init │ D:\Dev\OhioLeps02\frontend │ ... │
npx cap add android │ D:\Dev\OhioLeps02\frontend │ ... │
npx cap add ios │ D:\Dev\OhioLeps02\frontend │ ... │
npm install @capacitor/android @capacitor/ios │ D:\Dev\OhioLeps02\frontend │ ... │
npm install @capacitor/android │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm exec cap add ios │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm install @capacitor/android │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm install @capacitor/ios │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm exec cap add @capacitor/ios │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm exec cap add @capacitor/android │ D:\Dev\OhioLeps02\frontend │ ... │
pnpm add @capacitor-community/speech-recognition @capacitor-community/sqlite │ D:\Dev\OhioLeps02\frontend │ ... │
mkdir backend │ D:\Dev\OhioLeps02 │ ... │
cd backend\ │ D:\Dev\OhioLeps02 │ ... │
pnpm install express sqlite3 dotenv │ D:\Dev\OhioLeps02\backend │ ... │
pnpm install nodemon -D │ D:\Dev\OhioLeps02\backend │ ... │
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
