<template>
  <div class="sidebar-burger-menu">
    <div class="eat-burger"></div>
    <div @click="handleToggle" class="sidebar-burger">
      <span class="sidebar-burger__bread sidebar-burger__breadtop"></span>
      <span class="sidebar-burger__tomato"></span>
      <span class="sidebar-burger__meat"></span>
      <span class="sidebar-burger__vegetable"></span>
      <span class="sidebar-burger__bread sidebar-burger__breadbottom"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleToggle () {
      this.$emit('toggleCollapse')
    }
  }
}
</script>

<style scoped>
@import '../style/burger.css';
</style>
