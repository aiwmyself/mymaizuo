<template>
    <div class='consult' :style='{height}'>
        <div v-html="content" >Consult</div>
    </div>
</template>
<script>
import http from '@/util/http.js' // 封装的自定义axios
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      content: '',
      height: 0
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 + 'px'
    http({
      url: '/gateway?actId=ElzMZU125260',
      headers: {
        // 注意下面内容要重新获取，不能用之前的正在上映的接口。如果相当的部分多，可以在util文件夹下通过axios.create封装。
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16225381261882046079172609","bc":"410500"}',
        'X-Host': 'mall.act.static-page.info'
      }
    }).then(res => {
      this.content = res.data.data.data.content
      this.$nextTick(() => {
        new BetterScroll('.consult', {
          // 定义滚动条，且设置滚动时才显示滚动条
          scrollbar: {
            fade: true
          }
        })
      })
    })
  }
}
</script>
<style scoped>
.consult{
    position: relative;
    overflow:hidden;
}
</style>
