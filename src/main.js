// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick' // 解决300ms点击延迟
import store from '@/store/index.js'
import mixins from '@/mixins'
import '@/plugins/axios'
import VConsole from 'vconsole'
import apis from '@/apis'
import { date, validate, util, widget } from '@/utils'
import { Toast, Dialog, Button, Icon } from 'vant-green'
import 'vant-green/lib/index.less'
// import "tesla-ui/dist/index.css";

Vue.config.productionTip = false

Vue.use(Toast)
    .use(Dialog)
    .use(Button)
    .use(Icon)

Vue.use(new VConsole())
Vue.mixin(mixins)

Vue.prototype.$apis = apis
Vue.prototype.$date = date
Vue.prototype.$validate = validate
Vue.prototype.$util = util
Vue.prototype.$widget = widget
Vue.prototype.title = title => {
    document.title = title
    document.body.scrollTop = 0
}

FastClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
