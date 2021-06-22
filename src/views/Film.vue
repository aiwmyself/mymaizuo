<template>
<div>
    <film-swiper>
      <div class="swiper-slide" v-for="(data,index) in imgList" :key='index'>
        <!-- 此处如果使用background:url'url('+data+')'，下面添加的backgound-size：cover和background-repeat都无法生效，而height会生效，感觉是bug。 -->
        <div :style="{backgroundImage:'url('+data+')'}"></div>
      </div>
    </film-swiper>
    <film-header class='fheader'></film-header>
    <router-view></router-view>
    <div class="city" @click="toCity">{{this.cityName}}<i class="iconfont icon-xiala"></i></div>
</div>
</template>
<script>
import filmHeader from './film/FilmHeader.vue'
import filmSwiper from './film/FilmSwiper.vue'
import Vue from 'vue'
import { Button } from 'vant'
import { mapState } from 'vuex'

Vue.use(Button)
export default {
  data () {
    return {
      imgList: ['https://pic.maizuo.com/usr/movie/932764e2f1c3bbc52181f2b2d6371156.jpg@1024h_768w_50Q?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/98548bd4196186b15b00f5b6969625a8.jpg', 'https://pic.maizuo.com/usr/movie/ce8b69f03f147e1b2dba9560a076a334.jpg']
    }
  },
  methods: {
    toCity () {
      this.$router.push('/city')
    }
  },
  components: {
    filmHeader,
    filmSwiper
  },
  computed: {
    ...mapState('CityModule', ['cityName'])
  }
}
</script>

<style lang="scss" scoped>
.router-link-active{
    border-bottom: 1px solid #ff5f16;
}
.fheader{
  // 通过标签选择器无法选择自定义的组件，可以通过添加类名（本例）或使用行内样式（vue会将样式添加到根节点上，react不会）
  position: sticky;
  top:0px;
  background: white;
  z-index: 100;
}
.swiper-wrapper{
  div{
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.city{
  position: absolute;
  z-index: 101;
  top:13px;
  left:5px;
  background:rgba(0,0,0,.2);
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  color: white;
  padding: 0 5px 0 5px;
  border-radius: 15px;
  text-align: center;
}
</style>
