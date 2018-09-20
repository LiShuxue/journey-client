// require auth api call
const publish = `api/blog/publish`
const addCategory = `api/blog/category/add`

// not require auth api call
const login = `api/admin/login`
const register = `api/admin/register`

export default {
  requireAuth: {
    publish,
    addCategory
  },
  notRequireAuth: {
    login,
    register
  }
}
