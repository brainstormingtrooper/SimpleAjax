'use strict';

window.ajaxPromise = function () {

	var req = new XMLHttpRequest();
	var result = function result(req) {
		return {
			data: JSON.parse(req.response),
			status: req.status
		};
	};

	return function ajaxparams(_ref) {
		var _ref$method = _ref.method,
		    method = _ref$method === undefined ? 'GET' : _ref$method,
		    url = _ref.url,
		    _ref$data = _ref.data,
		    data = _ref$data === undefined ? null : _ref$data,
		    _ref$header = _ref.header,
		    header = _ref$header === undefined ? {} : _ref$header;


		if (!url) {
			return Promise.reject('url is required!');
		}

		req.open(method.toUpperCase(), url, true);

		for (var head in header) {
			req.setRequestHeader(head, header[head]);
		}

		req.send(data);

		return new Promise(function (resolve, reject) {

			var success = function success() {
				return req.status < 400 && req.readyState === 4 ? resolve(result(req)) : reject(result(req));
			};

			req.addEventListener('load', success, false);
		});
	};
}();