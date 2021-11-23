let Vue
class VueRouter {
    constructor(options) {
        this.$options = options
        let initial = window.location.hash.slice(1) || '/'
        // 双向绑定current
        Vue.util.defineReactive(this, 'current', initial)
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1) || '/'
        })
    }
}
VueRouter.install = _Vue => {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            // 根实例才有
            if (this.$options && this.$options.router) {
                // 全局注册
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    // <router-link to="/"></router-link> => <a href="/"></a>
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h(
                'a',
                {
                    attrs: {
                        href: `#${this.to}`
                    }
                },
                this.$slots.default
            )
        }
    })
    Vue.component('router-view', {
        render(h) {
            let component
            // beforeCreate中注册了$router，所以可以获取到$router
            const current = this.$router.current
            const route = this.$router.$options.routes.find(route => {
                return route.path === current
            })
            if (route) {
                component = route.component
            }
            return h(component)
        }
    })
}
export default VueRouter
