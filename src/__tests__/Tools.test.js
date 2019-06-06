import * as Tools from '../Tools';
import * as Api from '../Api';

describe('Test of appendChildren.', () => {
	test('Function appendChildren should append 1 child.', () => {
		const parent = document.body;
		const div = document.createElement('div');

		div.id = 'child';
		Tools.appendChildren(parent, div);

		const child = document.querySelector('body #child');

		expect(!!child).toBeTruthy();
		expect(child.parentNode === parent).toBeTruthy();
	});

	test('Function appendChildren should append 2 childern.', () => {
		const parent = document.body;
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');

		div1.id = 'child1';
		div2.id = 'child2';
		Tools.appendChildren(parent, div1, div2);

		const child1 = document.querySelector('body #child1');
		const child2 = document.querySelector('body #child2');

		expect(!!child1).toBeTruthy();
		expect(!!child2).toBeTruthy();
		expect(child1.parentNode === parent).toBeTruthy();
		expect(child2.parentNode === parent).toBeTruthy();
	});

	test('Function appendChildren should return false because of undefined parent.', () => {
		const parent = undefined;
		const p = document.createElement('p');

		expect(Tools.appendChildren(parent, p)).toBeFalsy();
	});

	test('Function appendChildren should return false because of one undefined child.', () => {
		const parent = document.body;
		const p1 = document.createElement('p');
		const p2 = undefined;

		expect(Tools.appendChildren(parent, p1, p2)).toBeFalsy();
	});

	test('Function appendChildren should return false because of one undefined child.', () => {
		const parent = document.body;
		const p1 = document.createElement('p');
		const p2 = document.createElement('p');

		expect(Tools.appendChildren(parent, p1, p2)).toBeTruthy();
	});
});

describe('Test of createHTMLElement.', () => {
	test('Function createHTMLElement should create div element with id: "test" and class "testClass".', () => {
		const element = Tools.createHTMLElement('div', {
			id: 'test',
			class: ['testClass']
		});

		expect(element.nodeName).toBe('DIV');
		expect(element.id).toBe('test');
		expect(element.className).toBe('testClass');
	});

	test('Function createHTMLElement should create div element with className: "testClass class superClass".', () => {
		const element = Tools.createHTMLElement('div', {
			class: ['testClass', 'class', 'superClass']
		});

		expect(element.nodeName).toBe('DIV');
		expect(element.className).toBe('testClass class superClass');
	});

	test('Function createHTMLElement should create div element with data-id: "test".', () => {
		const element = Tools.createHTMLElement('div', {
			'innerHTML': 'test'
		});

		expect(element.innerHTML).toBe('test');
	});

	test('Function createHTMLElement should create div element with data-id: "test".', () => {
		const element = Tools.createHTMLElement('div', {
			'innerText': 'test'
		});

		expect(element.innerText).toBe('test');
	});

	test('Function createHTMLElement should create div element with data-id: "test".', () => {
		const element = Tools.createHTMLElement('div', {
			'data-id': 'test'
		});

		expect(element.getAttribute('data-id')).toBe('test');
	});

	test('Function createHTMLElement should create div element with no specs.', () => {
		const element = Tools.createHTMLElement('div');

		expect(element.nodeName).toBe('DIV');
	});
});

describe('Test of addListeners.', () => {
	test('Function addListeners should create onClick listener on div#test.', () => {
		const div = document.createElement('div');
		const eventCallback = jest.fn();

		div.id = 'test';
		Tools.addListeners('click', eventCallback, div);

		div.click();
		expect(eventCallback).toHaveBeenCalled();
	});

	test('Function addListeners should create onClick listener on div#test and div#test2.', () => {
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');
		const eventCallback = jest.fn();

		div1.id = 'test';
		div2.id = 'test2';
		Tools.addListeners('click', eventCallback, div1, div2);

		div1.click();
		div2.click();
		div2.click();
		expect(eventCallback).toHaveBeenCalledTimes(3);
	});
});

describe('Test of removeListeners.', () => {
	test('Function removeListeners should delete onClick listener which is on div.', () => {
		const div = document.createElement('div');
		const eventCallback = jest.fn();

		div.addEventListener('click', eventCallback);
		div.click();
		expect(eventCallback).toHaveBeenCalledTimes(1);
		Tools.removeListeners('click', eventCallback, div);
		div.click();
		expect(eventCallback).toHaveBeenCalledTimes(1);
	});

	test('Function removeListeners should delete onClick listener which is on div1 and div2.', () => {
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');
		const eventCallback = jest.fn();

		div1.addEventListener('click', eventCallback);
		div2.addEventListener('click', eventCallback);
		div1.click();
		div2.click();
		div2.click();
		expect(eventCallback).toHaveBeenCalledTimes(3);
		Tools.removeListeners('click', eventCallback, div1, div2);
		div1.click();
		div2.click();
		expect(eventCallback).toHaveBeenCalledTimes(3);
	});
});

describe('Test of dispatchCustomEvent.', () => {
	test('Function dispatchCustomEvent should create and dispatch testEvent event ones.', () => {
		const eventCallback = jest.fn();

		window.addEventListener('testEvent', eventCallback);
		Tools.dispatchCustomEvent('testEvent', {});

		expect(eventCallback).toHaveBeenCalledTimes(1);
	});

	test('Function dispatchCustomEvent should create and dispatch testEvent event three times.', () => {
		const eventCallback = jest.fn();

		window.addEventListener('testEvent', eventCallback);
		Tools.dispatchCustomEvent('testEvent', {});
		Tools.dispatchCustomEvent('testEvent', {});
		Tools.dispatchCustomEvent('testEvent', {});

		expect(eventCallback).toHaveBeenCalledTimes(3);
	});

	test('Function dispatchCustomEvent should create and dispatch testEvent event ones with data: {message: "test"}.', () => {
		const eventCallback = jest.fn(event => event.detail.message);

		window.addEventListener('testEvent', eventCallback);
		Tools.dispatchCustomEvent('testEvent', {message: 'test'});

		expect(eventCallback).toHaveBeenCalledTimes(1);
		expect(eventCallback).toHaveReturnedWith('test');
	});

	test('Function dispatchCustomEvent should return true after succeessfully dispatch.', () => {
		const oldWindowCustomEvent = window.CustomEvent;

		window.CustomEvent = {};
		expect(Tools.dispatchCustomEvent('testEvent', {message: 'test'})).toBeFalsy();
		window.CustomEvent = oldWindowCustomEvent;
	});

	test('Function dispatchCustomEvent should return false after unsuccessfully dispatch.', () => {
		expect(Tools.dispatchCustomEvent('testEvent', {message: 'test'})).toBeTruthy();
	});

	test('Function dispatchCustomEvent should dispatch event and eventCallback should be called ones.', () => {
		const eventCallback = jest.fn();

		window.addEventListener('testEvent', eventCallback);
		Tools.dispatchCustomEvent('testEvent');
		expect(eventCallback).toHaveBeenCalledTimes(1);
	});
});

describe('Test of nodeListToArray.', () => {
	test('Function nodeListToArray should convert NodeList from querySelector into array.', () => {
		const div = document.createElement('div');

		div.className = 'origDiv';
		document.body.appendChild(div);

		const divs = document.querySelectorAll('div.origDiv');
		const nodeArray = Tools.nodeListToArray(divs);


		expect(Array.isArray(nodeArray)).toBe(true);
		expect(nodeArray.pop()).toEqual(div);
	});
});

describe('Test of removeClass.', () => {
	test('Function removeClass should remove class: "test1" from "div.test1.test2.test3.', () => {
		const div = document.createElement('div');

		div.className = 'test1 test2 test3';
		Tools.removeClass(div, 'test1');

		expect(div.className).toBe('test2 test3');
	});

	test('Function removeClass should remove class: "test5" from "div.test1.test2.test3.', () => {
		const div = document.createElement('div');

		div.className = 'test1 test2 test3';
		Tools.removeClass(div, 'test5');

		expect(div.className).toBe('test1 test2 test3');
	});
});

describe('Test of addClass.', () => {
	test('Function addClass should add class: "test1" from "div.test2.test3.', () => {
		const div = document.createElement('div');

		div.className = 'test2 test3';
		Tools.addClass(div, 'test1');

		expect(div.className).toBe('test2 test3 test1');
	});

	test('Function addClass should add class: "test1" from "div.test1.test2.test3.', () => {
		const div = document.createElement('div');

		div.className = 'test1 test2 test3';
		Tools.addClass(div, 'test1');

		expect(div.className).toBe('test1 test2 test3');
	});
});

describe('Test of post.', () => {
	test('Post should call request.', () => {
		const spyRequest = jest.spyOn(Api, 'request');

		spyRequest.mockImplementation(() => 'test');

		expect(Tools.post('www.test.cz')).toBe('test');
		expect(spyRequest).toHaveBeenCalledWith('POST', 'www.test.cz', {});
	});
});

describe('Test of get.', () => {
	test('Get should call _request.', () => {
		const spyRequest = jest.spyOn(Api, 'request');

		spyRequest.mockImplementation(() => 'test');

		expect(Tools.get('www.test.cz')).toBe('test');
		expect(spyRequest).toHaveBeenCalledWith('GET', 'www.test.cz', {});
	});
});

describe('Test of monkeyPatch.', () => {
	test('Function monkeyPatch should return null because of undefined an object.', () => {
		expect(Tools.monkeyPatch(undefined, undefined, undefined)).toBe(null);
	});

	test('Function monkeyPatch should return null because of undefined variable of an object.', () => {
		expect(Tools.monkeyPatch({}, 'test', undefined)).toBe(null);
	});

	test('Function monkeyPatch should return null because type of variable of an object is not function.', () => {
		expect(Tools.monkeyPatch({test: 'test'}, 'test', undefined)).toBe(null);
	});

	test('Function monkeyPatch should return null because type of newImplementation is not a function.', () => {
		expect(Tools.monkeyPatch({test: () => 'test'}, 'test', undefined)).toBe(null);
	});

	test('Function monkeyPatch should return original implementation of test:b() => "test".', () => {
		window.test = () => 'test';
		const oldTest = window.test;

		expect(Tools.monkeyPatch(window, 'test', () => 'newTest')).toEqual(oldTest);
		expect(window.test()).toBe('newTest');
	});
});

describe('Test of removeAllChildren.', () => {
	test('RemoveAllChildren should remove all 2 children from parent.', () => {
		const parent = document.createElement('div');
		const child1 = document.createElement('div');
		const child2 = document.createElement('div');

		parent.appendChild(child1);
		parent.appendChild(child2);
		document.body.appendChild(parent);

		expect(parent.childElementCount).toBe(2);
		Tools.removeAllChildren(parent);
		expect(parent.childElementCount).toBe(0);
	});
});
