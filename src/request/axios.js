'use strict'

// import Vue from 'vue'
// import axios from 'axios'
import { Toast, Dialog } from 'vant-green'
import store from '@/store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: process.env.VUE_APP_API
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true // Check cross-site Access-Control 10
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
    function(config) {
        config.headers.token = store.state.user.token
        // Do something before request is sent
        console.log('请求参数-----', config)
        return config
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        console.log('返回值-----', response)
        // Do something with response data
        return new Promise((resolve, reject) => {
            if (response.data.retCode == 200) {
                resolve(response.data)
            } else {
                errorFn(response.data.retCode, response.data.retMsg)
                reject(response.data)
            }
        })
    },
    function(error) {
        // Do something with response error
        errorFn(
            error.response && error.response.status,
            error.response && error.response.message
        )
        return Promise.reject(error)
    }
)

// todo 业务异常和网络异常统一处理
export const errorFn = (code, msg) => {
    switch (code) {
        case 400:
            Toast(msg || '请求错误(400)', '提示')
            break
        case 401:
            Toast(msg || 'Token错误(401)', '提示')
            break
        case 403:
            Toast(msg || '拒绝访问(403)', '提示')
            break
        case 404:
            Toast(msg || '请求出错(404)', '提示')
            break
        case 405:
            Toast(msg || '拒绝访问(405)', '提示')
            break
        case 408:
            Toast(msg || '请求超时(408)', '提示')
            break
        case 500:
            Toast(msg || '系统网络有点小延迟，请稍等~', '提示')
            break
        case 501:
            Toast(msg || '服务未实现(501)', '提示')
            break
        case 502:
            Toast(msg || '网络错误(502)', '提示')
            break
        case 503:
            Toast(msg || '服务不可用(503)', '提示')
            break
        case 504:
            Toast(msg || '服务异常(504)', '提示')
            break
        case 550:
            Dialog.alert({
                message: msg || '未登录或者登录失效，请先登录'
            }).then(() => {
                store.commit('user/setToken', '')
                // wx && wx.closeWindow instanceof Function && wx.closeWindow()
                // AlipayJSBridge && AlipayJSBridge.call('exitApp')
            })
            break
        case 505:
            Toast(msg || 'HTTP版本不受支持(505)', '提示')
            break
        default:
            Toast(msg || '连接出错', '提示')
            break
    }
}

Plugin.install = function(Vue, options) {
    console.log(options)
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
