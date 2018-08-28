
<template>

  <!--transition标签 按钮出现附带动画-->
  <transition name="el-fade-in">
    <div class="page-component-up" @click="scrollToTop" v-show="toTopShow">
      <img src='../../static/returntop.png' alt="" class="el-icon-caret-top">
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        toTopShow: false,
        scrollTop:0
      }
    },
    methods: {
      handleScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

        if(this.toTopShow == false && this.scrollTop > 100){
          document.getElementsByClassName('page-component-up')[0].style.bottom = 100 +'px'
          document.getElementsByClassName('el-icon-caret-top')[0].style.opacity = 0.8
        }
        if (this.scrollTop > 100) {
          this.toTopShow = true
        }else {
          this.toTopShow = false
        }
      },
      scrollToTop() {
        var bottom1 = 110
        var opacity1 = 0.8
        var high = document.documentElement.clientHeight
        var count = 0
        let timer = null, _that = this
        //动画，使用requestAnimationFrame代替setInterval
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn() {
          if (_that.scrollTop > 0) {


            if(count == 0){
              bottom1 -= 20
              document.getElementsByClassName('page-component-up')[0].style.bottom = bottom1 + "px"
              count += 1
            }
            // document.documentElement.scrollTop -= 20
            window.scrollTo(0,0);
            if(document.getElementsByClassName('page-component-up')[0].style.bottom < (high + 20)+ "px"){
            bottom1 += 30
            opacity1 -= 0.06
            document.getElementsByClassName('page-component-up')[0].style.bottom = bottom1 + "px"
            document.getElementsByClassName('el-icon-caret-top')[0].style.opacity = opacity1
            }

            else{
              _that.toTopShow = false
            }
            timer = requestAnimationFrame(fn)
          }
        })
      }
    },
    mounted() {
          window.addEventListener('scroll', this.handleScroll,true)       
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll,true)
    }
  }
</script>

<style scoped lang="less">
// @import "../assets/icon/iconfont.css";
    .page-component-up{
    // background-color: #409eff;
    position: fixed;
    right: 40px;
    bottom: 110px;
    width: 60px;
    height: 60px;
    // transition: top 2s linear;
    // box-shadow: 0 3px 6px rgba(0, 0, 0, .5);

    .el-icon-caret-top{
      position: absolute;
      opacity:0.8;
      display: block;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      z-index: 100;
      // box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
    }
    p{
      display: none;
      text-align: center;
      color: #fff;
    }
    // &:hover{
    //   opacity: .8;
    // }
  }
</style>
