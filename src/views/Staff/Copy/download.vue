<template>
  <div>
    <div v-for="data in copyData" :key="data.StudentNumber">
      <div class="page1 page">
        <div class="cover">
          <div class="cover-head">
            <div class="cover-head__address">
              <p>806</p>
              <p>高雄市前鎮區</p>
              <p>復興四路<span>12</span>號</p>
              <p>火箭國中<span>學務處</span></p>
            </div>
            <h2>曠課通知單</h2>
            <div class="cover-head__stamp">請貼郵票</div>
          </div>
          <div class="cover-body">
            <div class="recive-address">{{ data.Address }}</div>
            <div class="recive-name">{{ data.Guardian }}<span>收</span></div>
          </div>
        </div>
        <div class="paste-place">黏貼處</div>
      </div>
      <div class="page2 page">
        <table>
          <caption>本月曠課節表:</caption>
          <thead>
            <tr>
              <th v-for="show in showDetail" :key="show.en">{{ show.chinese }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in data.result" :key="result.index">
              <td v-for="show in showDetail" :key="show.en">{{ result[show.en] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      copyData: [],
      showDetail: [{
        chinese: '日期',
        en: 'LessonDate'
      },
      {
        chinese: '堂數',
        en: 'LessonOrder'
      },
      {
        chinese: '科目',
        en: 'Subject'
      }]
    }
  },
  created () {
    this.getCopyData()
  },
  mounted () {
    this.print()
  },
  methods: {
    getCopyData () {
      this.copyData = JSON.parse(window.localStorage.getItem('copy'))
    },
    print () {
      setTimeout(_ => {
        window.print()
      }, 2000)
    }
  }
}
</script>

<style scoped>
.page1 {
  height: 100vh;
  position: relative;
}

.page1 .cover {
  padding: 2rem;
  border-top: .1rem dashed black;
  border-bottom: .1rem dashed black;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

.page1 .cover .cover-head {
  display: flex;
  margin-bottom: 3rem;
}

.page1 .cover .cover-head > h2 {
  flex: 1;
  text-align: center;
  align-self: center;
  height: 100%;
}
.page1 .cover .cover-head .cover-head__stamp {
  border: .1rem solid var(--black);
}

.page1 .cover .cover-body {
  border: .1rem solid black;
  padding: 1rem;
}

.page1 .cover-body .recive-address {
  height: 8rem;
}

.page1 .cover-body .recive-name {
  text-align: center;
}

.page1 .paste-place {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: .1rem dashed black;
  text-align: center;
}

.page2 {
  padding: 2rem;
}
.page2 table td {
  border: .1rem solid black;
  padding: 1rem;
}

@media print {
  .page {
    break-after: page;
  }
}
</style>
