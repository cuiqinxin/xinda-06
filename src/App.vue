<template>
  <div id="app">
    <h3>我是页面的公共头部
      <!-- <a href="#/login">登录</a> -->
      <router-link to="/outter/login">登录</router-link>
      <router-link to="/outter/zhuce">注册</router-link>
    </h3>
    <router-view/>
    <h3>我是页面的公共尾部</h3>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
