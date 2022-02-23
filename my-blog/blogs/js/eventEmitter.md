---
title: 发布订阅模式
date: 2021-12-20
tags:
 - js基础
categories:
 - js
---
## 1.发布订阅模式
实现一个发布订阅模式拥有on emit off方法
## 2.代码
``` js
class EventEmitter {
	constructor() {
		this.eventMap = {}
	}
	on(name, fn) {
		if (this.eventMap[name]) {
			this.eventMap[name].push(fn)
		} else {
			this.eventMap[name] = [fn]
		}
	}
	off(name, fn) {
		if (this.eventMap[name]) {
			if (fn) {
				let findIndex = this.eventMap[name].findIndex(el => {
					return el === fn
				})
				findIndex > -1 && this.eventMap[name].splice(findIndex, 1)
			} else {
				this.eventMap[name] = []
			}
		}
	}
	emit(name, ...args) {
		if (this.eventMap[name]) {
			this.eventMap[name].forEach(fn => {
				fn(...args)
			})
		}
	}
}
let bbb = function () {
	console.log('bbb')
}
let eventEmitter = new EventEmitter()
eventEmitter.on('aaa', function () {
	console.log('aaa')
})
eventEmitter.on('aaa', bbb)
eventEmitter.on('ccc', function () {
	console.log('ccc')
})
// eventEmitter.emit('aaa')
eventEmitter.off('aaa')
eventEmitter.emit('aaa')

```