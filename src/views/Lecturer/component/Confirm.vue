<template>
  <el-dialog :visible="dialogVisible" @update:visible="updateDialogVisible" :width="width">
    <ul>
      <li v-for="attendData in data" :key="attendData.attendance" class="c-attendBox">
        <h4 :style="{ backgroundColor: attendanceColorList[attendData.attendance] }" class="attendBox__title">{{ attendData.attendance }}</h4>
        <ul class="attendBox__name-box">
          <li v-for="(name, index) in attendData.data" :key="index">{{ name }}</li>
        </ul>
      </li>
    </ul>
    <el-button @click="$emit('update:dialogVisible', false)">修改</el-button>
    <el-button @click="$emit('requestData')">送出</el-button>
  </el-dialog>
</template>

<script>
import defaultSet from '@/mixins/default'

export default {
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
      default: '70%'
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
.c-attendBox {
}

.c-attendBox .attendBox__name-box {
  display: flex;
}

.attendBox__name-box li {
  padding: 0 5px;
  background: #badc58;
  border-radius: 50%;
}
</style>
