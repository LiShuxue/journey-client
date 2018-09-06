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
      commit('saveTokenMutation', payload)
    },
    saveUsernameAction ({ commit }, payload) {
      commit('saveUsernameMutation', payload)
    }
  }
})
