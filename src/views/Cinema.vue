<template>
<div>
  <van-nav-bar
  title="影院"
  right-text="搜索"
   @click-left="onClickLeft"
  @click-right="onClickRight">
  <template #left>
    {{cityName}}<van-icon name="arrow-down" />
    <!-- 此处不能使用this.$store.state.cityName,使用mapState切出来后也不能使用this.cityName,应该为vant组件中将this指向设置为null了。 -->
  </template>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
  </van-nav-bar>
  <van-dropdown-menu class="menu">
    <van-dropdown-item :title="city" ref="item">
      <ul class="district">
        <li v-for="item,index in downtown" :key='index' @click='activeColor(index)'>
          <div>{{item}}</div>
        </li>
      </ul>
  </van-dropdown-item>
  <van-dropdown-item v-model="value2" :options="option2" />
  <van-dropdown-item v-model="value3" :options="option3" />
</van-dropdown-menu>
<!-- 搭配betterscroll使用需要在外层套一层div，如果直接在ul上定义class是无法运行的 -->
  <div class="cinema" :style='{height}'>
    <ul>
      <li v-for="data in this.cinemaListStrict" :key="data.cinemaId">
        <div>{{ data.name }}</div>
        <div class="address">{{ data.address }}</div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
// import axios from 'axios'

// 通过让溢出隐藏和translateY滚动，让页面更好的滚动
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { NavBar, Icon, DropdownMenu, DropdownItem } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'

Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
Vue.use(NavBar)
export default {
  data () {
    return {
      city: '全城',
      height: 0,

      value2: 0,
      value3: 0,

      option2: [
        { text: 'APP订票', value: 0 },
        { text: '前台兑换', value: 1 }
      ],
      option3: [
        { text: '最近去过', value: 0 },
        { text: '离我最近', value: 1 }
      ]
    }
  },
  methods: {
    onClickLeft () {
      this.clearCinemaList()
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('/cinema/search')
    },
    activeColor (index) {
      this.cinemaStrict(this.downtown[index])
      this.city = this.downtown[index]
    },
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList', 'cinemaStrict'])
  },
  mounted () {
    // 三50为上、下部分导航栏高度和下拉菜单。
    this.height = document.documentElement.clientHeight - 50 - 50 - 50 + 'px'
    if (this.cinemaList.length === 0) {
      this.getCinemaList(this.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.cinema', {
            // 定义滚动条，且设置滚动时才显示滚动条
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      // 切换路由回来，需要再次初始化滚动条
      new BetterScroll('.cinema', {
        // 定义滚动条，且设置滚动时才显示滚动条
        scrollbar: {
          fade: true
        }
      })
    }
    // 切换城区时存在bug，滚动条长度无法随着数据长度切换。
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList', 'downtown', 'cinemaListStrict']),
    ...mapState('CityModule', ['cityId', 'cityName'])
  }
}
</script>

<style lang="scss" scoped>
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: gray;
  }
}
.cinema {
  overflow: hidden;
  position:relative;//修正滚动条的长度与视口不符合。
}
.menu{
  height: 50px;
}
.district{
  margin-top: 10px;
  display: flex;
  flex-wrap:wrap;
  li{
    width: 22%;
    background: #fff;
    div{
      padding: 0 10px 15px 0;
      text-align: center;
      font-size: 12px;
      position: relative;
    }
    // div::after{
    //   content:'';
    //   display: inline-block;
    //   border: 5px solid white;
    //   right: -50%;
    //   bottom: -50%;
    //   left: -50%;
    //   top: -50%;
    //   border-radius: 4px;
    //   position: absolute;
    // }
  }
}
</style>
