// 1.全局能用$store
// 2.能use 代表有install
let Vue
class Store {
    constructor(options) {
        // state响应式
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        })
        this.mutations = {}
        this.actions = {}
        this.getters = {}
        this.modules = new ModuleCollection(options)
        // modules中的mutations名字和跟一样，会一起执行，除非namespaced为true
        installModule(this, options.state, [], this.modules.root)
        // 绑定this指向
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    get state() {
        return this._vm._data.$$state
    }
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
}
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
const install = _Vue => {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            // if (this.$options.store) {
            // 	// 如果有store，挂在到原型上可以全局使用
            // 	Vue.prototype.$store = this.$options.store
            // }
            if (this.$options && this.$options.store) {
                // 根组件
                this.$store = this.$options.store
            } else {
                // 子组件 父->子
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
function forEach(obj, callback) {
    Object.keys(obj).forEach(item => callback(item, obj[item]))
}
export default {
    Store,
    install
}
