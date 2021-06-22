<template>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
</div>
</template>
<script>
// 注意如果只引入swiper是不包含分页器等其它功能，bundle是将所有的引入
import Swiper from 'swiper/bundle'
// 注意需要swiper的css文件，在node_modules的文件夹的swiper文件夹下。
import 'swiper/swiper-bundle.min.css'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
