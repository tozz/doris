/**
 *
 * Converts a string to DOM nodes.
 * @param {string} string A string representation of the DOM.
 * @return {Array<Node>}
 */
export default {
  stringToDOM: (string) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('body'));
    fragment.childNodes[0].innerHTML = string;
    return Array.from(fragment.childNodes[0].childNodes);
  },
};
