<template>
  <div>
    <!-- 导航菜单 -->
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" unique-opened router>
      <el-menu-item router index='/home'>
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus " :key='item.id'>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="menu.url" v-for="menu in item.children" :key='menu.id'>{{menu.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      defaultActive: '/home',

    };
  },
  components: {

  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {

  },
  mounted () {
    this.defaultActive = this.$router.path

  }
};
</script>

<style lang="" scoped>
</style>
