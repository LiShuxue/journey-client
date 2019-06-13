// require auth api call
const publish = `api/blog/publish`
const addCategory = `api/blog/category/add`
const uploadToken = `api/qiniu/uploadToken`
const removeImage = `api/qiniu/removeImage`

// not require auth api call
const login = `api/admin/login`
const register = `api/admin/register`
const categoryList = `api/blog/category/list`
const blogList = `api/blog/list`
// const hotBlogList = `api/blog/hot`
// const tagList = `api/blog/tag/list`

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
