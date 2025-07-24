  import { browser } from "$app/environment";

  export function loadTheme(): void {
    if (!browser) return;

    document.documentElement.setAttribute(
      'data-mode',
      localStorage
        .getItem('theme') === 'dark'
        || ( !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark' : 'light'
    );
  }
