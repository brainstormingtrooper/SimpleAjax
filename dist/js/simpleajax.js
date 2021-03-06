'use strict';

window.ajaxPromise = function () {

	var req = new XMLHttpRequest();
	var result = function result(req) {
		if (req.response) {
			return {
				data: JSON.parse(req.response),
				status: req.status
			};
		} else {
			return {
				status: req.status
			};
		}
	};

	return function ajaxparams(_ref) {
		var _ref$method = _ref.method,
		    method = _ref$method === undefined ? 'GET' : _ref$method,
		    url = _ref.url,
		    _ref$data = _ref.data,
		    data = _ref$data === undefined ? null : _ref$data,
		    _ref$contentType = _ref.contentType,
		    contentType = _ref$contentType === undefined ? 'application/json' : _ref$contentType,
		    _ref$header = _ref.header,
		    header = _ref$header === undefined ? {} : _ref$header;


		if (!url) {
			return Promise.reject('url is required!');
		}

		req.open(method.toUpperCase(), url, true);
		req.setRequestHeader('Content-Type', contentType);

		for (var head in header) {
			req.setRequestHeader(head, header[head]);
		}

		req.send(JSON.stringify(data));

		return new Promise(function (resolve, reject) {

			var success = function success() {
				return req.status < 400 && req.readyState === 4 ? resolve(result(req)) : reject(result(req));
			};

			var error = function error() {
				return reject(result(req));
			};

			req.addEventListener('load', success, false);
			req.addEventListener("error", error, false);
			req.addEventListener("abort", error, false);
		});
	};
}();