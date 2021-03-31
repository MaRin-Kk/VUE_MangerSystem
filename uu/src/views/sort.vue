<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.name" left-arrow />
    <!-- 侧边栏 -->
    <div class="sortinfo">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in fircate " :key="item.id" :title="item.catename" />
      </van-sidebar>
      <van-grid :border="false" :column-num="3">
        <van-grid-item :to="'goodslist?id=' +item.id" v-for="item in seccate " :key="item.id">
          <van-image :src="$img+item.img" />
          <p>{{item.catename}}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateTree } from '../util/axios'
export default {
  data () {
    return {
      activeKey: 0,
      fircate: [],
      seccate: []
    };
  },
  components: {

  },
  methods: {

    onChange () {
      this.seccate = this.fircate[this.activeKey].children
    }
  },
  mounted () {
    getCateTree().then(res => {
      // console.log(res);
      this.fircate = res.data.list
      this.seccate = res.data.list[0].children

    })
  }
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background: #ff6040;
}
.sortinfo {
  display: flex;
}
.van-grid {
  flex: 1;
}
.van-grid-item {
  margin: 0 auto;
}
.van-image {
  height: 150px;
  width: 200px;
}
p {
  font-size: 20px !important ;
}
</style>
