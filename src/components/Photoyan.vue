<template>
    <div class="Photoyan">
        <div class="yan">
            <input type="text" placeholder="请输入图片验证码" class="yanma" v-model="provinceCode">
            <img :src="imgurl" @click="imgchange">
        </div>
    </div>
</template>

<script>
export default {
  name: 'Photoyan',
  data () {
    return {
      imgurl:'/xinda-api/ajaxAuthcode',
    }
  },
  methods:{
      imgchange(){
          var data=(new Date()).getTime();
          this.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`
      }
  }
}
</script>

<style scoped lang="less">
    .yan{
        font-size: 0;
        img{
            width:30%;
            vertical-align: bottom;
            float: right;
            cursor: pointer;
            height: 36px;
        }
    }
    .yanma{
        width:48.484%;
    }
</style>
