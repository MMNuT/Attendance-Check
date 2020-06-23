<template>
  <div class="o-loginContainer">
    <h1 class="loginContainer__title f-size50">
      <span class="f-size100">A</span>ttendance <span class="f-size100">C</span>heck
    </h1>
    <h1 class="loginContainer__title f-size50 low576">
      <span class="f-size100">A</span><span class="f-size100">C</span>
    </h1>
    <div class="c-login">
      <div class="c-loginBox">
        <h2 class="c-loginBox__title f-size40">LOGIN</h2>
        <el-form :model="loginInfo" :rules="loginRules" ref="ruleForm">
          <el-form-item prop="Account">
            <h3 class="f-size30">帳號</h3>
            <el-input v-model="loginInfo.Account"></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <h3 class="f-size30">密碼</h3>
            <el-input v-model="loginInfo.Password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="Permission">
            <h3 class="f-size30">RULES</h3>
            <div class="c-permissionButtonBox">
              <div class="loading" v-if="loading.isLoading" :class="{ 'loading-out': loading.activeLeave }">
                <span class="railway-engine" :class="{ 'train-go': loading.activeLeave }">L</span>OAD<span class="rotateI">I</span>NG...
              </div>
              <transition-group v-else tag="div" appear class="c-permissionButtonBox--buttonBox" name="">
                <div
                  v-for="permission in primissions"
                  :key="permission.pvalue"
                  class="permissionButtonBox--button"
                  @click="loginInfo.Permission = permission.pvalue">
                  <el-button :class="{ current: loginInfo.Permission === permission.pvalue }">{{ permission.Subject | justTwoWord }}</el-button>
                </div>
              </transition-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="c-loginBox--final">
        <el-button class="margin-lr3" @click="login" :disabled="loading.isLoading">登入</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPermission } from '@/api/user'
import { URLSearchParamsformat } from '@/utils/format'
import router from '@/router'
// import { mapGetters } from 'vuex'
console.log(router)

export default {
  created () {
    this.getPermission()
    this.clearLocalStorage()
    this.$store.dispatch('user/resetToken')
  },
  data () {
    return {
      // 按鈕
      primissions: [],
      // 登入資料
      loginInfo: {
        Account: 'hung@gmail.com',
        Password: 'T195479867',
        Permission: ''
      },
      // 驗證規則
      loginRules: {
        Account: [
          { required: true, message: '請輸入帳號', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' }
        ],
        Permission: [
          { required: true, message: '請選擇角色' }
        ]
      },
      // loading 狀態
      loading: {
        isLoading: true,
        activeLeave: false
      }
    }
  },
  computed: {
    // 跳轉路由轉換
    initPath () {
      switch (this.loginInfo.Permission) {
        case '01':
          return '/lecturer'
        case '02':
          return '/totur'
        case '03':
          return '/admin-staff'
        case '04':
          return '/student'
      }
      return '/'
    }
    // ...mapGetters(['roles'])
  },
  filters: {
    justTwoWord (val) {
      return val.trim().substr(0, 2)
    }
  },
  methods: {
    async getPermission () {
      try {
        // 獲取權限按鈕
        const { data } = await getPermission()
        console.log(data)
        // 開啟動畫
        await this.$_loadingLeave()
        // 顯示按鈕
        this.primissions = data
        this.loading.isLoading = false
      } catch (error) {
        console.log('錯誤', error)
        return error
      }
    },
    $_loadingLeave () {
      return new Promise(resolve => {
        // 開始動畫
        this.loading.activeLeave = true
        // 等動畫結束
        setTimeout(_ => { resolve() }, 3000)
      })
    },
    async login () {
      // 初步驗證表單內容
      await this.$_validFormData()
      // 送登入請求
      await this.$_login()
    },
    $_validFormData () {
      return new Promise(resolve => {
        // 驗證函數
        this.$refs.ruleForm.validate(validRed => {
          if (validRed) {
            resolve(true)
          }
        })
      })
    },
    async $_login () {
      try {
        // 後台需要 urlecoded
        const params = URLSearchParamsformat(this.loginInfo)
        // 登入請求
        await this.$store.dispatch('user/login', params)
        console.log(this.$route.query.redirect, this.initPath)
        // 成功就跳轉
        await this.$router.push({ path: this.$route.query.redirect || `${this.initPath}` })
      } catch (error) {
        console.log(error)
        return error
      }
    },
    // 選擇按鈕
    choosePermission (pvalue) {
      this.loginInfo.Permission = pvalue
    },
    // 重置表單
    resetForm () {
      console.log(this.roles)
      this.$refs.ruleForm.resetFields()
    },
    clearLocalStorage () {
      delete localStorage.copy
      delete localStorage.complaintCopy
    }
  }
}
</script>

<style scoped>
@import './style/index.css';
@import './style/login-box.css';
@import './style/low576.css';

/* 過度動畫 */
.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: all 1s ease;
}
</style>
