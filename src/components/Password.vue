<template>
    <div class="password">
        <div class="pass">
            <input :type="types" placeholder="请输入密码">
            <span :class="style" @click="show"></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Password',
  data () {
    return {
      style:'bi',
      types:'password'
    }
  },
  methods:{
      show(){
            if(this.style=='zheng'){
              this.style='bi';
              this.types='password';
            }else{
              this.style='zheng';
              this.types='text';
            }
      }
  }
}
</script>

<style scoped lang="less">
    
    @media screen and (max-width: 768px){
        .pass{margin:32px 0 30px;}
    }
</style>
