export default {
	name: 'RouterView',
	functional: true,
	render(h, { parent, data }) {
        // 根据自己所在的层级渲染层级的组件
		let route = parent.$route
		let matched = route.matched
		data.routerView = true
		let depth = 0
		while (parent) {
			if (parent.$vnode && parent.$vnode.data.routerView) {
				depth++
			}
			parent = parent.$parent
		}
		const record = matched[depth]
		if (!record) {
			return h()
		}
		const component = record.component
		return h(component, data)
	}
}
