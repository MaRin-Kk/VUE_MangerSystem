<template>
  <div>
    <el-table :data="menuList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}"
      default-expand-all>
      <el-table-column prop="id" label="菜单编号" width="100px">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称 ">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="80px">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址">
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
            <el-button type="primary" icon="el-icon-edit" @click='edit(item.row.id)' size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click='del(item.row.id)' size="mini">删除</el-button>
          </div>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deleteMenu } from '../../util/axios'
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getMenuList: 'menu/getMenuListAction'
    }),
    //删除事件
    del (id) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.getMenuList()
              this.$message.success(res.data.msg)
            }
          })
      })
    },
    // 编辑事件
    edit (id) {
      this.$emit('edit', id)
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu/getMenuList'
    })
  },
  mounted () {
    this.getMenuList()
    console.log(this.menuList);
  }
};
</script>

<style lang="" scoped>
</style>
