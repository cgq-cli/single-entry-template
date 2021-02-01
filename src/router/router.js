// import Vue from 'vue'
// import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// Vue.use(Router)

const router = new VueRouter({
    routes
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
