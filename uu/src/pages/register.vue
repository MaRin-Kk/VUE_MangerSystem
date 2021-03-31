<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.name" left-text="返回" left-arrow @click-left='$router.go(-1)' />
    <van-form @submit="register">
      <van-field v-model="regList.phone" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="regList.nickname" type="nickname" name="昵称" label="昵称" placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]" />
      <van-field v-model="regList.password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { register } from '../util/axios'
import { Toast } from 'vant';
export default {
  data () {
    return {
      regList: {
        phone: "",
        nickname: "",
        password: ""
      }
    };
  },
  components: {

  },
  methods: {
    register () {
      register(this.regList)
        .then(res => {
          if (res.data.code == 200) {
            Toast.success('成功文案');
            this.$router.push('/login')
          } else {
            Toast.fail('失败文案');
            console.log(res);
          }
        })
    },
    validator (val) {
      return /1\d{10}/.test(val);
    },
  }
};
</script>

<style lang="" scoped>
</style>
