// src/lib/api.ts
export async function syncRecords(records: any[]): Promise<boolean> {
  try {
    // const response = await fetch('https://YOUR_BACKEND_URL/api/sync', {
    const response = await fetch('http://localhost:3000/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records })
    });

    if (!response.ok) {
      console.error('API returned non-200:', response.status);
      return false;
    }

    console.log('Synced to server!');
    return true;
  } catch (err) {
    console.error('Sync failed:', err);
    return false;
  }
}

