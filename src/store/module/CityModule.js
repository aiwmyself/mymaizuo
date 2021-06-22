const module = {
  namespaced: true,
  state: {
    cityId: '310100',
    cityName: '上海',
    downTown: []
  },
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    }
  },
  actions: {

  }
}
export default module
