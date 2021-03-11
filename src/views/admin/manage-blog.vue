<template>
  <div class="blog">
    <!-- 工具条 -->
    <el-form :inline="true" :model="filterForm" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="filterForm.keywords" @keyup.enter.native="queryBlog" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryBlog">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" :disabled="this.selectRows.length === 0" @click="clickDeleteAll">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table
      :data="refactorTableData"
      stripe
      border
      style="width: 100%"
      @selection-change="selectionChange"
      @row-dblclick="clickSeeItem"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="title" label="标题" width="250" align="center"></el-table-column>
      <el-table-column prop="category" label="类别" width="150" align="center" sortable></el-table-column>
      <el-table-column prop="isOriginal" label="原创" width="80" align="center" sortable></el-table-column>
      <el-table-column prop="see" label="查看次数" width="120" align="center" sortable></el-table-column>
      <el-table-column prop="like" label="点赞次数" width="120" align="center" sortable></el-table-column>
      <el-table-column prop="tags" label="标签" width="300" align="center"></el-table-column>
      <el-table-column
        prop="publishTime"
        label="发表时间"
        width="220"
        align="center"
        sortable
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="220"
        align="center"
        sortable
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="clickSeeItem(scope.row, scope.$index)">查看</el-button>
          <el-button size="mini" @click="clickEditItem(scope.row, scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="clickDeleteItem(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalItem"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from '@/ajax/api';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      // 顶部工具条表单信息
      filterForm: {
        keywords: ''
      },

      tableData: [], // 当前页面显示的table
      blogList: [], // 后端返回的所有的list信息
      queryList: [], // 查询出来的list信息
      selectRows: [], // 选中的行
      pageIndex: 1, // 分页器上显示的当前页
      pageSize: 10, // 每一页的条数
      totalItem: 0 // 数据的总条数
    };
  },

  computed: {
    refactorTableData() {
      let refactorData = [];
      this.tableData.forEach(value => {
        let item = Object.assign({}, value);
        item.isOriginal = value.isOriginal ? '是' : '否';
        item.tags = value.tags.join('、');
        refactorData.push(item);
      });
      return refactorData;
    }
  },

  created() {
    this.initData();
  },

  methods: {
    // 初始化页面数据
    initData() {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: initData');
      this.axios
        .get(API.notRequireAuth.blogList)
        .then(response => {
          this.blogList = response.data.blogList;
          this.$store.commit('saveBlogListMutation', this.blogList);
          this.totalItem = this.blogList.length;
          this.tableData = this.blogList.slice(0, this.pageSize);
          this.queryList = [];
          this.selectRows = [];
          this.pageIndex = 1;
        })
        .catch(err => {
          this.handleError(err);
        });
    },

    // 查询博客
    queryBlog() {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: queryBlog', this.filterForm.keywords);
      let arr = this.blogList.filter(value => {
        let keywords = this.filterForm.keywords.trim().toUpperCase();
        return (
          value.title.toUpperCase().includes(keywords) ||
          value.subTitle.toUpperCase().includes(keywords) ||
          value.category.toUpperCase().includes(keywords) ||
          value.tags
            .join('')
            .toUpperCase()
            .includes(keywords)
        );
      });
      this.queryList = arr;
      this.tableData = this.queryList.slice(0, this.pageSize);
      this.totalItem = this.queryList.length;
      this.pageIndex = 1;
    },

    // 点击批量删除
    clickDeleteAll() {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: clickDeleteAll');
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          let ids = this.selectRows.map(value => {
            return value._id;
          });
          this.deleteBlogItem(ids);
        })
        .catch(() => {});
    },
    deleteBlogItem(ids) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: deleteBlogItem');
      this.axios
        .post(API.requireAuth.deleteBlog, { ids })
        .then(() => {
          this.initData();
        })
        .catch(err => {
          this.handleError(err);
        });
    },

    // 在table中选择不同的行
    selectionChange(sels) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: selectionChange', sels);
      this.selectRows = sels;
    },

    // 在某一行点击查看
    clickSeeItem(row) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: clickSeeItem', row);
      let blog = this.blogList.filter(value => {
        return value._id === row._id;
      });
      this.$store.dispatch('chooseBlogAction', blog[0]).then(() => {
        this.$router.push('view-blog');
      });
    },

    // 在某一行点击编辑
    clickEditItem(row) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: clickEditItem', row);
      let blog = this.blogList.filter(value => {
        return value._id === row._id;
      });
      this.$store.dispatch('chooseBlogAction', blog[0]).then(() => {
        this.$router.push({
          name: 'edit-blog',
          params: {
            isEdit: true
          }
        });
      });
    },

    // 在某一行点击删除
    clickDeleteItem(row) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: clickDeleteItem', row);
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.deleteBlogItem([row._id]);
        })
        .catch(() => {});
    },

    // 改变每页的条数
    sizeChangeHandle(val) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: sizeChangeHandle', val);
      this.pageSize = val;
      this.pageIndex = 1;
      if (this.queryList.length > 0) {
        this.tableData = this.queryList.slice(0, this.pageSize);
      } else {
        this.tableData = this.blogList.slice(0, this.pageSize);
      }
    },
    // 改变当前页
    currentChangeHandle(val) {
      this.sentry.addBreadcrumb('views/admin/manage-blog.vue --> methods: currentChangeHandle', val);
      this.pageIndex = val;
      let currentPageArrIndexStart = (val - 1) * this.pageSize;
      let currentPageArrIndexEnd = (val - 1) * this.pageSize + this.pageSize;
      if (this.queryList.length > 0) {
        this.tableData = this.queryList.slice(currentPageArrIndexStart, currentPageArrIndexEnd);
      } else {
        this.tableData = this.blogList.slice(currentPageArrIndexStart, currentPageArrIndexEnd);
      }
    },

    formatDate(row, col, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD');
    }
  }
};
</script>

<style lang="scss">
.blog {
  width: 100%;
  height: 100vh;

  .pagination {
    position: absolute;
    right: 0px;
    margin: 20px;
  }
}
</style>
