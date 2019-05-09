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
 * This function do whole process of XMLHttpRequest.
 * @param {string} method - Method of request (POST, GET).
 * @param {string} url - Requested url.
 * @param {{data: object, resolve: function, reject: function, async: boolean}} customConfig - Configuration of request.
 * @return {XMLHttpRequest}
 * @private
 */
export const _request = (method, url, customConfig) => {
    const request = new XMLHttpRequest();
    const {data, resolve, reject, async} = {
        data: {},
        resolve: () => {},
        reject: () => {},
        async: true,
        ...customConfig
    };

	request.open(method, url, async);
	request.setRequestHeader('Content-Type', 'application/json');
	request.onerror = error => reject(error);

	if (async) {
		request.onload = () => _process(request, resolve, reject);
	}

	if (method === 'POST' && data) {
		request.send(JSON.stringify(data));
	} else {
		request.send();
	}

	if (!async) {
		_process(request, resolve, reject);
	}

	return request;
};
