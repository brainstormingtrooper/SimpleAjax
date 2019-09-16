window.ajaxPromise = (function(){

	const req = new XMLHttpRequest();
	const result = req => {
		if(req.response){
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

	return function ajaxparams({method = 'GET', url, data = null, contentType = 'application/json', header = {}, timeout = null}) {

		if (!url) {
			return Promise.reject('url is required!');
		}

		req.open(method.toUpperCase(), url, true);
		req.setRequestHeader('Content-Type', contentType);

		for(let head in header){
			req.setRequestHeader(head, header[head]);
		}
		
		req.send(JSON.stringify(data));

		return new Promise((resolve, reject) =>  {
			
			let timerAbort;
		      if (timeout) {
			timerAbort = setTimeout(() => {
			  reject();
			}, timeout);
		      }

			 const success = () => {
			if (timeout) clearTimeout(timerAbort);

			req.status < 400 && req.readyState === 4
			  ? resolve(result(req))
			  : reject(result(req));
		      };

			const error = () => (reject(result(req)));

			req.addEventListener('load', success, false);
			req.addEventListener("error", error, false);
			req.addEventListener("abort", error, false);
		});
	};
})();
