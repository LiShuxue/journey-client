// require auth api call
const publish = `api/blog/publish`

// not require auth api call
const login = `api/admin/login`
const register = `api/admin/register`

export default {
  requireAuth: {
    publish
  },
  notRequireAuth: {
    login,
    register
  }
}
