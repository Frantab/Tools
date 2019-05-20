# Tools
This project contains library of useful javascript functions. Can be used only for es6+ code.

## Install
```
npm i -D @brandund/tools
```

## Usage
#### 1) Install `@brandund/tools` in your `npm` project.
```
npm i -D @brandund/tools
```

#### 2) Import `Tools` in your code.
```javascript
import * as Tools from '@brandund/tools';
```

### 3) Use tools!
for example:
```javascript
const newElement = Tools.createWholeElement('div', {
    'class': ['class1', 'class2', 'class3'],
    'data-id': '1234'
});
```

## Documentation
Documentation taken from code.
 * [appendChilds](#appendChilds) - This function appends one or more HTML elements (childs) to HTML element (parent).
 * [createWholeElement](#createWholeElement) - This function create HTML element.
 * [addListeners](#addListeners) - This function add listener for event on the HTML element or elements.
 * [removeListeners](#removeListeners) - This function removes listener for event on the HTML element or elements.
 * [dispatchCustomEvent](#dispatchCustomEvent) - This function invokes custom event.
 * [nodeListToArray](#nodeListToArray) - This function converts NodeList into an array.
 * [removeClass](#removeClass) - This function removes class from the HTML element.
 * [addClass](#addClass) - This function adds class to an HTML element.
 * [post](#post) - This function will create and send POST request.
 * [get](#get) - This function will create and send GET request.
 * [monkeyPatch](#monkeyPatch) - This function rewrites existing variable of an object. It can rewrite only variables which are type of function.
___
## appendChilds
`appendChilds(parent, ...children)`

This function appends one or more HTML elements (childs) to HTML element (parent).
 * @param `{HTMLElement} parent` - HTML parent element
 * @param `{array<HTMLElement>} children` - Array of HTML elements
 * @return `{boolean}`

example:
```js
const parent = document.body;
const child1 = document.body.querySelector('.class1');
const child2 = document.body.querySelector('.class2');

appendChilds(parent, child1, child2);
```
___
## createWholeElement
`createWholeElement(type, specifications = {})`

This function create HTML element.
 * @param `{string} type` - Type of HTML element (div, p, a, ...)
 * @param `{object} specifications` - Object which contains attributes for HTML element (class, name, type, ...)
 * @return `{HTMLElement}`

example:
```js
const newElement = createWholeElement('div', {
    'class': ['class1', 'class2', 'class3'],
    'data-id': 'div0001'
});
```
___
## addListeners
`addListeners(event, fn, ...elements)`

This function add listener for event on the HTML element or elements.
 * @param `{string} event`- Type of event
 * @param `{function} fn` - Method which handle event (callback)
 * @param `{array<HTMLElement>} elements` - Array of HTML elements

example:
```js
const button1 = document.body.querySelector('.class1');
const button2 = document.body.querySelector('.class2');
const showEvent = event => {
	console.log(event);
};

addListeners('click', showEvent, button1, button2);
```
___
## removeListeners
`removeListeners(event, fn, ...elements)`

This function removes listener for event on the HTML element or elements.
 * @param `{string} event` - Type of event
 * @param `{function} fn` - Method which handle event (callback)
 * @param `{array<HTMLElement>} elements` - Array of HTML elements

example:
```js
const button1 = document.body.querySelector('.class1');
const button2 = document.body.querySelector('.class2');
const showEvent = event => {
 	console.log(event);
};

addListener('click', showEvent, button1, button2);
removeListeners('click', showEvent, button1, button2);
```
___
## dispatchCustomEvent
`dispatchCustomEvent(type, data = {})`

This function invokes custom event.
 * @param `{string} type` - Name of invoked event.
 * @param `{object} data` - Data which will be sended to an event handler.
 * @return `{boolean|Error}`

example:
```js
addListener('showSomething', e => console.log(e.detail.message), document);
dispatchCustomEvent('showSomething', {message: 'Hello!'});
```
___
## nodeListToArray
`nodeListToArray(array)`

This function converts NodeList into an array.
 * @param `{object} array` - Nodelist which we want to convert into an array
 * @return `{array}`

example:
```js
const elements = document.querySelectorAll('p');
const elementsInArray = nodeListToArray(elements);
```
___
## removeClass
`removeClass(element, className)`

This function removes class from the HTML element.
 * @param `{HTMLElement} element` - HTML element.
 * @param `{string} className` - Class which will be delete.

example:
```js
const paragraph = document.querySelector('p.paragraph--bold');

removeClass(paragraph, 'paragraph--bold');
```
___
## addClass
`addClass(element, className)`

This function adds class to an HTML element.
 * @param `{HTMLElement} element` - HTML element.
 * @param `{string} className` - Class which will be delete.

example:
```js
const paragraph = document.querySelector('p');

addClass(paragraph, 'paragraph--bold');
```
___
## post
`post(url, config = {})`

This function will create and send POST request.
 * @param `{string} url` - Requested url.
 * @param `{{data: object, resolve: function, reject: function, async: boolean}} config` - Configuration of request.
 * @return `{XMLHttpRequest}`

example:
```js
const config = {
	data: {message: 'Hi!'},
	resolve: response => console.log(response),
 	reject: error => console.log(error),
 	async: true
 };
 
 const request = post('www.bachrony.com/something', config);
```
___
## get
`get(url, config = {})`

This function will create and send GET request.
 * @param `{string} url` - Requested url.
 * @param `{{data: object, resolve: function, reject: function, async: boolean}} config` - Configuration of request.
 * @return `{XMLHttpRequest}`

example:
```js
const config = {
 	resolve: response => console.log(response),
 	reject: error => console.log(error),
 	async: true
};

const request = get('www.bachrony.com/something', config);
```
___
## monkeyPatch
`monkeyPatch(object, key, newImplementation)`

This function rewrites existing variable of an object. It can rewrite only variables which are type of function.
 * @param `{object} object` - Object (path) to variable which will be re-setted.
 * @param `{string} key` - Name of variable of an object. This variable will be re-setted.
 * @param `{function} newImplementation` - This function will be new implementation of object[key].
 * @returns `{object}` original re-setted object.

example:
```js
const object = XMLHttpRequest.prototype;
const key = 'open';
const oldOpen = monkeyPatch(object, key, function() {
	console.log('I am in XMLHttpRequest.open function :-).');
	if (oldOpen) {
		oldOpen.apply(this, arguments);
	}
});
const request = new XMLHttpRequest();

request.open('POST', '/');
```