<script lang="ts">
  // src/lib/components/DarkToggle.svelte

  import type { Snippet } from "svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import {cButtonBaseClasses, cButtonLightClasses, cButtonDarkClasses } from "$lib/styles/standard";

  let {
    baseClasses = '',
    lightClasses = '',
    darkClasses = '',
    children,
  } : {
    baseClasses?: string;
    lightClasses?: string;
    darkClasses?: string;
    children?: Snippet;
  } = $props();

  const prefixedDark = (x: string) =>
    x.split(' ').map((x) => (x.includes("dark:") ? '' : 'dark:') + x).join(' ');

  const classes = $derived(
    // Concat order matters so user classes can override
    // standard classes by being listed after the standard.
    cButtonBaseClasses.concat(
      baseClasses,
      cButtonLightClasses,
      lightClasses,
      cButtonDarkClasses,
      prefixedDark(darkClasses)
    )
  );

  let checkState = $state(false);

  onMount(() => {
    const mode = localStorage.getItem("data-mode") || "light";
    document.documentElement.setAttribute("data-mode", mode);
    checkState = mode === "dark";
  });

  function toggleThemeMode(e: any) {
    checkState = !checkState;

    const mode = checkState ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("data-mode", mode);
  }

</script>

{#snippet contents()}
  {#if children }
    {@render children()}
  {:else}
    {checkState ? 'Light' : 'Dark'} Mode
  {/if}
{/snippet}

<button
  type="button"
  class={classes}
  onclick={toggleThemeMode}
>{@render contents()}</button>
