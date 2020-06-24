<template>
  <div class="complaint-copy-container">
    <MaskLoading v-if="loading"/>
    <div v-for="student in copyData" :key="student.Id">
      <table>
        <thead>
          <tr>
            <th v-for="(cn, en) in chileseTitle.step1" :key="en" :class="{ time: en === 'Time' }">
              {{ cn }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="small-box">
            <td v-for="(cn, en) in chileseTitle.step1" :key="en">
              {{ student[en] }}
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="large-box">
        <li v-for="(cn, en) in chileseTitle.step2" :key="en">
          <h3>{{ cn }}</h3>
          <p>{{ student[en] }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixins from './mixin'
import { timeFormat } from '@/utils/format'
import MaskLoading from '@/components/MaskLoading'

export default {
  mixins: [mixins],
  components: { MaskLoading },
  data () {
    return {
      copyData: [],
      loading: true
    }
  },
  created () {
    this.getCopyData()
  },
  mounted () {
    this.print()
  },
  computed: {
    hasData () {
      if (!this.copyData.length) return false
      return true
    }
  },
  methods: {
    getCopyData () {
      const data = JSON.parse(window.localStorage.getItem('complaintCopy'))
      console.log(data)
      this.copyData = data
      if (!this.hasData) {
        this.handleUnHasData()
      }

      this.$_sortData()
    },
    handleUnHasData () {
      this.$_message({
        type: 'error',
        message: '請點選查詢後列印'
      })
      this.$router.push({ path: '/totur/complaint/query-record' })
    },
    $_sortData () {
      this.copyData.forEach(data => {
        data.Time = timeFormat(data.Time, 'yyyy-mm-dd hh:mm:ss')
      })
    },
    print () {
      setTimeout(_ => {
        this.loading = false
        this.$nextTick(_ => {
          window.print()
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>
.complaint-copy-container > div {
  margin-bottom: 2rem;
}

.complaint-copy-container table {
  margin: 0 auto 0;
  width: 80rem;
}

.complaint-copy-container thead th {
  width: 15rem;
}

.complaint-copy-container thead .time {
  width: 22rem;
}

.complaint-copy-container .small-box td {
  border: .1rem solid black;
}

.complaint-copy-container .large-box li {
  display: flex;
  border-bottom: .1rem solid black;
}

.complaint-copy-container .large-box {
  width: 80.1rem;
  margin: 0 auto 0;
}

.complaint-copy-container .large-box h3 {
  border: .1rem solid black;
  border-bottom: 0;
  border-top: 0;
  flex: 22;
}

.complaint-copy-container .large-box p {
  border-right: .1rem solid black;
  flex: 45;
  margin-left: .1rem;
}

@media print {
  .complaint-copy-container > div {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .complaint-copy-container .large-box {
    width: 80rem;
  }
}
</style>
