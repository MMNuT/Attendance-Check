<template>
  <div class="c-head">
    <Burger @toggleCollapse="$listeners.toggleCollapse"/>
    <Breadcrumb/>
    <div class="head__headRightInfo">
      <el-button class="head__headRightInfoLogoutButton" @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Burger from './Burger'

export default {
  components: { Breadcrumb, Burger },
  methods: {
    logout () {
      this.$store.dispatch('user/resetToken')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.c-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
}
.head__headRightInfoLogoutButton {
  line-height: 1rem;
  border: 0;
}
</style>
