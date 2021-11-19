//  构造函数
function MyAxios(config) {
	// 初始化
	this.defaults = config
	this.intercepters = {
		request: new InterceptorManager(),
		response: new InterceptorManager()
	}
}
// 原型添加方法
MyAxios.prototype.request = function (config) {
	if (config.method) {
		config.method = config.method.toLowerCase()
	} else if (this.defaults.method) {
		config.method = this.defaults.method.toLowerCase()
	} else {
		config.method = 'get'
	}
	let chain = [dispatchRequest, undefined] // undefined为填充值，当做promise的reject
	// 执行函数的前面，请求拦截器压入栈
	this.intercepters.request.handles.forEach(request => {
		chain.unshift(request.fulfilled, request.reject)
	})
	// 执行的函数后面，返回拦截器加入栈
	this.intercepters.response.handles.forEach(response => {
		chain.push(response.fulfilled, response.reject)
	})
	console.log(config)
	let promise = Promise.resolve(config)
	while (chain.length) {
		promise = promise.then(chain.shift(), chain.shift())
	}
	return promise
}
MyAxios.prototype.get = function (config) {
	return this.request({
		...config,
		method: 'get'
	})
}
MyAxios.prototype.post = function (config) {
	return this.request({
		...config,
		method: 'post'
	})
}

// 声明函数
function createInstance(config) {
	// 实例化一个对象
	let context = new MyAxios(config)
	// 创建请求函数
	let instance = MyAxios.prototype.request.bind(context)
	// 将MyAxios.prototype对象中的方法添加到instance函数对象中
	for (const key of Object.keys(MyAxios.prototype)) {
		instance[key] = MyAxios.prototype[key].bind(context)
	}
	for (const key of Object.keys(context)) {
		instance[key] = context[key]
	}
	instance.CancelToken = CancelToken
	return instance
}
// 选择适配器
function dispatchRequest(config) {
	console.log(config)
	return xhrAdapter(config)
		.then(res => {
			return res
		})
		.catch(err => {
			throw err
		})
}
// 适配器
function xhrAdapter(config) {
	return new Promise((resolve, reject) => {
		// 创建链接
		let request = new XMLHttpRequest()
		// 初始化
		request.open(config.method.toUpperCase(), config.url, true)
		// 发送
		request.send(config.data)
		// 处理结果
		request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) {
				return
			}
			if (request.status >= 200 && request.status < 300) {
				// 设置成功状态
				resolve({
					data: request.response,
					status: request.status,
					statusText: request.statusText,
					headers: request.getAllResponseHeaders(),
					config: config,
					request: request
				})
			} else {
				reject({ data: request.response })
			}
		}
		// 取消请求
		if (config.cancelToken) {
			config.cancelToken.promise.then(cancel => {
				if (!request) {
					return
				}
				request.abort()
				reject(cancel)
				request = null
			})
		}
	})
}

// 拦截器管理
function InterceptorManager() {
	this.handles = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
	this.handles.push({
		fulfilled,
		rejected
	})
}

// CancelToken 构造函数
function CancelToken(executor) {
	if (typeof executor !== 'function') {
		throw new TypeError('executor must be a function.')
	}
	let resolvePromise = null
	this.promise = new Promise(resolve => {
		resolvePromise = resolve
	})
	executor(function () {
		resolvePromise()
	})
}

let axios = createInstance()
