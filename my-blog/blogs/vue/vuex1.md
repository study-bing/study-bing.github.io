---
title: 简陋版vuex(vue2版)
date: 2021-11-18
tags:
    - vue
categories:
    - js
---

## 1.介绍

本文简单的记录了一下 vuex 在 vue2 中的实现原理   
1.注册  
2.state、commit、dispatch、getters

## 2.思路

### 1.install

首先抛出一个 install 方法让 vuex 注册，并且挂在到 vue 全局

```js
const install = _Vue => {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			if (this.$options.store) {
				// 如果有store，挂在到原型上可以全局使用
				Vue.prototype.$store = this.$options.store
			}
		}
	})
}
```

### 2.Store 类

新建一个 Store 类，里面记录传入的 action、state、mutations、getters  
因为 state 需要实现双向绑定，所以将 state 传入了 Vue，并且不希望用户修改

```js
this._vm = new Vue({
	data: {
		$$state: options.state
	}
})
get state() {
		return this._vm._data.$$state
	}
```

### 3.commit

从传入的 mutations 中获取到函数并执行，并传入 state

```js
commit(name, data) {
		// 获取事件
		let event = this._mutations[name]
		if (!event) {
			console.log('unknown mutation type')
			return
		}
		// 执行事件
		event(this.state, data)
	}
```
>this.commit = this.commit.bind(this)构造函数中绑定this
### 4.dispatch

从传入的 actions 中获取到函数并执行，并传入 this. 因为 action 的第一个参数有着所有的东西所以为 this

```js
dispatch(name, data) {
		// 获取事件
		let event = this._actions[name]
		if (!event) {
			console.log('unknown mutation type')
			return
		}
		// 执行事件
		event(this.state, data)
	}
```
>this.dispatch = this.dispatch.bind(this)构造函数中绑定this
### 5.getters

getters 在 vue 中使用的时候直接以 xxx.getters.xxx 形式出现，所以内部定义 getters 为一个对象，并给予传入的方法

```js
this.getters = {} // 构造函数中
handelGetters(getters) {
		// this.getters添加options.getters的属性
		Object.keys(getters).forEach(el => {
			Object.defineProperty(this.getters, el, {
				get: () => {
					return getters[el](this.state)
				}
			})
		})
	}
```

## 3.代码实现

<<< @/blogs/vue/myVuex.js
