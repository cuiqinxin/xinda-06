<template>
<div class="datang">
   <div class="datang_title">
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
 <div class="index">
  <r-scroll ref="scroll" @loadmore="queryDate" :scrollCount="j">
    <ul v-for="(pro,index) in provide" :key="index" class="main_1">
            <li class="main-left">
                 <img :src="'http://123.58.241.146:8088/xinda/pic/'+(pro.productImg)"  onerror="this.onerror=''; src='../../static/b48f193ddc2547fd92a4a86b01cb2e51.jpg'"> 
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
  </r-scroll>
 </div>
 </div>
</template>
 
<script>
import rScroll from '../components/rscroll'
function timeout (ms) {
 return new Promise((resolve, reject) => {
  setTimeout(resolve, ms, 'done')
 })
}
 
export default{
    name: 'juh',
    
 components: {rScroll},
 data () {
  return {
      name:'',
      dianpu:'',
      isComplate:'',
      isLoading:false,
      provide:[],
      j:{
      scrolltop:0,
      showlaoding : true,
      isComplate:false
      },     
    } 
 },
 created(){
      var obj={
       id: this.$route.query.id
        }
      var that = this;
      this.ajax.post(
          '/xinda-api/provider/detail',
      this.qs.stringify({id: "a7304eecbd7246b4b424874e0359eab0",
      sort:1
      }))
      .then(function(data){
            that.name=data.data.data
        });
        var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:0,
    providerId: this.$route.query.id,
    sort:2})).then(function(data){
           that.j.scrolltop=data.data.data.length;
            console.log(that.j.scrolltop)
        });
            var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
        start:0,
        limit:5,
    providerId: "9080f0c120a64eb3831d50ba93c33e78",
    sort:2})).then(function(data){
        console.log(data.data.data.length)
        console.log(that.j.scrolltop)
        // if(that.j.scrolltop>that.provide.length){
            that.provide=that.provide.concat(data.data.data )  
            console.log(that.provide)
            // console.log(page) 
        // }  
        }); 
        },
 methods: {
  async queryDate (page) {
//    await timeout(1000)
   console.log(page)
    // this.j.showlaoding = true
    var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
        start:5+page*3,
        limit:3,
    providerId: "9080f0c120a64eb3831d50ba93c33e78",
    sort:2})).then(function(data){
        console.log(data.data.data.length)
        console.log(that.j.scrolltop)
        if(that.j.scrolltop>that.provide.length){
            that.provide=that.provide.concat(data.data.data )  
            console.log(that.provide)
            console.log(page) 
        }else{
            that.j.isComplate=true
            that.isLoading=false
            console.log(2323)
        }   
        }); 
   // this.j.showlaoding = false   
   // 调用组件中的loaded函数，如果数据加载完成后记得调用组件的compleate函数
    // this.$refs.scroll.loaded()
  }
 },
 mounted () {


 }
}
</script>
 
<style lang="less" scoped>
// .index{
//     height:100vh;
// }
.datang_title{
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
.datang {
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
.item{
 background-color: #f2f2f2;
 border-bottom: 1px solid #fff;
 height: 40px;
 line-height: 40px;
 text-align: center;
}
</style>