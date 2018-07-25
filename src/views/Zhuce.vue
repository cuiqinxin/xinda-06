<template>
    <div>
        <h3>欢迎注册</h3>
        <div>我是具体的注册界面</div>
        <city @confirm="confirm" display="12345"></city>
    </div>
</template>

<script>
import city from '../components/City'
export default {
  name: 'Zhuce',
  created(){
      this.$parent.info = '注册'
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods:{
      confirm(value){
          console.log(value);
      }
  },
  components:{
      city
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div{
        color: red;
    }
</style>
