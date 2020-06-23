<template>
  <div class="fill-background">
    <div class="fill-container">
      <MyStep :active="active" :title="title" @click="goto"></MyStep>
      <div class="fill__main-box">
        <el-form
          :model="recordFillData.step1"
          :rules="recordFillDataFormRules.step1"
          ref="ruleForm1"
          label-position="top"
          v-show="active === 1">
            <el-form-item label="聯繫時間" prop="ContactDateTime">
              <!-- 下面還沒拆成第一頁跟第二頁, 寫到這-->
              <el-date-picker
                v-model="recordFillData.step1.ContactDateTime"
                type="datetime"
                placeholder="請選擇時間"
                :default-value="new Date()"
                value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>
            <el-form-item label="學生" prop="StudentId">
              <el-select v-model="recordFillData.step1.StudentId" placeholder="請選擇學生">
                <el-option v-for="student in studentNames" :key="student.Id" :value="student.Id" :label="student.Name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="學生家長" prop="ContactGuardian">
              <el-input v-model="recordFillData.step1.ContactGuardian"></el-input>
            </el-form-item>
            <label>
              <el-form-item label="聯繫方法" prop="Method">
                <el-input v-model="recordFillData.step1.Method"></el-input>
                <!--<el-input type="textarea" v-model="recordFillData.step2.Method" resize="none"></el-input>-->
              </el-form-item>
            </label>
        </el-form>
        <el-form
          :model="recordFillData.step2"
          :rules="recordFillDataFormRules.step2"
          ref="ruleForm2"
          label-position="top"
          v-show="active === 2">
            <label>
              <el-form-item label="聯繫原因" prop="Reason">
                <el-input type="textarea" v-model="recordFillData.step2.Reason" resize="none"></el-input>
              </el-form-item>
            </label>
            <label>
              <el-form-item label="聯繫結果" prop="Results">
                <el-input type="textarea" v-model="recordFillData.step2.Results" resize="none"></el-input>
              </el-form-item>
            </label>
        </el-form>
        <div v-show="active === 3">
          <ul v-for="title in confirmMessage" :key="title.step" class="fill__confirm-box" :class="title.step">
            <li v-for="d in title.data" :key="d.title" class="fill__confirm-content-box">
              <h4 class="fill__confirm-title">{{ d.title }}</h4>
              <p class="fill__confirm-content">{{ recordFillData[title.step][d.data] }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-box" :class="{ step1: active === 1 }">
        <div class="back-button" v-show="active !== 1" @click="back">
          <Icon icon-class="back" class-name="back-svg"/>
        </div>
        <el-button @click="next" v-if="active !== 3">下一步</el-button>
        <el-button @click="sendRecord" v-else>送出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudentNames, createContactrecord } from '@/api/teacher-tutor'
import { URLSearchParamsformat } from '@/utils/format'
import { MyStep } from './Compoent'

export default {
  components: { MyStep },
  data () {
    return {
      /* step 正在活動的步數 */
      active: 1,
      /* step 的標題 */
      title: ['姓名時間', '詳細敘述', '最後確認'],
      studentNames: [],
      recordFillData: {
        step1: {
          ContactDateTime: '',
          StudentId: '',
          ContactGuardian: '',
          Method: ''
        },
        step2: {
          Reason: '',
          Results: ''
        }
      },
      recordFillDataFormRules: {
        step1: {
          ContactDateTime: [{
            required: true,
            message: '請選擇時間',
            trigger: 'blur'
          }],
          StudentId: [{
            required: true,
            message: '請選擇學生',
            trigger: 'change'
          }],
          ContactGuardian: [{
            required: true,
            message: '請輸入家長姓名',
            trigger: 'blur'
          }],
          Method: [{
            required: true,
            message: '請輸入聯繫方法',
            trigger: 'blur'
          }]
        },
        step2: {
          Reason: [{
            required: true,
            message: '請輸入聯繫原因',
            trigger: 'blur'
          }],
          Results: [{
            required: true,
            message: '請輸入聯繫結果',
            trigger: 'blur'
          }]
        }
      },
      confirmMessage: [
        {
          step: 'step1',
          title: '姓名時間',
          data: [{
            title: '學生',
            data: 'StudentId'
          }, {
            title: '學生家長',
            data: 'ContactGuardian'
          },
          {
            title: '聯繫時間',
            data: 'ContactDateTime'
          },
          {
            title: '聯繫方法',
            data: 'Method'
          }]
        },
        {
          step: 'step2',
          title: '詳細敘述',
          data: [{
            title: '聯繫原因',
            data: 'Reason'
          }, {
            title: '聯繫結果',
            data: 'Results'
          }]
        }
      ]
    }
  },
  created () {
    this.getStudentName()
  },
  methods: {
    // 獲得導生班名單
    async getStudentName () {
      try {
        const { data } = await getStudentNames()
        this.studentNames = data
      } catch (error) {
        console.log(error)
        return error
      }
    },
    // 下一步
    async next () {
      // 這裡沒有寫好，應該開個函數跑循環判斷類型，字串就 trim()
      /* 去前後空白 */
      if (this.active === 1) {
        this.recordFillData.step1.ContactGuardian = this.recordFillData.step1.ContactGuardian.trim()
      }
      /* 去前後空白 */
      if (this.active === 2) {
        Object.keys(this.recordFillData.step2).forEach(key => {
          this.recordFillData.step2[key] = this.recordFillData.step2[key].trim()
        })
      }
      const valid = await this.$_validate()
      if (!valid) return false
      this.active++
    },
    back () {
      this.active--
    },
    // 送出
    async sendRecord () {
      // 驗證是否都有填
      console.log(this.recordFillData)
      if (this.$_finallyCheckData()) {
        // 送數據, 明天在測試一次, 沒問題就可以把送數據寫進來了
        try {
          // 都有填就送資料
          const { code, message } = await createContactrecord(URLSearchParamsformat({ ...this.recordFillData.step1, ...this.recordFillData.step2 }))
          if (code) {
            this.$_message({
              message,
              type: 'success'
            })
            // this.$_clearData()
            this.$refs.ruleForm1.resetFields()
            this.$refs.ruleForm2.resetFields()
            this.active = 1
          }
        } catch (error) {
          console.log(error)
          return error
        }
      }
    },
    async $_validate (formRef = 'ruleForm' + this.active) {
      return new Promise(resolve => {
        this.$refs[formRef].validate(valid => {
          resolve(valid)
        })
      })
    },
    $_clearData () {
      this.recordFillData = {
        step1: {
          ContactDateTime: '',
          StudentId: '',
          ContactGuardian: ''
        },
        step2: {
          Method: '',
          Reason: '',
          Results: ''
        }
      }
      this.active = 1
    },
    $_finallyCheckData () {
      // 確認一下每個節點都有資料, 沒有就跳到該頁
      return !Object.keys(this.recordFillData).some((step, index) => {
        return Object.keys(this.recordFillData[step]).some(key => {
          if (!this.recordFillData[step][key]) {
            this.active = index + 1
            this.$_validate()
            /*
            this.$nextTick(_ => {
              this.$_validate()
            })
            */
            return true
          }
        })
      })
    },
    async goto (num) {
      /* 如果要下一步要先驗證當前頁面都有填完 */
      if (num > this.active) {
        const valid = await this.$_validate()
        if (!valid) return false
      }
      /* 如果一次跳兩個以上, 再要跳的區間都要驗證一下，沒過就跳到該頁,
      如果不寫通用點的話就, 這問題就是一跳三的bug, 判斷如果當下是1 num 是 3 的情況驗證2 */
      if (num > this.active + 1) {
        for (let i = this.active + 1; i < num; i++) {
          // 這裡要驗證,
          const valid = await this.$_validate('ruleForm' + i)
          if (!valid) {
            this.active = i
            return false
          }
        }
      }
      this.active = num
    }
  }
}
</script>

<style scoped>
.fill-background {
  height: 100%;
  background: #f9f9f9;
  padding-top: 2rem;
}

.fill-container {
  width: 60rem;
  margin: 0 auto 0;
  box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, .2);
  background: white;
  border-radius: 2rem;
  padding: 2rem;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fill__main-box {
  overflow: auto;
  flex: 1;
  margin: 1rem 0;
}

.fill__main-box .content-box {
  margin: 1rem 0;
}

/* 返回按鈕樣式 */
.button-box {
  display: flex;
  justify-content: space-between;
}

.step1.button-box {
  justify-content: flex-end;
}

.back-button {
  background: black;
  color: white;
  border-radius: 50%;
  width: 5rem;
  position: relative;
  height: 5rem;
  cursor: pointer;
}

.back-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 768px) and (min-width: 576px) {
  .fill-container {
    width: 100%;
    max-width: 600px;
  }
}

@media screen and (max-width: 576px) {
  .fill-container {
    width: 100%;
  }
  .fill-container .step-container {
    min-width: 250px
  }
}
</style>

<style>
/* 整體樣式 */
.fill-container .el-form-item__label {
  font-family: "JasonHandwriting3";
  font-size: 3rem;
  padding: 0;
  background: var(--black);
  color: var(--white);
  border-radius: 2rem;
  padding: .5rem;
  margin-bottom: .5rem;
}

.fill-container .el-form-item {
  margin-bottom: 2.8rem;
}

.fill-container .el-form-item__label::before {
  color: var(--main-red);
}

.fill-container .el-textarea textarea {
  font-family: 'jf-openhuninn';
  font-size: 2.2rem;
  padding: 1.5rem;
}

.el-form-item__content .el-date-editor.el-input {
  width: auto;
}
</style>
