<template>
    <div>
        <h3>欢迎注册</h3>
        <div>我是具体的注册界面</div>
    </div>
</template>

<script>
export default {
  name: 'Zhuce',
  created(){
      this.$parent.info = '注册'
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
