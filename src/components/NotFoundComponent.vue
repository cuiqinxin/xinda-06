<template>
    <div class="notfound">
        <img src="../../static/404.b07a9ab.gif">
    </div>
</template>

<script>
export default {
  name: 'NotFoundComponent',
  data () {
    return {

    }
  },
  created(){
    this.$parent.bbb = true;
  },
   destroyed: function () {
    this.$parent.bbb = false;
 },
}
</script>

<style scoped lang="less">
    .notfound img{
      display: block;
      margin: 0 auto;
    }
</style>
