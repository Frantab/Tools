/**
 * This function calls callbacks with data or error.
 * @param {XMLHttpRequest} request - request.
 * @param {function} resolve - Callback for success.
 * @param {function} reject - Callback for errors.
 * @private
 */
export const _process = (request, resolve, reject) => {
	if (request.status === 200) {
		try {
			resolve(JSON.parse(request.response));
		} catch (error) {
			reject(error);
		}
	} else {
		reject(request.status);
	}
};

/**
 * This function does whole process of XMLHttpRequest.
 * @param {string} method - Method of request (POST, GET).
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} customConfig - Configuration of request.
 * @return {XMLHttpRequest}
 * @private
 */
export const request = (method, url, customConfig) => {
	const req = new XMLHttpRequest();
	const {data, resolve, reject, async} = {
		data: {},
		resolve: () => {},
		reject: () => {},
		async: true,
		...customConfig
	};

	req.open(method, url, async);
	req.setRequestHeader('Content-Type', 'application/json');
	req.onerror = error => reject(error);

	if (async) {
		req.onload = () => process(req, resolve, reject);
	}

	if (method === 'POST' && data) {
		req.send(JSON.stringify(data));
	} else {
		req.send();
	}

	if (!async) {
		process(req, resolve, reject);
	}

	return req;
};
