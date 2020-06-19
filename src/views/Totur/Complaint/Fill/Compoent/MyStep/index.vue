<template>
  <ul class="step-container">
    <li
      v-for="(t, index) in title"
      :key="index"
      :class="{ finish: active > index + 1, active: active === index + 1}"
      >
      <div class="step__line"></div>
      <div class="step-index" @click="$emit('click', index + 1)">{{index + 1}}</div>
      <div class="step-title" @click="$emit('click', index + 1)">{{t}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 2
    },
    title: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.step-container {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto 0;
  margin-bottom: 3.5rem;
}
.step-container li {
  position: relative;
  flex: 1;
}
.step-container .step__line {
  background: var(--main-black);
  height: .2rem;
  position: absolute;
  width: 100%;
  top: 1.5rem;
}
.step-container li:last-child {
  flex: 0;
}
.step-container li:last-child .step__line {
  display: none;
}

.step-index {
  background: var(--main-black);
  color: var(--white);
  border-radius: 50%;
  line-height: 3rem;
  width: 3rem;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.step-title {
  display: inline-block;
  transform: translateX(-4rem);
  font-size: 2.5rem;
  cursor: pointer;
}

.step-title:last-child {
  position: absolute;
  width: 20rem;
}

/*  已完成的顏色 */
.step-container .finish .step__line {
  background: var(--main-yellow);
}

.step-container .finish .step-title {
  color: var(--main-yellow);
}

.step-container .finish .step-index {
  background: var(--main-yellow);
}

/* 活動中的顏色 */
.step-container .active .step-title {
  color: var(--main-yellow);
}

.step-container .active .step-index {
  background: var(--main-yellow);
}
</style>
