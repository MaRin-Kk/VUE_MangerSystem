<template >
  <div id="app">
    <!-- 搜索 -->
    <div class="seach">
      <div class="seach_up">
        <a href="#" class="location"><img :src="img.img_location" alt="定位" /></a>
        <a href="#" class="logo"><img :src="img.img_logo" alt="小U商城" /></a>
        <div class="inp_seach">
          <input type="text" name="" id="" placeholder="按内容搜索" />
        </div>
        <a href="#" class="shop"><img :src="img.img_shop" alt="商店" /></a>
      </div>
      <!-- 分类 -->
      <div class="sea_down">
        <ul>
          <li v-for="(item, index) in menu" :key="item" @click="sel(index)" :class="{ bbb: num == index }">
            {{ item }}
          </li>
        </ul>
        <p class="cls">{{ cla }}</p>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  data () {
    return {
      img: {
        img_location: require("../assets/img/address.png"),
        img_logo: require("../assets/img/white.png"),
        img_shop: require("../assets/img/store.png"),
      },
      menu: [
        "推荐",
        "女装",
        "鞋包",
        "居家",
        "母婴",
        "美妆1",
        "美妆2",
        "美妆3",
        "美妆4",
        "美妆5",
      ],
      num: 0,
      cla: "分类",
    };
  },
  methods: {
    sel (val) {
      this.num = val;
    }
  },
  components: {
  },
};
</script>
<style scoped>
.seach {
  background-image: linear-gradient(#ff6040, #ff8a80);
  box-shadow: 0 4px 12px 0 rgba(255, 149, 128, 0.5);
  width: 100%;
  height: 80px;
  margin: top -5px;
}
.seach_up {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: #ff6040 solid 1px;
}
.location img {
  width: 20px;
  height: 22px;
  background: rgb(94, 255, 0);
  margin-left: 10px;
}
.logo img {
  width: 91px;
  height: 24px;
}
.seach_up .inp_seach {
  position: relative;
  width: 170px;
  height: 32px;
  font-size: 12px;
  background-color: cyan;
  overflow: hidden;
  border-radius: 5px;
}
.inp_seach input {
  width: 100%;
  height: 100%;
  padding-left: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #757575;
}
.seach_up .shop img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.inp_seach::before {
  content: "";
  width: 18px;
  height: 25px;
  position: absolute;
  top: 0;
  left: 5px;
  /* background: url(../../assets/img/address.png) no-repeat 100% 100%; */
}
.sea_down {
  position: relative;
  height: 40px;
}
ul {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  /* flex-wrap: nowrap; */
}
ul::-webkit-scrollbar {
  display: none;
}
ul li {
  height: 32px;
  margin-top: 5px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: rgb(0, 0, 0);
  transition: 0.3s;
  white-space: nowrap;
  padding: 0 20px;
}

.bbb {
  font-size: 16px;
  font-weight: 700;
}
.cls {
  position: absolute;
  right: 0;
  bottom: 1px;
  height: 32px;
  background-image: linear-gradient(180deg, #ff7a68 0%, #ff8a80 100%);
  width: 65px;
  font-size: 16px;
  background-color: #ff8a80;
  text-align: center;
  line-height: 32px;
  color: #fff;
  box-shadow: -5px 5px 10px -5px #e63d2e;
}
.cls::before {
  content: "";
  width: 18px;
  height: 25px;
  position: absolute;
  top: 8px;
  left: 4px;
  /* background: url(../../assets/img/unselected.png) no-repeat 80% 30%; */
}
</style>