export default [
    {
        path: '/',
        meta: {
            name: '测试页'
        },
        component: () => import(/* webpackChunkName: "HelloWorld" */ '@/views/test.vue')
    }
]
