import * as Api from '../Api';

describe('Test of process.', () => {
	const reject = jest.fn();

	afterEach(() => {
		reject.mockClear();
	});

	test('Process should call resolve function.', () => {
		const resolve = jest.fn();

		Api._process({
			status: 200,
			response: '{}'
		}, resolve, () => { });
		expect(resolve).toHaveBeenCalled();
	});

	test('Process should call reject function.', () => {
		Api._process({
			status: 200
		}, () => { }, reject);
		expect(reject).toHaveBeenCalled();
	});

	test('Process should call reject function.', () => {
		Api._process({
			status: 100,
			response: '{}'
		}, () => { }, reject);
		expect(reject).toHaveBeenCalled();
	});
});

describe('Test of request.', () => {
	const open = jest.fn();
	const send = jest.fn();
	const setRequestHeader = jest.fn();
	const reject = jest.fn();
	const resolve = jest.fn();
	const xhrMockClass = () => ({open, send, setRequestHeader});

	window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

	beforeAll(() => {
		window.oldXMLHttpRequest = window.XMLHttpRequest;
	});

	afterEach(() => {
		open.mockClear();
		send.mockClear();
		setRequestHeader.mockClear();
		reject.mockClear();
		resolve.mockClear();
	});

	test('Inside of request function should be called open function.', () => {
		Api._request('POST', 'www.seznam.cz', {}, resolve, reject, true);
		expect(open).toHaveBeenCalled();
	});

	test('Inside of request function should be called setRequestHeader function.', () => {
		Api._request('POST', 'www.seznam.cz', {}, resolve, reject, true);
		expect(setRequestHeader).toHaveBeenCalled();
	});

	test('Inside of request function should be called send function.', () => {
		Api._request('POST', 'www.seznam.cz', {}, resolve, reject, true);
		Api._request('GET', 'www.seznam.cz', {}, resolve, reject, true);
		expect(send).toHaveBeenCalledTimes(2);
	});

	test('Inside of request function should be called send function.', () => {
		Api._request('POST', 'www.seznam.cz', {}, resolve, reject, true);
		Api._request('GET', 'www.seznam.cz', {}, resolve, reject, true);
		expect(send).toHaveBeenCalledTimes(2);
	});
});
