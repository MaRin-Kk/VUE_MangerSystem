<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="50px">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="50px"> </el-table-column>
      <el-table-column label="商品价格" width="50px" prop="price"> </el-table-column>
      <el-table-column label="市场价格" width="50px" prop="market_price"> </el-table-column>
      <el-table-column label="图片" width="300px">
        <template slot-scope="item">
          <div>
            <img class="img" :src="item.row.img?$imgUrl+item.row.img:imgDefault" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success" width="100px">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(item.row.id)" size="mini" icon="el-icon-delete">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :page-size="size" background layout="prev, pager, next" @current-change="changePage" :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getGoodsDelete } from '../../util/axios';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getCount: "goods/getCountAction",
      changePageAction: "goods/changePageAction"
    }),
    //删除事件
    del (id) {
      this.$confirm('你确定删除数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getGoodsDelete({ id })
          .then(res => {
            if (res.data.code == 200) {
              this.getGoodsList()
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
      goodsList: 'goods/getGoodsList',
      count: 'goods/getCount',
      size: 'goods/getSize'
    })
  },
  mounted () {
    this.getGoodsList(),
      this.getCount()
  }
};
</script>

<style lang="" scoped>
img {
  width: 300px;
  height: 200px;
}
</style>
