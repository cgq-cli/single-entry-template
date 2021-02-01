export default {
    namespaced: true,
    state: {
        token: ''
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        }
    },
    actions: {},
    getters: {}
}
