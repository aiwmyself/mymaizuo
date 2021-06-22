<template>
  <div>
  <tabbar v-show="isTabbarShow"></tabbar>
  <section>
    <router-view></router-view>
  </section>
  </div>
</template>
<script>
import tabbar from './components/Tabbar.vue'
// import sidebar from './components/Sidebar.vue'
// import Vue from 'vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  components: {
    // sidebar,
    tabbar
  },
  methods: {

  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
  }
}
</script>

<style lang="scss" >
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
section{
  // 处理router-link的覆盖文档
  margin-bottom: 50px;
}
</style>
