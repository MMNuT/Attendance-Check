<template>
  <div class="conduct-container">
    <div class="student-list-box">
      <el-table
        :data="performanceScore"
        style="width: 100%"
        :max-height="tableMaxHeight"
        @row-click="displayDetail"
        class="pointer">
        <template #empty>
          <p>等待, </p>
          <p>我隨時隨地在等待</p>
        </template>
        <el-table-column prop="Name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="StudentNumber" label="學號" width="110"></el-table-column>
        <el-table-column prop="Deduction" label="操行分數" width="100"></el-table-column>
      </el-table>
    </div>
    <div v-if="displayDetailData" class="show-detail-box">
      <div class="business-card">
        <div>
          <h1 class="student-name">{{ displayDetailData.Name }}</h1>
          <h4>{{ displayDetailData.StudentNumber }}</h4>
        </div>
        <ul class="student-info-box">
          <li v-for="infoKey in displayBasicInfo" :key="infoKey.key">
            <p class="student-info-key">{{ infoKey.chinese }}</p>
            <p class="student-info-value">{{ displayDetailData[infoKey.key] }}</p>
          </li>
        </ul>
      </div>
      <ul class="deduction-detail-box">
        <li v-for="(detail, key) in displayDetailData.deductionDetail" :key="key">
          <div class="deduction-detail-title">
            <h3>{{ key }}</h3>
            <p><span>{{ detail['扣分']}}</span>分</p>
          </div>
          <Progress :ang="detail.ang" :word="{ child: detail.remainder, mother: detail.rules }"/>
        </li>
        <li class="deduction-totel-box">
          <h3>操行扣分</h3>
          <div class="deduction-totel">
            <p>{{ displayDetailData.Deduction }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="rules-box">
      <h3>學生操行成績評定辦法</h3>
      <dl class="rule">
        <dt>第四條</dt>
        <dd class="ruleContent">
          <p>學生操行成績之評定，基本分為八十二分，依據第二、三條所得平均分數，按下列標
          準分別予以加（減）分，核計其實得總分。</p>
          <dl>
            <dt>一、依照考勤結果之加減分數，其標準如次:</dt>
            <dd>（一）曠課每 2 次扣 1 分。</dd>
            <dd>（二）遲到每 3 次扣 1 分。</dd>
            <dd>（三）事假每缺課二十小時扣 1 分。</dd>
            <dd>（四）病假每缺課五十小時扣 1 分(但因重病住院治療超過一星期以上者，得酌按每
              缺課一百小時扣 1 分)。</dd>
            <dd>（五）公(自請)、婚、喪、產假，陪產假及生理假均不予扣分但不列入全勤</dd>
          </dl>
        </dd>
      </dl>
    </div>
    <!-- 操行公式顯示匡 -->
    <el-dialog title="請假扣分標準" :visible.sync="dialogVisible" width="30%">
      <ul>
        <li v-for="(rule, status) in performanceScoreDeductRules" :key="status">
          <h4>{{ status }}</h4>
          <p>{{ rule.time }}</p>
          <p>{{ rule.decuctScore }}</p>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { getPerformanceScore } from '@/api/teacher-tutor'
import Progress from '@/components/Progress'
import { deductionFormat, deductionDetailFormat, performanceScoreDeductRules } from '@/utils/format'

export default {
  components: { Progress },
  data () {
    return {
      performanceScore: [],
      dialogVisible: false,
      performanceScoreDeductRules,
      displayDetailData: null,
      displayBasicInfo: [
        { key: 'Guardian', chinese: '家長' },
        { key: 'PhoneNunber', chinese: '電話' },
        { key: 'Address', chinese: '地址' }
      ]
    }
  },
  computed: {
    tableMaxHeight () {
      console.log(this.$store.getters.clientHeight - 60 - 40)
      return this.$store.getters.clientHeight - 60 - 40
    }
  },
  created () {
    this.getPerformanceScore()
  },
  methods: {
    async getPerformanceScore () {
      const { data } = await getPerformanceScore()
      this.performanceScore = this.$_sortData(data)
    },
    $_sortData (data) {
      /**
       * 控制格式
       *   {
       *     基本資料s,
       *     未出席詳情: {  }
       *   }
       */
      const basicData = ['Address', 'Deduction', 'Guardian', 'Name', 'PhoneNunber', 'StudentId', 'StudentNumber']
      const status = ['曠課', '遲到', '事假', '病假', '喪假']

      return deductionFormat(basicData, status, data)
    },
    displayDetail (row) {
      deductionDetailFormat(row)
      this.displayDetailData = row
    }
  }
}
</script>

<style scoped>
@import './style/business-card.css';
.conduct-container {
  height: 100%;
  display: flex;
}

.conduct-container .student-list-box {
  margin-right: 10px;
}

.rules-box {
  color: var(--main-black);
  min-width: 353px;
}

.rules-box .rule {
  font-size: 2.2rem;
  display: flex;
}

.rules-box .rule > dt {
  min-width: 8rem;
}

.rules-box .rule .ruleContent dl > dd {
  margin-left: 2rem;
}
/*
.show-detail-box {
  max-width: 70rem;
  margin-left: 1rem;
  height: 100%;
}

.conduct-container {
  min-width: 102.4rem;
  display: flex;
}

.rules-box {
  color: var(--main-black);
}

.rule {
  font-size: 2.2rem;
  display: flex;
}

.rule > dt {
  width: 15rem;
}

.ruleContent dl > dd {
  margin-left: 2rem;
}
*/
</style>
