<template>
  <div class="testSlot">
        <slot></slot>
    <div class="loadmore-icon">{{more}}<i class="fa fa-cog fa-spin"></i></div>
    <div class="loading" v-show="showlaoding">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
    </div>

  </div>
  </template>

<script>
export default {
    name: 'testSlot',
    props:{
       scrollCount:{
           type: Object,
       },
    },
 data () {
  return {
        list: [],//数据
        page: 0,//页码
        showlaoding: true ,//是否显示loading效果
        length:0,
        more:'加载更多。。。'
  }
 },

 methods: {
      getData(page) {

      if(length>=that.provide.length){

      }else{
        that.more='没有喽。。。'
      }

            this.showlaoding = false

    },
 },
    mounted() {
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
var context = this
        this.getData(context.page);
        // console.log(context.page);
        var myEfficientFn = debounce(function() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //判断是否滚动到底部
        if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
          if (!context.showlaoding) { //防止多次加载
            context.getData(context.page+=1)
          }
        }
    // 滚动中的真正想要执行的代码
}, 500);
             // 注册scroll事件并监听
      window.addEventListener('scroll', myEfficientFn)
}
}
</script>

<style lang="less">

  .loadmore-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    padding: 0.2rem 0;
  }

  .loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // background-color:rgba(0,0,0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

.item{
 background-color: #f2f2f2;
 border-bottom: 1px solid #fff;
 height: 40px;
 line-height: 40px;
 text-align: center;
}
.index{
    height:100vh;
}

.loadmore {
    min-height: 100vh;
    width: 90%;
    padding-top: 18px;
    width:96%;
    margin:0 auto;
    .main_1{
        border-bottom:1px solid #ccc;
        display: flex;
    }
    .main-left{
        float: left;
        width: 30%;
        border: 1px solid #ccc;
        margin:2% 0;
        img{
            width:100%;
        }
    }
    .main-right{
        position:relative;
        width: 66%;
        p{
            margin:2% 0;
        }
        h4{
            margin:2% 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
        .bottom{
            position: absolute;
            top: 83%;
            width: 100%;
            .mprice{
                position: absolute;
                right:0px;
                color:red;
                font-weight: bold;
                .yuan{
                    color: black;
                    font-weight: 300;
                    font-size: 14px;
                }
            }
        }

        .region_1{
            display:inline-block;
            width:10px;
            height:15px;
            background-image: url(../../static/region.jpg);
            background-size: cover;
            margin-right: 2%;
        }
        float:left;
        margin:2%;
        .info{
            overflow: hidden;
            // white-space: nowrap;
            text-overflow:ellipsis;

        }
    }
}
@media screen and (min-width:420px) and (max-width:768px){
    .main-right{
        .info{
            height:42px;
        }
        .bottom{
            .mprice{
                font-size: 22px;
            }
        }

    }
}
@media screen and (max-width:420px){
    h1{
        font-size: 24px;
    }
    .main-right{
        .info{
            font-size: 12px;
            height:32px;
        }
        .bottom{
            font-size: 12px;
            .mprice{
                font-size: 14px;
            }
        }
        h4{
            font-size: 14px;
        }
    }
    .introduce{
        p{
            font-size: 12px;
        }
    }
}
</style>
