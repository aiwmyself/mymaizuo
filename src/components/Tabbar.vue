<template>
  <nav>
    <ul>
      <router-link to="/film" tag="li"><i class="iconfont icon-dianying"></i><span>电影</span></router-link>
      <router-link to="/cinema" tag="li"><i class="iconfont icon-yingyuan"></i><span>影院</span></router-link>
      <router-link to="/consult" tag="li"><i class="iconfont icon-yingyuan"></i><span>资讯</span></router-link>
      <router-link to="/center" tag="li"><i class="iconfont icon-wodegerenzhongxin"></i><span>我的</span></router-link>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

nav {
  position:fixed;
  bottom:0;
  left:0;
  width: 100%;
  line-height: 25px;
  height: 50px;
  text-align: center;
  background: white;
  // 使之后得图片不覆盖导航条
  z-index: 100;
  ul {
    display: flex;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items:center;
      i{
        font-size: 18px;
      }
      span{
        font-size: 12px;
      }
    }
  }
}
// 当前router-link的样式,跳转到‘我的’路由不会显示亮色是因为进行了路由拦截跳转到登陆页面去了，localStorage中有token值时，跳转到‘我的’路由才会亮色显示。
.router-link-active{
  color: #ff5f16;
}
</style>
