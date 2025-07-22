import { mkdir, cp } from 'fs/promises';

await mkdir('static/vendor', { recursive: true });
await cp('node_modules/jeep-sqlite/dist/jeep-sqlite', 'static/vendor', { recursive: true });
console.log('Vendor files copied!');

await mkdir('static/assets', { recursive: true });
await cp('../node_modules/.pnpm/node_modules/sql.js/dist', 'static/assets', { recursive: true });
console.log('sql-wasm.wasm file(s) copied!');
