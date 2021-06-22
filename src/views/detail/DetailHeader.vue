<template>
    <div><i @click='back' class="iconfont icon-xiala"></i>{{title}}</div>
</template>
<script>
export default {
  props: ['title'],
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
div{
    position:fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: white;
    i{
      display: inline-block;
      transform: rotate(90deg);
      position: absolute;
      left:5px
    }
}
</style>
