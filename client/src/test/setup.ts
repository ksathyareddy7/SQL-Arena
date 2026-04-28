import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement these, and some components/libraries assume they exist.
if (!globalThis.ResizeObserver) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Monaco / other libs may reference matchMedia.
if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    });
}

