<template>
  <div class="Loading">
    <div>
        <img src="../../static/assesss.jpg" class="loadzhuan">
        <p>正在加载，请稍等...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
    .Loading{
        cursor: wait!important;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 999;
        opacity: .8;
        display: flex;
    }
    .Loading div{margin: auto auto;text-align: center;}
    .loadzhuan{
        margin-bottom:5px;
        animation: zhuan 1s linear infinite;
    }
    @keyframes zhuan{
        100%{transform: rotate(1turn);}
    }
</style>
