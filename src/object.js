'use strict';

import DorisEvent from './event';
import Features from './features';

let EventList = {};
let elementCount = 0;

/**
 *
 * DorisObject is (as the name suggest) a wrapper for all the functionality.
 *
 * @type {DorisObject}
 */
export default class DorisObject {
  /**
   *
   * This class should not be instantiatied manually but rather by using the
   *     doris() helper.
   *
   * @example
   * let body = doris('body') // A DorisObject with <body> as the only element.
   * @example
   * let p = doris('p') // A DorisObject with every <p>-tag in the DOM.
   *
   * @param {array} nodes A list of DOM-nodes to work with.
   */
  constructor(nodes) {
    /** @private */
    this.elements = Array.from(nodes);
    for (let i in this.elements) {
      if (this.elements[i]._doris === undefined) {
        this.elements[i]._doris = ++elementCount;
      }
      this[i] = this.elements[i];
    }
  }

  /**
   *
   * Returns a new instance of a DorisObject for the sole element (zero based
   *     index)
   *
   * @param {number} index The index for which element should be returned.
   * @return {DorisObject}
   */
  get(index) {
    return new DorisObject([this.elements[index]]);
  }

  /**
   *
   * For each element call callback where this is bound to the unwrapped
   *     element.
   *
   * @param {function(node: DorisObject, index: number)} callback
   * @return {DorisObject}
   */
  each(callback) {
    for (let i in this.elements) {
      callback.apply(this.elements[i],
                     [new DorisObject([this.elements[i]]), parseInt(i)]);
    }
    return this;
  }

  /**
   *
   * Check if the first element matches the selector.
   *
   * @param {string} selector CSS Selector
   * @return {bool}
   */
  matches(selector) {
    return this._matchSelector(this.elements[0], selector);
  }

  /**
   *
   * Find matching parent nodes.
   * If two children has the same parent the parent node will only appear
   *     once in the return value.
   * If no selector is given the first parent node of each element will be
   *     returned.
   *
   * @param {string} [selector] CSS Selector to match, will traverse up the
   *     tree until it's matched.
   */
  parent(selector) {
    let list = [];
    for (let i in this.elements) {
      if (selector) {
        let t = this.elements[i].parentNode,
            match = false;

        while (!(match = this._matchSelector(t, selector))) {
          if (t.tagName === 'HTML') { break }
          t = t.parentNode;
        }

        if (match && list.indexOf(t) < 0) {
          list.push(t);
        }
      } else {
        if (this.elements[i].parentNode.tagName !== 'HTML' &&
            list.indexOf(this.elements[i].parentNode) < 0) {
          list.push(this.elements[i].parentNode);
        }
      }
    }
    return new DorisObject(list);
  }

  /**
   *
   * Find matching child nodes.
   *
   * @param {string} selector CSS Selector to match.
   * @return {DorisObject} The matching nodes in a DorisObject.
   */
  find(selector) {
    let list = [];
    if (selector) {
      for (let i in this.elements) {
        let elements = Array.from(this.elements[i].querySelectorAll(selector));
        for (let e in elements) {
          if (list.indexOf(elements[e]) === -1) {
            list.push(elements[e]);
          }
        }
      }
    }
    return new DorisObject(list);
  }

  /**
   *
   * Prepends nodes in the DOM.
   *
   * @param {string} domString A string representation of the DOM nodes to
   *     prepend.
   * @return {this}
   */
  prepend(domString) {
    for (let i in this.elements) {
      let nodes = this._stringToDOM(domString);
      for (let n in nodes.reverse()) {
        if (this.elements[i].firstChild) {
          this.elements[i].insertBefore(nodes[n], this.elements[i].firstChild);
        } else {
          this.elements[i].appendChild(nodes[n]);
        }
      }
    }
    return this;
  }

  /**
   *
   * Appends nodes in the DOM.
   *
   * @param {string} domString A string representation of the DOM nodes to
   *     append.
   * @return {this}
   */
  append(domString) {
    for (let i in this.elements) {
      let nodes = this._stringToDOM(domString);
      for (let n in nodes) {
        this.elements[i].appendChild(nodes[n])
      }
    }
    return this;
  }

  /**
   *
   * Insert DOM element(s) before the elements.
   *
   * @param {string} domString A string representation of the DOM nodes to
   *     insert.
   * @return {this}
   */
  before(domString) {
    for (let i in this.elements) {
      let nodes = this._stringToDOM(domString);
      for (let n in nodes) {
        this.elements[i].parentNode.insertBefore(nodes[n], this.elements[i]);
      }
    }
    return this;
  }

  /**
   *
   * Insert DOM element(s) after the elements.
   *
   * @param {string} domString A string representation of the DOM nodes to
   *     insert.
   * @return {this}
   */
  after(domString) {
    for (let i in this.elements) {
      let nodes = this._stringToDOM(domString);
      for (let n in nodes.reverse()) {
        if (this.elements[i].nextSibling) {
          this.elements[i]
              .parentNode
              .insertBefore(nodes[n], this.elements[i].nextSibling);
        } else {
          this.elements[i].parentNode.appendChild(nodes[n]);
        }
      }
    }
    return this;
  }

  /**
   *
   * Removes every element in elements from the DOM.
   *
   * @return {this}
   */
  remove() {
    for (let i in this.elements) {
      this.elements[i].parentNode.removeChild(this.elements[i]);
      delete this.elements[i];
      delete this[i];
    }
    return this;
  }

  /**
   *
   * Adds class(es) to every element. This is using the native classList
   *     implementation.
   *
   * @param {...string} classes Names of class(es)
   * @return {this}
   */
  addClass(...classes) {
    for (let i in this.elements) {
      if (Features.classListAddMultiple) {
        this.elements[i].classList.add(...classes);
      } else {
        for (let c in classes) {
          this.elements[i].classList.add(classes[c]);
        }
      }
    }
    return this;
  }

  /**
   *
   * Removes class(es) from every element. This is using the native
   *     classList implementation.
   *
   * @param {...string} classes Names of class(es)
   * @return {this}
   */
  removeClass(...classes) {
    for (let i in this.elements) {
      if (Features.classListAddMultiple) {
        this.elements[i].classList.remove(...classes);
      } else {
        for (let c in classes) {
          this.elements[i].classList.remove(classes[c]);
        }
      }
    }
    return this;
  }

  /**
   *
   * Toggles class of every element. This is using the native classList
   *     implementation.
   *
   * @param {string} classname Name of class
   * @return {this}
   */
  toggleClass(classname) {
    for (let i in this.elements) {
      this.elements[i].classList.toggle(classname);
    }
    return this;
  }

  /**
   *
   * Sets attribute to all elements and reads from the first.
   *
   * @param {string} name
   * @param {string|bool} [value] Value to set, if false the attribute will
   *     be deleted, if not specified the key will be read.
   * @return {self|string} Returns self if value is given, returns the value
   *     of the first element if value isn't given.
   */
  attribute(name, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(name);
    } else if (value === false) {
      for (let i in this.elements) {
        this.elements[i].removeAttribute(name);
      }
      return this;
    } else {
      for (let i in this.elements) {
        this.elements[i].setAttribute(name, value);
      }
      return this;
    }
  }

  /**
   *
   * Removes attribute from all elements.
   *
   * @param {string} attribute
   */
   removeAttribute(attribute) {
     for (let i in this.elements) {
       this.elements[i].removeAttribute(name);
     }
     return this;
   }

  /**
   *
   * Set CSS styles, returns the CSS property value of the first element if
   *     no value is specified.
   *
   * @param {string|Object.<string, string>} style CSS property or a key value
   *    object containing multiple style names and their values.
   * @param {string} [value]
   * @return {self|string}
   */
  css(style, value) {
    if (value || typeof style === 'object') {
      for (let i in this.elements) {
        if (typeof style === 'string') {
          this.elements[i].style[style] = value;
        } else {
          Object.keys(style).forEach((s) => {
            this.elements[i].style[s] = style[s];
          });
        }
      }
      return this;
    } else {
      return getComputedStyle(this.elements[0]).getPropertyValue(style);
    }
  }

  /**
   *
   * Width of the first element (the inner height if the first element is
   *     window).
   *
   * @return {number}
   */
  width() {
    if (this.elements[0] === window) {
      return window.innerWidth;
    }
    let d = this.elements[0].getBoundingClientRect();
    return d.width;
  }

  /**
   *
   * Height of the first element (the inner height if the first element is
   *     window).
   *
   * @return {number}
   */
  height() {
    if (this.elements[0] === window) {
      return window.innerHeight;
    }
    let d = this.elements[0].getBoundingClientRect();
    return d.height;
  }

  /**
   *
   * Returns the offset (from top left) of the first element.
   *
   * @property {number} top
   * @property {number} left
   * @return {Object}
   */
  offset() {
    if (this.elements[0] === window) {
      return {left: 0, top: 0};
    }
    let e = this.elements[0],
        left = 0,
        top = 0;

    while (e.tagName !== 'BODY') {
      left += e.offsetLeft;
      top += e.offsetTop;
      e = e.offsetParent;
    }
    return {left: left, top: top};
  }

  /**
   *
   * Sets data to all elements and reads from the first.
   *
   * @param {string} key Key to store or read from (will be automatically
   *     coverted to standards).
   * @param {string} [value] Value to set, if not specified the key will be
   *     read.
   * @return {self|string} Returns self if value is given, returns the value
   *     of the first element if value isn't given.
   */
  data(key, value) {
    key = key.replace('data-', '');
    let dataKey = key.replace(/\-([a-z]{1})/g, (match, p1) => {
      if (p1) {
        return p1.toUpperCase();
      }
      return match;
    });
    let attributeKey = key.replace(/[A-Z]/g, (match) => {
      return '-' + match.toLowerCase();
    });
    attributeKey = 'data-' + attributeKey;

    if (value) {
      for (let i in this.elements) {
        this.elements[i].dataset[dataKey] = value;
      }
      return this;
    } else {
      return this.elements[0].dataset[dataKey];
    }
  }

  /**
   *
   * Binds events
   *
   * @param {string} event Name of event.
   * @param {string} [selector] Optional CSS selector for event delegation.
   * @param {function(event: event)} callback Callback for given event, passed
   *     event as an argument.
   * @return {this}
   */
  on(event, selector, callback) {
    var [event, selector, callback] = this._parseEventArguments(arguments);

    let caller = function(id, e) {
      let event = new DorisEvent(e);
      if (!EventList[id].events[event.type]) { return; }

      let target = event.target;

      while(true) {
        if (event.propagationStopped) { break; }

        for (let i in EventList[id].events[event.type]) {
          if (event.immediatePropagationStopped) { continue; }

          let eventData = EventList[id].events[event.type][i];
          if (eventData.selector === '*' && target._doris === id ||
              eventData.selector !== '*' &&
              this._matchSelector(target, eventData.selector)) {

              eventData.callback(event);
              if (eventData.callback.one) {
                this.off(event.type, selector, eventData.callback.one, id);
              }
          }
        }

        if (target._doris === id || target.parentNode === document) { break; }
        target = target.parentNode;
      }
    };

    for (let i in this.elements) {
      let id = this.elements[i]._doris;
      if (!EventList[id]) {
        EventList[id] = {
          events: {},
          call: caller.bind(this, id),
          counts: {}
        };
      }
      if (!EventList[id].events[event]) {
        EventList[id].events[event] = [];
        EventList[id].counts[event] = 0;
      }

      EventList[id].events[event].push({
        selector: selector,
        callback: callback
      });
      EventList[id].counts[event] += 1;

      this.elements[i].addEventListener(event, EventList[id].call, false);
    }

    return this;
  }

  /**
   *
   * Binds an event that will only happen once.
   *
   * @param {string} event Name of event.
   * @param {string} [selector] Optional CSS selector for event delegation.
   * @param {function} callback Callback for given event, passed event as an
   *     argument.
   * @return {this}
   */
  once(event, selector, callback) {
    var [event, selector, callback] = this._parseEventArguments(arguments);

    let wrappedCallback = (e) => {
      callback(e);
    };
    wrappedCallback.one = callback;

    this.on(event, selector, wrappedCallback);

    return this;
  }

  /**
   * Unbind events
   * @param {string} event name of event.
   * @param {string} [selector] Optional CSS selector to match (use '*' to
   *     match everything if needed when specifying callback).
   * @param {function} [callback] Callback to unbind, if this isn't specified
   *     everything will be unbound.
   * @param {number} node Internal use only.
   * @return {this}
   */
  off(event, selector, callback, node) {
    var [event, selector, callback, node] =
          this._parseEventArguments(arguments);

    for (let i in this.elements) {
      let id = this.elements[i]._doris;
      if (node !== undefined && id !== node) { continue }

      let boundEvents = 0;

      if (EventList[id].events[event]) {
        for (let c in EventList[id].counts) {
          boundEvents += EventList[id].counts[c];
        }

        for (let e in EventList[id].events[event]) {
          let evt = EventList[id].events[event][e];

          if (!callback ||
            (evt.selector === selector &&
             (callback &&((evt.callback.one &&
                           evt.callback.one === callback) ||
            (callback === evt.callback))))) {

            delete EventList[id].events[event][e];
            --boundEvents;
          }
        }

        if (boundEvents === 0) {
          this.elements[i].removeEventListener(event,
                                               EventList[id].call, false);
          delete EventList[id].events[event];
          delete EventList[id].counts[event];
        }
      }
    }

    return this;
  }

  /**
   *
   * Fires an event
   *
   * @param {Event} event
   * @return {this}
   */
  trigger(event) {
    let e;
    if (event === 'dorisclick') {
      // From https://developer.mozilla.org/samples/domref/dispatchEvent.html
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false,
                       false, false, false, 0, null);
    } else {
      e = document.createEvent('Event');
      e.initEvent(event, true, true);
    }

    for (let i in this.elements) {
      this.elements[i].dispatchEvent(e);
    }
    return this;
  }

  /**
   *
   * Converts a string to DOM nodes.
   * @private
   * @return {Array<Node>}
   */
  _stringToDOM(string) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('body'));
    fragment.childNodes[0].innerHTML = string;
    return Array.from(fragment.childNodes[0].childNodes);
  }

  /**
   *
   * Matches a selector on an element.
   * @private
   * @return {bool}
   */
  _matchSelector(element, selector) {
    let f = Element.prototype.matches || Element.prototype.msMatchesSelector;
    if (!f) {
      return false;
    }
    return f.call(element, selector);
  }

  /**
   *
   * Argument parsing for event handling.
   * @private
   */
  _parseEventArguments(args) {
    var event = args[0],
        selector = '*',
        callback = undefined,
        node = undefined;

    if (typeof args[1] === 'function') {
      callback = args[1];
    } else if (args[3] || typeof args[2] === 'function') {
      selector = args[1];
      callback = args[2];
      node = args[3];
    }

    return [event, selector, callback, node];
  }
};
