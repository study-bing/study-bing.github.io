// 针对vue3vuex4.x
// 1.createStore
// 2.useStore
import { inject, reactive } from 'vue'
let storeKey = 'store'
class Store {
	constructor(options) {
		// state响应式
		this._vm = reactive(options.state)
		this._mutations = options.mutations
		this._actions = options.actions
		this.getters = {}
		// 实现store.getters.xxx
		this.handelGetters(options.getters)
		// 绑定this指向
		this.commit = this.commit.bind(this)
		this.dispatch = this.dispatch.bind(this)
	}
	// 注册
	install(app, key) {
		app.config.globalProperties.$store = this
		// vue3推荐传递方式，向下传递
		app.provide(key || storeKey, this)
	}
	get state() {
		return this._vm
	}
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
	dispatch(name, data) {
		// 获取事件
		let event = this._actions[name]
		if (!event) {
			console.log('unknown actions type')
			return
		}
		// 执行事件
		event(this, data)
	}
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
}

export function createStore(options) {
	return new Store(options)
}

export function useStore(key) {
	// 接收provide传递的数据
	return inject(key || storeKey)
}
