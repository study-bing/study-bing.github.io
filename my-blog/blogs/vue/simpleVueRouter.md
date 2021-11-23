---
title: 简陋版vue-router
date: 2021-11-23
tags:
    - vue
categories:
    - vue
---

## 1.介绍

本文简单的记录了一下 vue-router 在 vue2 中的实现原理  
1.注册  
2.hash 状态下的单层路由切换

## 2.思路

### 1.install

首先 VueRouter 挂一个 install 方法让 vue-router 注册，并且挂在到 vue 全局  
注册 router-link 和 router-view 组件

```js
VueRouter.install = _Vue => {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			// 根实例才有
			if (this.$options && this.$options.router) {
				// 全局注册
				Vue.prototype.$router = this.$options.router
			}
		}
	})
	// <router-link to="/"></router-link> => <a href="/"></a>
	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				required: true
			}
		},
		render(h) {
			return h(
				'a',
				{
					attrs: {
						href: `#${this.to}`
					}
				},
				this.$slots.default
			)
		}
	})
	Vue.component('router-view', {
		render(h) {
			let component
			// beforeCreate中注册了$router，所以可以获取到$router
			const current = this.$router.current
			const route = this.$router.$options.routes.find(route => {
				return route.path === current
			})
			if (route) {
				component = route.component
			}
			return h(component)
		}
	})
}
```

### 2.VueRouter 类

新建一个 VueRouter 类，里面记录传入值，和双向绑定路由变化的值，并监听hash值的变化

```js
class VueRouter {
	constructor(options) {
		this.$options = options
		let initial = window.location.hash.slice(1) || '/'
		// 双向绑定current
		Vue.util.defineReactive(this, 'current', initial)
		window.addEventListener('hashchange', () => {
			this.current = window.location.hash.slice(1) || '/'
		})
	}
}
```

## 3.代码实现

<<< @/blogs/vue/simpleRouter.js
