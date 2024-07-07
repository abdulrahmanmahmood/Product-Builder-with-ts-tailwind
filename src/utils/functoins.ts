/**
 *
 * @param {string} txt .-. the input text to be sliced
 * @param {number} max .-. the maximaum length before truncation
 * @returns the sliced text, with an ellipsis(...) appended if truncated
 */
export const textSlicer = (txt: string, max: number) => {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
};
