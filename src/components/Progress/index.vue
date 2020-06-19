<template>
  <div class="progressBox">
    <svg width='200' height='200'>
      <path :d="path" :style="{ ...setStyle, stroke: color}"></path>
    </svg>
    <div class="word" v-if="word.mother !== null">{{ word.child }} / {{ word.mother }}</div>
    <div class="word" v-else>{{ word.child }} / 不扣分</div>
  </div>
</template>

<script>
export default {
  props: {
    ang: {
      type: Number,
      default: 360
    },
    setStyle: {
      type: Object,
      default () {
        return {
          strokeWidth: '2rem',
          fill: 'none'
        }
      }
    },
    word: {
      type: Object,
      default () {
        return {
          child: 0,
          mother: 0
        }
      }
    }
  },
  data () {
    return {
      cx: 100,
      cy: 100,
      r: 70,
      animateDefaultParam: {
        startAng: 0,
        count: 0,
        step: 100
      }
    }
  },
  watch: {
    word (newVal) {
      this.animateDefaultParam.startAng = 0
      this.animateDefaultParam.count = 0
      this.animate()
    }
  },
  mounted () {
    this.animate()
  },
  computed: {
    path () {
      const x = this.cx + Math.sin(this.toRadian) * this.r
      const y = this.cy - Math.cos(this.toRadian) * this.r
      const arr = []
      arr.push(`M ${this.cx} ${this.cy - this.r}`)
      arr.push(`A ${this.r} ${this.r} 0 ${this.animateDefaultParam.startAng > 180 ? 1 : 0} 1 ${x} ${y}`)
      if (this.animateDefaultParam.startAng >= 359) {
        return arr.join(' ') + 'Z'
      }
      return arr.join(' ')
    },
    toRadian () {
      return this.animateDefaultParam.startAng * Math.PI / 180
    },
    color () {
      if (this.ang <= 120) return '#939249'
      if (this.ang > 120 && this.ang <= 240) return '#E3AE3C'
      if (this.ang > 240 && this.ang <= 360) return '#C24F1A'
      return '#4A7D90'
    }
  },
  methods: {
    animate () {
      requestAnimationFrame(this.$_next)
    },
    $_next () {
      this.animateDefaultParam.count++
      // 漸趨進 0 的值
      const tmp = (1 - this.animateDefaultParam.count / this.animateDefaultParam.step)
      // 還差多少可以跑
      const dis = this.ang - this.animateDefaultParam.startAng
      // 這次跑完的角度
      const cur = this.animateDefaultParam.startAng + dis * (1 - tmp)
      this.animateDefaultParam.startAng = cur
      if (this.animateDefaultParam.count < this.animateDefaultParam.step && this.animateDefaultParam.startAng <= 359) {
        requestAnimationFrame(this.$_next)
      }
    }
  }
}
</script>

<style scoped>
.progressBox {
  height: 20rem;
  width: 20rem;
  position: relative;
}
.progressBox .word {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 900;
  font-size: 3.6rem;
}
</style>
