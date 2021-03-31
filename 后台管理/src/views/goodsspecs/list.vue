<template>
  <div>
    <el-table :data="specsList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}"
      default-expand-all>
      <el-table-column prop="id" label="规格编号" width="100px">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称 ">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attrs in  item.row.attrs" :key='attrs' type="info">{{attrs}}</el-tag>
          </div>
        </template>
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
    <!-- 分页器 -->
    <el-pagination @current-change='changePage' background layout="prev, pager, next" :total="count" :page-size="size">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSpecsDelete } from '../../util/axios';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getSpecsList: 'specs/getSpecsListAction',
      getCount: 'specs/getCountAction',
      changePageAction: 'specs/changePageAction'


    }),
    //删除事件
    del (id) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getSpecsDelete({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.getSpecsList()
              this.$message.success(res.data.msg)
            }
          })
      })
    },
    // 编辑事件
    edit (id) {
      this.$emit("edit", id);
    },
    changePage (n) {
      this.changePageAction(n)
    }
  },

  computed: {
    ...mapGetters({
      specsList: 'specs/getSpecsList',
      count: 'specs/getCount',
      size: 'specs/getSize'
    })
  },
  mounted () {
    this.getSpecsList(),
      this.getCount()
  }
};
</script>

<style lang="" scoped>
</style>
