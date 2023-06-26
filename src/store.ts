import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/ajax/config';
import API from '@/ajax/api.js';
import handleError from '@/utils/handleError';

export const useBlogStore = defineStore('blog', () => {
  const isMenuOpen = ref(false);
  const isDirectoryOpen = ref(false);
  const blogList = ref<BlogType[]>([]);
  const chooseBlog = ref<BlogType>(null!);

  const hotBlogList = computed(() => {
    const list = [...blogList.value];
    list.sort((obj1, obj2) => {
      return obj2.see - obj1.see; // 逆序从大到小。排序并不改变数组中每个对象的值，所以不会影响state中的数组。
    });
    return list.slice(0, 10);
  });

  const tagList = computed(() => {
    let tagList: string[] = [];
    blogList.value.forEach((item) => {
      tagList = [...tagList, ...item.tags];
    });
    return [...new Set(tagList)];
  });

  const categoryList = computed(() => {
    const categoryList: string[] = [];
    blogList.value.forEach((item) => {
      if (item.category) {
        categoryList.push(item.category);
      }
    });
    return [...new Set(categoryList)];
  });

  const newBlogList = computed(() => {
    const list = [...blogList.value];
    list.sort((obj1, obj2) => {
      return obj2.publishTime - obj1.publishTime; // 逆序从大到小
    });
    return list.slice(0, 10);
  });

  const saveBlogListMutation = (list: BlogType[]) => {
    blogList.value = list;
  };
  const chooseBlogMutation = (blog: BlogType) => {
    chooseBlog.value = blog;
  };
  const openOrCloseMenuMutation = (open: boolean) => {
    isMenuOpen.value = open;
    if (open && isDirectoryOpen.value) {
      isDirectoryOpen.value = false;
    }
  };
  const openOrCloseDirectoryMutation = (open: boolean) => {
    isDirectoryOpen.value = open;
    if (open && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  };

  const chooseBlogAction = (payload: BlogType) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API.blogDetail}?id=${payload._id}`)
        .then((response) => {
          const blog: BlogType = response.data.blog;
          chooseBlog.value = blog;
          resolve(blog);
        })
        .catch((err) => {
          handleError(err);
          reject(err);
        });
    });
  };

  return {
    isMenuOpen,
    isDirectoryOpen,
    blogList,
    chooseBlog,
    hotBlogList,
    tagList,
    categoryList,
    newBlogList,
    saveBlogListMutation,
    chooseBlogMutation,
    openOrCloseMenuMutation,
    openOrCloseDirectoryMutation,
    chooseBlogAction,
  };
});
