<template>
  <el-dialog :visible="dialogVisible" @update:visible="updateDialogVisible" :width="width" :show-close="false" custom-class="confirm-Attend">
    <div v-if="isAllComing" class="all-coming-messagebox c-attendBox">
      <p class="all-coming-messagebox__content">全員到齊</p>
    </div>
    <ul v-else>
      <!--  -->
      <li v-for="attendData in filterData" :key="attendData.attendance" class="c-attendBox" :class="attendanceColorNameList[attendData.attendance]">
        <div class="attendBox__title">
          <h4>{{ attendData.attendance | sliceToOneWord }}</h4>
        </div>
        <ul class="attendBox__name-box">
          <!-- 名字不是三個字的話, 還沒處理, 有空再說 -->
          <li v-for="(name, index) in attendData.data" :key="index">{{ name }}</li>
        </ul>
      </li>
    </ul>
    <div class="button-box">
      <el-button @click="$emit('update:dialogVisible', false)">修改</el-button>
      <el-button @click="$emit('requestData')">送出</el-button>
    </div>
  </el-dialog>
</template>

<script>
import defaultSet from '@/mixins/default'
import { sliceToOneWord } from '@/utils/format'

export default {
  filters: {
    sliceToOneWord
  },
  mixins: [defaultSet],
  props: {
    data: {
      type: Array,
      require: true
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '60%'
    }
  },
  computed: {
    filterData () {
      console.log(this.data)
      return this.data.filter(d => d.data)
    },
    isAllComing () {
      if (this.filterData.length === 0) return true
      return false
    }
  },
  methods: {
    updateDialogVisible (boo) {
      this.$emit('update:dialogVisible', boo)
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/attend-list.css';
@import '../../../assets/css/attend-list-color.css';

@media screen and (max-width: 576px) {
  .c-attendBox {
    position: relative;
  }

  .c-attendBox .attendBox__title {
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 2.5rem;
    height: 3rem;
    margin: 0;
    transform: translate(-25%, -20%);
  }

  .c-attendBox .attendBox__title h4 {
    font-size: 3rem;
  }
}
</style>

<style>
.confirm-Attend .el-dialog__header {
  height: 2rem;
}

.confirm-Attend .el-dialog__body {
  position: relative;
  padding-bottom: 1rem;
}

@media screen and (max-width: 576px) {
  .confirm-Attend {
    min-width: 24rem;
  }
}
</style>
