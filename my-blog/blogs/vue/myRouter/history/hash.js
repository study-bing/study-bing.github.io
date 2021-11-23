import History from './base'
// 获取#后面的值
function getHash() {
	let href = window.location.href
	const index = href.indexOf('#')
	if (index < 0) return ''
	href = href.slice(index + 1)
	return href
}
function ensureSlash() {
	if (window.location.hash) {
		return true
	}
	window.location.hash = '/'
}
export default class HashHistory extends History {
	constructor(router) {
		super(router)
		ensureSlash()
	}
	getCurrentLocation() {
		return getHash()
	}
	setupListeners() {
		// 监听hashchange事件跳转页面
		window.addEventListener('hashchange', () => {
			this.transitionTo(getHash())
		})
	}
}
