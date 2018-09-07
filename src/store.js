import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: ''
  },
  mutations: {
    saveTokenMutation (state, token) {
      state.token = token
    },
    saveUsernameMutation (state, username) {
      state.username = username
    }
  },
  actions: {
    saveTokenAction ({ commit }, payload) {
      sessionStorage.setItem('access_token', payload)
      commit('saveTokenMutation', payload)
    },
    saveUsernameAction ({ commit }, payload) {
      sessionStorage.setItem('username', payload)
      commit('saveUsernameMutation', payload)
    }
  }
})
