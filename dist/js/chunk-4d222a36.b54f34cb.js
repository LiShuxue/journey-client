(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d222a36"],{"092a":function(e,t,s){},"4de4":function(e,t,s){"use strict";var i=s("23e7"),a=s("b727").filter,r=s("1dde");i({target:"Array",proto:!0,forced:!r("filter")},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"8ff7":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"",border:""},on:{"selection-change":e.selectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"40"}}),s("el-table-column",{attrs:{prop:"_id",label:"ID",width:"300",align:"center"}}),s("el-table-column",{attrs:{prop:"username",label:"username",width:"200",align:"center"}}),s("el-table-column",{attrs:{prop:"password",label:"password",width:"600",align:"center"}}),s("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini"},on:{click:function(s){return e.clickEditItem(t.row,t.$index)}}},[e._v("编辑")]),s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.clickDeleteItem(t.row,t.$index)}}},[e._v("删除")])]}}])})],1),s("div",{staticClass:"tool-bar"},[s("div",[s("el-button",{on:{click:e.showAddForm}},[e._v("新增管理员")]),s("el-button",{attrs:{type:"danger",disabled:0===this.selectRows.length},on:{click:e.clickDeleteAll}},[e._v("批量删除")])],1),s("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalItem,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}})],1),s("el-dialog",{attrs:{title:"新增管理员",visible:e.addFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[s("el-form",{attrs:{model:e.addForm,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"username",prop:"username"}},[s("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),s("el-form-item",{attrs:{label:"password",prop:"password"}},[s("el-input",{model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.closeAddForm}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.clickAddUser}},[e._v("确 定")])],1)],1),s("el-dialog",{attrs:{title:"编辑管理员",visible:e.editFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.editFormVisible=t}}},[s("el-form",{attrs:{model:e.editForm,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"username",prop:"username"}},[s("el-input",{model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),s("el-form-item",{attrs:{label:"password",prop:"password"}},[s("el-input",{model:{value:e.editForm.password,callback:function(t){e.$set(e.editForm,"password",t)},expression:"editForm.password"}})],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.closeEditForm}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.clickEditUser}},[e._v("确 定")])],1)],1)],1)},a=[],r=(s("4de4"),s("d81d"),s("fb6a"),s("0d03"),s("d3b7"),s("25f0"),s("a43a")),n=s("94f8"),o=s.n(n),d={data:function(){return{formTemplate:{username:"",password:""},editForm:{},addForm:{},tableData:[],userList:[],editFormVisible:!1,addFormVisible:!1,selectRows:[],pageIndex:1,pageSize:10,totalItem:0}},created:function(){this.initData()},methods:{initData:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: initData"),this.axios.get(r["a"].requireAuth.userList).then((function(t){e.$message.success(t.data.successMsg),e.userList=t.data.userList,e.totalItem=e.userList.length,e.tableData=e.userList.slice(0,e.pageSize),e.selectRows=[],e.pageIndex=1})).catch((function(t){e.sentry.captureException(t),t&&e.$message.error(t.data.errMsg||t.data)}))},selectionChange:function(e){this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: selectionChange",e),this.selectRows=e},clickEditItem:function(e,t){this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: clickEditItem",e);var s=this.tableData.filter((function(t){return t._id===e._id}));this.editForm=Object.assign({},this.formTemplate,s[0]),this.editFormVisible=!0},closeEditForm:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: closeEditForm"),this.$confirm("确认放弃修改吗？","提示",{}).then((function(){e.editFormVisible=!1})).catch((function(){}))},clickEditUser:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: clickEditUser"),this.$confirm("确认提交吗？","提示",{}).then((function(){e.editUser(e.editForm)})).catch((function(){}))},editUser:function(e){var t=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: editUser",e);var s=Object.assign({},e);s.password=o()(s.password).toString(),this.axios.post(r["a"].requireAuth.updateUser,{user:s}).then((function(e){t.$message.success(e.data.successMsg),t.editFormVisible=!1,t.initData()})).catch((function(e){t.sentry.captureException(e),e&&t.$message.error(e.data.errMsg||e.data)}))},clickDeleteItem:function(e,t){var s=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: clickDeleteItem",e),this.$confirm("确认删除选中记录吗？","提示",{type:"warning"}).then((function(){s.deleteUserItem([e._id])})).catch((function(){}))},deleteUserItem:function(e){var t=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: deleteUserItem",e),this.axios.post(r["a"].requireAuth.deleteUser,{ids:e}).then((function(e){t.$message.success(e.data.successMsg),t.initData()})).catch((function(e){t.sentry.captureException(e),e&&t.$message.error(e.data.errMsg||e.data)}))},clickDeleteAll:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: clickDeleteAll"),this.$confirm("确认删除选中记录吗？","提示",{type:"warning"}).then((function(){var t=e.selectRows.map((function(e){return e._id}));e.deleteUserItem(t)})).catch((function(){}))},showAddForm:function(){this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: showAddForm"),this.addFormVisible=!0,this.addForm=Object.assign({},this.formTemplate)},closeAddForm:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: closeAddForm"),this.$confirm("确认放弃添加吗？","提示",{}).then((function(){e.addFormVisible=!1})).catch((function(){}))},clickAddUser:function(){var e=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: clickAddUser"),this.$confirm("确认提交吗？","提示",{}).then((function(){e.addUser(e.addForm)})).catch((function(){}))},addUser:function(e){var t=this;this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: addUser",e),this.axios.post(r["a"].notRequireAuth.register,{username:e.username,password:o()(e.password).toString()}).then((function(e){t.$message.success(e.data.successMsg),t.addFormVisible=!1,t.initData()})).catch((function(e){t.sentry.captureException(e),e&&t.$message.error(e.data.errMsg||e.data)}))},sizeChangeHandle:function(e){this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: sizeChangeHandle",e),this.pageSize=e,this.pageIndex=1,this.tableData=this.userList.slice(0,this.pageSize)},currentChangeHandle:function(e){this.sentry.addBreadcrumb("views/admin/user.vue --\x3e methods: currentChangeHandle",e),this.pageIndex=e;var t=(e-1)*this.pageSize,s=(e-1)*this.pageSize+this.pageSize;this.tableData=this.userList.slice(t,s)}}},c=d,l=(s("fbaa"),s("2877")),u=Object(l["a"])(c,i,a,!1,null,null,null);t["default"]=u.exports},d81d:function(e,t,s){"use strict";var i=s("23e7"),a=s("b727").map,r=s("1dde");i({target:"Array",proto:!0,forced:!r("map")},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},fbaa:function(e,t,s){"use strict";var i=s("092a"),a=s.n(i);a.a}}]);
//# sourceMappingURL=chunk-4d222a36.b54f34cb.js.map