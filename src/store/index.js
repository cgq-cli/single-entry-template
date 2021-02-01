// import Vue from 'vue'
// import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Vue.use(Vuex)

const storeModules = require.context('./modules', false, /\.js$/)

let obj = {}

// modules自动注册到store中
storeModules.keys().forEach(currentPath => {
    let str = currentPath.match(/\/(\S*)\.js/)[1]
    obj = {
        ...obj,
        [str]: storeModules(currentPath).default
    }
})

export default new Vuex.Store({
    modules: {
        ...obj
    },
    plugins: [
        createPersistedState({
            storage: localStorage, // vuex的部分数据持久化到localStorage中
            reducer: val => {
                // 需要持久化的数据
                return {
                    user: {
                        token: val.user.token
                    }
                }
            }
        })
    ]
})
