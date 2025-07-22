<script lang="ts">
  import { onMount } from 'svelte';
  import { records } from '$lib/store';
  import {
    initDb,
    getAll,
    addRecord,
    deleteRecord,
    updateRecord
  } from '$lib/db';
  import { startListening } from '$lib/voice';
  import DarkToggle from '$lib/components/DarkToggle.svelte';
  import RecordsManager from '$lib/components/RecordsManager.svelte';

  let newText = '';
  let newCount = 1;

  let recognizedText = '';

  // Initialize DB and load records on mount
  onMount(async () => {
    await initDb();
    await refresh();
  });

  async function refresh() {
    const all = await getAll();
    records.set(all);
  }

  async function handleAdd() {
    if (!newText.trim()) {
      alert('Please enter some text!');
      return;
    }
    await addRecord(newText.trim(), newCount);
    newText = '';
    newCount = 1;
    await refresh();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this record?')) {
      await deleteRecord(id);
      await refresh();
    }
  }

  async function handleEdit(id: number, currentText: string) {
    const edited = prompt('Edit text:', currentText);
    if (edited && edited.trim()) {
      await updateRecord(id, edited.trim());
      await refresh();
    }
  }

  async function handleVoice() {
    console.log("handleVoice");
    await startListening((result) => {
      console.log("handleVoice - startListening");
      recognizedText = result;
    });
  }
</script>

<div class="max-w-lg mx-auto p-4">
  <button
    on:click={handleVoice}
    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
  >
    Start Voice
  </button>
  <p class="mb-4">Latest recognized: {recognizedText}</p>

  <RecordsManager title="Your Observations" />

  <button
    on:click={sync}
    class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-4"
  >
    Sync to API
  </button>

  <button on:click={handleVoice}>Start Recording</button>
  <p>Latest recognized: {recognizedText}</p>
  
</div>

<DarkToggle />
