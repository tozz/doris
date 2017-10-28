import DorisObject from './object';
import utils from './utils';

/**
 *
 * Instantiates a DorisObject based on the selector input.
 *
 * @param {(string|Array|Node|NodeList|Window|document|DorisObject)} nodes A CSS selector, a
 *     DOM node, one of the root elements (window, document) or nother instance
 *     of a DorisObject (the nodes will be the same).
 * @return {DorisObject}
 */
export default function doris(nodes) {
  let nodesObject;
  if (nodes instanceof Node) {
    // Standard DOM node.
    nodesObject = [nodes];
  } else if (typeof nodes === 'object' && nodes.elements) {
    // Another DorisObject being passed
    nodesObject = nodes.elements;
  } else if (nodes === document || nodes === document.documentElement) {
    nodesObject = [document.documentElement];
  } else if (nodes === window) {
    nodesObject = [window];
  } else if (typeof nodes === 'string') {
    try {
      nodesObject = document.querySelectorAll(nodes);
    } catch (e) {
      if (e instanceof DOMException) {
        nodesObject = utils.stringToDOM(nodes);
      } else {
        throw new Error('Invalid Doris argument!');
      }
    }
  }
  return new DorisObject(nodesObject);
}

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}
