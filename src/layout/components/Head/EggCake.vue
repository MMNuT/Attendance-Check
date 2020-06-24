<template>
  <canvas height="30px" width="30px" ref="eggCake"></canvas>
</template>

<script>
export default {
  data () {
    return {
      eggCake: null
    }
  },
  mounted () {
    this.eggCake = this.$refs.eggCake
    this.drawing()
  },
  methods: {
    drawing () {
      const gC = this.eggCake.getContext('2d')
      console.log(gC)
      gC.moveTo(2, 2)
      gC.lineTo(5, 5)
      gC.lineTo(4, 7)
      gC.closePath()
      gC.fillStyle = 'blue'
      gC.fill()
    }
  }
}
</script>
