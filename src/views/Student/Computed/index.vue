<template>
  <div class="deduction-container">
    <ul class="deduction-detail-box" v-if="deduction">
      <li v-for="(detail, key) in deduction.deductionDetail" :key="key">
        <div class="deduction-detail-title">
          <h3>{{ key }}</h3>
          <p><span>{{ detail['扣分']}}</span>分</p>
        </div>
        <Progress :ang="detail.ang" :word="{ child: detail.remainder, mother: detail.rules }"/>
      </li>
      <li class="deduction-totel-box">
        <h3>操行扣分</h3>
        <div class="deduction-totel">
          <p>{{ deduction.Deduction }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDeduction } from '@/api/student'
import { deductionFormat, deductionDetailFormat } from '@/utils/format'
import Progress from '@/components/Progress'

export default {
  components: { Progress },
  data () {
    return {
      deduction: ''
    }
  },
  created () {
    this.getDeduction()
  },
  methods: {
    async getDeduction () {
      const { data } = await getDeduction()
      this.deduction = this.$_sortData(data)
      console.log(this.deduction)
    },
    $_sortData (data) {
      const basicData = ['Deduction']
      const status = ['曠課', '遲到', '事假', '病假', '喪假']
      return deductionDetailFormat(deductionFormat(basicData, status, data)[0])
    }
  }
}
</script>

<style>
.deduction-container {
  width: 65rem;
  margin: 0 auto 0;
}
</style>
