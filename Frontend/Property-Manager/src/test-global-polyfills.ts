export {};

declare global {
  interface Window {
    global: typeof window;
  }
}

window.global = window;