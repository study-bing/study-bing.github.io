export function createRoute(record, location) {
	let res = []
	if (record) {
		while (record) {
			res.unshift(record)
			record = record.parent
		}
	}
	return {
		...location,
		matched: res // 存储组件父级 父父级等等 渲染/about/a 需要先渲染父级about 在渲染 /about/a
	}
}
export default class History {
	constructor(router) {
		// router => new VueRouter
		this.router = router
		//默认路径中有一个当前路径和一个后续更改的路径
		this.current = createRoute(null, {
			path: '/'
		})
	}
	// location跳转的路径，onComplete跳转后执行的方法
	transitionTo(location, onComplete) {
		// 当前路径获取对应的记录
		// /about/a => {path: '/about/a, matched:[about, aboutA]'}
		let route = this.router.match(location)
		// 新route覆盖掉current
		if (this.current.path === location.path && route.matched.length === this.current.matched.length) {
			return // 相同路径不跳转
		}
		this.updateRoute(route)
		onComplete && onComplete()
	}
	updateRoute(route) {
		this.current = route
		this.cb && this.cb(route) // 更新视图
	}
	listen(cb) {
		this.cb = cb
	}
}
