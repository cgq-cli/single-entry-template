// import Vue from 'vue'
// import Router from 'vue-router'
import routes from './routes'
import { createRouterLayout } from 'vue-router-layout'
import store from '@/store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
    return import('../App.vue')
})

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: RouterLayout,
            children: routes
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('to---', to, 'from---', from)
    document.title = to.meta.name
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
