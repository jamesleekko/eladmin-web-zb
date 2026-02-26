<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" style="width: 550px;" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章类型" prop="type">
            <el-select
              v-model="form.type"
              placeholder="选择类型"
              style="width: 100%;"
            >
              <el-option
                v-for="item in articleTypes"
                :key="item.type"
                :label="item.displayName"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文件类型" prop="articleKindName">
            <el-select
              v-model="form.articleKindName"
              placeholder="选择文件类型"
              style="width: 100%;"
            >
              <el-option
                v-for="item in articleKinds"
                :key="item.name"
                :label="item.displayName"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文件上传">
        <el-upload
          ref="upload"
          :limit="1"
          :auto-upload="true"
          :headers="headers"
          :action="uploadApi"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" icon="el-icon-upload2">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">上传文件不超过100M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 12 }"
          style="width: 550px;"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="crud.cancelCU">取消</el-button>
      <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { form } from '@crud/crud'
import { getArticleKinds } from '@/api/system/article'

const defaultForm = {
  id: null,
  title: '',
  type: null,
  articleKindName: null,
  fileName: '',
  filePath: '',
  content: '',
  deptId: null
}
export default {
  mixins: [form(defaultForm)],
  props: {
    articleTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      articleKinds: [],
      fileList: [],
      headers: { 'Authorization': getToken() },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['generalUploadApi']),
    uploadApi() {
      return this.generalUploadApi + '?dir=article'
    }
  },
  watch: {
    'crud.status.cu'(val) {
      if (val > 0 && this.form.filePath) {
        this.fileList = [{ name: this.form.fileName || this.form.filePath, url: this.form.filePath }]
      } else {
        this.fileList = []
      }
    }
  },
  created() {
    this.loadArticleKinds()
  },
  methods: {
    loadArticleKinds() {
      getArticleKinds().then(res => {
        this.articleKinds = res
      })
    },
    handleUploadSuccess(response) {
      this.form.fileName = response.fileName
      this.form.filePath = response.filePath
      this.$message.success('文件上传成功')
    },
    handleUploadRemove() {
      this.form.fileName = ''
      this.form.filePath = ''
    },
    handleExceed() {
      this.$message.warning('只能上传一个文件，请先删除已上传的文件')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
