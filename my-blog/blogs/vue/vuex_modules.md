---
title: 简陋版vuex(vue2有modules)
date: 2021-11-22
tags:
    - vue
categories:
    - vue
---

## 1.介绍

之前有一篇文章是vuex无modules的版本，比较简单，这次添加了modules模块，大致思路是一样的，稍微有点改动。  

## 2.思路

### 1.install

首先抛出一个 install 方法让 vuex 注册，并且挂在到 vue 全局

```js
const install = _Vue => {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
            if (this.$options && this.$options.store) { // 根组件
				this.$store = this.$options.store
			} else { // 子组件 父->子
				this.$store = this.$parent && this.$parent.$store
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
>由于modules中的mutations事件名称如果有相同也会执行，所以变成了数组
从传入的 mutations 中获取到函数并执行，并传入 state

```js
commit(name, data) {
        // 获取事件
        let eventList = this.mutations[name] || []
        if (!eventList.length) {
            console.log('unknown mutation type')
            return
        }
        // 执行事件
        eventList.forEach(event => {
            event(this.state, data)
        })
    }
```
>this.commit = this.commit.bind(this)构造函数中绑定this
### 4.dispatch
>由于modules中的actions事件名称如果有相同也会执行，所以变成了数组
从传入的 actions 中获取到函数并执行，并传入 this. 因为 action 的第一个参数有着所有的东西所以为 this

```js
dispatch(name, data) {
        // 获取事件
        let eventList = this.actions[name] || []
        if (!eventList.length) {
            console.log('unknown actions type')
            return
        }
        // 执行事件
        eventList.forEach(event => {
            event(this, data)
        })
    }
```
>this.dispatch = this.dispatch.bind(this)构造函数中绑定this
### 5.modules
ModuleCollection会运用递归的方式处理modules的模块使数据变成
```js
state: {
    rootState:{

    },
    a:{
        aState:{

        },
        b:{
            bState: {}
        }
    }
}
```
```js
// 处理modules模块
class ModuleCollection {
    constructor(options) {
        this.register([], options)
    }
    // 获取到root._children => a._children => b
    register(path, rawModule) {
        let newModule = {
            _raw: rawModule, // 当前模块
            _children: {}, // 包含的模块
            state: rawModule.state // 模块的state
        }
        if (path.length === 0) {
            this.root = newModule // 根
        } else {
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            }, this.root)
            parent._children[path[path.length - 1]] = newModule
        }
        if (rawModule.modules) {
            // 有子模块
            forEach(rawModule.modules, (childName, module) => {
                this.register(path.concat(childName), module)
            })
        }
    }
}
```
### 6.installModule
处理getter、actions、mutations
```js
function installModule(store, rootState, path, rootModule) {
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((root, current) => {
            return root[current]
        }, rootState)
        // 内部的state双向绑定
        Vue.set(parent, path[path.length - 1], rootModule.state)
    }
    // rootModule: {_raw:{}, _children:{},state:{}}
    // 处理getters、mutations、actions
    if (rootModule._raw.getters) {
        forEach(rootModule._raw.getters, (getterName, getterFn) => {
            Object.defineProperty(store.getters, getterName, {
                get: () => {
                    return getterFn(rootModule.state)
                }
            })
        })
    }
    if (rootModule._raw.mutations) {
        forEach(rootModule._raw.mutations, (mutationName, mutationFn) => {
            let entry = store.mutations[mutationName] || (store.mutations[mutationName] = [])
            entry.push((...args) => {
                mutationFn.apply(store, args)
            })
        })
    }
    if (rootModule._raw.actions) {
        forEach(rootModule._raw.actions, (actionName, actionFn) => {
            let entry = store.actions[actionName] || (store.actions[actionName] = [])
            entry.push((...args) => {
                actionFn.apply(store, args)
            })
        })
    }
    forEach(rootModule._children, (childName, childModule) => {
        // 递归处理
        installModule(store, rootState, path.concat(childName), childModule)
    })
}
```
## 3.代码实现

<<< @/blogs/vue/myVuex_modules.js
