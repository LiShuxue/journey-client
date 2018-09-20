// require auth api call
const publish = `api/blog/publish`
const addCategory = `api/blog/category/add`
const uploadImage = `api/blog/uploadImage`

// not require auth api call
const login = `api/admin/login`
const register = `api/admin/register`
const categoryList = `api/blog/category/list`

export default {
  requireAuth: {
    publish,
    addCategory,
    uploadImage
  },
  notRequireAuth: {
    login,
    register,
    categoryList
  }
}
