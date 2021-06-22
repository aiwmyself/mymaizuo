import http from '@/util/http.js' // 封装的自定义axios
const module = {
  namespaced: true,
  state: {
    cinemaList: [],
    downtown: [],
    cinemaListStrict: []
  },
  mutations: {
    setCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
      state.cinemaListStrict = cinemaList
    },
    clearCinemaList (state) {
      state.cinemaList = []
    },
    cityStrict (state, strict) {
      state.downtown = strict
    },
    cinemaStrict (state, strict) {
      if (strict === '全城') {
        state.cinemaListStrict = state.cinemaList
      } else {
        state.cinemaListStrict = state.cinemaList.filter(item => item.districtName === strict)
      }
    }
  },
  actions: {
    getCinemaList (store, cityId) {
      // 注意axios是promise对象， 所以可以返回，然后通过then方法是betterscroll初始化在其后面。
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8846571`,
        headers: {
          'X-Client-Info':
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609","bc":"410500"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinemaList', res.data.data.cinemas)
        store.commit('cityStrict', ['全城', ...new Set(res.data.data.cinemas.map(item => item.districtName))])// [...new Set([])]为数组去重
      })
    }
  }
}
export default module
