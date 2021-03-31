<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加角色':'编辑角色'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="roleInfo" :rules='rules' ref="roleInfo">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop='rolename'>
          <el-input v-model="roleInfo.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree :data="menulist" show-checkbox node-key="id" default-expand-all ref="tree" :props="{
              children: 'children',
              label: 'title' 
            }">
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="roleInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addInfo">添加</el-button>
        <el-button v-else type="primary" @click="editInfo">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, getRoleInfo, postEditMenu, postEditRole } from '../../util/axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      roleInfo: {
        rolename: '',
        menu: 1,
        status: 1
      },
      formLabelWidth: '120px',
      rules: {
        rolename: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8个字符", trigger: "blur" }
        ]
      },
    };
  },
  components: {

  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    ...mapActions({
      'getRoleList': 'role/getRoleListAction',
      'getMenuList': 'menu/getMenuListAction'
    }),
    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.roleInfo = {
        rolename: '',
        menu: 1,
        status: 1,
      }
      // 重置规则验证
      this.$refs.roleInfo.resetFields();
      // 重置树结构
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加角色
    addInfo () {
      // 验证
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          this.roleInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
          addRole(this.roleInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                this.getRoleList()
              } else {
                this.$message.error(res.data.msg)

              }
            })
        } else {

          return false;
        }
      });
    },
    lookup (id) {
      getRoleInfo({ id })
        .then(res => {
          if (res.data.code == 200) {
            this.roleInfo = res.data.list
            this.$refs.tree.setCheckedKeys(this.roleInfo.menus.split(','))
            this.roleInfo.id = id
          }
        })

    },
    editInfo () {
      // 验证
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          this.roleInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
          postEditRole(this.roleInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                this.getRoleList()
              } else {
                this.$message.error(res.data.msg)

              }
            })
        } else {

          return false;
        }
      });
    },



    // 编辑角色

  },
  computed: {
    ...mapGetters({
      'menulist': 'menu/getMenuList'
    })
  },
  props: ['dialogInfo']
}

</script>

<style lang="" scoped>
</style>
