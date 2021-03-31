<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加规格':'编辑规格'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="specsInfo" :rules='rules' ref="specsInfo">

        <el-form-item label="规格名称" :label-width="formLabelWidth" prop='specsname'>
          <el-input v-model="specsInfo.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-for="(item, index) in attrArr" :label-width="formLabelWidth" label="规格属性" :key="index">
          <el-input style="width:75%" v-model="item.value"></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary">新增规格属性</el-button>
          <el-button v-else type="danger" @click="delAttr(item)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="specsInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addSpecs">添加</el-button>
        <el-button v-else type="primary" @click="editSpecs">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from '../../util/axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      specsInfo: {
        specsname: "", //商品规格名称
        attrs: "", //规格属性值
        status: 1 //状态1正常2禁用
      },
      formLabelWidth: '120px',
      rules: {
        specsname: [
          { required: true, message: "请输入规格名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
      },
      //设定动态添加表单项的数组
      attrArr: [
        {
          value: ""
        }
      ]
    };
  },

  methods: {
    // 删除动态表单项
    delAttr (item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    addAttr () {
      if (this.attrArr.length < 5) {
        this.attrArr.push({
          value: ''
        })
      } else {
        this.$message.warning('最多添加6个')
      }


    },

    // 添加规格
    addSpecs () {
      this.$refs.specsInfo.validate(valid => {
        if (valid) {
          this.specsInfo.attrs = this.attrArr.map(item => item.value).join(',')
          // console.log(this.specsInfo);
          getSpecsAdd(this.specsInfo)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getSpecsList()
                // 重新调用总数
                this.getSpecsCount()
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
    // 编辑事件
    editSpecs () {
      this.$refs.specsInfo.validate(valid => {
        if (valid) {
          //对用修改的动态表单数据再次进行转化
          this.specsInfo.attrs = this.attrArr.map(item => item.value).join(",");
          //验证成功之后调用添加接口
          getSpecsEdit(this.specsInfo).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // //确定之后，调用关闭弹框并清空
              this.cancel();
              //重新调用接口
              this.getSpecsList();
              //重新调用总数
              this.getCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    //封装一个查询一条数据的接口
    lookup (id) {
      getSpecsInfo({ id }).then(res => {
        if (res.data.code == 200) {
          let list = res.data.list[0];
          list.attrs.map((item, idx) => {
            if (idx == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item
              });
            }
            this.specsInfo = list;
            //为编辑添加一个id
            this.specsInfo.id = id;
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getCount: "specs/getCountAction"
    }),

    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.specsInfo = {
        specsname: "", //商品规格名称
        attrs: "", //规格属性值
        status: 1 //状态1正常2禁用
      },
        this.$refs.specsInfo.resetFields()
      this.attrArr = [
        {
          value: ""
        }
      ]
    }
  },

  props: ['dialogInfo']
}
</script>

<style lang="" scoped>
</style>
