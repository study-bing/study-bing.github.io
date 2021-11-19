---
title: 简陋版vuex(vue3版)
date: 2021-11-19
tags:
    - vue
categories:
    - js
---

## 1.介绍

本文简单的记录了一下 vuex 在 vue3 中的实现原理  
1.createStore  
2.useStore  
3.state、commit、dispatch、getters

## 2.思路

### 1.Store 类

新建一个 Store 类，里面记录传入的 action、state、mutations、getters  （除了state其他与vue2差不多）
因为 state 需要实现双向绑定，所以将 state 使用了 vue3 的 reactive，并且不希望用户修改

```js
this._vm = reactive(options.state)
get state() {
    return this._vm
}
```

### 2.install

Store 类中有 install 方法让 vuex 注册，并且挂在到 vue 全局

> 与 vue2 不同，vue2 先 install 再去 new，vue3 则是 new 完后 install

```js
install(app, key) {
		app.config.globalProperties.$store = this
		// vue3推荐传递方式，向下传递
		app.provide(key || storeKey, this)
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

<<< @/blogs/vue/myVuex2.js
