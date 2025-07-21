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

  export let title = 'Manage Your Records';

  let newText = '';
  let newCount = 1;

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
</script>

<div class="max-w-lg mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">{title}</h2>

  <form on:submit|preventDefault={handleAdd} class="flex flex-col gap-2 mb-6">
    <input
      type="text"
      placeholder="Record text"
      bind:value={newText}
      class="border rounded px-3 py-2"
    />
    <input
      type="number"
      min="1"
      bind:value={newCount}
      class="border rounded px-3 py-2"
    />
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add Record
    </button>
  </form>

  {#if $records.length === 0}
    <p class="text-gray-500">No records yet.</p>
  {/if}

  <div class="space-y-4">
    {#each $records as record (record.id)}
      <div class="border p-4 rounded shadow flex justify-between items-center">
        <div>
          <p class="font-semibold">{record.text}</p>
          <p class="text-sm text-gray-600">
            Count: {record.count} — Synced: {record.synced ? '✅' : '❌'}
          </p>
        </div>
        <div class="flex gap-2">
          <button
            on:click={() => handleEdit(record.id, record.text)}
            class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            on:click={() => handleDelete(record.id)}
            class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
