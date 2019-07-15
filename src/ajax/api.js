// require auth api call
const publish = `blog/publish`
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

export default {
  requireAuth: {
    publish,
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
    blogList
  }
}
