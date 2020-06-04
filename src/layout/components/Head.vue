<template>
  <div class="c-head">
    <div class="sidebar-burger-menu">
      <div class="eat-burger"></div><!-- 還沒寫吃漢堡的動畫 -->
      <div @click="$emit('toggleCollapse')" class="sidebar-burger">
        <span class="sidebar-burger__bread sidebar-burger__breadtop"></span>
        <span class="sidebar-burger__tomato"></span>
        <span class="sidebar-burger__meat"></span>
        <span class="sidebar-burger__vegetable"></span>
        <span class="sidebar-burger__bread sidebar-burger__breadbottom"></span>
      </div>
    </div>
    <Breadcrumb/>
    <div class="head__headRightInfo">
      <button class="head__headRightInfoLogoutButton" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: { Breadcrumb },
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
}
.c-head .head__headRightInfo {
  display: flex;
  align-items: center;
}
.c-head .head__headRightInfoLogoutButton {
  height: 30px;
  border-radius: 5px;
  padding: 5px;
}
.c-head .sidebar-burger-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.c-head .sidebar-burger span {
  display: block;
  height: 2px;
  width: 20px;
  background: black;
  margin: 0 0 2px;
}
.c-head .sidebar-burger .sidebar-burger__bread {
  background: var(--burger-bread);
}
.c-head .sidebar-burger .sidebar-burger__breadtop {
  height: 10px;
  border-radius: 5px 5px 0px 0px;
}
.c-head .sidebar-burger .sidebar-burger__tomato {
  background: var(--burger-tomato);
}
.c-head .sidebar-burger .sidebar-burger__meat {
  background: var(--burger-meat);
}
.c-head .sidebar-burger .sidebar-burger__vegetable {
  background: var(--burger-vagetable);
}
</style>
