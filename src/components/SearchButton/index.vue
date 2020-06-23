<template>
  <div class="query-box__button-box">
    <el-button @click="query" :disabled="disabled">{{ word }}</el-button>
    <div class="search-button low576" ref="button" @click.stop="search" :class="$attrs.class" :style="style">
      <Icon :icon-class="icon" class-name="search"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'search'
    },
    word: {
      type: String,
      default: '查詢'
    },
    bgColor: {
      type: String,
      default: 'black'
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    style () {
      return {
        background: this.bgColor
      }
    }
  },
  methods: {
    search () {
      if (this.icon === 'copy' && this.disabled) return null
      if (getComputedStyle(this.$refs.button, false).transform === 'matrix(1, 0, 0, 1, 0, 0)') {
        this.query()
        this.$_handleClickApp()
      } else {
        this.$refs.button.classList.add('display')
        document.querySelector('#app').addEventListener('click', this.$_handleClickApp)
      }
    },
    query () {
      this.$emit('query')
    },
    $_handleClickApp () {
      this.$refs.button.classList.remove('display')
      document.querySelector('#app').removeEventListener('click', this.$_handleClickApp)
    }
  }
}
</script>

<style scoped>
.search-button {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  background: black;
  border-radius: 50%;
  color: black;
  transform: translateX(50%);
  transition: transform ease .4s;
  color: white;
}

.search-button .search {
  transform: translate(.6rem, .1rem);
}

.display {
  transform: translateX(0);
}

@media screen and (max-width: 576px) {
  .query-box__button-box {
    position: fixed;
    right: 0;
    top: 50%;
    z-index: 100;
  }
  .query-box__button-box .el-button {
    display: none;
  }
  .low576 {
    display: block;
  }
}
</style>
