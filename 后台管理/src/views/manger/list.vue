<template>
  <div>
    <el-table :data="userList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}"
      default-expand-all>
      <el-table-column prop="uid" label="用户编号" width="100px">
      </el-table-column>
      <el-table-column prop="username" label="用户名称 ">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope='item'>
          <el-tag v-if='item.row.status == 1' type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope='item'>
          <div>
            <el-button type="primary" icon="el-icon-edit" @click='edit(item.row.uid)' size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click='del(item.row.uid)' size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination @current-change='changePage' background layout="prev, pager, next" :total="count" :page-size="size">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deleteUser } from '../../util/axios';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getUserList: 'user/getUserListAction',
      getCount: 'user/getUserCountAction',
      changePageAction: 'user/changePageAction'
    }),
    //删除事件
    del (uid) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ uid })
          .then(res => {
            if (res.data.code == 200) {
              this.getUserList()
              this.$message.success(res.data.msg)
            }
          })
      })
    },
    // 编辑事件
    edit (id) {
      this.$emit('edit', id)
    },
    changePage (n) {
      this.changePageAction(n)
    }
  },

  computed: {
    ...mapGetters({
      userList: 'user/getUserList',
      count: 'user/getCount',
      size: 'user/getSize'
    })
  },
  mounted () {
    this.getUserList(),
      this.getCount()
  }
};
</script>

<style lang="" scoped>
</style>
