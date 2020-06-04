export default {
  computed: {
    processRecordDetail () {
      const recordDetail = {}
      for (const title in this.recordDetail) {
        if (title === 'teacher') continue
        recordDetail[title] = this.recordDetail[title]
      }
      return recordDetail
    }
  }
}
