import * as Api from './Api';

/**
 * This function appends one or more HTML elements (children) to HTML element (parent).
 * @param {HTMLElement} parent - HTML parent element
 * @param {array<HTMLElement>} children - Array of HTML elements
 * @return {boolean}
 * @example
 * const parent = document.body;
 * const child1 = document.body.querySelector('.class1');
 * const child2 = document.body.querySelector('.class2');
 *
 * appendChildren(parent, child1, child2);
 */
export const appendChildren = (parent, ...children) => {
	return !parent ? false : !children.some(child => {
		if (child) {
			parent.appendChild(child);
			return false;
		}
		return true;
	});
};

/**
 * This function creates HTML element.
 * @param {string} type - Type of HTML element (div, p, a, ...)
 * @param {object} specifications - Object which contains attributes for HTML element (class, name, type, ...)
 * @return {HTMLElement}
 * @example
 * const newElement = createHTMLElement('div', {
 *     'class': ['class1', 'class2', 'class3'],
 *     'data-id': 'div0001'
 * });
 */
export const createHTMLElement = (type, specifications = {}) => {
	/** @type {HTMLElement} */
	const newElement = document.createElement(type);

	for (const attribute in specifications) {
		if (attribute === 'innerHTML' || attribute === 'innerText') {
			newElement[attribute] = specifications[attribute];
		} else if (attribute === 'class') {
			newElement.className = specifications[attribute].reduce((className, cls, index) => {
				return className += index === specifications[attribute].length - 1 ? cls : `${cls} `;
			}, '');
		} else {
			newElement.setAttribute(attribute, specifications[attribute]);
		}
	}
	return newElement;
};

/**
 * This function adds event listener on the HTML elements.
 * @param {string} event - Type of event
 * @param {function} fn - Method which handle event (callback)
 * @param {array<HTMLElement>} elements - Array of HTML elements
 * @example
 * const button1 = document.body.querySelector('.class1');
 * const button2 = document.body.querySelector('.class2');
 * const showEvent = event => {
 * 		console.log(event);
 * };
 *
 * addListeners('click', showEvent, button1, button2);
 */
export const addListeners = (event, fn, ...elements) => elements.forEach(element => element.addEventListener(event, fn));

/**
 * This function removes event listener from the HTML elements.
 * @param {string} event - Type of event
 * @param {function} fn - Method which handle event (callback)
 * @param {array<HTMLElement>} elements - Array of HTML elements
 * @example
 * const button1 = document.body.querySelector('.class1');
 * const button2 = document.body.querySelector('.class2');
 * const showEvent = event => {
 * 		console.log(event);
 * };
 *
 * addListener('click', showEvent, button1, button2);
 * removeListeners('click', showEvent, button1, button2);
 */
export const removeListeners = (event, fn, ...elements) => elements.forEach(element => element.removeEventListener(event, fn));

/**
 * This function invokes custom event.
 * @param {string} type - Name of invoked event.
 * @param {object} data - Data which will be sended to an event handler.
 * @return {boolean|Error}
 * @example
 * addListener('showSomething', e => console.log(e.detail.message), document);
 * dispatchCustomEvent('showSomething', {message: 'Hello!'});
 */
export const dispatchCustomEvent = (type, data = {}) => {
	try {
		window.dispatchEvent(new CustomEvent(type, {detail: data}));
		return true;
	} catch (error) {
		return false;
	}
};

/**
 * This function converts NodeList into an array.
 * @param {object} nodeList - Nodelist which we want to convert into an array
 * @return {array}
 * @example
 * const elements = document.querySelectorAll('p');
 * const elementsInArray = nodeListToArray(elements);
 */
export const nodeListToArray = nodeList => Array.prototype.slice.call(nodeList);

/**
 * This function removes class from the HTML element.
 * @param {HTMLElement} element - HTML element.
 * @param {string} className - Class which will be deleted.
 * @example
 * const paragraph = document.querySelector('p.paragraph--bold');
 *
 * removeClass(paragraph, 'paragraph--bold');
 */
export const removeClass = (element, className) => {
	/** @type {Array} */
	const classes = element.className.split(' ');
	/** @type {String} */
	let result = '';

	result = classes.reduce((resultClassName, cls, i) => {
		if (cls !== className) {
			return resultClassName += i === classes.length - 1 ? cls : `${cls} `;
		}
		return resultClassName;
	}, '');

	element.className = result === element.className ? element.className : result;
};

/**
 * This function adds class to an HTML element.
 * @param {HTMLElement} element - HTML element.
 * @param {string} className - Class which will be deleted.
 * @example
 * const paragraph = document.querySelector('p');
 *
 * addClass(paragraph, 'paragraph--bold');
 */
export const addClass = (element, className) => {
	/** @type {Array} */
	const classes = element.className.split(' ');

	element.className += classes.find(cls => cls === className) ? '' : ` ${className}`;
};

/**
 * This function creates and sends POST request.
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} config - Configuration of request.
 * @return {XMLHttpRequest}
 * @example
 * const config = {
 * 		data: {message: 'Hi!'},
 * 		resolve: response => console.log(response),
 * 		reject: error => console.log(error),
 * 		async: true
 * };
 *
 * const request = post('www.bachrony.com/something', config);
 */
export const post = (url, config = {}) => Api.request('POST', url, config);

/**
 * This function creates and sends GET request.
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} config - Configuration of request.
 * @return {XMLHttpRequest}
 * @example
 * const config = {
 * 		resolve: response => console.log(response),
 * 		reject: error => console.log(error),
 * 		async: true
 * };
 *
 * const request = get('www.bachrony.com/something', config);
 */
export const get = (url, config = {}) => Api.request('GET', url, config);

/**
 * This function rewrites existing variable of an object.
 * This function can rewrite only variables which are type of function.
 * @param {object} object - Object (path) to variable which will be re-setted.
 * @param {string} key - Name of variable of an object. This variable will be re-setted.
 * @param {function} newImplementation - This function will be new implementation of object[key].
 * @returns {object} original re-setted object.
 * @example
 * const object = XMLHttpRequest.prototype;
 * const key = 'open';
 * const oldOpen = monkeyPatch(object, key, function() {
 * 		console.log('I am in XMLHttpRequest.open function :-).');
 * 		if (oldOpen) {
 * 			oldOpen.apply(this, arguments);
 * 		}
 * });
 * const request = new XMLHttpRequest();
 *
 * request.open('POST', '/');
 */
export const monkeyPatch = (object, key, newImplementation) => {
	try {
		if (!object || !object[key]) {
			throw new Error(`Variable "${key}" of ${object} does not exist.`);
		}
		/** @type {function} */
		const original = object[key];

		if (typeof original !== 'function') {
			throw new TypeError(`Variable "${key}" of ${object} is not a function. It is a "${typeof original}"`);
		}
		if (typeof newImplementation !== 'function') {
			throw new TypeError(`newImplementation "${newImplementation}" is not a function. It is a "${typeof original}"`);
		}

		object[key] = newImplementation;
		return original;
	} catch (error) {
		console.warn(error);
		return null;
	}
};
