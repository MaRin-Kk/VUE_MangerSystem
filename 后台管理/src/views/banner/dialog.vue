<template>
  <div>
    <el-dialog :title="dialogInfo.isAdd?'添加轮播图':'编辑轮播图'" :visible.sync="dialogInfo.isShow" :before-close='cancel'>
      <el-form :model="bannerInfo" :rules='rules' ref="bannerInfo">

        <el-form-item label="轮播图标题" :label-width="formLabelWidth" prop='title'>
          <el-input v-model="bannerInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- 上传图片 -->
          <el-upload action="#" list-type="picture-card" :on-preview="onPreview" :on-remove="handleRemove"
            :on-change='onChange' :auto-upload='false' :file-list="fileList" :limit="1" :on-exceed="onExceed">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="bannerInfo.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type=" primary" @click="addBanner">添加</el-button>
        <el-button v-else type="primary" @click="editBanner">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addbanner, getbannerInfo, postEditbanner } from '../../util/axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      bannerInfo: {
        title: '',
        img: '',
        status: 1
      },
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      },
      // 控制图片的显示隐藏
      dialogVisible: false,
      // 预览时候的地址
      dialogImageUrl: [],
      imgUrl: '', //设置图片地址用于接收所有上传文件详情
      fileList: [] //用于图片回显
    };
  },
  components: {

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

    // 添加图片
    addBanner () {
      this.$refs.bannerInfo.validate(valid => {
        if (valid) {
          this.bannerInfo.img = this.imgUrl
          let file = new FormData()
          for (let i in this.bannerInfo) {
            file.append(i, this.bannerInfo[i])
          }
          addbanner(file)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                // 重新调用接口
                this.getBannerList()
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
    editBanner () {
      this.$refs.bannerInfo.validate(valid => {
        if (valid) {
          //如果编辑的时候，你重新上传图片，this.imgUrl肯定有值，我们赋值就用this.imgUrl去赋值。如果编辑的时候，没变。用this.bannerInfo.img
          this.bannerInfo.img = this.imgUrl ? this.imgUrl : this.bannerInfo.img
          //针对于整体表单进行formData转化
          let file = new FormData()
          for (let i in this.bannerInfo) {
            file.append(i, this.bannerInfo[i])
          }
          postEditbanner(file)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg)
                this.cancel()
                this.reset()
                // 重新调用接口
                this.getBannerList()

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
      getbannerInfo({ id })
        .then(res => {
          if (res.data.code = 200) {
            this.bannerInfo = res.data.list
            this.bannerInfo.id = id
            // 判断图片是否存在  实现回显
            this.fileList = this.bannerInfo.img ? [{ url: this.$imgUrl + this.bannerInfo.img }] : []
          } else {
            this.$message
          }
        })
    },
    ...mapActions({
      getBannerList: 'banner/getBannerListAction',

    }),
    cancel () {
      this.$emit('cancel', false)
      this.reset()
    },
    reset () {
      this.bannerInfo = {
        title: "", //轮播图名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      };
      this.$refs.bannerInfo.resetFields();
      this.fileList = []
    },
  },

  mounted () {
    this.getBannerList()
  },
  props: ['dialogInfo']
};
</script>

<style lang="" scoped>
</style>
