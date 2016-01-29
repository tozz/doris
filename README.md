# Doris
A small "utility framework" heavily inspired by the jQuery API (but with a much smaller subset of functionality) with the goal of supporting only modern browsers. Since the goal of Doris is to only support modern browsers everything that happens is done with native browser API's, Doris merely acts as a wrapper to provide a consistent way of accessing those API's.

Doris is built using ES6 and needs to be compiled before running in a browser. You can find a precompiled version in the ```dist``` folder, however, it's only really suitable to be used stand alone in a ```<script>``` tag, not as part of a module workflow.

## Compatibility
Compiled code should run in IE11+, Firefox, Chrome and the rest of the modern browsers. For IE11 a polyfill is required since Doris uses [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) (polyfill is available at the link).

## Documentation
The code has full documentation coverage and can be generated using [esdoc](https://esdoc.org/). It's recommended that you generate the docs to get a complete overview of the functionality Doris provides.

## Tests
Since Doris is meant to be run in a browser the testing suite is run that way, just load ```test/index.html``` in a browser.

## Examples

### Simple matching

```html
<script src="doris.min.js"></script>
```
```javascript
let pTags = doris('p');
let spans = pTags.find('span');
```

### Event handling

```javascript
let boundCallback = function(event) {
  console.log('The original event', event.originalEvent);
}
// Binding
pTags.on('click', function(event) {
  console.log('I was clicked!');
});
pTags.on('click', 'span', boundCallback);
pTags.once('click', function(event) {
  console.log('I will only trigger once.');
});
// Unbinding
pTags.off('click', 'span', boundCallback);

```
Event callbacks receive a DorisEvent which is extremely bare bones and only offers ```preventDefault()```, ```stopPropagation()``` and ```stopImmediatePropagation()```. The original Event is available on ```.originalEvent```.

### Classes, attributes and CSS

```javascript
doris('p').addClass('active').removeClass('disabled').toggleClass('toggling');
// Read an attribute (only the first matching element attribute will be returned)
let href = doris('a').attribute('href');
// Set an attribute (every element that matches will have the attribute set)
doris('a').attribute('href', 'http://google.com');
// Remove attribute by setting the value to false
doris('a').attribute('target', false);
// Simple CSS
doris('#header').css('font-size', '12px');
// Multiple styles at once
doris('#header').css({
  'font-size': '12px',
  'color': 'blue'
});
```
