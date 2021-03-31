<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain size="mini" @click='add'>添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-dialog ref="diaInfo" @cancel='cancel' :dialogInfo='dialogInfo'> </v-dialog>
  </div>
</template>

<script>
import vList from './list'
import vDialog from './dialog'

export default {
  data () {
    return {
      dialogInfo: {
        isShow: false,
        isAdd: true
      }
    };
  },
  components: {
    vList,
    vDialog
  },
  methods: {
    add () {
      this.dialogInfo.isShow = true
      this.dialogInfo.isAdd = true
    },
    cancel (e) {
      this.dialogInfo.isShow = e
    },
    // 封装一个编辑打开并传值的事件
    edit (e) {
      this.dialogInfo.isShow = true
      this.dialogInfo.isAdd = false
      this.$refs.diaInfo.lookup(e)
    }
  },
  mounted () {

  }
};
</script>

<style lang="" scoped>
.el-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-table-column {
  background-color: #22202e;
}
</style>
