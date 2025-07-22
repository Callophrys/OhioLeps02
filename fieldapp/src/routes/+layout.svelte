<script lang="ts">
  import { loadTheme } from '$lib/theme';
  import { initDb } from '$lib/db';
  import { onMount } from 'svelte';
  // import type { Snippet } from "svelte";
  import "../app.css";
  // let { children }: { children: Snippet } = $props();

  onMount(async () => await initDb());
  loadTheme();
</script>
<!-- {#snippet main()} -->
<!--   <div></div> -->
<!-- {/snippet} -->
<!---->
<!-- {@render main()} -->

<!-- <div></div> -->
<slot />
