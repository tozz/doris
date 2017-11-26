import DorisEvent from './event';
import Features from './features';
import utils from './utils';

const EventList = {};
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
   * This class should not be instantiated manually but rather by using the
   *     doris() helper.
   *
   * @example
   * let body = doris('body') // A DorisObject with <body> as the only element.
   * @example
   * let p = doris('p') // A DorisObject with every <p>-tag in the DOM.
   *
   * @param {Array} nodes A list of DOM-nodes to work with.
   */
  constructor(nodes) {
    this.elements = Array.from(nodes);
    this.doris = true;
    Object.keys(this.elements).forEach((i) => {
      if (this.elements[i].dorisId === undefined) {
        elementCount += 1;
        this.elements[i].dorisId = elementCount;
      }
      this[i] = this.elements[i];
    });
    this.length = this.elements.length;
  }

  /**
   *
   * Returns the matched DOM element (zero based index)
   *
   * @param {number} index The index for which element should be returned.
   * @param {boolean} doris If the node should be a DorisObject or a normal Node
   * @return {(Node|DorisObject|undefined)}
   */
  get(index, doris = false) {
    return doris ? new DorisObject([this.elements[index]]) : this.elements[index];
  }

  /**
   *
   * For each element call callback where this is a new DorisObject of the
   *     matching element.
   *
   * @param {function(node: DorisObject, index: number)} callback
   * @return {DorisObject}
   */
  each(callback) {
    Object.keys(this.elements).forEach((i) => {
      callback.apply(null, [new DorisObject([this.elements[i]]), parseInt(i, 10)]);
    });
    return this;
  }

  /**
   *
   * Check if the first element matches the selector.
   *
   * @param {string} selector CSS Selector
   * @return {boolean}
   */
  matches(selector) {
    return DorisObject.matchSelector(this.elements[0], selector);
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
    const list = [];
    Object.values(this.elements).forEach((element) => {
      if (selector) {
        let t = element.parentNode;
        let match = false;

        while (t.tagName !== 'HTML' && t.tagName !== undefined) {
          match = DorisObject.matchSelector(t, selector);
          if (match) { break; }
          t = t.parentNode;
        }

        if (match && list.indexOf(t) < 0) {
          list.push(t);
        }
      } else if (element.parentNode.tagName !== 'HTML' &&
          list.indexOf(element.parentNode) < 0) {
        list.push(element.parentNode);
      }
    });
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
    const list = [];
    if (selector) {
      Object.values(this.elements).forEach((element) => {
        if (!element.querySelectorAll) {
          return;
        }
        const elements = Array.from(element.querySelectorAll(selector));
        Object.keys(elements).forEach((e) => {
          if (list.indexOf(elements[e]) === -1) {
            list.push(elements[e]);
          }
        });
      });
    }
    return new DorisObject(list);
  }

  /**
   *
   * Prepends nodes in the DOM.
   *
   * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
   *     insert. If a Node is used, only a single top level element can be specified!
   * @return {DorisObject}
   */
  prepend(dom) {
    Object.values(this.elements).forEach((element) => {
      const nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
      Object.values(nodes.reverse()).forEach((node) => {
        if (element.firstChild) {
          element.insertBefore(node, element.firstChild);
        } else {
          element.appendChild(node);
        }
      });
    });
    return this;
  }

  /**
   *
   * Appends nodes in the DOM.
   *
   * @param {(DorisObject|Node|string)} dom A Node or string representation of the DOM nodes to
   *     insert. If a Node is used, only a single top level element can be specified!
   * @return {DorisObject}
   */
  append(dom) {
    Object.values(this.elements).forEach((element) => {
      let nodes;
      if (typeof dom === 'string') {
        nodes = utils.stringToDOM(dom);
      } else if (dom.doris === true) {
        nodes = dom.elements;
      } else {
        // Assume this is a created node
        nodes = [dom];
      }

      Object.values(nodes).forEach((node) => {
        element.appendChild(node);
      });
    });
    return this;
  }

  /**
   *
   * Insert DOM element(s) before the elements.
   *
   * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
   *     insert. If a Node is used, only a single top level element can be specified!
   * @return {DorisObject}
   */
  before(dom) {
    Object.values(this.elements).forEach((element) => {
      const nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
      Object.values(nodes).forEach((node) => {
        element.parentNode.insertBefore(node, element);
      });
    });
    return this;
  }

  /**
   *
   * Insert DOM element(s) after the elements.
   *
   * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
   *     insert. If a Node is used, only a single top level element can be specified!
   * @return {DorisObject}
   */
  after(dom) {
    Object.values(this.elements).forEach((element) => {
      const nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
      Object.values(nodes.reverse()).forEach((node) => {
        if (element.nextSibling) {
          element
            .parentNode
            .insertBefore(node, element.nextSibling);
        } else {
          element.parentNode.appendChild(node);
        }
      });
    });
    return this;
  }

  /**
   *
   * Removes every element in elements from the DOM and removes the references.
   *
   * @return {DorisObject} A DorisObject containing the parent nodes as returned by {@link parent}
   */
  remove() {
    const parent = this.parent();
    Object.keys(this.elements).forEach((i) => {
      this.elements[i].parentNode.removeChild(this.elements[i]);
      delete this.elements[i];
      delete this[i];
    });
    this.length = this.elements.length;
    return parent;
  }

  /**
   *
   * Replaces every element, depending on how many elements are in the collection
   * the supplied nodes will be cloned. The elements in the original Object
   * aren't updated, after replacing content you probably want to create a new
   * doris object that matches on the new content.
   *
   * @param {(string|DorisObject)} replacement A string representation of the DOM you want to
   * use as the replacement or a Doris instance.
   * @return {DorisObject} A new instance with the replacement elements.
   */
  replace(replacement) {
    let replacementValue = replacement;
    if (typeof replacementValue === 'string') {
      replacementValue = window.doris(replacementValue);
    }

    const newCollection = [];

    const m = this.elements.length > 1;

    Object.keys(this.elements).forEach((e) => {
      if (replacementValue.elements.length === 1) {
        const s = m ? replacementValue.elements[0].cloneNode(true) : replacementValue.elements[0];
        this.elements[e].parentNode.replaceChild(s, this.elements[e]);
        newCollection.push(s);
      } else {
        let previousNode = new DorisObject([this.get(e)]);
        replacementValue.each((n) => {
          const s = m ? n.get(0).cloneNode(true) : n.get(0);
          newCollection.push(s);
          previousNode.after(s);
          previousNode = window.doris(s);
        });
        new DorisObject([this.get(e)]).remove();
      }
    });

    return new DorisObject(newCollection);
  }

  /**
   *
   * Returns a new DorisObject containing a cloned copy of the previous one.
   *
   * @param {(boolean)} [deep] If the cloning should be deep or not (shallow)
   * @return {(DorisObject)}
   */
  clone(deep) {
    const elements = [];
    Object.values(this.elements).forEach((element) => {
      elements.push(element.cloneNode(deep));
    });
    Object.keys(elements).forEach((i) => {
      elementCount += 1;
      elements[i].dorisId = elementCount;
    });
    return new DorisObject(elements);
  }

  /**
   *
   * Returns the HTML content of the first element or sets the innerHTML
   * of every matched element.
   *
   * @param {(string|Node)} [html] A string representation of the DOM to use as replacement
   * or a Node representation that will to converted to markup.
   * @return {(string|DorisObject)}
   */
  html(html) {
    if (html === undefined || html === null) {
      return this.elements[0].innerHTML;
    }

    let newHTML = html;

    if (typeof newHTML !== 'string') {
      newHTML = doris(newHTML).toHTML();
    }

    Object.keys(this.elements).forEach((e) => {
      this.elements[e].innerHTML = newHTML;
    });

    return this;
  }

  /**
   *
   * Returns the textContent of the matching elements or sets the textContent
   * of the first matching element.
   *
   * @param {(string|Node)} [text] Text to set in all matching elements.
   * @return {(string|DorisObject)}
   */
  text(text) {
    if (text === undefined) {
      let content = '';
      Object.values(this.elements).forEach((element) => {
        content += element.textContent;
      });
      return content;
    }

    Object.keys(this.elements).forEach((i) => {
      this.elements[i].textContent = text;
    });

    return this;
  }

  /**
   *
   * Adds class(es) to every element. This is using the native classList
   *     implementation.
   *
   * @param {...string} classes Names of class(es)
   * @return {DorisObject}
   */
  addClass(...classes) {
    Object.keys(this.elements).forEach((key) => {
      if (Features.classListAddMultiple) {
        this.elements[key].classList.add(...classes);
      } else {
        Object.values(classes).forEach((value) => {
          this.elements[key].classList.add(classes[value]);
        });
      }
    });
    return this;
  }

  /**
   *
   * Removes class(es) from every element. This is using the native
   *     classList implementation.
   *
   * @param {...string} classes Names of class(es)
   * @return {DorisObject}
   */
  removeClass(...classes) {
    Object.values(this.elements).forEach((element) => {
      if (Features.classListAddMultiple) {
        element.classList.remove(...classes);
      } else {
        Object.values(classes).forEach((c) => {
          element.classList.remove(classes[c]);
        });
      }
    });
    return this;
  }

  /**
   *
   * Checks if class is set on the first element. This is using the native
   *     classList implementation.
   *
   * @param {string} klass Name of class
   * @return {boolean}
   */
  hasClass(klass) {
    if (this.elements[0]) {
      return this.elements[0].classList.contains(klass);
    }
    return false;
  }

  /**
   *
   * Toggles class of every element. This is using the native classList
   *     implementation.
   *
   * @param {string} classname Name of class
   * @return {DorisObject}
   */
  toggleClass(classname) {
    Object.values(this.elements).forEach((element) => {
      element.classList.toggle(classname);
    });
    return this;
  }

  /**
   *
   * Sets attribute to all elements and reads from the first.
   *
   * @param {string} name
   * @param {(string|boolean)} [value] Value to set, if false the attribute will
   *     be deleted, if not specified the key will be read.
   * @return {(DorisObject|string)} Returns self if value is given, returns the value
   *     of the first element if value isn't given.
   */
  attribute(name, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(name);
    } else if (value === false) {
      Object.values(this.elements).forEach((element) => {
        element.removeAttribute(name);
      });
      return this;
    }

    Object.values(this.elements).forEach((element) => {
      element.setAttribute(name, value);
    });
    return this;
  }

  /**
   *
   * Removes attribute from all elements.
   *
   * @param {string} attribute
   */
  removeAttribute(attribute) {
    Object.values(this.elements).forEach((element) => {
      element.removeAttribute(attribute);
    });

    return this;
  }

  /**
   *
   * Set CSS styles, returns the CSS property value of the first element if
   *     no value is specified.
   *
   * @param {(string|Object.<string, string>)} style CSS property or a key value
   *    object containing multiple style names and their values.
   * @param {string} [value]
   * @return {(DorisObject|string)}
   */
  css(style, value) {
    if ((value !== undefined && value !== null) || typeof style === 'object') {
      Object.keys(this.elements).forEach((i) => {
        if (typeof style === 'string') {
          this.elements[i].style[style] = value;
        } else {
          Object.keys(style).forEach((s) => {
            this.elements[i].style[s] = style[s];
          });
        }
      });
      return this;
    }

    return getComputedStyle(this.elements[0]).getPropertyValue(style);
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
    const d = this.elements[0].getBoundingClientRect();
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
    const d = this.elements[0].getBoundingClientRect();
    return d.height;
  }

  /**
   *
   * Size of the first element via getBoundingClientRect().
   *
   * @return {Object.<string, number>}
   */
  size() {
    return this.elements[0].getBoundingClientRect();
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
      return { left: 0, top: 0 };
    }
    let e = this.elements[0];
    let left = 0;
    let top = 0;

    while (e !== null && e.tagName !== 'BODY') {
      left += e.offsetLeft;
      top += e.offsetTop;
      e = e.offsetParent;
    }
    return { left, top };
  }

  /**
   *
   * Sets data to all elements and reads from the first.
   *
   * @param {string} key Key to store or read from (will be automatically
   *     coverted to standards).
   * @param {string} [value] Value to set, if not specified the key will be
   *     read.
   * @return {(DorisObject|string)} Returns self if value is given, returns the value
   *     of the first element if value isn't given.
   */
  data(key, value) {
    const keyName = key.replace('data-', '');
    const dataKey = keyName.replace(/-([a-z])/g, (match, p1) => {
      if (p1) {
        return p1.toUpperCase();
      }
      return match;
    });

    if (value) {
      Object.keys(this.elements).forEach((i) => {
        this.elements[i].dataset[dataKey] = value;
      });
      return this;
    }

    return this.elements[0].dataset[dataKey];
  }

  /**
   *
   * Binds events on elements, can match on selectors. Callback will receive a DorisEvent
   * and the target of the bound element, not the element that triggered the event, it will
   * be available on DorisEvent.originalEvent.target as usual.
   *
   * @param {string} event Name of event.
   * @param {...(string|function|object)} [args] Selector, Callback and Options arguments
   * @example
   * // Bind a click event on all <div> elements
   * doris('div').on('click', (e, target) => e.preventDefault())
   * @example
   * // Bind a click event on document with a selector (delegation)
   * doris(document).on('click', '.click-element', (e, target) => {
   *   // target will be the .click-element
   * })
   * @example
   * // Bind a callback for scrolling but make it passive
   * doris(document).on('scroll', callback, { passive: true })
   * @return {DorisObject}
   */
  on(event, ...args) {
    const [parsedEvent, parsedSelector, parsedCallback, parsedOptions] =
      DorisObject.parseEventArguments([event, ...args]);
    const options = parsedOptions === undefined ? false : parsedOptions;

    const caller = (id, e) => {
      const dorisEvent = new DorisEvent(e);
      if (!EventList[id].events[dorisEvent.type]) { return; }

      const parser = (target) => {
        if (dorisEvent.propagationStopped) { return; }

        Object.keys(EventList[id].events[dorisEvent.type]).forEach((i) => {
          if (!dorisEvent.immediatePropagationStopped) {
            const eventData = EventList[id].events[dorisEvent.type][i];
            if ((eventData.selector === '*' && target.dorisId === id) ||
              (eventData.selector !== '*' &&
              DorisObject.matchSelector(target, eventData.selector))) {
              eventData.callback.call(null, dorisEvent, new DorisObject([target]));
              if (eventData.callback.one) {
                this.off(dorisEvent.type, eventData.callback.selector, eventData.callback.one, id);
              }
            }
          }
        });
        if (target.dorisId === id || target.parentNode === null) { return; }

        parser(target.parentNode);
      };

      parser(dorisEvent.target);
    };

    Object.values(this.elements).forEach((element) => {
      const id = element.dorisId;
      if (!EventList[id]) {
        EventList[id] = {
          events: {},
          call: caller.bind(this, id),
          counts: {},
        };
      }
      if (!EventList[id].events[parsedEvent]) {
        EventList[id].events[parsedEvent] = [];
        EventList[id].counts[parsedEvent] = 0;
      }

      EventList[id].events[parsedEvent].push({
        selector: parsedSelector,
        callback: parsedCallback,
      });
      EventList[id].counts[parsedEvent] += 1;

      element.addEventListener(parsedEvent, EventList[id].call, options);
    });

    return this;
  }

  /**
   *
   * Binds an event that will only happen once.
   *
   * @see {@link on}
   * @param {string} event Name of event.
   * @param {...(string|function|object)} [args] Selector and Callback arguments
   * @return {DorisObject}
   */
  once(event, ...args) {
    const [parsedEvent, parsedSelector, parsedCallback, , parsedOptions] =
      DorisObject.parseEventArguments([event, ...args]);

    const options = parsedOptions === undefined ? {} : parsedOptions;

    const wrappedCallback = function wrappedCallback(e, n) {
      parsedCallback.call(null, e, n);
    };
    wrappedCallback.one = parsedCallback;
    wrappedCallback.selector = parsedSelector;

    this.on(parsedEvent, parsedSelector, wrappedCallback, options);

    return this;
  }

  /**
   *
   * Unbind events
   *
   * @param {string} event name of event.
   * @param {...(string|function|object)} [args] Selector and Callback arguments
   * @example
   * // Removes all click events on body
   * off('click', 'body')
   * @example
   * // Removes all click events with the same callback
   * off('click', callback)
   * @example
   * // Removes all click events for li matching the callback
   * off('click', 'li', callback)
   * @return {DorisObject}
   */
  off(event, ...args) {
    const [parsedEvent, parsedSelector, parsedCallback, , parsedNode] =
          DorisObject.parseEventArguments([event, ...args]);

    Object.values(this.elements).forEach((element) => {
      const id = element.dorisId;

      if (parsedNode === undefined || id === parsedNode) {
        if (EventList[id].events[parsedEvent]) {
          let boundEvents = EventList[id].counts[parsedEvent];

          Object.keys(EventList[id].events[parsedEvent]).forEach((e) => {
            const evt = EventList[id].events[parsedEvent][e];
            const selectorMatches = evt.selector === parsedSelector || parsedSelector === '*';
            let callbackMatches = false;
            if (!parsedCallback) {
              callbackMatches = true;
            } else if (evt.callback.one && evt.callback.one === parsedCallback) {
              callbackMatches = true;
            } else if (parsedCallback === evt.callback) {
              callbackMatches = true;
            }

            if (selectorMatches && callbackMatches) {
              delete EventList[id].events[parsedEvent][e];
              EventList[id].counts[parsedEvent] -= 1;
              boundEvents -= 1;
            }
          });

          if (boundEvents === 0) {
            element.removeEventListener(parsedEvent, EventList[id].call, false);
          }
        }
      }
    });

    return this;
  }

  /**
   *
   * Fires an event
   *
   * @param {(string|Event)} event
   * @return {DorisObject}
   */
  trigger(event) {
    let e;
    if (event === 'click') {
      // From https://developer.mozilla.org/samples/domref/dispatchEvent.html
      e = document.createEvent('MouseEvents');
      e.initMouseEvent(
        'click', true, true, window, 0, 0, 0, 0, 0, false,
        false, false, false, 0, null,
      );
    } else {
      e = document.createEvent('Event');
      e.initEvent(event, true, true);
    }

    Object.values(this.elements).forEach(element => element.dispatchEvent(e));

    return this;
  }

  /**
   *
   * Returns a string representation of the elements.
   * @return {string}
   */
  toHTML() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('body'));
    Object.values(this.elements).forEach((element) => {
      fragment.childNodes[0].appendChild(element);
    });
    return fragment.childNodes[0].innerHTML;
  }

  /**
   *
   * Matches a selector on an element.
   * @private
   */
  static matchSelector(element, selector) {
    if (element === document) {
      return false;
    }
    const f = Element.prototype.matches || Element.prototype.msMatchesSelector;
    return f ? f.call(element, selector) : false;
  }

  /**
   *
   * Argument parsing for event handling.
   * @private
   */
  static parseEventArguments(args) {
    let event;
    let callback;
    let selector = '*';
    let node;
    let options;

    if (typeof args[1] === 'function') {
      [event, callback, options] = args;
    } else if (typeof args[1] === 'string' && !args[2]) {
      [event, selector] = args;
    } else if (args[3] || typeof args[2] === 'function') {
      [event, selector, callback] = args;
      if (args[3] !== null && typeof args[3] === 'object') {
        [event, selector, callback, options, node] = args;
      } else if (typeof args[3] === 'number') {
        [event, selector, callback, node] = args;
      }
    } else {
      [event] = args;
    }

    selector = !selector ? '*' : selector;

    return [event, selector, callback, options, node];
  }
}
