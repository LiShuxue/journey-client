import Vue from 'vue';
import Vuex from 'vuex';
import { isMobile } from './utils/device';
import axios from '@/ajax/config';
import API from '@/ajax/api.js';
import sentry from '@/utils/sentry';
import handleError from '@/utils/handleError';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: isMobile,
    isMenuOpen: false,
    isDirectoryOpen: false,
    username: sessionStorage.getItem('username') || '', // sessionStorage是为了页面刷新时，重新赋值
    access_token: sessionStorage.getItem('access_token') || '',
    refresh_token: sessionStorage.getItem('refresh_token') || '',
    blogList: [],
    chooseBlog: {}
  },
  getters: {
    hotBlogList: state => {
      // 基本数据类型数组深拷贝用...或者contact，如果数组内容是对象，依然是浅拷贝
      let blogList = [...state.blogList];
      blogList.sort((obj1, obj2) => {
        return obj2.see - obj1.see; // 逆序从大到小。排序并不改变数组中每个对象的值，所以不会影响state中的数组。
      });
      return blogList.slice(0, 10);
    },
    tagList: state => {
      let tagList = [];
      state.blogList.forEach(item => {
        tagList = [...tagList, ...item.tags];
      });
      return [...new Set(tagList)];
    },
    categoryList: state => {
      let categoryList = [];
      state.blogList.forEach(item => {
        if (item.category) {
          categoryList.push(item.category);
        }
      });
      return [...new Set(categoryList)];
    },
    newBlogList: state => {
      let blogList = [...state.blogList];
      blogList.sort((obj1, obj2) => {
        return obj2.publishTime - obj1.publishTime; // 逆序从大到小
      });
      return blogList.slice(0, 10);
    }
  },
  mutations: {
    saveAccessTokenMutation(state, token) {
      state.access_token = token;
    },
    saveRefreshTokenMutation(state, token) {
      state.refresh_token = token;
    },
    saveUsernameMutation(state, username) {
      state.username = username;
    },
    saveBlogListMutation(state, blogList) {
      state.blogList = blogList;
    },
    chooseBlog(state, blog) {
      state.chooseBlog = blog;
    },
    openOrCloseMenuMutation(state, isMenuOpen) {
      state.isMenuOpen = isMenuOpen;
      if (isMenuOpen && state.isDirectoryOpen) {
        state.isDirectoryOpen = false;
      }
    },
    openOrCloseDirectoryMutation(state, isDirectoryOpen) {
      state.isDirectoryOpen = isDirectoryOpen;
      if (isDirectoryOpen && state.isMenuOpen) {
        state.isMenuOpen = false;
      }
    }
  },
  actions: {
    saveAccessTokenAction({ commit }, payload) {
      sessionStorage.setItem('access_token', payload);
      commit('saveAccessTokenMutation', payload);
    },
    saveRefreshTokenAction({ commit }, payload) {
      sessionStorage.setItem('refresh_token', payload);
      commit('saveRefreshTokenMutation', payload);
    },
    saveUsernameAction({ commit }, payload) {
      sessionStorage.setItem('username', payload);
      commit('saveUsernameMutation', payload);
    },
    chooseBlogAction({ commit }, payload) {
      sentry.addBreadcrumb('store.js --> action: chooseBlogAction');
      return new Promise((resolve, reject) => {
        axios
          .get(`${API.notRequireAuth.blogDetail}?id=${payload._id}`)
          .then(response => {
            let blog = response.data.blog;
            commit('chooseBlog', blog);
            resolve(blog);
          })
          .catch(err => {
            handleError(err);
            reject(err);
          });
      });
    }
  }
});
