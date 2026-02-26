<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :article-types="articleTypes" :article-kinds="articleKinds" :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" />
      <el-table-column prop="type" label="类型" width="150">
        <template slot-scope="scope">
          {{ articleTypeMap[scope.row.type] || scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column prop="articleKindName" label="文件类型" width="100">
        <template slot-scope="scope">
          {{ articleKindMap[scope.row.articleKindName] || scope.row.articleKindName }}
        </template>
      </el-table-column>
      <el-table-column prop="fileName" label="文件名" :show-overflow-tooltip="true" />
      <el-table-column prop="updateTime" label="更新日期" width="160" />
      <!--编辑与删除-->
      <el-table-column
        v-if="checkPer(['admin','article:edit','article:del'])"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm :article-types="articleTypes" />
  </div>
</template>

<script>
import crudArticle, {
  getArticleKinds,
  getArticleTypes
} from '@/api/system/article'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

import eForm from './module/form'
import eHeader from './module/header'

export default {
  name: 'Article',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '文章',
      url: 'api/article',
      sort: ['id,desc'],
      crudMethod: { ...crudArticle }
    })
  },
  mixins: [presenter()],
  data() {
    return {
      permission: {
        add: ['admin', 'article:add'],
        edit: ['admin', 'article:edit'],
        del: ['admin', 'article:del']
      },
      articleTypes: [],
      articleKinds: [],
      articleTypeMap: {},
      articleKindMap: {}
    }
  },
  created() {
    this.loadArticleTypes()
    this.loadArticleKinds()
  },
  methods: {
    loadArticleTypes() {
      getArticleTypes().then(res => {
        this.articleTypes = res
        const map = {}
        res.forEach(item => {
          map[item.type] = item.displayName
        })
        this.articleTypeMap = map
      })
    },
    loadArticleKinds() {
      getArticleKinds().then(res => {
        this.articleKinds = res
        const map = {}
        res.forEach(item => {
          map[item.name] = item.displayName
        })
        this.articleKindMap = map
      })
    }
  }
}
</script>
