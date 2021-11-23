import install from './install'
import createMatcher from './create-matcher'
import HTML5History from './history/html5'
import HashHistory from './history/hash'

class VueRouter {
	constructor(options) {
		// 将用户传递的routes转化成好维护的结构
		// match负责匹配路径{'/': xxx, 'about': xxx, 'about/a': xxx}
		// addRoutes 动态添加路由配置
		this.matcher = createMatcher(options.routes || [])
		this.mode = options.mode || 'hash'
		switch (this.mode) {
			case 'history':
				this.history = new HTML5History(this)
				break
			case 'hash':
				this.history = new HashHistory(this)
				break
		}
	}
	// app为根实例
	init(app) {
		// 如何初始化 先根据当前路径 显示指定的组件
		const history = this.history
		const setupListeners = () => {
			history.setupListeners()
		}
		// 过渡都当前页面，监听路由变化
		history.transitionTo(history.getCurrentLocation(), setupListeners)
		history.listen(route => { // 发布订阅
			app._route = route // 更新视图
		})
	}
	match(location) {
		return this.matcher.match(location)
	}
}
VueRouter.install = install
export default VueRouter
