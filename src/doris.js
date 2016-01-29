import DorisWrapper from './wrapper';

/**
 * Instantiates a DorisWrapper based on the selector input.
 *
 * @param {string|Node|window|document|DorisWrapper} nodes A CSS selector, a
 *     DOM node, one of the root elements (window, document) or nother instance
 *     of a DorisWrapper (the nodes will be the same).
 * @return {DorisWrapper}
 */
export default function doris(nodes) {
  if (nodes instanceof Node) {
    // Standard DOM node.
    nodes = [nodes];
  } else if (typeof nodes === 'object' && nodes.elements) {
    // Another DorisWrapper being passed
    nodes = nodes.elements;
  } else if (nodes === document || nodes === document.documentElement) {
    nodes = [document.documentElement];
  } else if (nodes === window) {
    nodes = [window];
  } else {
    nodes = document.querySelectorAll(nodes);
  }
  return new DorisWrapper(nodes);
}
doris.plugins = DorisWrapper.prototype;

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}
