export function preventScroll() {
  document.body.style.overflow = "hidden";
}

export function removePreventScroll() {
  document.body.style.overflowY = "auto";
}
