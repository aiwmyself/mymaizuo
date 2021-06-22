<template>
    <div>
          <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
     @cancel="onCancel"
  />
  <van-list>
      <van-cell v-for='data in computedCinemaList' :key='data.cinemaId'>
          <div>{{data.name}}</div>
          <div class="address">{{data.address}}</div>
      </van-cell>
  </van-list>
    </div>
</template>
<script>
import Vue from 'vue'
import { Search, Cell, List } from 'vant'
import { mapState, mapActions } from 'vuex'
Vue.use(Search).use(Cell).use(List)
export default {
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    if (this.cinemaList.length === 0) {
      this.getCinemaList(this.cityId)
    }
  },
  computed: {
    computedCinemaList () {
      if (this.value === '') {
        return ''
      }
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    },
    ...mapState('CityModule', ['cityId']),
    ...mapState('CinemaModule', ['cinemaList'])
  },
  methods: {
    onCancel () {
      this.$router.replace('/cinema')
    },
    ...mapActions('CinemaModule', ['getCinemaList'])
  }
}
</script>
<style lang='scss' scoped>
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: gray;
  }
}
</style>
