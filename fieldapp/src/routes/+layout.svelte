<script lang="ts">
  import { loadTheme } from '$lib/theme';
  // import type { Snippet } from "svelte";
  import "../app.css";
  // let { children }: { children: Snippet } = $props();

  loadTheme();
</script>
<!-- {#snippet main()} -->
<!--   <div></div> -->
<!-- {/snippet} -->
<!---->
<!-- {@render main()} -->

<!-- <div></div> -->
<slot />
