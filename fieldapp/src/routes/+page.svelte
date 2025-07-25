<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { records } from '$lib/store';
  import { getAll, addRecord, deleteRecord, updateRecord, getUnsynced, markAsSynced } from '$lib/db';
  import { startListening } from '$lib/voice';
  import { syncRecords } from '$lib/api';
  import Navigation from '$lib/components/Navigation.svelte';

  let recognizedText = '';

  onMount(async () => {
    console.log("onMount - addRecord");
    await addRecord("test 1", 33);

    await refresh();
  });

  async function save() {
    console.log("save");
    await addRecord(recognizedText, 1);
    alert('Saved locally!');
  }

  async function sync() {
    console.log("sync");
    const unsynced = await getUnsynced();
    console.log('Would upload:', unsynced);

    if (unsynced.length === 0) {
      alert('Nothing to sync!');
      return;
    }

    const ok = await syncRecords(unsynced);
    if (ok) {
      await markAsSynced(unsynced.map(r => r.id));
      await refresh();
      alert('Sync successful!');
    } else {
      alert('Sync failed!');
    }
  }

  async function refresh() {
    const all = await getAll();
    records.set(all);
  }

  async function handleVoice() {
    console.log("handleVoice");
    await startListening((result) => {
      console.log("handleVoice - startListening");
      recognizedText = result;
    });
  }

  async function handleDelete(id) {
    if (confirm('Delete this record?')) {
      await deleteRecord(id);
      await refresh();
    }
  }

  async function handleEdit(id) {
    const newText = prompt('New text?');
    if (newText) {
      await updateRecord(id, newText);
      await refresh();
    }
  }
</script>

<Navigation />

<button on:click={handleVoice}>Start Recording</button>
<p>Latest recognized: {recognizedText}</p>

<h3>Records:</h3>

{#if $records.length === 0}
  <p>No records yet.</p>
{:else}
  {#each $records as record (record.id)}
    <div>
      <strong>{record.text}</strong> ({record.count}) [Synced: {record.synced ? '✅' : '❌'}]
      <button on:click={() => handleEdit(record.id)}>Edit</button>
      <button on:click={() => handleDelete(record.id)}>Delete</button>
    </div>
  {/each}
{/if}

<button on:click={sync}>Sync to API</button>

<div class="border p-4 rounded shadow flex justify-between items-center dark:bg-gray-800 dark:text-white">
  <!-- record content -->
  stuff here
</div>
