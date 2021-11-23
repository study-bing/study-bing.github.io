export default function createRouteMap(routes, oldPathList, oldPathMap) {
	// 将用户传入的数据格式化
	const pathList = oldPathList || []
	const pathMap = oldPathMap || Object.create(null)
	routes.forEach(route => {
		addRouteRecord(route, pathList, pathMap)
	})
	return {
		pathList,
		pathMap
	}
}
// 数据格式化
// pathList : [/, /about, /about/a]
// pathMap : {'/': xxx, '/about': xxx, '/about/a': xxx}
function addRouteRecord(route, pathList, pathMap, parent) {
	// 拼接父元素路径
	let path = parent ? `${parent.path}/${route.path}` : route.path
	let record = {
		path,
		component: route.component,
        parent
	}
	if (!pathMap[path]) {
		pathList.push(path)
		pathMap[path] = record
	}
	if (route.children) {
		route.children.forEach(childRoute => {
			addRouteRecord(childRoute, pathList, pathMap, route)
		})
	}
}
