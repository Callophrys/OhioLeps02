  import { browser } from "$app/environment";

  export function loadTheme(): void {
    if (!browser) return;

    const mode: string = localStorage.getItem('data-mode') || "light";
    document.documentElement.setAttribute('data-mode', mode);
  }
