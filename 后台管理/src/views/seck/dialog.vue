<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd ? '添加秒杀' : '编辑秒杀'" :visible.sync="dialogInfo.isShow" :before-close="cancel"
      center>
      <el-form :model="seckInfo" :rules="rules" ref="seckInfo">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="seckInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select @change="changeCate(false)" v-model="seckInfo.first_cateid" placeholder="请选择">
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select @change='changeGoods(false)' v-model="seckInfo.second_cateid" placeholder="请选择">
            <el-option v-for="item in secondCate" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="seckInfo.goodsid" placeholder="请选择">
            <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="seckInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type="primary" @click="addSeck">添 加</el-button>
        <el-button v-else type="primary" @click="editSeck">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getSeckAdd, getSeckInfo, getSeckEdit, getGoodsList } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data () {
    return {
      seckInfo: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      timer: "",
      secondCate: [],
      goodsArr: [],
      formLabelWidth: "120px",

      rules: {
        title: [
          { required: true, message: "请输入秒杀名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  props: ["dialogInfo"],
  mounted () {
    this.getSeckList();
    this.getCateList()
  },
  computed: {
    ...mapGetters({
      cateList: 'goodscate/getCateList'
    })
  },
  methods: {
    //封装一个切换一级分类事件
    changeCate (n) {
      let index = this.cateList.findIndex(item => this.seckInfo.first_cateid == item.id)
      this.secondCate = this.cateList[index].children
      if (!n) {
        //清空二级分类id
        this.seckInfo.second_cateid = ''
        //清空商品id
        this.seckInfo.goodsid = ''
      }
    },
    //封装一个切换二级事件
    changeGoods (n) {
      //调用商品列表接口
      getGoodsList(
        {
          fid: this.seckInfo.first_cateid,
          sid: this.seckInfo.second_cateid
        }
      )
        .then(res => {
          console.log(res, '商品列表的响应');
          if (res.data.code == 200) {
            this.goodsArr = res.data.list
          }
        })
      if (!n) {
        this.seckInfo.goodsid = ''
      }
    },
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
      getCateList: 'goodscate/getCateListAction'
    }),
    //封装一个取消事件
    cancel () {
      //去改变父组件的isShow的状态
      this.$emit("cancel", false);
      //调取清空事件
      this.reset();
    },
    //封装一个清空事件
    reset () {
      this.seckInfo = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      //调用清空验证的方法
      this.$refs.seckInfo.resetFields();
      //清空时间
      this.timer = ''
    },
    // 确定事件
    addSeck () {
      this.$refs.seckInfo.validate(valid => {
        if (valid) {
          this.seckInfo.begintime = new Date(this.timer[0]).getTime()
          this.seckInfo.endtime = new Date(this.timer[1]).getTime()
          // console.log(this.seckInfo);
          //验证成功之后调用添加接口
          getSeckAdd(this.seckInfo).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // //确定之后，调用关闭弹框并清空
              this.cancel();
              //重新调用接口
              this.getSeckList();
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
    lookup (id) {
      getSeckInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.seckInfo = res.data.list;
          this.seckInfo.id = id;
          //针对于时间的回显要进行数组合并
          this.timer = [new Date(parseInt(this.seckInfo.begintime)), new Date(parseInt(this.seckInfo.endtime))]
          //重新调用二级分类和商品分类
          this.changeCate(true)
          this.changeGoods(true)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑事件
    editSeck () {
      this.$refs.seckInfo.validate(valid => {
        if (valid) {
          this.seckInfo.begintime = new Date(this.timer[0]).getTime()
          this.seckInfo.endtime = new Date(this.timer[1]).getTime()
          //验证成功之后调用添加接口
          getSeckEdit(this.seckInfo).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // //确定之后，调用关闭弹框并清空
              this.cancel();
              //重新调用接口
              this.getSeckList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
