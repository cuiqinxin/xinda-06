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
    <div class="main">
        <el-row v-for="(pro,index) in provide" :key="index" class="main_1">
            <el-col :span="6" class="main-left">
                 <img :src="'http://123.58.241.146:8088/xinda/pic/'+(pro.productImg)"  onerror="this.onerror=''; src='../../static/b48f193ddc2547fd92a4a86b01cb2e51.jpg'"> 
            </el-col>
            <el-col :span="16" class="main-right">
            <h4>{{pro.serviceName}}</h4>
            <p class="info">{{pro.serviceInfo}}</p>
            <ul class="bottom">
                <span class="region_1"></span><span>{{pro.regionName}}</span>
                <span class="mprice">￥：{{pro.price}}</span>
            </ul>
            </el-col>
            
        </el-row>
    </div>
    <router-view/>
  </div>
</template> 

<script>


export default {
  name: 'dianpumobile',
 components : {
        },
  data () {
    return {
      name:'',
      dianpu:'',
      provide:'',
    }
  },
  methods:{
        },
  watch : {
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
            console.log(data.data.data);
            that.name=data.data.data
        });
        var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:0,
    // start:that.page,
    limit:20,
    // productTypeCode: "1",
    providerId: this.$route.query.id,
    sort:2})).then(function(data){
            that.provide=data.data.data  
            console.log(data.data.data);

        });
        },
  computed:{
    
  },
}
</script>

<style scoped lang="less">
.datang_title{
    margin-top: 30px;
    text-align: center;
    
    img{
        width:100px;
    }
}
.all{
    border-bottom: 2px solid #2393d3;
    .sanjiao{
        border-left: 2px solid transparent;
        border-top: none;
        border-right: 2px solid transparent;
        border-bottom: 2px solid #2393d3;
    }
}
.introduce{
    width:96%;
    margin:30px auto;
}
.main{
    width:96%;
    margin:0 auto;
    .main_1{
        border-bottom:1px solid #ccc;
    }
    .main-left{
        float: left;
        border: 1px solid #ccc;
        margin:2% 0;
        img{
            width:100%;
        }
    }
    .main-right{
        position:relative;
        p{
            margin:2% 0;
        }
        h4{
            margin:2% 0;
        }
        .bottom{
            position: absolute;
            position:relative;
            bottom:100%;
            .mprice{
                position: absolute;
                right:0px;
                color:red;
                font-size:16px;
                font-weight: bold;
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
            height:42px;
            
        }
    }
}

</style>
