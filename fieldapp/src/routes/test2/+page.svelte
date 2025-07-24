<!-- src/routes/test2/+page.svelte -->
<script lang="ts">
  import Camera from '$lib/components/Camera.svelte';
  import DarkToggle from '$lib/components/DarkToggle.svelte';
  import PhotoUploader from '$lib/components/PhotoUploader.svelte';
</script>

<div class="min-h-48 m-4 w-96 bg-green-600 text-black dark:bg-green-800 dark:text-white">
  <Camera />
</div>

<div class="min-h-48 m-4 w-96 bg-green-600 text-black dark:bg-green-800 dark:text-white">
  <PhotoUploader />
</div>

<DarkToggle />
