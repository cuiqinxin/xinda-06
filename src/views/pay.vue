<template>
    <div class="pay">
         <p class="firstpay">首页/支付</p>
         <p class="tabledetail">订单详情</p>

         <!-- 订单详情 -->

        <!-- style -->
         <div class="orderdetail" >
             <!-- demo -->
             <div class="businessOrder">
                 <el-col :span="8"><div class="businessNo">
                     订单编号：<span>S1704040001075133085</span>
                 </div></el-col>
                 <el-col :span="7"><div class="createTime">创建时间：<span>2017-03-31 12:00:09</span> </div></el-col>
                 <el-col :span="5"><div class="totalPrice">订单金额：<span style="color:#62a8dc;">￥500.00元</span></div></el-col>
                 <!-- <el-col :span="3"><div class="orderclick">订单详情 <div class="tubiao"></div></div></el-col>    -->
                 <el-col :span="3" class="orderclickouter"><a  href="javascript:void(0)" class="orderclick">订单详情 <div class="tubiao"></div></a></el-col> 
               
             </div>
             <!-- demoover -->
             <div class="businessOrder">
                 <el-col :span="8"><div class="businessNo">

                     订单编号：<span>{{businessOrder.businessNo}}</span>
                 </div></el-col>
                 <el-col :span="7"><div class="createTime">创建时间：<span>{{ businessOrder.createTime}}</span> </div></el-col>
                 <el-col :span="5"><div class="totalPrice">订单金额：<span style="color:#62a8dc;">￥{{businessOrder.totalPrice}}元</span></div></el-col>
                
                 <el-col :span="3" class="orderclickouter"><a  href="javascript:void(0)" class="orderclick" @click="show=!show">订单详情 <div class="tubiao"></div></a></el-col> 
               
             </div>
             <transition name="bounce" class="orders">
                 <div class="orderlist" v-for="(item,index) in shoppingdata" :key="index">
                     <el-col :span="7" class="serviceName">服务名称：<span>{{item.serviceName}}</span>   </el-col>
                    <el-col :span="6" class="unitPrice">单价：<span>￥{{item.unitPrice}}元</span></el-col>
                    <el-col :span="5" class="buyNum">数量：<span>{{item.buyNum}}</span></el-col>
                    <el-col :span="6" class="totalPrice">服务总额：<span>￥{{item.totalPrice}}元</span></el-col>
                 </div>

                  <div  v-if="show" class="orderlist">
                     <el-col :span="7" class="serviceName">服务名称：<span>注册分公司</span>   </el-col>
                    <el-col :span="6" class="unitPrice">单价：<span>￥800.00元</span></el-col>
                    <el-col :span="5" class="buyNum">数量：<span>1</span></el-col>
                    <el-col :span="6" class="totalPrice">服务总额：<span>￥800.00元</span></el-col>
                 </div>
                 


             </transition>


         </div>
         <!-- 订单详情 结束-->
        <!-- 支付方式 -->
        <p class="tabledetail" style="margin-top:45px">支付方式</p>
        
            
            <p class="paystyle">平台支付</p>
            <div class="yinlian">
                <input type="radio" name="paystyle" value="yinlian">
                <div class="img"></div>
            </div>
           
            <p class="paystyle">非网银支付</p>
            <div class="feiwangyin">
                <div class="weixin">
                    <input type="radio" name="paystyle" value="weixin">
                    <div class="img"></div>
                    <p class="weixinzhifu">微信支付</p>
                </div>
                <div class="zhifubao">
                    <input type="radio" name="paystyle" value="zhifubao">
                     <div class="img"></div>
                     <p class="weixinzhifu">快捷支付</p>
                </div>
            </div>
             <p class="paystyle">自助转账<span>因限额不能支付时，建议使用自助转账</span></p>
             <div class="zizhu">
                 <input type="radio" name="paystyle" value="zizhu">
                 <div class="img"></div>
                 <div class="contain">
                     <p class="up"><span>开户账号：</span>110916853310605</p>
                     <p class="middle"><span>开户名：</span>北京爱蓝领网络科技有限公司</p>
                     <p class="down"><span>开户行：</span>招商银行股份有限公司北京东三环支行</p>
                 </div>
             </div>
             <p class="tip">注：转账时请将订单编号备注在付款信息里：转账完成后，请通知客服</p>
           

           
              <div class="bottomtotal">
                   <p class="bottomtotalprice">
                      金额总计：<span>￥8000.00元</span>
                  </p>
          </div>
          <div class="bottom">
              <router-link to="/" class="jiesuan">继续购物</router-link>
           <a href="javascript:void(0)" class="jiesuan">去结算</a>
             </div>


        <!-- <p class="tabledetail" style="margin-top:45px">支付方式</p>
        <p class="paystyle">非网银支付</p>
        <p class="paystyle">平台支付</p>
        <p class="paystyle">自助转账<span>因限额不能支付时，建议使用自助转账</span></p> -->
      
      



           <!-- <el-row class='shoptitle'>
                <el-col :span="3" class="company">公司</el-col>
                <el-col :span="4" class="servicegoods">服务商品</el-col>
                <el-col :span="4" class="price">单价</el-col>
                <el-col :span="4" class="number">数量</el-col>
                <el-col :span="5" class="money">金额</el-col>
                <el-col :span="4" class="operation">操作</el-col>
         </el-row> -->

    </div>
</template>

<script>
// new Vue({
//   el: '#example-1',
//   data: {
//     show: true
//   }
// })
export default {
  name: "pay",
  created() {

    var that = this;
    this.ajax
      .post("http://123.58.241.146:8088/xinda/xinda-api/cart/submit", {})
      .then(function(data) {
        console.log(data.data.data);
        var businessNo=data.data.data;
        // 开始；订单号请求成功后进行订单详情请求
        this.ajax
      .post("http://123.58.241.146:8088/xinda/xinda-api/cart/submit", {})
      .then(function(data) {
         businessOrder=data.data.data.businessOrder;
         serviceOrderList=data.data.data.serviceOrderList;
        //  将时间戳格式化
          var date = new Date(businessOrder.createTime);
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;  
            second = second < 10 ? ('0' + second) : second; 
            businessOrder.createTime=y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 

        })
        .catch(function(data) {
            console.log("请求失败");
        });
        // 结束

       
        })
        .catch(function(data) {
            console.log("请求失败");
        });


  },
  data() {
    return {
        businessOrder:'',
        serviceOrderList:'',
        show:true,
        
    };
  }

  //   computed:{
  //       count(){
  //           return store.state.count;
  //       }
  //   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.pay {
  max-width: 1200px;
  margin: 0 auto;
  .firstpay {
    font-size: 14px;
    line-height: 50px;
    margin-top: 10px;
  }
  .tabledetail {
    font-size: 14px;
    color: #2693d4;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 7px;
  }

    // 订单详情样式
  .orderdetail{
      margin-top:35px;
      font-size:14px;
      .businessOrder{
        padding: 0 0 0 5%;
        border:1px solid #b6b6b6;
        height:75px;
        display:flex;
        align-items: center;
        background:#e5e5e5;
        z-index:3000;
         .businessNo{
             span{
                 color:#62a8dc;
             }
         }
         .orderclickouter{
             display:flex;
             justify-content: center;
            .orderclick{
                color:#ff0000;
                display:flex;
                .tubiao{
                    width:16px;
                    height:14px;
                    background:url(../../static/xiala.png) no-repeat;
                    background-size:100%;
                    position:relative;
                    top:3.5px;
                    left:3px;
                }
            }
         }
      }
      .orderlist{
        padding: 0 0 0 5%;
        height:75px;
        display:flex;
        align-items: center;
        background:#f7f7f7;
        border:1px solid #b6b6b6;
        z-index:1000;
        .unitPrice,.buyNum,.totalPrice{
            span{
                color:#2693d4;
            }
        }
      }  
  }

  //支付方式样式
  .paystyle{
      font-size:14px;
      line-height:65px;
      span{
        font-size:12px; 
        margin-left:20px;
      }
  }
  .yinlian{
      width:205px;
      height:50px;
      border:1px solid #f0efef;
      line-height:50px;
      display:flex;
      align-items: center;
      .img{
         width:150px;
         height:40px;
         margin-left:10px;
          background:url(../../static/yinlian.png) no-repeat;
          background-size:100% 100%;
      }
  }

  .feiwangyin{
      display:flex;
       .weixin{
            width:205px;
            height:50px;
            border:1px solid #f0efef;
            line-height:50px;
            display:flex;
            align-items: center;
            overflow: hidden;
            margin-right:22px;
            .weixinzhifu{
                font-size:14px;
                font-family: "微软雅黑";
                margin-left:15px;
            }
            .img{
                width:38px;
                height:32px;
                margin-left:15px;
                background:url(../../static/weixinzhifu.png) no-repeat;
                background-size:100% 100%;
            }
        }
        .zhifubao{
            width:205px;
            height:50px;
            border:1px solid #f0efef;
            line-height:50px;
            display:flex;
            align-items: center;
            overflow: hidden;
            .weixinzhifu{
                font-size:14px;
                font-family: "微软雅黑";
                margin-left:15px;
            }
            .img{
                width:70px;
                height:25px;
                margin-left:10px;
                background:url(../../static/zhifubao.png) no-repeat;
                background-size:100% 100%;
            }
        }
  }
  .zizhu{
      width:435px;
            height:50px;
            border:1px solid #f0efef;
            line-height:50px;
            display:flex;
            align-items: center;
            overflow: hidden;
            margin-right:10px; 
            .img{
                width:110px;
                height:59px;
                margin-left:15px;
                background:url(../../static/招商银行.jpg) no-repeat;
                background-size:100% 100%; 
            }
            .contain{
                font-size:12px;
                height:50px;
                line-height:16px;
                margin-left:10px;
                span{
                    color:#999999;
                    font-weight:bold;
                }
            }
  }
  .tip{
      font-size:12px;
      color:#ff6767;
      margin-top:15px;
  }
  input[name=paystyle]{
      margin:0 10px 0 10px;
      width:18px;
      height:18px;
  }
  .bottomtotal{
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
        padding-right: 7%;
        font-size: 18px;
        line-height: 40px;
        span {
        font-size: 24px;
        color: #2693d4;
        font-weight: bold;
        position: relative;
        top: 5px;
        }
  }
  .bottom{
       display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        padding-right: 7%;
        font-size: 18px;
        line-height: 40px;
        margin-bottom:100px;
         .jiesuan{
              display: block;
                border: 1px solid #2693d4;
                line-height: 28px;
                color: #2693d4;
                text-align: center;
                border-radius: 5px;
                width: 105px;
                margin-left: 10px;
                font-size: 16px;
        }     
      } 
}
.bounce-enter-active {
  transition: all .3s ease;
}
.bounce-leave-active {
  transition: all .3s ease;
}
.bounce-enter, .bounce-leave-to{
  transform: translateY(-30px);
  opacity: 0; 
}
</style>
