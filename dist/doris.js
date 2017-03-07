(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = doris;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

/**
 *
 * Instantiates a DorisObject based on the selector input.
 *
 * @param {(string|Array|Node|NodeList|Window|document|DorisObject)} nodes A CSS selector, a
 *     DOM node, one of the root elements (window, document) or nother instance
 *     of a DorisObject (the nodes will be the same).
 * @return {DorisObject}
 */

function doris(nodes) {
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
  } else if (typeof nodes === 'string') {
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
  return new _object2['default'](nodes);
}

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}
module.exports = exports['default'];

},{"./object":4,"./utils":5}],2:[function(require,module,exports){
'use strict';

/**
 *
 * DorisEvent is a minimal wrapper around DOM events for the purpose of event
 *     delegation handling inside Doris. You shouldn't really use this for
 *     anything.
 *
 * @type {DorisEvent}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DorisEvent = (function () {
  /**
   *
   * Wraps a normal event with the purpose of assisting the event delegation
   *     in Doris.
   *
   * @param {Event} event
   */

  function DorisEvent(event) {
    _classCallCheck(this, DorisEvent);

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

  _createClass(DorisEvent, [{
    key: 'preventDefault',
    value: function preventDefault() {
      this.originalEvent.preventDefault();
      this.preventedDefault = true;
    }

    /**
     *
     * Wrapper for stopPropagation()
     */
  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {
      this.originalEvent.stopPropagation();
      this.propagationStopped = true;
    }

    /**
     *
     * Wrapper for stopImmediatePropagation()
     */
  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      this.originalEvent.stopImmediatePropagation();
      this.immediatePropagationStopped = true;
    }
  }]);

  return DorisEvent;
})();

exports['default'] = DorisEvent;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

/**
 *
 * A collection of feature detections required by Doris.
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  classListAddMultiple: (function (_) {
    var p = document.createElement('p');
    p.classList.add('x1', 'x2');
    return p.classList.contains('x2');
  })()
};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _event2 = require('./event');

var _event3 = _interopRequireDefault(_event2);

var _features = require('./features');

var _features2 = _interopRequireDefault(_features);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var EventList = {};
var elementCount = 0;

/**
 *
 * DorisObject is (as the name suggest) a wrapper for all the functionality.
 *
 * @type {DorisObject}
 */

var DorisObject = (function () {
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
   * @param {Array} nodes A list of DOM-nodes to work with.
   */

  function DorisObject(nodes) {
    _classCallCheck(this, DorisObject);

    this.elements = Array.from(nodes);
    this.doris = true;
    for (var i in this.elements) {
      if (this.elements[i]._doris === undefined) {
        this.elements[i]._doris = ++elementCount;
      }
      this[i] = this.elements[i];
    }
    this.length = this.elements.length;
  }

  /**
   *
   * Returns the matched DOM element (zero based index)
   *
   * @param {number} index The index for which element should be returned.
   * @return {(Node|undefined)}
   */

  _createClass(DorisObject, [{
    key: 'get',
    value: function get(index) {
      return this.elements[index];
    }

    /**
     *
     * For each element call callback where this is a new DorisObject of the
     *     matching element.
     *
     * @param {function(node: Node, index: number)} callback
     * @return {DorisObject}
     */
  }, {
    key: 'each',
    value: function each(callback) {
      for (var i in this.elements) {
        callback.apply(new DorisObject([this.elements[i]]), [this.elements[i], parseInt(i)]);
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
  }, {
    key: 'matches',
    value: function matches(selector) {
      return DorisObject._matchSelector(this.elements[0], selector);
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
  }, {
    key: 'parent',
    value: function parent(selector) {
      var list = [];
      for (var i in this.elements) {
        if (selector) {
          var t = this.elements[i].parentNode,
              match = false;

          while (!(match = DorisObject._matchSelector(t, selector))) {
            if (t.tagName === 'HTML') {
              break;
            }
            t = t.parentNode;
          }

          if (match && list.indexOf(t) < 0) {
            list.push(t);
          }
        } else {
          if (this.elements[i].parentNode.tagName !== 'HTML' && list.indexOf(this.elements[i].parentNode) < 0) {
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
  }, {
    key: 'find',
    value: function find(selector) {
      var list = [];
      if (selector) {
        for (var i in this.elements) {
          var elements = Array.from(this.elements[i].querySelectorAll(selector));
          for (var e in elements) {
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
     * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */
  }, {
    key: 'prepend',
    value: function prepend(dom) {
      for (var i in this.elements) {
        var nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
        for (var n in nodes.reverse()) {
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
     * @param {(DorisObject|Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */
  }, {
    key: 'append',
    value: function append(dom) {
      for (var i in this.elements) {
        var nodes = undefined;
        if (typeof dom === 'string') {
          nodes = utils.stringToDOM(dom);
        } else if (dom.doris === true) {
          nodes = dom.elements;
        } else {
          // Assume this is a created node
          nodes = [dom];
        }

        for (var n in nodes) {
          this.elements[i].appendChild(nodes[n]);
        }
      }
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
  }, {
    key: 'before',
    value: function before(dom) {
      for (var i in this.elements) {
        var nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
        for (var n in nodes) {
          this.elements[i].parentNode.insertBefore(nodes[n], this.elements[i]);
        }
      }
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
  }, {
    key: 'after',
    value: function after(dom) {
      for (var i in this.elements) {
        var nodes = typeof dom === 'string' ? utils.stringToDOM(dom) : [dom];
        for (var n in nodes.reverse()) {
          if (this.elements[i].nextSibling) {
            this.elements[i].parentNode.insertBefore(nodes[n], this.elements[i].nextSibling);
          } else {
            this.elements[i].parentNode.appendChild(nodes[n]);
          }
        }
      }
      return this;
    }

    /**
     *
     * Removes every element in elements from the DOM and removes the references.
     *
     * @return {DorisObject}
     */
  }, {
    key: 'remove',
    value: function remove() {
      for (var i in this.elements) {
        this.elements[i].parentNode.removeChild(this.elements[i]);
        delete this.elements[i];
        delete this[i];
      }
      this.length = this.elements.length;
      return this;
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
  }, {
    key: 'replace',
    value: function replace(replacement) {
      var _this = this;

      if (typeof replacement === 'string') {
        replacement = window.doris(replacement);
      }

      var newCollection = [];

      var m = this.elements.length > 1;

      for (var e in this.elements) {
        if (replacement.elements.length === 1) {
          var s = m ? replacement.elements[0].cloneNode(true) : replacement.elements[0];
          this.elements[e].parentNode.replaceChild(s, this.elements[e]);
          newCollection.push(s);
        } else {
          (function () {
            var previousNode = new DorisObject([_this.get(e)]);
            replacement.each(function (n) {
              var s = m ? n.cloneNode(true) : n;
              newCollection.push(s);
              previousNode.after(s);
              previousNode = window.doris(s);
            });
            new DorisObject([_this.get(e)]).remove();
          })();
        }
      }

      return new DorisObject(newCollection);
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
  }, {
    key: 'html',
    value: function html(_html) {
      if (_html === undefined) {
        return this.elements[0].innerHTML;
      }

      if (typeof _html !== 'string') {
        _html = doris(_html).toHTML();
      }

      for (var e in this.elements) {
        this.elements[e].innerHTML = _html;
      }

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
  }, {
    key: 'text',
    value: function text(_text) {
      if (_text === undefined) {
        var content = '';
        for (var e in this.elements) {
          content += this.elements[e].textContent;
        }
        return content;
      }

      for (var e in this.elements) {
        this.elements[e].textContent = _text;
      }

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
  }, {
    key: 'addClass',
    value: function addClass() {
      for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      for (var i in this.elements) {
        if (_features2['default'].classListAddMultiple) {
          var _elements$i$classList;

          (_elements$i$classList = this.elements[i].classList).add.apply(_elements$i$classList, classes);
        } else {
          for (var c in classes) {
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
     * @return {DorisObject}
     */
  }, {
    key: 'removeClass',
    value: function removeClass() {
      for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      for (var i in this.elements) {
        if (_features2['default'].classListAddMultiple) {
          var _elements$i$classList2;

          (_elements$i$classList2 = this.elements[i].classList).remove.apply(_elements$i$classList2, classes);
        } else {
          for (var c in classes) {
            this.elements[i].classList.remove(classes[c]);
          }
        }
      }
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
  }, {
    key: 'hasClass',
    value: function hasClass(klass) {
      return this.elements[0].classList.contains(klass);
    }

    /**
     *
     * Toggles class of every element. This is using the native classList
     *     implementation.
     *
     * @param {string} classname Name of class
     * @return {DorisObject}
     */
  }, {
    key: 'toggleClass',
    value: function toggleClass(classname) {
      for (var i in this.elements) {
        this.elements[i].classList.toggle(classname);
      }
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
  }, {
    key: 'attribute',
    value: function attribute(name, value) {
      if (value === undefined) {
        return this.elements[0].getAttribute(name);
      } else if (value === false) {
        for (var i in this.elements) {
          this.elements[i].removeAttribute(name);
        }
        return this;
      } else {
        for (var i in this.elements) {
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
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(attribute) {
      for (var i in this.elements) {
        this.elements[i].removeAttribute(attribute);
      }
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
  }, {
    key: 'css',
    value: function css(style, value) {
      var _this2 = this;

      if (value !== undefined && value !== null || typeof style === 'object') {
        var _loop = function (i) {
          if (typeof style === 'string') {
            _this2.elements[i].style[style] = value;
          } else {
            Object.keys(style).forEach(function (s) {
              _this2.elements[i].style[s] = style[s];
            });
          }
        };

        for (var i in this.elements) {
          _loop(i);
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
  }, {
    key: 'width',
    value: function width() {
      if (this.elements[0] === window) {
        return window.innerWidth;
      }
      var d = this.elements[0].getBoundingClientRect();
      return d.width;
    }

    /**
     *
     * Height of the first element (the inner height if the first element is
     *     window).
     *
     * @return {number}
     */
  }, {
    key: 'height',
    value: function height() {
      if (this.elements[0] === window) {
        return window.innerHeight;
      }
      var d = this.elements[0].getBoundingClientRect();
      return d.height;
    }

    /**
     *
     * Size of the first element via getBoundingClientRect().
     *
     * @return {Object.<string, number>}
     */
  }, {
    key: 'size',
    value: function size() {
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
  }, {
    key: 'offset',
    value: function offset() {
      if (this.elements[0] === window) {
        return { left: 0, top: 0 };
      }
      var e = this.elements[0],
          left = 0,
          top = 0;

      while (e !== null && e.tagName !== 'BODY') {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
      }
      return { left: left, top: top };
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
  }, {
    key: 'data',
    value: function data(key, value) {
      key = key.replace('data-', '');
      var dataKey = key.replace(/-([a-z])/g, function (match, p1) {
        if (p1) {
          return p1.toUpperCase();
        }
        return match;
      });

      if (value) {
        for (var i in this.elements) {
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
     * @param {function(event: DorisEvent)} callback Callback for given event.
     * @param {object} [options] Option object for addEventListener
     * @return {DorisObject}
     */
  }, {
    key: 'on',
    value: function on(event, selector, callback, options) {
      var _DorisObject$_parseEventArguments = DorisObject._parseEventArguments(arguments);

      var _DorisObject$_parseEventArguments2 = _slicedToArray(_DorisObject$_parseEventArguments, 4);

      var _event = _DorisObject$_parseEventArguments2[0];
      var _selector = _DorisObject$_parseEventArguments2[1];
      var _callback = _DorisObject$_parseEventArguments2[2];
      var _options = _DorisObject$_parseEventArguments2[3];

      _options = _options === undefined ? false : _options;
      if (typeof _options === 'object' && _options['capture'] === undefined) {
        _options['capture'] = false;
      }

      var caller = function caller(id, e) {
        var event = new _event3['default'](e);
        if (!EventList[id].events[event.type]) {
          return;
        }

        var target = event.target;

        while (true) {
          if (event.propagationStopped) {
            break;
          }

          for (var i in EventList[id].events[event.type]) {
            if (event.immediatePropagationStopped) {
              continue;
            }

            var eventData = EventList[id].events[event.type][i];
            if (eventData.selector === '*' && target._doris === id || eventData.selector !== '*' && DorisObject._matchSelector(target, eventData.selector)) {

              eventData.callback.call(new DorisObject([target]), event);
              if (eventData.callback.one) {
                this.off(event.type, eventData.callback.selector, eventData.callback.one, id);
              }
            }
          }

          if (target._doris === id || target.parentNode === null) {
            break;
          }
          target = target.parentNode;
        }
      };

      for (var i in this.elements) {
        var id = this.elements[i]._doris;
        if (!EventList[id]) {
          EventList[id] = {
            events: {},
            call: caller.bind(this, id),
            counts: {}
          };
        }
        if (!EventList[id].events[_event]) {
          EventList[id].events[_event] = [];
          EventList[id].counts[_event] = 0;
        }

        EventList[id].events[_event].push({
          selector: _selector,
          callback: _callback
        });
        EventList[id].counts[_event] += 1;

        this.elements[i].addEventListener(_event, EventList[id].call, _options);
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
     * @param {object} [options] Option object for addEventListener
     * @return {DorisObject}
     */
  }, {
    key: 'once',
    value: function once(event, selector, callback, options) {
      var _DorisObject$_parseEventArguments3 = DorisObject._parseEventArguments(arguments);

      var _DorisObject$_parseEventArguments32 = _slicedToArray(_DorisObject$_parseEventArguments3, 4);

      var _event = _DorisObject$_parseEventArguments32[0];
      var _selector = _DorisObject$_parseEventArguments32[1];
      var _callback = _DorisObject$_parseEventArguments32[2];
      var _options = _DorisObject$_parseEventArguments32[3];

      _options = _options === undefined ? {} : _options;
      if (typeof _options === 'object' && _options['capture'] === undefined) {
        _options['capture'] = false;
      }

      var wrappedCallback = function wrappedCallback(e) {
        _callback.call(this, e);
      };
      wrappedCallback.one = _callback;
      wrappedCallback.selector = _selector;

      this.on(_event, _selector, wrappedCallback);

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
     * @return {DorisObject}
     */
  }, {
    key: 'off',
    value: function off(event, selector, callback, node) {
      var _DorisObject$_parseEventArguments4 = DorisObject._parseEventArguments(arguments);

      var _DorisObject$_parseEventArguments42 = _slicedToArray(_DorisObject$_parseEventArguments4, 5);

      var _event = _DorisObject$_parseEventArguments42[0];
      var _selector = _DorisObject$_parseEventArguments42[1];
      var _callback = _DorisObject$_parseEventArguments42[2];
      var _ = _DorisObject$_parseEventArguments42[3];
      var _node = _DorisObject$_parseEventArguments42[4];

      for (var i in this.elements) {
        var id = this.elements[i]._doris;
        if (_node !== undefined && id !== _node) {
          continue;
        }

        if (EventList[id].events[_event]) {
          var boundEvents = EventList[id].counts[_event];

          for (var e in EventList[id].events[_event]) {
            var evt = EventList[id].events[_event][e];

            if (evt.selector === _selector && (!_callback || _callback && (evt.callback.one && evt.callback.one === _callback || _callback === evt.callback))) {

              delete EventList[id].events[_event][e];
              --boundEvents;
            }
          }

          if (boundEvents === 0) {
            this.elements[i].removeEventListener(_event, EventList[id].call, false);
            delete EventList[id].events[_event];
            delete EventList[id].counts[_event];
          }
        }
      }

      return this;
    }

    /**
     *
     * Fires an event
     *
     * @param {(string|Event)} event
     * @return {DorisObject}
     */
  }, {
    key: 'trigger',
    value: function trigger(event) {
      var e = undefined;
      if (event === 'click') {
        // From https://developer.mozilla.org/samples/domref/dispatchEvent.html
        e = document.createEvent("MouseEvents");
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      } else {
        e = document.createEvent('Event');
        e.initEvent(event, true, true);
      }

      for (var i in this.elements) {
        this.elements[i].dispatchEvent(e);
      }
      return this;
    }

    /**
     *
     * Returns a string representation of the elements.
     * @return {string}
     */
  }, {
    key: 'toHTML',
    value: function toHTML() {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(document.createElement('body'));
      for (var i in this.elements) {
        fragment.childNodes[0].appendChild(this.elements[i]);
      }
      return fragment.childNodes[0].innerHTML;
    }

    /**
     *
     * Matches a selector on an element.
     * @private
     */
  }], [{
    key: '_matchSelector',
    value: function _matchSelector(element, selector) {
      if (element === document) {
        return false;
      }
      var f = Element.prototype.matches || Element.prototype.msMatchesSelector;
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
  }, {
    key: '_parseEventArguments',
    value: function _parseEventArguments(args) {
      var event = args[0],
          selector = '*',
          callback = undefined,
          options = undefined,
          node = undefined;

      if (typeof args[1] === 'function') {
        callback = args[1];
        if (args[2] !== null && typeof args[2] === 'object') {
          options = args[2];
        }
      } else if (typeof args[1] === 'string' && !args[2]) {
        selector = args[1];
      } else if (args[3] || typeof args[2] === 'function') {
        selector = args[1];
        callback = args[2];
        if (args[3] !== null && typeof args[3] === 'object') {
          options = args[3];
          if (args[4] !== undefined) {
            node = args[4];
          }
        } else if (typeof args[3] === 'number') {
          node = args[3];
        }
      }

      return [event, selector, callback, options, node];
    }
  }]);

  return DorisObject;
})();

exports['default'] = DorisObject;
;
module.exports = exports['default'];

},{"./event":2,"./features":3,"./utils":5}],5:[function(require,module,exports){
'use strict';

/**
 *
 * Converts a string to DOM nodes.
 * @param {string} string A string representation of the DOM.
 * @return {Array<Node>}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stringToDOM = stringToDOM;

function stringToDOM(string) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(document.createElement('body'));
  fragment.childNodes[0].innerHTML = string;
  return Array.from(fragment.childNodes[0].childNodes);
}

},{}]},{},[1]);
