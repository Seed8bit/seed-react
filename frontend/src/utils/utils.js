const MOBILE_WINDOW_WIDTH = 600;

export function handleResize(isMobile, setIsMobile) {
  if (window.innerWidth < MOBILE_WINDOW_WIDTH) {
    setIsMobile(true);
  } else {
    setIsMobile(false);
  }
}

export function isMobilePage() {
  return window.innerWidth < MOBILE_WINDOW_WIDTH;
}
