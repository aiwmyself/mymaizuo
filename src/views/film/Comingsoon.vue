<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad2"
      :immediate-check="false"
    >
    <!-- immediate-check是否在初始化时立即执行滚动位置检查,
    List有以下三种状态，理解这些状态有助于你正确地使用List组件：
非加载中，loading为false，此时会根据列表滚动位置判断是否触发load事件（列表内容不足一屏幕时，会直接触发）
加载中，loading为true，表示正在发送异步请求，此时不会触发load事件
加载完成，finished为true，此时不会触发load事件
在每次请求完毕后，需要手动将loading设置为false，表示加载结束-->
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        <h3>{{ data.name }}</h3>
        <p>主演：{{ data.actors | actorFilter }}</p>
        <p>{{ data.nation }} | {{ data.runtime }}分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { List, Cell } from 'vant'
// import axios from 'axios'
import http from '@/util/http.js' // 封装的自定义axios
import Vue from 'vue'
import { mapState } from 'vuex'

Vue.use(List)
Vue.use(Cell)
Vue.filter('actorFilter', actors => {
  // 注意actors可能为空
  if (actors === undefined) {
    return '暂无主演'
  }
  return actors.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1, // 请求数据当前页面
      total: 1// 总电影数
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${id}`)
    },
    onLoad2 () {
      // 滚动到底部懒加载请求下一页数据
      // 注意total值初始值不要设置为0，因为当我们点进电影时，将滚动条滚到底部，在返回正在上映的电影，虽然组件销毁
      // 但是新组件的滚动条的监听事件会触发onload（在接近页面底部会触发该事件），此时this.datalist.length还未请求到数据，故为0，所以会导致，finished为true，此时滚动到底部将不会触发onload事件了。
      if (this.datalist.length === this.total) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=7039619`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // 合并请求的数据
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
        if (res.data.data.films.length === 0) {
          this.finished = true
        }// 虽然关掉了立即检查滚动条事件，但是将正在上映的电影滑到将近底部时，在切换到即将上映时，会先触发onload执行，再触发mounted执行，导致第一页的数据覆盖第二页的数据，
        // 但一共只有2页，total一直不相等，如果不加上该句会无线请求。此处也可以通过在nowplaying的生命周期beforedestroy中将滚动条至顶解决。
        this.total = res.data.data.total
      })
      console.log('到底了')
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  mounted () {
    // 第一页数据
    http({
      url:
        `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=7039619`,
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  img {
    float: left;
    width: 100px;
  }
  p {
    // 单行换行打点显示
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
