// require auth api call
const publishBlog = `blog/publish`
const updateBlog = `blog/update`
const deleteBlog = `blog/delete`
const addCategory = `blog/category/add`
const uploadToken = `qiniu/uploadToken`
const removeImage = `qiniu/removeImage`
const userList = `admin/list`
const deleteUser = `admin/delete`
const updateUser = `admin/update`

// not require auth api call
const login = `admin/login`
const register = `admin/register`
const categoryList = `blog/category/list`
const blogList = `blog/list`
const blogDetail = `blog/detail`
const likeBlog = `blog/like`

export default {
  requireAuth: {
    publishBlog,
    updateBlog,
    deleteBlog,
    addCategory,
    uploadToken,
    removeImage,
    userList,
    deleteUser,
    updateUser
  },
  notRequireAuth: {
    login,
    register,
    categoryList,
    blogList,
    blogDetail,
    likeBlog
  }
}
