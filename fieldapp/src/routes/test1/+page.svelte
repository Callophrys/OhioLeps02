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

  let newText = '';
  let newCount = 1;

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
</script>

<style>
  form {
    margin-bottom: 1em;
  }
  input, button {
    margin-right: 0.5em;
  }
  .record {
    border-bottom: 1px solid #ddd;
    padding: 0.5em 0;
  }
</style>

<h2>Add New Record</h2>

<form on:submit|preventDefault={handleAdd}>
  <input
    type="text"
    placeholder="Your text here"
    bind:value={newText}
  />
  <input
    type="number"
    min="1"
    bind:value={newCount}
  />
  <button type="submit">Add</button>
</form>

<h2>All Records</h2>

{#if $records.length === 0}
  <p>No records yet.</p>
{/if}

{#each $records as record (record.id)}
  <div class="record">
    <strong>{record.text}</strong> (Count: {record.count}) [Synced: {record.synced ? '✅' : '❌'}]
    <button on:click={() => handleEdit(record.id, record.text)}>Edit</button>
    <button on:click={() => handleDelete(record.id)}>Delete</button>
  </div>
{/each}

