<template>
  <div class="box">
    <el-container>
      <el-header>
        <i>欢迎您:{{getUserInfo.username}}</i> 某某小型后台管理项目
        <el-button @click="loginout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside>
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/vNav'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {

    };
  },
  mounted () {
    console.log(this.getUserInfo, '存储的state值')
  },
  computed: {
    ...mapGetters(['getUserInfo']),

  },
  components: {

  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    loginout () {
      this.changeUserInfoAction(false)
      this.$router.push('/login')
    }
  },
  components: {
    vNav
  }
};
</script>

<style lang="" scoped>
i {
  font-size: 20px;
  float: left;
  margin-left: 20px;
}
.el-button {
  width: 100px;
  height: 50px;
  border-radius: 55px;
  background: #c21e1e;
  box-shadow: -2px 2px 2px #b11b1b, 2px -1px 1px #d32121;
  color: rgb(255, 255, 255);
  float: right;
  margin-top: 20px;
}
.el-header {
  background: rgb(33, 33, 36);
  height: 100px !important;
  font-size: 26px;
  line-height: 100px;
  text-align: center;
  color: rgb(208, 208, 208);
}
.el-aside {
  width: 220px;
  height: 90vh;
}
.box {
  background: linear-gradient(to bottom, #232526, #414345);
}
</style>
