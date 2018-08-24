<template>



    <div class="pay">
        <div class="payweb hidden-xs-only">
                <p class="firstpay">首页/支付</p>
            <p class="tabledetail">订单详情</p>

            <!-- 订单详情 -->

            <!-- style -->
            <div class="orderdetail" >
                <div class="businessOrder">
                    <el-col :span="8"><div class="businessNo">
                        订单编号：<span>{{businessOrder.businessNo}}</span>
                    </div></el-col>
                    <el-col :span="7"><div class="createTime">创建时间：<span>{{ businessOrder.createTime}}</span> </div></el-col>
                    <el-col :span="5"><div class="totalPrice">订单金额：<span style="color:#62a8dc;">￥{{businessOrder.totalPrice}}元</span></div></el-col>

                    <el-col :span="3" class="orderclickouter"><a  href="javascript:void(0)" class="orderclick" @click="xiangqing">订单详情 <div class="tubiao"><img :src="xiangqingsrc" alt="#"></div></a></el-col>

                </div>
                <div class="ordersouter">
                        <transition name="bounce" class="orders">
                    <div v-if="show" >
                        <div class="orderlist" v-for="(item,index) in serviceOrderList" :key="index">
                        <el-col :span="7" class="serviceName">服务名称：<span>{{item.serviceName}}</span>   </el-col>
                        <el-col :span="6" class="unitPrice">单价：<span>￥{{item.unitPrice}}元</span></el-col>
                        <el-col :span="5" class="buyNum">数量：<span>{{item.buyNum}}</span></el-col>
                        <el-col :span="6" class="totalPrice">服务总额：<span>￥{{item.totalPrice}}元</span></el-col>
                    </div>
                    </div>
                </transition>
                </div>
            </div>
            <!-- 订单详情 结束-->
            <!-- 支付方式 -->
            <p class="tabledetail" style="margin-top:45px">支付方式</p>


                <p class="paystyle">平台支付</p>
                <div class="yinlian">
                    <input type="radio" name="paystyle" value="yinlian" v-model="paystyle">
                    <div class="img"></div>
                </div>

                <p class="paystyle">非网银支付</p>
                <div class="feiwangyin">
                    <div class="weixin">
                        <input type="radio" name="paystyle" value="weixin" v-model="paystyle">
                        <div class="img"></div>
                        <p class="weixinzhifu">微信支付</p>
                    </div>
                    <div class="zhifubao">
                        <input type="radio" name="paystyle" value="zhifubao" v-model="paystyle">
                        <div class="img"></div>
                        <p class="weixinzhifu">快捷支付</p>
                    </div>
                </div>
                <p class="paystyle">自助转账<span>因限额不能支付时，建议使用自助转账</span></p>
                <div class="zizhu">
                    <input type="radio" name="paystyle" value="zizhu" v-model="paystyle">
                    <div class="img"></div>
                    <div class="contain">
                        <p class="up"><span>开户账号：</span>110916853310605</p>
                        <p class="middle"><span>开户名：</span>北京爱蓝领网络科技有限公司</p>
                        <p class="down"><span>开户行：</span>招商银行股份有限公司北京东三环支行</p>
                    </div>
                </div>
                <p class="tip">注：转账时请将订单编号备注在付款信息里：转账完成后，请通知客服</p>

                <!-- <p>{{paystyle}}</p> -->

                <div class="bottomtotal">
                    <p class="bottomtotalprice">
                        金额总计：<span>￥{{businessOrder.totalPrice}}.00元</span>
                    </p>
            </div>
            <div class="bottom">
              <router-link to="/" class="jiesuan">继续购物</router-link>
           <a href="javascript:void(0)" class="jiesuan" @click="gopay">去结算</a>
             </div>


        </div>

        <!-- 手机端 -->
        <div class="payshouji hidden-sm-and-up">
            <p class='title'>订单详情</p>
            <p class='ordernum'>订单编号：<span>{{businessOrder.businessNo}}</span></p>

            <div class="Ordertitle">
                    <el-col :span="8"><div class="demo">
                        服务名称
                    </div></el-col>

                    <el-col :span="5"><div class="demo">
                        单价
                    </div></el-col>

                    <el-col :span="6"><div class="demo">
                        数量
                    </div></el-col>

                    <el-col :span="5" class="demo">
                        总额
                    </el-col>
            </div>
            <div class="orderlist" v-for="(item,index) in serviceOrderList" :key="index">
                        <el-col :span="8" class="serviceName demo1"><span>{{item.serviceName}}</span>   </el-col>
                        <el-col :span="5" class="unitPrice demo1"><span>￥{{item.unitPrice}}元</span></el-col>
                        <el-col :span="6" class="buyNum demo1"><span>{{item.buyNum}}</span></el-col>
                        <el-col :span="5" class="totalPrice demo1"><span>￥{{item.totalPrice}}元</span></el-col>
            </div>
                 <!-- 支付方式 -->
            <div class="paysty">
                 <p class="tabledetail" style="margin-top:45px">支付方式</p>


                <p class="paystyle">平台支付</p>
                <div class="yinlian">
                    <input type="radio" name="paystyle" value="yinlian" v-model="paystyle">
                    <div class="img"></div>
                </div>

                <p class="paystyle">非网银支付</p>
                <div class="feiwangyin">
                    <div class="weixin">
                        <input type="radio" name="paystyle" value="weixin" v-model="paystyle">
                        <div class="img"></div>
                        <p class="weixinzhifu">微信支付</p>
                    </div>
                    <div class="zhifubao">
                        <input type="radio" name="paystyle" value="zhifubao" v-model="paystyle">
                        <div class="img"></div>
                        <p class="weixinzhifu">快捷支付</p>
                    </div>
                </div>
                <p class="paystyle">自助转账<span>因限额不能支付时，建议使用自助转账</span></p>
                <div class="zizhu">
                    <input type="radio" name="paystyle" value="zizhu" v-model="paystyle">
                    <div class="img"></div>
                    <div class="contain">
                        <p class="up"><span>开户账号：</span>110916853310605</p>
                        <p class="middle"><span>开户名：</span>北京爱蓝领网络科技有限公司</p>
                        <p class="down"><span>开户行：</span>招商银行股份有限公司北京东三环支行</p>
                    </div>
                </div>
                <p class="tip">注：转账时请将订单编号备注在付款信息里：转账完成后，请通知客服</p>

            </div>

                <!-- <p>{{paystyle}}</p> -->
            <div class="allmoney1"><p class="bottom_left">
              合计:<span>￥{{businessOrder.totalPrice}}.00元</span>

              </p>
                <a href="javascript:void(0)" class="jiesuan" @click="gopay">去支付</a>
            </div>
        </div>


          <!-- 支付方式弹出框 -->
          <div class="zhezhao" v-if="payboxstate">

          </div>
             <div class="paybox" v-if="payboxstate">
                 <p class="xiaoshi" @click="xclick"><a href="javascript:void(0)" class="xiaoshiclick">×</a> </p>
                <div class="erweimastate" v-if="erweimastate">
                    <div class="erweima">
                        <img :src="paysrc" alt="暂未开放，敬请期待"  >

                        </div>
                        <p class="saoyisao">请使用扫一扫进行扫码支付</p>
                        <div class="payboxbottom">
                            <a href="javascript:void(0)" class="payover"  @click="payover">已完成支付</a>

                            <a href="javascript:void(0)" class="payquestion" @click="payquestion">支付遇到问题</a>
                    </div>
                </div>
                 <p v-else style="line-height:275px;">暂未开放，敬请期待</p>

                <a href="javascript:void(0)" class="goback"  @click="xclick">返回重新选择支付方式</a>

             </div>

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
        // 开始；订单号请求成功后进行订单详情请求
        that.ajax
      .post("/xinda-api/business-order/detail",  that.qs.stringify({
          "businessNo":this.$route.query.businessNo
      }))
      .then(function(data) {
        // console.log(that.businessOrde);

         that.businessOrder=data.data.data.businessOrder;
        //  console.log();
         that.serviceOrderList=data.data.data.serviceOrderList;
        //  将时间戳格式化
          var date = new Date(that.businessOrder.createTime);
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
            that.businessOrder.createTime=y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        })
  },
  data() {
    return {
        businessOrder:'',
        serviceOrderList:'',
        show:true,
        xiangqingsrc:"../../static/shouqi.png",
        paystyle:'',
        payboxstate:false,
        paysrc:"",
        erweimastate:true,
    };
  },

    methods:{
        //图片切换
        xiangqing(){
           this.show=!this.show 
           if(this.xiangqingsrc=="../static/xiala.png"){
               this.xiangqingsrc="../static/shouqi.png";
           }else{
              this.xiangqingsrc="../static/xiala.png"; 
           }
        },
        //支付方式
        gopay(){
            if(this.paystyle==''){
                 this.open();
            }else if(this.paystyle=='yinlian'){
                 var that = this;
       //银联的接口请求
    //     that.ajax
    //   .post("/xinda-api/pay/china-pay",  that.qs.stringify({
    //       "businessNo":that.businessOrder.businessNo
    //   }))
    //   .then(function(data) {
    //     console.log(data);
                this.payboxstate=true;
                this.erweimastate=false;

    //     })
            }else if(this.paystyle=='weixin'){
                // 微信的接口请求
                this.erweimastate=true;
                this.payboxstate=true;
                this.paysrc="../static/weixinzhifu.jpg";



            }else if(this.paystyle=='zhifubao'){
                this.erweimastate=true;
                 this.payboxstate=true;
                this.paysrc="../static/zhifubaozhifu.jpg";

            }else if(this.paystyle=='zizhu'){
                this.payboxstate=true;
                this.erweimastate=false;
            }
        },
        //支付方式结束
        //支付弹出框消失
        xclick(){
            this.payboxstate=false;
        },
        //支付完成
        payover(){
            var that=this;
            this.$router.push({
                path:"/header/paysuccess",
                query: {
                    businessNo: that.businessOrder.businessNo
                }
            });
        },
        //支付失败
        payquestion(){
            this.$router.push({
                path:"/header/payfailed",
                 // params: {
                // name: 'name',
                // dataObj: this.msg
                // }
                });
        },

        //弹出框函数
        open() {
            this.$alert('请选择支付方式！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
                // this.$message({
                // type: 'info',
                // message: `action: ${ action }`
                // });
            }
            });
        },
        //弹出框函数结束

    },
    computed:{
        a:function(){
            console.log(this.paystyle)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

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
                    position:relative;
                    top:1.5px;
                    left:3px;
                    img{
                        width:100%;
                        height:100%;
                    }
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
      max-width:435px!important;
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
//支付方式样式jieshu
  .bottomtotal{
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
        padding-right: 7%;
        font-size: 18px;
        line-height: 40px;
        .bottomtotalprice{
            width:225px;
            text-align:center;
            // border:1px solid;
        }
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
.ordersouter{
    min-height:20px;
    overflow:hidden;
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
// 支付弹窗box
.paybox{
    width:295px;
    height:371px;
    // border:1px solid;
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:6000;
    background:#fff;
    box-shadow: 0 0 10px #a7a3a3;
    .xiaoshi{
        text-align:right;
        padding:5px 10px;
        background:#e5e5e5;
        font-size:21px;
    }
    .erweima{
        width:236px;
        height:236px;
        margin:0 auto;
        // border:1px solid;
        img{
            width:100%;
            // height:100%;
        }
    }
    p{
        text-align:center;
    }
    .saoyisao{
        position:relative;
        top:-9px;
    }
    .payboxbottom{
        display:flex;
        justify-content: center;
        // border:1px solid;
    }
    .payover,.payquestion{
        display:block;
        color:#62a8dc;
        border:1px solid #62a8dc;
        font-size:13px;
        width:88px;
        text-align:center;
        margin:3px 10px;
    }
    .goback{
       display:block;
        border:1px solid #4eb5ba;
        color:#fff;
        width:200px;
        margin:0 auto;
        background:#4eb5ba;
         margin-top:7px;
         text-align:center;
    }


}

.payshouji{
    .title{
        height:40px;
        line-height:40px;
        font-size:23px;
        background:#4eb5ba;
        text-align:center;
        color:white;
    }
    .ordernum{
        line-height:40px;
        color:20px;
        text-align:center;
        span{
            color:#62a8dc;
        }
    }
    .Ordertitle{
        height:40px;
        line-height:40px;
        font-size:16px;
        text-align:center;
        background:#e5e5e5;
         padding:0 5px;
    }
    .orderlist{
        min-height:40px;
        background:#f7f7f7;
        display:flex;
        justify-content: center;
        align-items:center;
        padding:0 5px;
        .demo1{
            display:flex;
            justify-content: center;
            align-items:center;
            font-size:12px;
        }
        .unitPrice,.totalPrice{
            color:#2693d4;
        }
    }
    .paysty{
        padding:0 5px;
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
            flex-direction: column;
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
                    margin-top:10px;
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
            max-width:435px!important;
                    height:50px;
                    border:1px solid #f0efef;
                    line-height:50px;
                    display:flex;
                    align-items: center;
                    overflow: hidden;
                    margin-right:0;
                    .img{
                        max-width:110px;
                        // height:59px;
                        margin-left:0;
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
        //支付方式样式jieshu
    }

    .allmoney1{
     width:100%;
    position:fixed;
    bottom:88px;
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
    .jiesuan{
       width: 33.5vw;
      display:block;
      height:100%;
      text-align:center;
      color:white;
      background:red;
    }

  }
}
 .zhezhao{

     background:black;
     opacity: 0.4;
     z-index:5000;
     position:fixed;
     left:0;
     top:0;
     width:100%;
     height:100%;
 }
.el-message-box{
    width: 300px!important;
}
</style>
