<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}"
      default-expand-all>
      <el-table-column prop="id" label="角色编号" width="100px">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称 ">
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
import { deleteRole } from "../../util/axios";

export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      'getRoleList': 'role/getRoleListAction'
    }),
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.getRoleList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑
    edit (id) {
      this.$emit('edit', id)
    }
  },
  computed: {
    ...mapGetters({
      'rolelist': 'role/getRoleList'
    })
  },
  mounted () {
    this.getRoleList()
  }
};
</script>

<style lang="" scoped>
</style>
