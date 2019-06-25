// require auth api call
const publish = `blog/publish`
const addCategory = `blog/category/add`
const uploadToken = `qiniu/uploadToken`
const removeImage = `qiniu/removeImage`

// not require auth api call
const login = `admin/login`
const register = `admin/register`
const categoryList = `blog/category/list`
const blogList = `blog/list`
// const hotBlogList = `blog/hot`
// const tagList = `blog/tag/list`

export default {
  requireAuth: {
    publish,
    addCategory,
    uploadToken,
    removeImage
  },
  notRequireAuth: {
    login,
    register,
    categoryList,
    blogList
  }
}
