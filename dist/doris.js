(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doris;

var _object = _interopRequireDefault(require("./object"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  var nodesObject;

  if (nodes instanceof Node) {
    // Standard DOM node.
    nodesObject = [nodes];
  } else if (_typeof(nodes) === 'object' && nodes.elements) {
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
        nodesObject = _utils.default.stringToDOM(nodes);
      } else {
        throw new Error('Invalid Doris argument!');
      }
    }
  }

  return new _object.default(nodesObject);
}

if (typeof window !== 'undefined') {
  window.doris = doris;
} else {
  throw new Error('Doris is meant to be run in a browser!');
}

},{"./object":4,"./utils":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * DorisEvent is a minimal wrapper around DOM events for the purpose of event
 *     delegation handling inside Doris. You shouldn't really use this for
 *     anything.
 *
 * @type {DorisEvent}
 */
var DorisEvent =
/*#__PURE__*/
function () {
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
    key: "preventDefault",
    value: function preventDefault() {
      this.originalEvent.preventDefault();
      this.preventedDefault = true;
    }
    /**
     *
     * Wrapper for stopPropagation()
     */

  }, {
    key: "stopPropagation",
    value: function stopPropagation() {
      this.originalEvent.stopPropagation();
      this.propagationStopped = true;
    }
    /**
     *
     * Wrapper for stopImmediatePropagation()
     */

  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this.originalEvent.stopImmediatePropagation();
      this.immediatePropagationStopped = true;
    }
  }]);

  return DorisEvent;
}();

exports.default = DorisEvent;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 * A collection of feature detections required by Doris.
 */
var _default = {
  classListAddMultiple: function () {
    var p = document.createElement('p');
    p.classList.add('x1', 'x2');
    return p.classList.contains('x2');
  }()
};
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = _interopRequireDefault(require("./event"));

var _features = _interopRequireDefault(require("./features"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventList = {};
var elementCount = 0;
/**
 * DorisObject is (as the name suggest) a wrapper for all the functionality.
 *
 * @type {DorisObject}
 */

var DorisObject =
/*#__PURE__*/
function () {
  /**
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
  function DorisObject(nodes) {
    var _this = this;

    _classCallCheck(this, DorisObject);

    this.elements = Array.from(nodes);
    this.doris = true;
    Object.keys(this.elements).forEach(function (i) {
      if (_this.elements[i].dorisId === undefined) {
        elementCount += 1;
        _this.elements[i].dorisId = elementCount;
      }

      _this[i] = _this.elements[i];
    });
    this.length = this.elements.length;
  }
  /**
   * Returns the matched DOM element (zero based index)
   *
   * @param {number} index The index for which element should be returned.
   * @param {boolean} doris If the node should be a DorisObject or a normal Node
   * @return {(Node|DorisObject|undefined)}
   */


  _createClass(DorisObject, [{
    key: "get",
    value: function get(index) {
      var doris = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return doris ? new DorisObject([this.elements[index]]) : this.elements[index];
    }
    /**
     * For each element call callback where this is a new DorisObject of the
     *     matching element.
     *
     * @param {function(node: DorisObject, index: number)} callback
     * @return {DorisObject}
     */

  }, {
    key: "each",
    value: function each(callback) {
      var _this2 = this;

      Object.keys(this.elements).forEach(function (i) {
        callback.apply(null, [new DorisObject([_this2.elements[i]]), parseInt(i, 10)]);
      });
      return this;
    }
    /**
     * Check if the first element matches the selector.
     *
     * @param {string} selector CSS Selector
     * @return {boolean}
     */

  }, {
    key: "matches",
    value: function matches(selector) {
      return DorisObject.matchSelector(this.elements[0], selector);
    }
    /**
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
    key: "parent",
    value: function parent(selector) {
      var list = [];
      Object.values(this.elements).forEach(function (element) {
        if (selector) {
          var t = element.parentNode;
          var match = false;

          while (t && t.tagName !== 'HTML' && t.tagName !== undefined) {
            match = DorisObject.matchSelector(t, selector);

            if (match) {
              break;
            }

            t = t.parentNode;
          }

          if (match && list.indexOf(t) < 0) {
            list.push(t);
          }
        } else if (element && element.parentNode && element.parentNode.tagName !== 'HTML' && list.indexOf(element.parentNode) < 0) {
          list.push(element.parentNode);
        }
      });
      return new DorisObject(list);
    }
    /**
     * Find matching child nodes.
     *
     * @param {string} selector CSS Selector to match.
     * @return {DorisObject} The matching nodes in a DorisObject.
     */

  }, {
    key: "find",
    value: function find(selector) {
      var list = [];

      if (selector) {
        Object.values(this.elements).forEach(function (element) {
          if (!element.querySelectorAll) {
            return;
          }

          var elements = Array.from(element.querySelectorAll(selector));
          Object.keys(elements).forEach(function (e) {
            if (list.indexOf(elements[e]) === -1) {
              list.push(elements[e]);
            }
          });
        });
      }

      return new DorisObject(list);
    }
    /**
     * Prepends nodes in the DOM.
     *
     * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */

  }, {
    key: "prepend",
    value: function prepend(dom) {
      Object.values(this.elements).forEach(function (element) {
        var nodes = typeof dom === 'string' ? _utils.default.stringToDOM(dom) : [dom];
        Object.values(nodes.reverse()).forEach(function (node) {
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
     * Appends nodes in the DOM.
     *
     * @param {(DorisObject|Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */

  }, {
    key: "append",
    value: function append(dom) {
      Object.values(this.elements).forEach(function (element) {
        var nodes;

        if (typeof dom === 'string') {
          nodes = _utils.default.stringToDOM(dom);
        } else if (dom.doris === true) {
          nodes = dom.elements;
        } else {
          // Assume this is a created node
          nodes = [dom];
        }

        Object.values(nodes).forEach(function (node) {
          element.appendChild(node);
        });
      });
      return this;
    }
    /**
     * Insert DOM element(s) before the elements.
     *
     * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */

  }, {
    key: "before",
    value: function before(dom) {
      Object.values(this.elements).forEach(function (element) {
        var nodes = typeof dom === 'string' ? _utils.default.stringToDOM(dom) : [dom];
        Object.values(nodes).forEach(function (node) {
          element.parentNode.insertBefore(node, element);
        });
      });
      return this;
    }
    /**
     * Insert DOM element(s) after the elements.
     *
     * @param {(Node|string)} dom A Node or string representation of the DOM nodes to
     *     insert. If a Node is used, only a single top level element can be specified!
     * @return {DorisObject}
     */

  }, {
    key: "after",
    value: function after(dom) {
      Object.values(this.elements).forEach(function (element) {
        var nodes = typeof dom === 'string' ? _utils.default.stringToDOM(dom) : [dom];
        Object.values(nodes.reverse()).forEach(function (node) {
          if (element.nextSibling) {
            element.parentNode.insertBefore(node, element.nextSibling);
          } else {
            element.parentNode.appendChild(node);
          }
        });
      });
      return this;
    }
    /**
     * Returns the next element based on the last element in the collection
     *
     * @return {DorisObject|boolean} A DorisObject containing next node or false if there isn't one.
     */

  }, {
    key: "next",
    value: function next() {
      var empty = new DorisObject([]);

      if (this.elements.length > 0) {
        var nextSibling = this.elements[this.elements.length - 1].nextElementSibling;
        return nextSibling ? new DorisObject([nextSibling]) : empty;
      }

      return empty;
    }
    /**
     * Returns the previous element based on the first element in the collection
     *
     * @return {DorisObject|boolean} A DorisObject containing previous node or
     * false if there isn't one.
     */

  }, {
    key: "previous",
    value: function previous() {
      var empty = new DorisObject([]);

      if (this.elements.length > 0) {
        var previousSibling = this.elements[0].previousElementSibling;
        return previousSibling ? new DorisObject([previousSibling]) : empty;
      }

      return empty;
    }
    /**
     * Removes every element in elements from the DOM and removes the references.
     *
     * @return {DorisObject} A DorisObject containing the parent nodes as returned by {@link parent}
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this3 = this;

      var parent = this.parent();

      if (parent.length > 0) {
        Object.keys(this.elements).forEach(function (i) {
          _this3.elements[i].parentNode.removeChild(_this3.elements[i]);

          delete _this3.elements[i];
          delete _this3[i];
        });
        this.length = this.elements.length;
        return parent;
      }

      return new DorisObject([]);
    }
    /**
     * Replaces every element, depending on how many elements are in the collection
     *    the supplied nodes will be cloned. The elements in the original Object
     *    aren't updated, after replacing content you probably want to create a new
     *    doris object that matches on the new content.
     *
     * @param {(string|DorisObject)} replacement A string representation of the DOM you want to
     * use as the replacement or a Doris instance.
     * @return {DorisObject} A new instance with the replacement elements.
     */

  }, {
    key: "replace",
    value: function replace(replacement) {
      var _this4 = this;

      var replacementValue = replacement;

      if (typeof replacementValue === 'string') {
        replacementValue = window.doris(replacementValue);
      }

      var newCollection = [];
      var m = this.elements.length > 1;
      Object.keys(this.elements).forEach(function (e) {
        if (replacementValue.elements.length === 1) {
          var s = m ? replacementValue.elements[0].cloneNode(true) : replacementValue.elements[0];

          _this4.elements[e].parentNode.replaceChild(s, _this4.elements[e]);

          newCollection.push(s);
        } else {
          var previousNode = new DorisObject([_this4.get(e)]);
          replacementValue.each(function (n) {
            var s = m ? n.get(0).cloneNode(true) : n.get(0);
            newCollection.push(s);
            previousNode.after(s);
            previousNode = window.doris(s);
          });
          new DorisObject([_this4.get(e)]).remove();
        }
      });
      return new DorisObject(newCollection);
    }
    /**
     * Returns a new DorisObject containing a cloned copy of the previous one.
     *
     * @param {(boolean)} [deep] If the cloning should be deep or not (shallow)
     * @return {(DorisObject)}
     */

  }, {
    key: "clone",
    value: function clone(deep) {
      var elements = [];
      Object.values(this.elements).forEach(function (element) {
        elements.push(element.cloneNode(deep));
      });
      Object.keys(elements).forEach(function (i) {
        elementCount += 1;
        elements[i].dorisId = elementCount;
      });
      return new DorisObject(elements);
    }
    /**
     * Returns the HTML content of the first element or sets the innerHTML
     *    of every matched element.
     *
     * @param {(string|Node)} [html] A string representation of the DOM to use as replacement
     * or a Node representation that will to converted to markup.
     * @return {(string|DorisObject)}
     */

  }, {
    key: "html",
    value: function html(_html) {
      var _this5 = this;

      if (_html === undefined || _html === null) {
        return this.elements[0].innerHTML;
      }

      var newHTML = _html;

      if (typeof newHTML !== 'string') {
        newHTML = new DorisObject([newHTML]).toHTML();
      }

      Object.keys(this.elements).forEach(function (e) {
        _this5.elements[e].innerHTML = newHTML;
      });
      return this;
    }
    /**
     * Returns the textContent of the matching elements or sets the textContent
     *    of the first matching element.
     *
     * @param {(string|Node)} [text] Text to set in all matching elements.
     * @return {(string|DorisObject)}
     */

  }, {
    key: "text",
    value: function text(_text) {
      var _this6 = this;

      if (_text === undefined) {
        var content = '';
        Object.values(this.elements).forEach(function (element) {
          content += element.textContent;
        });
        return content;
      }

      Object.keys(this.elements).forEach(function (i) {
        _this6.elements[i].textContent = _text;
      });
      return this;
    }
    /**
     * Adds class(es) to every element. This is using the native classList
     *     implementation.
     *
     * @param {...string} classes Names of class(es)
     * @return {DorisObject}
     */

  }, {
    key: "addClass",
    value: function addClass() {
      var _this7 = this;

      for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      Object.keys(this.elements).forEach(function (key) {
        if (_features.default.classListAddMultiple) {
          var _this7$elements$key$c;

          (_this7$elements$key$c = _this7.elements[key].classList).add.apply(_this7$elements$key$c, classes);
        } else {
          Object.values(classes).forEach(function (value) {
            _this7.elements[key].classList.add(classes[value]);
          });
        }
      });
      return this;
    }
    /**
     * Removes class(es) from every element. This is using the native
     *     classList implementation.
     *
     * @param {...string} classes Names of class(es)
     * @return {DorisObject}
     */

  }, {
    key: "removeClass",
    value: function removeClass() {
      for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      Object.values(this.elements).forEach(function (element) {
        if (_features.default.classListAddMultiple) {
          var _element$classList;

          (_element$classList = element.classList).remove.apply(_element$classList, classes);
        } else {
          Object.values(classes).forEach(function (c) {
            element.classList.remove(classes[c]);
          });
        }
      });
      return this;
    }
    /**
     * Checks if class is set on the first element. This is using the native
     *     classList implementation.
     *
     * @param {string} klass Name of class
     * @return {boolean}
     */

  }, {
    key: "hasClass",
    value: function hasClass(klass) {
      if (this.elements[0]) {
        return this.elements[0].classList.contains(klass);
      }

      return false;
    }
    /**
     * Toggles class of every element. This is using the native classList
     *     implementation.
     *
     * @param {string} classname Name of class
     * @return {DorisObject}
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(classname) {
      Object.values(this.elements).forEach(function (element) {
        element.classList.toggle(classname);
      });
      return this;
    }
    /**
     * Sets attribute to all elements and reads from the first.
     *
     * @param {string} name
     * @param {(string|boolean)} [value] Value to set, if false the attribute will
     *     be deleted, if not specified the key will be read.
     * @return {(DorisObject|string)} Returns self if value is given, returns the value
     *     of the first element if value isn't given.
     */

  }, {
    key: "attribute",
    value: function attribute(name, value) {
      if (value === undefined) {
        return this.elements[0].getAttribute(name);
      }

      if (value === false) {
        Object.values(this.elements).forEach(function (element) {
          element.removeAttribute(name);
        });
        return this;
      }

      Object.values(this.elements).forEach(function (element) {
        element.setAttribute(name, value);
      });
      return this;
    }
    /**
     * Removes attribute from all elements.
     *
     * @param {string} attribute
     */

  }, {
    key: "removeAttribute",
    value: function removeAttribute(attribute) {
      Object.values(this.elements).forEach(function (element) {
        element.removeAttribute(attribute);
      });
      return this;
    }
    /**
     * Set CSS styles, returns the CSS property value of the first element if
     *     no value is specified.
     *
     * @param {(string|Object.<string, string>)} style CSS property or a key value
     *    object containing multiple style names and their values.
     * @param {string} [value]
     * @return {(DorisObject|string)}
     */

  }, {
    key: "css",
    value: function css(style, value) {
      var _this8 = this;

      if (value !== undefined && value !== null || _typeof(style) === 'object') {
        Object.keys(this.elements).forEach(function (i) {
          if (typeof style === 'string') {
            _this8.elements[i].style[style] = value;
          } else {
            Object.keys(style).forEach(function (s) {
              _this8.elements[i].style[s] = style[s];
            });
          }
        });
        return this;
      }

      return getComputedStyle(this.elements[0]).getPropertyValue(style);
    }
    /**
     * Width of the first element (the inner height if the first element is
     *     window).
     *
     * @return {number}
     */

  }, {
    key: "width",
    value: function width() {
      if (this.elements[0] === window) {
        return window.innerWidth;
      }

      var d = this.elements[0].getBoundingClientRect();
      return d.width;
    }
    /**
     * Height of the first element (the inner height if the first element is
     *     window).
     *
     * @return {number}
     */

  }, {
    key: "height",
    value: function height() {
      if (this.elements[0] === window) {
        return window.innerHeight;
      }

      var d = this.elements[0].getBoundingClientRect();
      return d.height;
    }
    /**
     * Size of the first element via getBoundingClientRect().
     *
     * @return {Object.<string, number>}
     */

  }, {
    key: "size",
    value: function size() {
      return this.elements[0].getBoundingClientRect();
    }
    /**
     * Returns the offset (from top left) of the first element.
     *
     * @property {number} top
     * @property {number} left
     * @return {Object}
     */

  }, {
    key: "offset",
    value: function offset() {
      if (this.elements[0] === window) {
        return {
          left: 0,
          top: 0
        };
      }

      var e = this.elements[0];
      var left = 0;
      var top = 0;

      while (e !== null && e.tagName !== 'BODY') {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
      }

      return {
        left: left,
        top: top
      };
    }
    /**
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
    key: "data",
    value: function data(key, value) {
      var _this9 = this;

      var keyName = key.replace('data-', '');
      var dataKey = keyName.replace(/-([a-z])/g, function (match, p1) {
        if (p1) {
          return p1.toUpperCase();
        }

        return match;
      });

      if (value) {
        Object.keys(this.elements).forEach(function (i) {
          _this9.elements[i].dataset[dataKey] = value;
        });
        return this;
      }

      return this.elements[0].dataset[dataKey];
    }
    /**
     * Binds events on elements, can match on selectors. Callback will receive a DorisEvent
     *    and the target of the bound element, not the element that triggered the event, it will
     *    be available on DorisEvent.nativeEvent.target as usual.
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

  }, {
    key: "on",
    value: function on(event) {
      var _this10 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _DorisObject$parseEve = DorisObject.parseEventArguments([event].concat(args)),
          _DorisObject$parseEve2 = _slicedToArray(_DorisObject$parseEve, 4),
          parsedEvent = _DorisObject$parseEve2[0],
          parsedSelector = _DorisObject$parseEve2[1],
          parsedCallback = _DorisObject$parseEve2[2],
          parsedOptions = _DorisObject$parseEve2[3];

      var options = parsedOptions === undefined ? false : parsedOptions;

      var caller = function caller(id, e) {
        var dorisEvent = new _event.default(e);

        if (!EventList[id].events[dorisEvent.type]) {
          return;
        }

        var parser = function parser(target) {
          if (dorisEvent.propagationStopped) {
            return;
          }

          Object.keys(EventList[id].events[dorisEvent.type]).forEach(function (i) {
            if (!dorisEvent.immediatePropagationStopped) {
              var eventData = EventList[id].events[dorisEvent.type][i];

              if (eventData.selector === '*' && target.dorisId === id || eventData.selector !== '*' && DorisObject.matchSelector(target, eventData.selector)) {
                eventData.callback.call(null, dorisEvent, new DorisObject([target]));

                if (eventData.callback.one) {
                  _this10.off(dorisEvent.type, eventData.callback.selector, eventData.callback.one, id);
                }
              }
            }
          });

          if (target.dorisId === id || target.parentNode === null) {
            return;
          }

          parser(target.parentNode);
        };

        parser(dorisEvent.target);
      };

      Object.values(this.elements).forEach(function (element) {
        var id = element.dorisId;

        if (!EventList[id]) {
          EventList[id] = {
            events: {},
            call: caller.bind(_this10, id),
            counts: {}
          };
        }

        if (!EventList[id].events[parsedEvent]) {
          EventList[id].events[parsedEvent] = [];
          EventList[id].counts[parsedEvent] = 0;
        }

        EventList[id].events[parsedEvent].push({
          selector: parsedSelector,
          callback: parsedCallback
        });
        EventList[id].counts[parsedEvent] += 1;
        element.addEventListener(parsedEvent, EventList[id].call, options);
      });
      return this;
    }
    /**
     * Binds an event that will only happen once.
     *
     * @see {@link on}
     * @param {string} event Name of event.
     * @param {...(string|function|object)} [args] Selector and Callback arguments
     * @return {DorisObject}
     */

  }, {
    key: "once",
    value: function once(event) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var _DorisObject$parseEve3 = DorisObject.parseEventArguments([event].concat(args)),
          _DorisObject$parseEve4 = _slicedToArray(_DorisObject$parseEve3, 5),
          parsedEvent = _DorisObject$parseEve4[0],
          parsedSelector = _DorisObject$parseEve4[1],
          parsedCallback = _DorisObject$parseEve4[2],
          parsedOptions = _DorisObject$parseEve4[4];

      var options = parsedOptions === undefined ? {} : parsedOptions;

      var wrappedCallback = function wrappedCallback(e, n) {
        parsedCallback.call(null, e, n);
      };

      wrappedCallback.one = parsedCallback;
      wrappedCallback.selector = parsedSelector;
      this.on(parsedEvent, parsedSelector, wrappedCallback, options);
      return this;
    }
    /**
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

  }, {
    key: "off",
    value: function off(event) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var _DorisObject$parseEve5 = DorisObject.parseEventArguments([event].concat(args)),
          _DorisObject$parseEve6 = _slicedToArray(_DorisObject$parseEve5, 5),
          parsedEvent = _DorisObject$parseEve6[0],
          parsedSelector = _DorisObject$parseEve6[1],
          parsedCallback = _DorisObject$parseEve6[2],
          parsedNode = _DorisObject$parseEve6[4];

      Object.values(this.elements).forEach(function (element) {
        var id = element.dorisId;

        if (parsedNode === undefined || id === parsedNode) {
          if (EventList[id].events[parsedEvent]) {
            var boundEvents = EventList[id].counts[parsedEvent];
            Object.keys(EventList[id].events[parsedEvent]).forEach(function (e) {
              var evt = EventList[id].events[parsedEvent][e];
              var selectorMatches = evt.selector === parsedSelector || parsedSelector === '*';
              var callbackMatches = false;

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
     * Fires an event
     *
     * @param {(string|Event)} event
     * @return {DorisObject}
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      var e;

      if (event === 'click') {
        // From https://developer.mozilla.org/samples/domref/dispatchEvent.html
        e = document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      } else {
        e = document.createEvent('Event');
        e.initEvent(event, true, true);
      }

      Object.values(this.elements).forEach(function (element) {
        return element.dispatchEvent(e);
      });
      return this;
    }
    /**
     * Returns a string representation of the elements.
     * @return {string}
     */

  }, {
    key: "toHTML",
    value: function toHTML() {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(document.createElement('body'));
      Object.values(this.elements).forEach(function (element) {
        fragment.childNodes[0].appendChild(element);
      });
      return fragment.childNodes[0].innerHTML;
    }
    /**
     * Matches a selector on an element.
     * @private
     */

  }], [{
    key: "matchSelector",
    value: function matchSelector(element, selector) {
      if (element === document) {
        return false;
      }

      var f = Element.prototype.matches || Element.prototype.msMatchesSelector;
      return f ? f.call(element, selector) : false;
    }
    /**
     * Argument parsing for event handling.
     * @private
     */

  }, {
    key: "parseEventArguments",
    value: function parseEventArguments(args) {
      var event;
      var callback;
      var selector = '*';
      var node;
      var options;

      if (typeof args[1] === 'function') {
        var _args = _slicedToArray(args, 3);

        event = _args[0];
        callback = _args[1];
        options = _args[2];
      } else if (typeof args[1] === 'string' && !args[2]) {
        var _args2 = _slicedToArray(args, 2);

        event = _args2[0];
        selector = _args2[1];
      } else if (args[3] || typeof args[2] === 'function') {
        var _args3 = _slicedToArray(args, 3);

        event = _args3[0];
        selector = _args3[1];
        callback = _args3[2];

        if (args[3] !== null && _typeof(args[3]) === 'object') {
          var _args4 = _slicedToArray(args, 5);

          event = _args4[0];
          selector = _args4[1];
          callback = _args4[2];
          options = _args4[3];
          node = _args4[4];
        } else if (typeof args[3] === 'number') {
          var _args5 = _slicedToArray(args, 4);

          event = _args5[0];
          selector = _args5[1];
          callback = _args5[2];
          node = _args5[3];
        }
      } else {
        var _args6 = _slicedToArray(args, 1);

        event = _args6[0];
      }

      selector = !selector ? '*' : selector;
      return [event, selector, callback, options, node];
    }
  }]);

  return DorisObject;
}();

exports.default = DorisObject;

},{"./event":2,"./features":3,"./utils":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 * Converts a string to DOM nodes.
 * @param {string} string A string representation of the DOM.
 * @return {Array<Node>}
 */
var _default = {
  stringToDOM: function stringToDOM(string) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('body'));
    fragment.childNodes[0].innerHTML = string;
    return Array.from(fragment.childNodes[0].childNodes);
  }
};
exports.default = _default;

},{}]},{},[1]);
