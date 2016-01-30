'use strict';

import DorisObject from './object';

/**
 *
 * Instantiates a DorisObject based on the selector input.
 *
 * @param {string|Node|window|document|DorisObject} nodes A CSS selector, a
 *     DOM node, one of the root elements (window, document) or nother instance
 *     of a DorisObject (the nodes will be the same).
 * @return {DorisObject}
 */
export default function doris(nodes) {
  if (nodes instanceof Node) {
    // Standard DOM node.
    nodes = [nodes];
  } else if (typeof nodes === 'object' && nodes.elements) {
    // Another DorisObject being passed
    nodes = nodes.elements;
  } else if (nodes === document || nodes === document.documentElement) {
    nodes = [document.documentElement];
  } else if (nodes === window) {
    nodes = [window];
  } else if (typeof nodes === 'string'){
    nodes = document.querySelectorAll(nodes);
  }
  return new DorisObject(nodes);
}
doris.plugins = DorisObject.prototype;

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}
