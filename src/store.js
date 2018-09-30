import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    refresh_token: '',
    blogList: [],
    chooseBlog: {}
  },
  getters: {
    hotBlogList: state => {
      // 基本数据类型数组深拷贝用...或者contact，如果数组内容是对象，依然是浅拷贝
      let blogList = [...state.blogList]
      blogList.sort((obj1, obj2) => {
        return obj2.see - obj1.see // 逆序从大到小。排序并不改变数组中每个对象的值，所以不会影响state中的数组。
      })
      return blogList.slice(0, 10)
    },
    tagList: state => {
      let tagList = []
      state.blogList.forEach((item) => {
        tagList = [...tagList, ...item.tags]
      })
      return [...new Set(tagList)]
    }
  },
  mutations: {
    saveAccessTokenMutation (state, token) {
      state.access_token = token
    },
    saveRefreshTokenMutation (state, token) {
      state.refresh_token = token
    },
    saveUsernameMutation (state, username) {
      state.username = username
    },
    saveBlogListMutation (state, blogList) {
      state.blogList = blogList
    },
    chooseBlog (state, blog) {
      state.chooseBlog = blog
    }
  },
  actions: {
    saveAccessTokenAction ({ commit }, payload) {
      sessionStorage.setItem('access_token', payload)
      commit('saveAccessTokenMutation', payload)
    },
    saveRefreshTokenAction ({ commit }, payload) {
      sessionStorage.setItem('refresh_token', payload)
      commit('saveRefreshTokenMutation', payload)
    },
    saveUsernameAction ({ commit }, payload) {
      sessionStorage.setItem('username', payload)
      commit('saveUsernameMutation', payload)
    }
  }
})
