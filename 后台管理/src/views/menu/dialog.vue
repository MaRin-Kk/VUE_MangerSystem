<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加菜单':'编辑菜单'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="menuInfo" :rules='rules' ref="menuInfo">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop='title'>
          <el-input v-model="menuInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop='pid'>
          <el-select v-model="menuInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.type" :label="1">目录</el-radio>
          <el-radio v-model="menuInfo.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="menuInfo.type ==1" label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="menuInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addMenu">添加</el-button>
        <el-button v-else type="primary" @click="editMenu">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, getMenuInfo, postEditMenu } from '../../util/axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      menuInfo: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, message: "请输入菜单名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        pid: [
          { required: true, message: "请选择", trigger: "blur" },
        ]
      },
    };
  },
  components: {

  },
  methods: {
    ...mapActions({
      getMenuList: 'menu/getMenuListAction'
    }),
    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.menuInfo = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
        this.$refs.menuInfo.resetFields();
    },
    // 添加菜单
    addMenu () {
      this.$refs.menuInfo.validate(valid => {
        if (valid) {
          addMenu(this.menuInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getMenuList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
    },
    // 编辑菜单
    editMenu () {
      this.$refs.menuInfo.validate(valid => {
        if (valid) {
          postEditMenu(this.menuInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getMenuList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
    },
    lookup (id) {
      getMenuInfo({ id })
        .then(res => {
          if (res.data.code = 200) {
            this.menuInfo = res.data.list
            this.menuInfo.id = id
          } else {
            this.$message
          }
        })
    }
  },
  computed: {
    ...mapGetters({
      'menuList': 'menu/getMenuList'
    })
  },
  props: ['dialogInfo']
};
</script>

<style lang="" scoped>
</style>
