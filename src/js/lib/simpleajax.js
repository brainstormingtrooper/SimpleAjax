window.ajaxPromise = (function(){

	const req = new XMLHttpRequest();
	const result = req => ({
		data: JSON.parse(req.response),
		status: req.status
	});

	return function ajaxparams({method = 'GET', url, data = null, header = {}}) {

		if (!url) {
			return Promise.reject('url is required!');
		}

		req.open(method.toUpperCase(), url, true);
		
		for(let head in header){
			req.setRequestHeader(head, header[head]);
		}
		
		req.send(data);

		return new Promise((resolve, reject) =>  {

			const success = () => (req.status < 400 && req.readyState === 4) ?
				resolve(result(req)) : reject(result(req));

			req.addEventListener('load', success, false);
		});
	};
})();
