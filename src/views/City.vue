<template>
  <div>
    <van-index-bar :index-list='computedCityList' @select="handleSelect">
      <div v-for='data in cityList' :key='data.type'>
        <van-index-anchor :index="data.type" />
        <van-cell :title="item.name" v-for="item,index in data.list" :key='index' @click='handleChange(item.name,item.cityId)'/>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '@/util/http.js'
import { mapMutations } from 'vuex'

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(Toast)
export default {
  data () {
    return {
      cityList: []
    }
  },
  methods: {
    handelCityData (data) {
      // 创建26个字母的数组
      const letterArr = []
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code))
      }
      // 处理数据为[{type:'A',list:[城市]}]的格式
      const cities = []
      letterArr.forEach((letter) => {
        const list = data.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        if (list.length !== 0) {
          cities.push({
            type: letter,
            list
          })
        }
      })
      return cities
    },
    handleSelect (index) {
      Toast(index)
    },
    handleChange (name, id) {
      this.changeCityName(name)
      this.changeCityId(id)
      this.$router.back()
    },
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId'])
  },
  computed: {
    computedCityList () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: '/gateway?k=6514003',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.cityList = this.handelCityData(res.data.data.cities)
      // console.log(this.cityList)
    })
  }
}
</script>

<style lang="scss" scoped></style>
