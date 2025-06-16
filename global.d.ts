// global.d.ts
export {};

declare global {
  interface Window {
    scrollToTop: () => void;
  }
}
