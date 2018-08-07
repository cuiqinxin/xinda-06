<template>
  <div class="datang">
    <div class="datang_title">
            <img :src="'http://123.58.241.146:8088/xinda/pic/'+(name.providerImg)">
            <ul>
                <h2>{{name.name}}</h2>
                <p class="region">{{name.regionName}}</p>
            </ul>
            
    </div>
    <div class="main">
        <el-container>
            <el-aside  >
                <div class="introduce">
                    <h3>公司介绍</h3>
                    <p>{{name.providerInfo}}</p>
                </div>
                <div class="proctice">
                    <img src="../../static/u4654.9fa2585.png" alt="">
                </div>
            </el-aside>
            <el-main>
                <ul class="provide_list">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                     <el-tab-pane label="服务产品内容" name="first">  
                         <ul class="">
                            <h3>服务内容</h3>
                           <el-row class="service_product">
                                <el-col :span=7 v-for="(pro,index) in provide" :key="index">
                                    <h4>{{pro.serviceName}}*{{index+1}}{{provide.length}}</h4>
                                    <img src="../../static/diang.png" alt="">
                                    <p class="info">{{pro.serviceInfo}}</p>
                                    <p class="buynum">销量：{{pro.buyNum}}</p>
                                    <p class="price">￥：{{pro.price}}</p>
                                    <p class="bottom">
                                        <span class="mprice">原价￥：{{pro.marketPrice}}</span>
                                        <a>查看详情》</a>
                                    </p>
                                </el-col>
                            </el-row>
                        </ul>
                    </el-tab-pane>
                     <el-tab-pane label="客服" name="second" class="second">
                         <ul class="kefu">
                         <span>工作时间：{{name.workTime}}</span> 
                         <span>QQ客服：{{name.qq}}</span> 
                         </ul>
                         </el-tab-pane>
                     <el-tab-pane label="资格证书" name="third" class="third">
                         <ul class="zhengshu">
                         <img src="../../static/u4652.36247c6.png" alt="">
                         </ul>
                     </el-tab-pane>
                    </el-tabs>
                </ul>
                </el-main>
        </el-container>
    </div>
<div class="paging">
    <page @change="pageChange"></page>
</div>   

    <router-view/>
  </div>
</template> 

<script>
 import page from '../components/Page'

export default {
  name: 'datang',
 components : {
            page
        },
  data () {
    return {
      activeName: 'second',
      items : [],
      name:'',
      dianpu:'',
      provide:'',
      pageSize : 6 , //每页显示6条数据
      currentPage : 1, //当前页码
      count : 0, //总记录数
      limit:6,
      pageIndex:1,
      all:20,
      perPages:3  //页面中显示的页码数只能为单数
    }
  },
  methods:{
      handleClick(tab, event) {
        // console.log(tab);
      },
       pageChange (page) {
            this.currentPage = page
            var that = this;
            this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
            start:(page-1)*6,
            limit:6,
            providerId: this.$route.query.id,
            sort:2})).then(function(data){
                    that.provide=data.data.data
        });
        },   
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
      this.qs.stringify(obj))
      .then(function(data){
            console.log(data.data.data);
            that.name=data.data.data
            that.count=data.data.data.length
        });
      var that = this;
      this.ajax.post(
          '/xinda-api/product/package/search-grid',
      this.qs.stringify({
        searchName:this.$route.query.searchName,
        sort:2,
      }))
      .then(function(data){
            console.log(data.data.data);
            that.provide=data.data.data  
        });


        var that = this;
    this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
    start:0,
    // start:that.page,
    limit:6,
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
.paging{
    width:100%;
    text-align: center;
}
.page{
   margin: 0 auto;
   display: inline-block;
}
.datang{
      width:1200px;
      margin:0 auto;
      overflow: hidden;
  .datang_title{
      height:200px;
      width:100%;
      border:1px solid #ccc;
      align-items: center;
      display: flex;
      img{
        text-align: center;
        display: inline-block;
        margin-left: 70px;
        height: 66px;
      }
      ul{
          display: inline-block;
        margin-left: 30px;
          
          .region{
              margin-top:16px;
              color:#676767;
              font-size: 14px;
          }
      }
// 9080f0c120a64eb3831d50ba93c33e78
// a7304eecbd7246b4b424874e0359eab0
  }
  .main{
      margin:20px 0;
      aside{
          border:1px solid #ccc;
      }
      .introduce{
          height: 320px;

          h3{
              margin:10px;
          }
          p{
              width:85%;
              margin:22px  auto 0;
              font-size: 14px;
              line-height: 24px;
              color:#676767;
          }
      }
      .proctice{
          text-align: center;
          border-top: 1px solid #ccc;
          img{
              display: inline-block;
              margin:30px auto;
          }
      }
      main{
          border:1px solid #ccc;
            margin-left:20px;
            padding: 0;
            .provide_list{
                display: flex;
                height:50px;
            }
            h3{
                height:66px;
                line-height: 56px;
                width:100%;
                text-align: center;
                display: inline-block;
                border-bottom: 1px solid #ccc;
            }
            .service_product{
                height:468px;
                overflow: hidden;
                .el-col{
                border:1px solid #ccc;
                margin:17px;
                height:200px;
                padding:10px;
                h4{
                    overflow: hidden;
                    white-space: nowrap; 
                    text-overflow:ellipsis;
                    margin-top: 10px;
                }
                .info{
                    font-size: 13px;
                    color:#676767;
                    margin:10px 0;
                     overflow: hidden;
                    white-space: nowrap; 
                    text-overflow:ellipsis;
                }
                .buynum{
                    font-size: 13px;
                    color:#ccc;
                    margin:5px 0;
                }.price{
                    color: #2693d4;
                    font-size: 36px;
                    font-weight: 700;
                }.bottom{
                    display: flex;
                    justify-content: space-between;
                    a{
                        color:#2693d4;
                    }
                }.mprice{
                    text-decoration: line-through;
                }
                }
            }
      }
  }
  .kefu{
      display: flex;
      font-size: 26px;
      padding: 20px 50px;
      justify-content: space-between;
      span{
          display: inline-block;
      }
  }
  .zhengshu{
     img{
        height:510px;
     }
  }
  .el-tabs{
      width:100%;
      text-align: center;
  }
 .el-tabs__item{
     padding: 0 30px !important;
 }
#tab-first{
    padding: 0 40px;
}
  
  }
</style>
