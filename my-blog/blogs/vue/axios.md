---
title: 简陋版axios
date: 2021-11-17
tags:
    - vue
categories:
    - js
---

## 1.介绍

本文简单的记录了一下 axios 的重点部分  
1.多种请求方式 axios({}) axios.get() axios.post()  
2.请求拦截器和返回拦截器  
3.取消发送请求

## 2.思路
### 1.MyAxios
初始化一个 MyAxios 类，类的原型链上给予一些方法

```js
//  构造函数
function MyAxios(config) {
	// 初始化
	this.defaults = config
	this.intercepters = {
		// 拦截器
		request: new InterceptorManager(),
		response: new InterceptorManager()
	}
}
```
### 2.createInstance
声明一个 createInstance 函数，new 一个 MyAxios 对象绑定最基础的 request 方法，就可以以 axios({})这种形式发送请求了

```js
// 实例化一个对象
let context = new MyAxios(config)
// 创建请求函数
let instance = MyAxios.prototype.request.bind(context)
```

将实例对象和 MyAxios 类原型上的方法挂在到函数对象中,就可以 axios.get()...

```js
// 将MyAxios.prototype对象中的方法添加到instance函数对象中
for (const key of Object.keys(MyAxios.prototype)) {
	instance[key] = MyAxios.prototype[key].bind(context)
}
for (const key of Object.keys(context)) {
	instance[key] = context[key]
}
```
### 3.拦截器
请求拦截器使用了栈的先进后出的思想，返回拦截器使用了队列的先进先出的思想，分别加到请求的前和后

```js
// 拦截器管理
function InterceptorManager() {
	this.handles = []
}
InterceptorManager.prototype.use = function(fulfilled, rejected) {
	this.handles.push({
		fulfilled,
		rejected
	})
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
```

函数调用时候执行拦截器和请求

```js
let promise = Promise.resolve(config)
while (chain.length) {
	promise = promise.then(chain.shift(), chain.shift())
}
```
### 4.请求
请求部分的代码就是普通的`new XMLHttpRequest()`过程

```js
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
```
### 5.取消请求
取消的过程则为，外部传入一个函数，内部的取消构造函数会创建一个 promise 一直出于 pending 状态，根据外部的函数执行，状态发生改变去执行`request.abort()`

```js
// CancelToken 构造函数
function CancelToken(executor) {
	if (typeof executor !== 'function') {
		throw new TypeError('executor must be a function.')
	}
	let resolvePromise = null
	this.promise = new Promise(resolve => {
		resolvePromise = resolve
	})
	executor(function() {
		resolvePromise()
	})
}
// 请求内部的函数
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
```

## 3.全部代码实现

<<< @/blogs/vue/myAxios.js
