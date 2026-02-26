<template>
  <div v-if="crud.props.searchToggle">
    <el-input
      v-model="query.title"
      clearable
      size="small"
      placeholder="输入文章标题搜索"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="crud.toQuery"
    />
    <el-select
      v-model="query.type"
      clearable
      size="small"
      placeholder="文章类型"
      class="filter-item"
      style="width: 120px"
      @change="crud.toQuery"
    >
      <el-option
        v-for="item in articleTypes"
        :key="item.type"
        :label="item.displayName"
        :value="item.type"
      />
    </el-select>
    <el-select
      v-model="query.articleKindName"
      clearable
      size="small"
      placeholder="文件类型"
      class="filter-item"
      style="width: 120px"
      @change="crud.toQuery"
    >
      <el-option
        v-for="item in articleKinds"
        :key="item.name"
        :label="item.displayName"
        :value="item.name"
      />
    </el-select>
    <date-range-picker v-model="query.createTime" class="date-item" />
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import DateRangePicker from '@/components/DateRangePicker'
export default {
  components: { rrOperation, DateRangePicker },
  mixins: [header()],
  props: {
    articleTypes: {
      type: Array,
      default: () => []
    },
    articleKinds: {
      type: Array,
      default: () => []
    },
    permission: {
      type: Object,
      required: true
    }
  }
}
</script>
