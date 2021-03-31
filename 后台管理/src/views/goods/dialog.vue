<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加商品管理':'编辑商品管理'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="goodsInfo" :rules='rules' ref="goodsInfo">

        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select v-model="goodsInfo.first_cateid" placeholder="请选择" @change="changeCate(false)">
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select v-model="goodsInfo.second_cateid" placeholder="请选择">
            <el-option v-for="item in secCate" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品管理名称" :label-width="formLabelWidth" prop="goodsname">
          <el-input v-model="goodsInfo.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="goodsInfo.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth" prop="market_price">
          <el-input v-model="goodsInfo.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload action="#" list-type="picture-card" :on-preview="onPreview" :on-remove="handleRemove"
            :on-change='onChange' :auto-upload='false' :file-list="fileList" :limit="1" :on-exceed="onExceed">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="">

          </el-dialog>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth" prop="specsid">
          <el-select v-model="goodsInfo.specsid" placeholder="请选择" @change="changeSpecs(false)">
            <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" :label-width="formLabelWidth" prop="specsattr">
          <el-select v-model="goodsInfo.specsattr" placeholder="请选择" multiple>
            <el-option v-for="item in specsArr" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goodsInfo.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsInfo.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goodsInfo.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsInfo.ishot" :label="2">否 </el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="goodsInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addGoods">添加</el-button>
        <el-button v-else type="primary" @click="editGoods">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from '../../util/axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      goodsInfo: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1 //状态1正常2禁用
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" }
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" }
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" }
        ]
      },
      // 一级分类数组
      secCate: [],
      //创建一个规格属性数组
      specsArr: [],
      formLabelWidth: '120px',
      //设定动态添加表单项的数组
      attrArr: [
        {
          value: ""
        }
      ],
      // 控制图片的显示隐藏
      dialogVisible: false,
      // 预览时候的地址
      dialogImageUrl: [],
      imgUrl: '', //设置图片地址用于接收所有上传文件详情
      fileList: [] //用于图片回显
    };
  },

  methods: {
    //文件限制方法
    onExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 预览的回调函数
    onPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除的钩子函数
    handleRemove (file, fileList) {

    },
    onChange (file, fileList) {
      this.imgUrl = file.raw
    },
    // 修改一级分类事件
    changeCate (n) {
      let index = this.cateList.findIndex(item => item.id == this.goodsInfo.first_cateid)
      this.secCate = this.cateList[index].children
      if (!n) {
        this.goodsInfo.second_cateid = ''
      }
    },
    // 修改规格属性事件事件
    changeSpecs (n) {
      let index = this.specsList.findIndex(item => item.id == this.goodsInfo.specsid)
      console.log(this.specsList);
      this.specsArr = this.specsList[index].attrs
      if (!n) {
        this.goodsInfo.specsattr = ''
      }
    },
    // 添加商品
    addGoods () {
      this.$refs.goodsInfo.validate(valid => {
        if (valid) {
          this.goodsInfo.specsattr = this.goodsInfo.specsattr.join(",");
          this.goodsInfo.img = this.imgUrl
          let file = new FormData()
          for (let i in this.goodsInfo) {
            file.append(i, this.goodsInfo[i])
          }
          getGoodsAdd(file)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getGoodsList()
                // 重新调用总数
                this.getCount()
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
    editGoods () {
      this.$refs.goodsInfo.validate(valid => {
        if (valid) {
          this.goodsInfo.specsattr = this.goodsInfo.specsattr.join(",");
          this.goodsInfo.img = this.imgUrl ? this.imgUrl : this.goodsInfo.img
          let file = new FormData()
          for (let i in this.goodsInfo) {
            file.append(i, this.goodsInfo[i])
          }
          //验证成功之后调用添加接口
          getGoodsEdit(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // //确定之后，调用关闭弹框并清空
              this.cancel();
              //重新调用接口
              this.getGoodsList();
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
      getGoodsInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.goodsInfo = res.data.list
          // 判断图片是否存在  实现回显
          this.fileList = this.goodsInfo.img ? [{ url: this.$imgUrl + this.goodsInfo.img }] : []
          //针对于规格属性进行转化
          this.goodsInfo.specsattr = this.goodsInfo.specsattr ? this.goodsInfo.specsattr.split(",") : []
          this.changeCate(true)
          this.changeSpecs(true)
          //为编辑传送一个id值
          this.goodsInfo.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getCateList: "goodscate/getCateListAction",
      getSpecsList: "specs/getSpecsListAction",
      getCount: "goods/getCountAction"
    }),

    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.goodsInfo = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1 //状态1正常2禁用
      },
        this.$refs.goodsInfo.resetFields();
      this.fileList = []
    },
  },
  computed: {
    ...mapGetters({
      cateList: 'goodscate/getCateList',
      specsList: 'specs/getSpecsList'

    })
  },
  mounted () {
    this.getCateList()
    this.getSpecsList()
  },
  props: ['dialogInfo']
};
</script>

<style lang="" scoped>
</style>
