<template>
  <div>
    <el-table :data="bannerList" border style="width: 100%" row-key="id" default-expand-all>
      <el-table-column prop="id" label="编号" width="100px">
      </el-table-column>
      <el-table-column prop="title" label="轮播图名称 ">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img :src="$imgUrl+item.row.img" alt="" class="imgurl">
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
import { deletebanner } from '../../util/axios';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getBannerList: 'banner/getBannerListAction',

    }),
    //删除事件
    del (id) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletebanner({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.getBannerList()
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
      bannerList: 'banner/getBannerList',
    })
  },
  mounted () {
    this.getBannerList()
  }
};
</script>

<style lang="" scoped>
.imgurl {
  height: 200px;
  width: 260px;
}
</style>
