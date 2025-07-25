<!-- src/components/Navigation.svelte -->

<script lang="ts">
  import {cButtonBaseClasses, cButtonLightClasses, cButtonDarkClasses } from '$lib/styles/standard';
  import type { Snippet } from 'svelte';
  import DarkToggle from '$lib/components/DarkToggle.svelte';

  let { children, } : { children?: Snippet; } = $props();
  const menuClasses = `${cButtonBaseClasses} ${cButtonLightClasses} ${cButtonDarkClasses}`;
</script>

<div class="space-2">
  <a href="/" class={menuClasses}>Home</a>
  <a href="/test1" class={menuClasses}>Voice</a>
  <a href="/test2" class={menuClasses}>Camera</a>
  {#if children }
    {@render children()}
  {/if}
  <DarkToggle />
</div>
