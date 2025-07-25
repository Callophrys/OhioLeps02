<!-- src/routes/test2/+page.svelte -->
<script lang="ts">
  import PhotoUploader from '$lib/components/PhotoUploader.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />

<div class="min-h-48 m-4 w-96 bg-green-600 text-black dark:bg-green-800 dark:text-white">
  <PhotoUploader />
</div>
