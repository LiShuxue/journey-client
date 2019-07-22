<template>
  <div class="user">
    <!-- 列表 -->
    <el-table :data="tableData" stripe border style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="_id" label="ID" width="300" align="center"></el-table-column>
      <el-table-column prop="username" label="username" width="200" align="center"></el-table-column>
      <el-table-column prop="password" label="password" width="600" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="clickEditItem(scope.row, scope.$index)">编辑</el-button>
        <el-button size="mini" type="danger" @click="clickDeleteItem(scope.row, scope.$index)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 工具栏 -->
    <div class="tool-bar">
      <div>
        <el-button @click="showAddForm">新增管理员</el-button>
        <el-button type="danger" :disabled="this.selectRows.length===0" @click="clickDeleteAll">批量删除</el-button>
      </div>
      
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalItem"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 新增页面 -->
    <el-dialog title="新增管理员" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="username" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddForm">取 消</el-button>
        <el-button type="primary" @click="clickAddUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑页面 -->
    <el-dialog title="编辑管理员" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="username" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditForm">取 消</el-button>
        <el-button type="primary" @click="clickEditUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/ajax/api.js'
import SHA256 from 'crypto-js/sha256'

export default {
  data() {
    return {
      // 表单模板
      formTemplate: {
        username: '',
        password: ''
      },

      // 编辑页面表单信息
      editForm: {},

      // 编辑页面表单信息
      addForm: {},

      tableData: [], // 当前页面显示的table
      userList: [], // 后端返回的所有的list信息
      editFormVisible: false, // 控制编辑页面显示
      addFormVisible: false, // 控制新增页面显示
      selectRows: [], // 选中的行
      pageIndex: 1, // 分页器上显示的当前页
      pageSize: 10, // 每一页的条数
      totalItem: 0 // 数据的总条数
    }
  },

  created() {
    this.initData()
  },

  methods: {
    // 初始化页面数据
    initData() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: initData')

      this.axios.get(API.requireAuth.userList).then(response => {
        this.$message.success(response.data.successMsg)
        this.userList = response.data.userList
        this.totalItem = this.userList.length
        this.tableData = this.userList.slice(0, this.pageSize)
        this.selectRows = []
        this.pageIndex = 1
      }).catch(err => {
        this.sentry.captureException(err)
        err && this.$message.error(err.data.errMsg || err.data)
      })
    },

    // 在table中选择不同的行
    selectionChange(sels) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: selectionChange', sels)
      this.selectRows = sels;
    },

    // 在某一行点击编辑
    clickEditItem(row, index) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: clickEditItem', row)
      let editItem = this.tableData.filter(value => {
        return value._id === row._id
      })
      this.editForm = Object.assign({}, this.formTemplate, editItem[0])
      this.editFormVisible = true
    },
    // 关闭编辑页面
    closeEditForm() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: closeEditForm')
      this.$confirm('确认放弃修改吗？', '提示', {}).then(() => {
        this.editFormVisible = false
      }).catch(() => {})
    },
    // 编辑以后点击确定
    clickEditUser() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: clickEditUser')
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editUser(this.editForm)
      }).catch(() => {})
    },
    editUser(user) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: editUser', user)
      let hashUser = Object.assign({}, user)
      hashUser.password = SHA256(hashUser.password).toString()
      this.axios.post(API.requireAuth.updateUser, { 
        user: hashUser 
      }).then(response => {
        this.$message.success(response.data.successMsg)
        this.editFormVisible = false
        this.initData()
      }).catch(err => {
        this.sentry.captureException(err)
        err && this.$message.error(err.data.errMsg || err.data)
      })
    },

    // 在某一行点击删除
    clickDeleteItem(row, index) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: clickDeleteItem', row)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteUserItem([row._id])
      }).catch(() => {})
    },
    deleteUserItem(ids){
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: deleteUserItem', ids)
      this.axios.post(API.requireAuth.deleteUser, { ids: ids }).then(response => {
        this.$message.success(response.data.successMsg)
        this.initData()
      }).catch(err => {
        this.sentry.captureException(err)
        err && this.$message.error(err.data.errMsg || err.data)
      })
    },
    clickDeleteAll() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: clickDeleteAll')
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let ids = this.selectRows.map(value => {
          return value._id
        })
        this.deleteUserItem(ids)
      }).catch(() => {})
    },

    // 点击新增按钮，显示Form表单
    showAddForm() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: showAddForm')
      this.addFormVisible = true
      this.addForm = Object.assign({}, this.formTemplate)
    },
    // 点击取消按钮，关闭Form表单
    closeAddForm() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: closeAddForm')
      this.$confirm('确认放弃添加吗？', '提示', {}).then(() => {
        this.addFormVisible = false
      }).catch(() => {})
    },
    // 点击确定，增加店铺
    clickAddUser() {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: clickAddUser')
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.addUser(this.addForm)
      }).catch(() => {})
    },
    addUser(user) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: addUser', user)
      this.axios.post(API.notRequireAuth.register, {
        username: user.username,
        password: SHA256(user.password).toString()
      }).then(response => {
        this.$message.success(response.data.successMsg)
        this.addFormVisible = false
        this.initData()
      }).catch(err => {
        this.sentry.captureException(err)
        err && this.$message.error(err.data.errMsg || err.data)
      })
    },

    // 改变每页的条数
    sizeChangeHandle (val) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: sizeChangeHandle', val)
      this.pageSize = val
      this.pageIndex = 1
      this.tableData = this.userList.slice(0, this.pageSize)
    },
    // 改变当前页
    currentChangeHandle (val) {
      this.sentry.addBreadcrumb('views/admin/user.vue --> methods: currentChangeHandle', val)
      this.pageIndex = val
      let currentPageArrIndexStart = (val - 1) * this.pageSize
      let currentPageArrIndexEnd = (val - 1) * this.pageSize + this.pageSize
      this.tableData = this.userList.slice(currentPageArrIndexStart, currentPageArrIndexEnd)
    }
  }
}
</script>

<style lang="scss">
.user {
  width: 100%;
  height: 100vh;

  .tool-bar{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    height: 40px;
  }
}
</style>
