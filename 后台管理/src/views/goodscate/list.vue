<template>
  <div>
    <el-table :data="cateList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}"
      default-expand-all>
      <el-table-column prop="id" label="分类编号" width="100px">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称 ">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img v-if="item.row.pid !=0" :src="$imgUrl+item.row.img" alt="" class="imgurl">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deleteCate } from '../../util/axios';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getCateList: 'goodscate/getCateListAction',

    }),
    //删除事件
    del (id) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCate({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.getCateList()
              this.$message.success(res.data.msg)
            }
          })
      })
    },
    // 编辑事件
    edit (id) {
      this.$emit('edit', id)
    },

  },

  computed: {
    ...mapGetters({
      cateList: 'goodscate/getCateList',
    })
  },
  mounted () {
    this.getCateList()
  }
};
</script>

<style lang="" scoped>
.imgurl {
  height: 200px;
  width: 240px;
}
</style>
