'use strict';

/**
 *
 * DorisEvent is a minimal wrapper around DOM events for the purpose of event
 *     delegation handling inside Doris. You shouldn't really use this for
 *     anything.
 *
 * @type {DorisEvent}
 */
export default class DorisEvent {
  /**
   *
   * Wraps a normal event with the purpose of assisting the event delegation
   *     in Doris.
   *
   * @param {Event} event
   */
  constructor(event) {
    /** @member {bool} */
    this.preventedDefault = false;
    /** @member {bool} */
    this.propagationStopped = false;
    /** @member {bool} */
    this.immediatePropagationStopped = false;
    /** @member {Event} */
    this.originalEvent = event;
    /** @member {Node} */
    this.target = event.target;
    /** @member {string} */
    this.type = event.type;
  }

  /**
   *
   * Wrapper for preventDefault()
   */
  preventDefault() {
    this.originalEvent.preventDefault();
    this.preventedDefault = true;
  }

  /**
   *
   * Wrapper for stopPropagation()
   */
  stopPropagation() {
    this.originalEvent.stopPropagation();
    this.propagationStopped = true;
  }

  /**
   *
   * Wrapper for stopImmediatePropagation()
   */
  stopImmediatePropagation() {
    this.originalEvent.stopImmediatePropagation();
    this.immediatePropagationStopped = true;
  }
}
