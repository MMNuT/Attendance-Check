<template>
  <div class="mask">
    <div class="loading"></div>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% { transform: rotate(0deg) }
  99% { transform: rotate(360deg) }
  100% { transform: rotate(0deg) }
}
.mask {
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, .6);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  height: 50px;
  width: 50px;
  border: 2px solid transparent;
  border-top-color: var(--main-yellow);
  border-left-color: var(--main-yellow);
  border-radius: 50%;
  animation: loading 400ms linear infinite;
}
</style>
