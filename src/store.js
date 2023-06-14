import Vue from 'vue';
import Vuex from 'vuex';
import { isMobile } from './utils/device';
import axios from '@/ajax/config';
import API from '@/ajax/api.js';
import handleError from '@/utils/handleError';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: isMobile,
    isMenuOpen: false,
    isDirectoryOpen: false,
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
    chooseBlogAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API.blogDetail}?id=${payload._id}`)
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
