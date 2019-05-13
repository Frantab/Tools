import * as Api from './Api';

/**
 * This function appends one or more HTML elements (childs) to HTML element (parent).
 * @param {HTMLElement} parent - HTML parent element
 * @param {array<HTMLElement>} childs - Array of HTML elements
 * @example
 * const parent = document.body;
 * const child1 = document.body.querySelector('.class1');
 * const child2 = document.body.querySelector('.class2');
 *
 * appendChilds(parent, child1, child2);
 */
export const appendChilds = (parent, ...childs) => {
	return !parent ? false : !childs.some(child => {
		if (child) {
			parent.appendChild(child);
			return false;
		}
		return true;
	});
};

/**
 * This function create HTML element.
 * @param {string} type - Type of HTML element (div, p, a, ...)
 * @param {object} specifications - Object which contains attributes for HTML element (class, name, type, ...)
 * @return {HTMLElement}
 * @example
 * const newElement = createWholeElement('div', {
 *     'class': ['class1', 'class2', 'class3'],
 *     'data-id': 'div0001'
 * });
 */
export const createWholeElement = (type, specifications = {}) => {
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
 * This function add listener for event on the HTML element or elements.
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
 * This function removes listener for event on the HTML element or elements.
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
 * @param {object} array - Nodelist which we want to convert into an array
 * @return {array}
 * @example
 * const elements = document.querySelectorAll('p');
 * const elementsInArray = nodeListToArray(elements);
 */
export const nodeListToArray = (array) => Array.prototype.slice.call(array);

/**
 * This function removes class from the HTML element.
 * @param {HTMLElement} element - HTML element.
 * @param {string} className - Class which will be delete.
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
 * @param {string} className - Class which will be delete.
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
 * This function will create and send POST request.
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} config - Configuration of request.
 * @example
 * const config = {
 * 		data: {message: 'Hi!'},
 * 		resolve: response => console.log(response),
 * 		reject: error => console.log(error),
 * 		async: true
 * };
 *
 * const request = get('www.bachrony.com/something', config);
 * @return {XMLHttpRequest}
 */
export const post = (url, config = {}) => Api.request('POST', url, config);

/**
 * This function will create and send GET request.
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} config - Configuration of request.
 * @example
 * const config = {
 * 		resolve: response => console.log(response),
 * 		reject: error => console.log(error),
 * 		async: true
 * };
 *
 * const request = get('www.bachrony.com/something', config);
 * @return {XMLHttpRequest}
 */
export const get = (url, config = {}) => Api.request('GET', url, config);
