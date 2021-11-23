import RouterLink from './components/link'
import RouterView from './components/view'
export let Vue
export default _Vue => {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			if (this.$options && this.$options.router) {
				// 根组件
				this._routerRoot = this
				this._router = this.$options.router
				this._router.init(this)
				// 双向绑定路由变化的值, _route变化则更新视图
				Vue.util.defineReactive(this, '_route', this._router.history.current)
			} else {
				// 子组件 父->子
				this._routerRoot = this.$parent && this.$parent._routerRoot
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$router', {
		get() {
			return this._routerRoot._router
		}
	})

	Object.defineProperty(Vue.prototype, '$route', {
		get() {
			return this._routerRoot._route
		}
	})
	Vue.component('router-link', RouterLink)
	Vue.component('router-view', RouterView)
}
