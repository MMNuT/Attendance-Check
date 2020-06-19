<template>
  <div class="rollcallunit" :class="className"></div>
</template>

<script>
import { attendanceFormat } from '@/utils/format'
import defaultSet from '@/mixins/default'

export default {
  mixins: [defaultSet],
  props: ['scope', 'attend'],
  computed: {
    attendance () {
      return this.scope.row.Attendance
    },
    className () {
      return this.attendance === this.attend ? this.attendanceColorNameList[attendanceFormat(this.attendance)] : ''
    }
  }
}
</script>

<style scoped>
.rollcallunit {
  height: 3rem;
  border-radius: 1.5rem;
}
</style>
