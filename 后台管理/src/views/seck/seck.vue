<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button @click='add' type="primary" plain size="small">添加</el-button>
    <!-- 表格列表 -->
    <v-list @edit='edit'></v-list>
    <!-- 弹框 -->
    <v-dialog ref='diaInfo' @cancel='cancel' :dialogInfo='dialogInfo'></v-dialog>
  </div>
</template>

<script>
//引入列表数据
import vList from './list'
import vDialog from './dialog'
export default {
  data () {
    return {
      //isShow:false//用于控制子组件弹框的显示隐藏
      dialogInfo: {
        isShow: false,//用于控制子组件弹框的显示隐藏
        isAdd: true,//是否是添加
      }
    };
  },
  components: {
    vList,
    vDialog
  },
  methods: {
    //封装一个添加弹框事件
    add () {
      //打开弹框
      this.dialogInfo.isShow = true
      //告诉弹框你是添加
      this.dialogInfo.isAdd = true

    },
    //封装一个关闭弹框的事件
    cancel (e) {
      this.dialogInfo.isShow = e
    },
    //封装一个编辑打开弹框并传值的事件
    edit (e) {
      //打开弹框
      this.dialogInfo.isShow = true
      //告诉弹框你是编辑
      this.dialogInfo.isAdd = false
      //给子组件中的函数方法赋值
      this.$refs.diaInfo.lookup(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin: 20px 5px;
}
</style>
