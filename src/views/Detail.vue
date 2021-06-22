<template>
  <!-- v-if保证当请求到数据后才创建节点 -->
  <v-touch v-on:swiperight='onSwiperRight' >
  <div v-if="filminfo">

    <detail-header v-top :title='filminfo.name'></detail-header>
    <div :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }" class="poster"></div>
    <h3>{{ filminfo.name }}--{{ filminfo.filmType.name }}</h3>
    <div>{{ filminfo.category }}</div>
    <div>{{ filminfo.premiereAt | dateFilter }}上映</div>
    <div>{{ filminfo.nation }}|{{ filminfo.runtime }}分钟</div>
    <!-- 通过isShow来决定是否显示部分信息或全部信息。 -->
    <div :class="isShow ? '' : 'synopsis'">{{ filminfo.synopsis }}</div>
    <div class="down" @click="isshow" :class="isShow ? 'rotate' : ''">
      <i class="iconfont icon-xiala"></i>
    </div>
    <h3>演职人员</h3>
    <!-- 传入参数，滑动页面一页显示多少图片 -->
    <detail-swiper :perslide="3" swiperName="actor">
      <div
        class="swiper-slide"
        v-for="(data, index) in filminfo.actors"
        :key="index"
      >
        <img :src="data.avatarAddress" alt="" />
      </div>
    </detail-swiper>
    <h3>剧照</h3>
    <!-- 一个页面使用两个swiper需要给siwper传不同的类名 -->
    <detail-swiper :perslide="2" swiperName="photo">
      <div
        class="swiper-slide"
        v-for="(data, index) in filminfo.photos"
        :key="index"
      >
        <div
          :style="{ backgroundImage: 'url(' + data + ')' }"
          class="juzhao"
          @click='handlePreview(index)'
        ></div>
      </div>
    </detail-swiper>
  </div>
  </v-touch>
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper.vue'
import detailHeader from './detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
import http from '@/util/http.js' // 封装的自定义axios
import { mapMutations } from 'vuex'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    // 需要在解除绑定时，消失滚动事件
    }
  },
  unbind () {
    window.onscroll = null
  }
})
Vue.filter('dateFilter', date => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
export default {
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  methods: {
    isshow () {
      this.isShow = !this.isShow
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: true,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    ...mapMutations('TabbarModule', ['show', 'hide']),
    onSwiperRight () {
      this.$router.back()
    }
  },
  components: {
    detailSwiper,
    detailHeader
  },
  mounted () {
    this.hide()
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=2859029`,
      headers: {
        // 注意下面内容要重新获取，不能用之前的正在上映的接口。如果相当的部分多，可以在util文件夹下通过axios.create封装。
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609","bc":"410500"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy () {
    this.show()
  }
}
</script>

<style lang="scss" scoped>
.poster {
  height: 200px;
  background-size: cover;
  // 使图片中间显示
  background-position: center;
}
.synopsis {
  overflow: hidden;
  height: 60px;
  line-height: 20px;
}
.down {
  text-align: center;
}
.rotate {
  transform: rotate(180deg);
}
.juzhao {
  background-size: cover;
  background-position: center;
  height: 100px;
}
</style>
