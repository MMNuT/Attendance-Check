<template>
  <div :style="{ backgroundColor }" @click="editAttendance" class="rollcallunit"></div>
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
    backgroundColor () {
      return this.attendance === this.attend ? this.attendanceColorList[attendanceFormat(this.attendance)] : ''
    }
  },
  methods: {
    editAttendance () {
      this.$store.dispatch('lecturer/editAttendance', { StudentId: this.scope.row.StudentId, attend: this.attend })
    }
  }
}
</script>

<style scoped>
.rollcallunit {
  height: 30px;
}
</style>
