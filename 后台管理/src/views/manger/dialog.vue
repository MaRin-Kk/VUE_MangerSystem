<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加用户':'编辑用户'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="mangerInfo" :rules='rules' ref="mangerInfo">
        <el-form-item label="所属角色" :label-width="formLabelWidth" prop='roleid'>
          <el-select v-model="mangerInfo.roleid" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="mangerInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mangerInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="mangerInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addUser">添加</el-button>
        <el-button v-else type="primary" @click="editUser">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, getUserCount, getUserInfo, postEditUser } from '../../util/axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      mangerInfo: {
        roleid: '',
        username: '',
        password: '',
        status: 1
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ]
      },
    };
  },
  components: {

  },
  methods: {

    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.mangerInfo = {
        roleid: '',
        username: '',
        password: '',
        status: 1
      },
        this.$refs.mangerInfo.resetFields();
    },
    // 添加用户
    addUser () {
      this.$refs.mangerInfo.validate(valid => {
        if (valid) {
          addUser(this.mangerInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getUserList()
                // 重新调用总数
                this.getUserCount()
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
    // 编辑用户
    editUser () {
      this.$refs.mangerInfo.validate(valid => {
        if (valid) {
          postEditUser(this.mangerInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getUserList()
                // 重新调用总数
                this.getUserCount()
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
    lookup (uid) {
      getUserInfo({ uid })
        .then(res => {
          if (res.data.code = 200) {
            this.mangerInfo = res.data.list
            this.mangerInfo.uid = uid
          } else {
            this.$message
          }
        })
    },
    ...mapActions({
      getRoleList: 'role/getRoleListAction',
      getUserCount: 'user/getUserCountAction',
      getUserList: "user/getUserListAction",

    }),
  },
  computed: {
    ...mapGetters({
      userList: 'user/getUserList',
      roleList: 'role/getRoleList'
    })
  },
  mounted () {
    this.getRoleList()
  },
  props: ['dialogInfo']
};
</script>

<style lang="" scoped>
</style>
