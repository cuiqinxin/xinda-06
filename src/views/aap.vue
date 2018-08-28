<template>
  <div class="datang">
    <div class="datang_title1">
        <img :src="'http://123.58.241.146:8088/xinda/pic/'+(name.providerImg)" >
        <h1>{{name.name}}</h1>
    </div>
    <div class="introduce">
        <p>{{name.providerInfo}}</p>
    </div>
    <div class="all">
        <p>所有服务</p>
        <div class="sanjiao"></div>
    </div>
    <div class=" loadmore">
        <div id="scroller-box1" >
        <ul v-for="(pro,index) in provide" :key="index" class="main_1" @click="tiao(pro.id)">
             <!-- <router-link :to="{path:'/goodsdetail',query:{id:pro.id}}" > -->
            <li class="main-left">
                 <img :src="'http://123.58.241.146:8088/xinda/pic/'+(pro.productImg)"  :onerror="errorImage">
            </li>
            <li :span="16" class="main-right">
            <h4>{{pro.serviceName}}</h4>
            <p class="info">{{pro.serviceInfo}}</p>
            <ul class="bottom">
                <span class="region_1"></span><span>{{pro.regionName}}</span>
                <span class="mprice">￥：{{pro.price}}<span class="yuan">元</span></span>
            </ul>
            </li>
        </ul>
     </div>
     </div>
    <div class="loadmore-icon" @click=" getData()">{{more}}<i class="fa fa-cog fa-spin"></i></div>
    <div id="scroller-box" >
        <scrollTop></scrollTop>
    </div>
    <div class="loading" v-show="showlaoding">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
    </div>
    <router-view/>
  </div>
  </template>

<script>
import scrollTop from '../components/ScrollTop'
export default{
 data () {
  return {
        list: [],//数据
        page: 0,//页码
        showlaoding: true ,//是否显示loading效果
        name:'',
        provide:[],
        length:0,
        more:'Loading。。。',
        //监测屏幕宽度
        screenWidth:document.body.clientWidth,
         errorImage: 'this.src="' + require('../../static/b48f193ddc2547fd92a4a86b01cb2e51.jpg') + '"'
  }
 },
   created(){
      var obj={
       id: this.$route.query.id
        }
      var that = this;
      this.ajax.post(
          '/xinda-api/provider/detail',
      this.qs.stringify({id:this.$route.query.id,
      sort:1
      }))
      .then(function(data){
            that.name=data.data.data
        });
 var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:0,
    limit:6,
    providerId: this.$route.query.id,
    sort:2})).then(function(data){
            // that.length=(data.data.data.length )
            that.provide=(data.data.data )
        });
        var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:0,
    // limit:6,
    providerId: this.$route.query.id,
    sort:2})).then(function(data){
            that.length=(data.data.data.length )
            // console.log(that.length)
            // that.provide=(data.data.data )
        });
        },
 methods: {
     tiao(proid){
            this.$router.push({
            path:"/goodsdetail",
           query:{ id:proid}
        })
     },
     dianpu(){
        this.$router.push({
            path:"/dianpu",
           query:{ id:this.$route.query.id}
        })
     },
      getData(page) {
        this.showlaoding = true
        var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:that.page,
    limit:3,
    providerId:  this.$route.query.id,
    sort:2})).then(function(data){
      if(that.length>=that.provide.length){
        that.more='Loading。。。'
        that.provide=that.provide.concat(data.data.data )
      }if(that.length<that.provide.length&&that.length!=0){
        that.more='没有喽。。。'
      }
        });
            this.showlaoding = false
      },
    },
     components: {
        scrollTop
     },
    mounted() {
        if(this.screenWidth>=992){
                  this.dianpu()
        }
        const that = this
         window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
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
        var myEfficientFn = debounce(function() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //判断是否滚动到底部
        if (scrollTop + window.innerHeight + 0 >= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
          if (!context.showlaoding) { //防止多次加载
            context.getData(context.page+=1)
          }
        }
    // 滚动中的真正想要执行的代码
}, 500);
             // 注册scroll事件并监听
      window.addEventListener('scroll', myEfficientFn)
},
watch : {
//   var width=window.innerwidth|| document.documentElement.clientWidth || document.body.clientWidth;
     screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
                        if(that.screenWidth>=992){
                  that.dianpu()
          }
                        // that.init()
                        that.timer = false
                    }, 400)
                }
            }
    //    width:function(){console.log(width)}
}
}
</script>

<style lang="less" scoped>
  .loadmore-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    padding: 0.2rem 0;
    color: #2393d3;
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
.datang_title1{
    margin-top: 30px;
    text-align: center;
    img{
        width:100px;
    }
}
.all{
    border-bottom: 2px solid #2393d3;
    position: relative;
    .sanjiao{
        width: 0;
        height: 0;
        border-left: 2px solid transparent;
        border-top: none;
        border-right: 2px solid transparent;
        border-bottom: 2px solid #2393d3;
        position: absolute;
        left: 30px;
        bottom: 0;
    }
}

.introduce{
    width:96%;
    margin:30px auto;
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
            margin:2px 0;
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
@media screen and (min-width:420px) and (max-width:992px){
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
