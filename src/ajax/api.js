// require auth api call
const publish = `api/blog/publish`
const addCategory = `api/blog/category/add`
const uploadImage = `api/blog/uploadImage`
const removeImage = `api/blog/removeImage`

// not require auth api call
const login = `api/admin/login`
const register = `api/admin/register`
const categoryList = `api/blog/category/list`

export default {
  requireAuth: {
    publish,
    addCategory,
    uploadImage,
    removeImage
  },
  notRequireAuth: {
    login,
    register,
    categoryList
  }
}
