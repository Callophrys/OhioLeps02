<!-- src/routes/test2/+page.svelte -->
<script lang="ts">
  import DarkToggle from '$lib/components/DarkToggle.svelte';
  import PhotoUploader from '$lib/components/PhotoUploader.svelte';
</script>

<div class="min-h-48 m-4 w-96 bg-green-600 text-black dark:bg-green-800 dark:text-white">
  <PhotoUploader />
</div>

<a href="/">Home</a>
<a href="/test1">Voice</a>
<a href="/test2">Camera</a>
<DarkToggle />
