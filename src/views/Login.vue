<template>
    <div>
        <h3>欢迎登录</h3>
        <div>我是具体的登录界面</div>
        <el-row class="top-con" type="flex" justify="space-between">
            <el-col :span="12" class="top-left">
            <span>欢迎来到信达！</span><router-link to="">登录</router-link><router-link to="">快速注册</router-link>
            </el-col>
        </el-row>
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
