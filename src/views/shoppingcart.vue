<template>
<div class="shoppingcart ">
  <div class="wangye hidden-xs-only">
        <div  v-if="seen" class="success">
                <p class="shop">首页/购物车</p>
                <!-- 商品数量 -->
                <p class="goods">全部商品（{{shoppingdata.length}}）</p>
              <el-row class='shoptitle'>
                <el-col :span="3"><div class="company">公司</div></el-col>
                <el-col :span="4"><div class="servicegoods">服务商品</div></el-col>
                <el-col :span="4"><div class="price">单价</div></el-col>
                <el-col :span="4"><div class="number">数量</div></el-col>
                <el-col :span="5"><div class="money">金额</div></el-col>
                <el-col :span="4"><div class="operation">操作</div></el-col>
              </el-row>

      <!-- 订单详细内容 -->
                <!-- demo  -->
        <div class="details" v-for="(item,index) in shoppingdata" :key="index">
        <!-- 服务商名称 -->
                <p class="store">店铺：{{item.providerName}}</p>

              <el-row class='shopdetails'>
                <!-- 服务商logo -->
                <el-col :span="3"><div class="logo"><img v-bind:src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)" alt="#" :onerror="logo" width="100%" height="100%"></div></el-col>
                <!-- 服务名称 -->
                <el-col :span="4"><div class="servicegoods"><p>{{item.serviceName}}</p></div></el-col>

                <!-- 单价 -->
                <el-col :span="4"><div class="price">￥<span>{{item.unitPrice}}</span></div></el-col>
                  <!-- 购买数量 -->
                <el-col :span="4">
                  <div class="number">
                  <a href="javascript:void(0)" @click="reducenum" class="reduce" :id="index">-</a>
                  <input type="text" class="input" v-bind:value="item.buyNum" readOnly="true">
                  <a href="javascript:void(0)" @click="addnum"  class="add" :id="index">+</a>
                  </div>
                  </el-col>
                <!-- 产品总价 -->
                <el-col :span="5"><div class="money">￥<span>{{item.totalPrice}}</span></div></el-col>
              <!-- 是否删除 -->
                <el-col :span="4"><div class="operation" >
                  <button type="text" class="remove" :id="item.serviceId" @click.capture.self="open2">删除</button>
                  </div></el-col>
              </el-row>
      </div>

            <div class="allmoney"><p style="width:220px;text-align:center">
              金额总计:<span>￥{{newtotalprice}}</span>
              
              </p></div>

            <div class="total">
              <router-link to="/" class="shopnext">继续购物</router-link>
              <a href="javascript:void(0)" class="shopnext" @click="commitcart">去结算</a>
                </div>

            <p class="hotservice">热门服务</p>

            <el-row :gutter="20" class="hotservicecontant">
              <!-- 第一个 -->
              <el-col :xs="24" :sm="6" ><div class="serviceitem">
                <p class="title">代理记账＋取票＋取银行回单（半年）</p>
                <div class="img"><img src="../../static/line.jpg" alt="#"></div>
                <p class="detail">适用于有经营业务，发票处理，银行账单处理的初创公司</p>
                <p class="xiaoliang">销量:</p>
                <div class="money">￥1400.00</div>
                <div class="price">
                  <p class="left">原价：￥2000.00 </p><a href="javascript:void(0)" class="right">查看详情>>></a>
                </div>
              
              </div></el-col>
              <!-- 第二个 -->
              <el-col :xs="24" :sm="6" ><div class="serviceitem">
                <p class="title">代理记账＋取票＋取银行回单（半年）</p>
                <div class="img"><img src="../../static/line.jpg" alt="#"></div>
                <p class="detail">适用于有经营业务，发票处理，银行账单处理的初创公司</p>
                <p class="xiaoliang">销量:</p>
                <div class="money">￥1400.00</div>
                <div class="price">
                  <p class="left">原价：￥2000.00 </p><a href="javascript:void(0)" class="right">查看详情>>></a>
                </div>
              
              </div></el-col>

              <!-- 第三个 -->
              <el-col :xs="24" :sm="6" ><div class="serviceitem">
                <p class="title">代理记账＋取票＋取银行回单（半年）</p>
                <div class="img"><img src="../../static/line.jpg" alt="#"></div>
                <p class="detail">适用于有经营业务，发票处理，银行账单处理的初创公司</p>
                <p class="xiaoliang">销量:</p>
                <div class="money">￥1400.00</div>
                <div class="price">
                  <p class="left">原价：￥2000.00 </p><a href="javascript:void(0)" class="right">查看详情>>></a>
                </div>
              
              </div></el-col>

              <!-- 第四个 -->
              <el-col :xs="24" :sm="6" ><div class="serviceitem">
                <p class="title">代理记账＋取票＋取银行回单（半年）</p>
                <div class="img"><img src="../../static/line.jpg" alt="#"></div>
                <p class="detail">适用于有经营业务，发票处理，银行账单处理的初创公司</p>
                <p class="xiaoliang">销量:</p>
                <div class="money">￥1400.00</div>
                <div class="price">
                  <p class="left">原价：￥2000.00 </p><a href="javascript:void(0)" class="right">查看详情>>></a>
                </div>
              
              </div></el-col>

      
      
              </el-row> 

        </div>
        <div v-else class="fail">
          <div class="failcontain">
            <div class="img"><img src="../../static/cartnull.png" alt="#"></div>
            <div class="right">
              <h2>您的购物车是空的！</h2>

              <router-link to="/" class="shopnext">继续购物</router-link>

            </div>

          </div>
          
      
      
      
      
      
      
        </div>
  </div>
  <div class="shouji hidden-sm-and-up">
    <div  v-if="seen" class="success">
        <p class="title">购物车中有<span>{{shoppingdata.length}}</span>件商品</p>

        <div class="demo" v-for="(item,index) in shoppingdata" :key="index">

          <p class="name">{{item.providerName}}</p>

          <div class="contain">

            <div class="left">
              <div class="img">
                <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)" alt="#" :onerror="logo" width="100%" height="80%">
              </div>
              
              <div class="word">
                <p class="servicename">{{item.serviceName}}</p>
                <p class="price"><span>￥{{item.totalPrice}}</span>元</p>
                <!-- 购买数量 -->
                <div class="number">
                    <a href="javascript:void(0)" @click="reducenum" class="reduce" :id="index">-</a>

                    <input type="text" class="input" v-bind:value="item.buyNum" readOnly="true">

                    <a href="javascript:void(0)" @click="addnum"  class="add" :id="index">+</a>
                </div>
                <div class="area">
                  <i class="el-icon-location-outline"></i>
                  <span>北京市 </span> 朝阳区
                </div>
              </div>
            </div>
            <div class="right">
              <div class="operation" >
                  <button type="text" class="remove" :id="item.serviceId" @click.capture.self="open2">删除订单</button>
              </div>
            </div>
          </div>

        </div>

        <div class="allmoney1"><p class="bottom_left">
              合计:<span>￥{{newtotalprice}}</span>
              
              </p>
                <a href="javascript:void(0)" class="shopnext" @click="commitcart">去结算</a>
        </div>

    </div>

    <div v-else class="fail">
          <div class="failcontain">
            <div class="img"><img src="../../static/cartnull.png" alt="#"></div>
            <div class="right">
              <h2>您的购物车是空的！</h2>

              <router-link to="/" class="shopnext">继续购物</router-link>

            </div>

          </div>
          
      
      
      
      
      
      
        </div>
  </div>

</div>

    
</template>

<script>

export default {
  name: "shoppingcart",

  data() {
    return {
      shoppingdata: [],
      seen:true,
      totalprice:0,
      // removeid:''
      ordernum:'',
      logo:'this.src="' + require('../../static/errorImg.png') + '"',
    };
  },
  

  created() {
    //购物车列表接口,将从后台获取到的数据存入数组，然后进行渲染
    var that = this;
    this.ajax
      .post("/xinda-api/cart/list", that.qs.stringify({}))
      .then(function(data) {
        //如果购物车为空，则显示购物车为空页面
        console.log(data.data.data);
        if (data.data.data.length == 0) {
          that.seen=false;
        //如果购物车部不为空，则渲染页面；
        } else {
          
          that.shoppingdata = data.data.data;
        }
      })
  },
  computed:{
    //动态监测页面总价
     newtotalprice:function(){
       var that = this;
       if(that.shoppingdata.length!=0){
         that.totalprice=0;
          for(var i=0 ;i<that.shoppingdata.length;i++){
            that.totalprice+=that.shoppingdata[i].totalPrice;
          }
       }else{
         that.totalprice=that.totalprice;
       }
        return that.totalprice
     },
  },
  methods: {
    //添加/减少商品数量
    addnum:function(e){
      var goodsindex=e.target.id;
      var that = this;
      that.shoppingdata[goodsindex].buyNum++;
      that.shoppingdata[goodsindex].totalPrice=that.shoppingdata[goodsindex].buyNum*that.shoppingdata[goodsindex].unitPrice;
      // console.log(that.shoppingdata[goodsindex].buyNum)
      that.ajax
      .post("/xinda-api/cart/add", that.qs.stringify({
		    id:that.shoppingdata[goodsindex].serviceId,
		    num:1
        }))
      .then(function(data) {//添加商品成功则进行ajax请求购物车列表数据，刷新页面数据
        // console.log(data);
          that.ajax
      .post("/xinda-api/cart/list", that.qs.stringify({}))
      .then(function(data) {
        if (data.data.data.length == 0) {
          that.seen=false;
        } else {
          // that.shoppingdata = data.data.data;
        }
      })
      .catch(function(data) {
        console.log("请求失败");
      });
      })
      .catch(function(data) {
        console.log("请求失败/您的购物车中没有该产品，请刷新页面"); 
      });
      
  },
    //提交购物车
  commitcart:function(){
    var that = this;
    that.ajax
      .post("/xinda-api/cart/submit", {})
      .then(function(data) {
        that.ordernum=data.data.data;
        // console.log(that.ordernum);
      // kaishi 
      that.$router.push({
            path: '/header/pay', 
            query: { 
                businessNo: that.ordernum
            }})
      // jieshu 


        })
  },
  //减少商品数量
 reducenum:function(e){
   var goodsindex=e.target.id;
      var that = this;
      
    if(that.shoppingdata[goodsindex].buyNum==1){
      //当购买数量为时，提示删除
      //当购买数量为时，提示删除
    }else{
      that.shoppingdata[goodsindex].buyNum--;
      that.shoppingdata[goodsindex].totalPrice=that.shoppingdata[goodsindex].buyNum*that.shoppingdata[goodsindex].unitPrice;
      that.ajax
      .post("/xinda-api/cart/add", that.qs.stringify({
		    id:that.shoppingdata[goodsindex].serviceId,
		    num:-1
        }))
      .then(function(data) {//减少商品成功则进行ajax请求购物车列表数据，刷新页面数据
        console.log(data);
              that.ajax
          .post("/xinda-api/cart/list", that.qs.stringify({}))
          .then(function(data) {
            if (data.data.data.length == 0) {
              that.seen=false;
            } else {
              // that.shoppingdata = data.data.data;
            }
          })
          .catch(function(data) {
            console.log("请求失败");
          });
      })
      .catch(function(data) {
        console.log("请求失败/您的购物车中没有该产品，请刷新页面"); 
      });
    }
      
  },

  //删除产品服务函数
  //elementui 自带弹出框函数,点击确定后发送ajax请求，并刷新页面
   open2(e) {
     var removeindex=e.target.id;
     console.log(e.target.id);
     var that=this;
     console.log(e.target),
        this.$confirm('此操作将从购物车删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(this);
//开始

        that.ajax
              .post("/xinda-api/cart/del", that.qs.stringify({
                id:removeindex,
                }))
              .then(function(data) {//减少商品成功则进行ajax请求购物车列表数据，刷新页面数据
                console.log(data);
                  that.ajax
              .post("/xinda-api/cart/list", that.qs.stringify({}))
              .then(function(data) {
                if (data.data.data.length == 0) {
                  that.seen=false;
                } else {
                  that.shoppingdata = data.data.data;
                  //总价，总计价格
              //     for(i=0 ;i<shoppingdata.length;i++){
              //   that.totalprice+=shoppingdata[i].totalPrice;
              // }
                }
              })
              .catch(function(data) {
                console.log("请求失败");
              });
              })
              .catch(function(data) {
                console.log("请求失败/您的购物车中没有该产品，请刷新页面"); 
              });



//结束
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    
   },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@media screen and (max-width:769px){

  .failcontain{
    flex-direction:column;
  }
}


.shoppingcart {
  font-size: 14px;

  // height: 500px;
  // border: 1px solid;

  .success{
      max-width: 1200px;
        margin: 0 auto;
  }
  .shop {
    font-size: 14px;
    line-height: 50px;
    margin-top: 10px;
  }
  .goods {
    font-size: 14px;
    color: #2693d4;
    padding-left: 5.4116%;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 7px;
  }
  .shoptitle {
    text-align: center;
    padding-left: 5.4116%;
    margin-top: 20px;
    .company {
      text-align: left;
    }
  }

  //订单详细内容样式
  .details {
    height: 120px;
    // border: 1px solid;
    margin-top: 30px;

    .store {
      padding-left: 5.4116%;
    }
    .shopdetails {
      line-height: 80px;
      // border:1px solid;
      height: 80px;
      text-align: center;
      padding-left: 5.4116%;
      margin-top: 20px;
      background-color: #f7f7f7;
      .company {
        text-align: left;
      }
      .logo {
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 80%;
        }
      }
      .number {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        .reduce,
        .add {
          display: block;
          width: 18px;
          height: 20px;
          font-size: 18px;
          font-weight: bold;
          color: #202020;
          border: 0;
          background: #bcbdbd;
          text-align: center;
          line-height: 20px;
        }
        .input {
          height: 20px;
          width: 35px;
          border: 0;
          padding:0;
          // position:relative;
          // top:-2px;
          outline: none;
          text-align: center;
        }
      }
      .money {
        color: #2693d4;
      }

      .remove {
        color: #2693d4;
        border:0;
        outline:none;
        background:#f7f7f7;
      }
      .servicegoods{
        display:flex;
        justify-content: center;
        align-items: center;
        height:80px;
        width:100%;
        p{
          line-height:20px;
        }
        
       
      }
    }
  }
  .allmoney {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    padding-right: 7%;
    font-size: 18px;
    line-height: 40px;
    span {
      font-size: 30px;
      color: #2693d4;
      font-weight: bold;
      position: relative;
      top: 5px;
    }
  }
  .total {
    display: flex;
    justify-content: flex-end;
    padding-right: 7%;
    margin-top: 10px;
    .shopnext {
      display: block;
      border: 1px solid #2693d4;
      line-height: 28px;
      color: #2693d4;
      text-align: center;
      border-radius: 5px;
      width: 105px;
      margin-left: 6px;
      font-size: 16px;
    }
  }
  .hotservice {
    font-size: 14px;
    color: #2693d4;
    padding-left: 5.4116%;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 7px;
    margin-top: 70px;
  }

  .hotservicecontant {
    margin: 35px 0 100px;
    padding: 0 15px;
    .serviceitem {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 20px 15px;
      border: 1px solid #eee;
      .title {
        font-size: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .detail {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .money {
        color: #2694d3;
        font-size: 45px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: \\9ed1\4f53;
      }
      .price {
        width: 100%;
        .left {
          float: left;
          // color: #2694d3;
          text-decoration: line-through;
        }
        .right {
          float: right;
          color: #2694d3;
        }
      }
    }
  }


  .fail{
    // display:none;
    // max-width:1200px;
    width:100%;
    height:600px;
    background:#f5f5f5;
    
    
    .failcontain{
      margin:0 auto;
     
      max-width:1200px;
      height:100%;
      display:flex;
      justify-content: center;
      align-items:center;
     


        .img{
          max-width:430px;
          min-width:320px;
          max-height:320px;
      
          img{
            width:100%;
            // height:100%;
          }
        }
        .shopnext{
            display: block;
            border: 1px solid #2693d4;
            line-height: 30px;
            color: #2693d4;
            text-align: center;
            border-radius: 5px;
            width: 105px;
            margin-left: 85px;
            margin-top:36px;
            font-size: 20px;
        }
        h2{
          // margin: 196px 0 15px;
          font-size: 35px;
          color:#b0b0b0;
        }
    }
   
    
  }
}

.shouji{
  
  .title{
    line-height: 40px;
    background-color: #e5e5e5;
    overflow: hidden;
    padding:0 18px;
    span{
      color:#2693d4;
      font-weight:bold;
    }
  }
  .demo{
    padding-bottom:10px;
    border-bottom:1px solid #cfcfcf;
    .name{
      font-size: 18px;
      margin: 13px 0 0 18px;
    }
    .contain{
      padding:5px;
      height:170px;
      // border:1px solid;
      .left{
        display:flex;
        align-items: center;
        height:100%;
        max-width:280px;
        float:left;
        .img{
          max-width:170px;
          height:166px;
          border:2px solid #e3e3e3;
          display:flex;
          align-items: center;
          img{  
            width:100%;
            min-width:135px;
            // height:170px;
            // border:1px solid;
          }
        }
        
        .word{
          .servicename{
            font-size: 14px;
            font-weight:700;
            margin:7px;
          }
          .price{
             margin:7px;
            span{
              color:red;
              font-size: 18px;
              font-weight:700;
            }
          }
          // kaishi
            .number {
               margin:7px;
                display: flex;
                // justify-content: center;
                align-items: center;
                height: 30px;
                .reduce,
                .add {
                  display: block;
                  width: 18px;
                  height: 20px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #202020;
                  border: 0;
                  background: #bcbdbd;
                  text-align: center;
                  line-height: 20px;
                }
                .input {
                  height: 16px;
                  width: 35px;
                  // border: 0;
                  padding:0;
                  // position:relative;
                  // top:-2px;
                  outline: none;
                  text-align: center;
                }
            }
          // jieshu 
        }
      }
      .right{
        float:right;
        margin-top:10px;
        .remove {
          color: red;
          border:0;
          outline:none;
          background:#f7f7f7;
        }
      }
    }
  }
  .allmoney1{
    margin-top:100px;
    display:flex;
    background-color: #e5e5e5;
    display: flex;
    line-height: 60px;
    .bottom_left{
        width: 66vw;
        font-size:18px;
        margin-left:10px;
        // display:flex;
        // justify-content: flex-start;
        span{
          color:red;
        }
    }
    .shopnext{
       width: 33.5vw;
      display:block;
      height:100%;
      text-align:center;
      color:white;
      background:red;
    }

  }
}


</style>
