'use strict';

import DorisObject from './object';
import * as utils from './utils';

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
    try {
      nodes = document.querySelectorAll(nodes);
    } catch (e) {
      if (e instanceof DOMException) {
        nodes = utils.stringToDOM(nodes);
      } else {
        throw new Error('Invalid Doris argument!');
      }
    }
  }
  return new DorisObject(nodes);
}

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}
