<template>
<ul>
    <router-link to='/film/nowplaying' tag="li">正在上映</router-link>
    <router-link to='/film/comingsoon' tag="li">即将上映</router-link>
</ul>
</template>
<script>
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
ul{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    li{
        flex:1;
    }
}
.router-link-active{
    color: #ff5f16;
    border-bottom: 3px solid #ff5f16;
}
</style>
