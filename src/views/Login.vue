<template>
<div>
  <van-button type="primary" :class='$store.state.cityId'>主要按钮</van-button>
<div>123{{this.$store.state.cityId}}</div>
</div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
