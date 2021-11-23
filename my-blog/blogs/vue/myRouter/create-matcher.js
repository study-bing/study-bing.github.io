import createRouteMap from './create-route-map'
import { createRoute } from './history/base'
export default function createMatcher(routes) {
	// 扁平化用户传入的数据，创建路由映射表

	// pathList : [/, /about, /about/a]
	// pathMap : {'/': xxx, '/about': xxx, '/about/a': xxx}
	let { pathList, pathMap } = createRouteMap(routes) // 初始化配置
	// 动态添加路由
	function addRoutes() {
		createRouteMap(routes, pathList, pathMap)
	}
	//用来匹配的方法
	function match(location) {
		let record = pathMap[location]
		let local = { path: location }
		// 需要找到对应的记录，并根据记录产生一个匹配数组
		if (record) {
			return createRoute(record, local)
		}
		return createRoute(null, local)
	}
	return {
		addRoutes,
		match
	}
}
