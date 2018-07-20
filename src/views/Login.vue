<template>
    <div>
        <h3>欢迎登录</h3>
        <div>我是具体的登录界面</div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  created(){
      this.$parent.info = '登录'
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div{
        color: red;
    }
</style>
