<script lang="ts">
  import { onMount } from 'svelte';
  import { initDb, addRecord, getUnsynced } from '$lib/db';
  import { startListening } from '$lib/voice';

  let recognizedText = '';

  onMount(async () => {
    console.log("onMount - initDb");
    await initDb();

    console.log("onMount - addRecord");
    await addRecord("test 1", 33);
  });

  async function handleVoice() {
    console.log("handleVoice");
    await startListening((result) => {
      console.log("handleVoice - startListening");
      recognizedText = result;
    });
  }

  async function save() {
    console.log("save");
    await addRecord(recognizedText, 1);
    alert('Saved locally!');
  }

  async function sync() {
    console.log("sync");
    const unsynced = await getUnsynced();

    console.log('Upload this to your API:', unsynced);
    // TODO: POST to your Node.js API here, then mark as synced
  }

  // const unsynced = await getUnsynced();
  // await fetch('http://your-server-url/api/sync', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ records: unsynced })
  // });
  // // Then markAsSynced(unsynced.map(r => r.id));

</script>

<button onclick={handleVoice}>Start Recording</button>
<p>{recognizedText}</p>
<button onclick={save}>Save Record</button>
<button onclick={sync}>Sync</button>
