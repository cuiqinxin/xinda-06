<template>
    <div class="pay">
         <p class="firstpay">首页/支付</p>
         <p class="tabledetail">订单详情</p>

         <!-- 订单详情 -->

        <!-- style -->
         <div class="orderdetail">
             <div class="businessOrder">
                 <el-col :span="8"><div class="businessNo">
                     订单编号：<span>S1704040001075133085</span>
                 </div></el-col>
                 <el-col :span="7"><div class="createTime">创建时间：<span>2017-03-31 12:00:09</span> </div></el-col>
                 <el-col :span="5"><div class="totalPrice">订单金额：<span>￥500.00</span>元</div></el-col>
                 <!-- <el-col :span="3"><div class="orderclick">订单详情 <div class="tubiao"></div></div></el-col>    -->
                 <el-col :span="3" class="orderclickouter"><a  href="javascript:void(0)" class="orderclick">订单详情 <div class="tubiao"></div></a></el-col> 
               
             </div>
             <div class="orders">
                 <div class="orderlist">
                     <el-col :span="7" class="serviceName">服务名称：<span>注册分公司</span>   </el-col>
                    <el-col :span="6" class="unitPrice">单价：<span>￥800.00元</span></el-col>
                    <el-col :span="5" class="buyNum">数量：<span>1</span></el-col>
                    <el-col :span="6" class="totalPrice">服务总额：<span>￥800.00元</span></el-col>
                 </div>

                  <div class="orderlist">
                     <el-col :span="7" class="serviceName">服务名称：<span>注册分公司</span>   </el-col>
                    <el-col :span="6" class="unitPrice">单价：<span>￥800.00元</span></el-col>
                    <el-col :span="5" class="buyNum">数量：<span>1</span></el-col>
                    <el-col :span="6" class="totalPrice">服务总额：<span>￥800.00元</span></el-col>
                 </div>
                 


             </div>


         </div>
         <!-- 订单详情 结束-->
        <!-- 支付方式 -->
        <p class="tabledetail" style="margin-top:45px">支付方式</p>
        
            
            <p class="paystyle">平台支付</p>
            <div class="yinlian"><input type="radio" name="paystyle"></div>
           
            <p class="paystyle">非网银支付</p>
            <div class="feiwangyin">
                <input type="radio" name="paystyle">
                <input type="radio" name="paystyle">
            </div>
             <p class="paystyle">自助转账<span>因限额不能支付时，建议使用自助转账</span></p>
             <div class="zizhu">
                 <input type="radio" name="paystyle">
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
export default {
  name: "pay",
  created() {},
  data() {
    return {
  
        
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
  height: 1500px;
  border: 1px solid;
  .firstpay {
    font-size: 14px;
    line-height: 50px;
    margin-top: 10px;
  }
  .tabledetail {
    font-size: 14px;
    color: #2693d4;
    // padding-left: 5.4116%;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 7px;
  }


    // 订单详情样式
  .orderdetail{
      
    //   border:1px solid #b6b6b6;
      margin-top:35px;
      font-size:14px;
    //   text-align:center;
  
      .businessOrder{
        padding: 0 0 0 5%;
        border:1px solid #b6b6b6;
         height:75px;
         display:flex;
        //  justify-content: center;
         align-items: center;
         background:#e5e5e5;
         .businessNo{
             span{
                 color:#62a8dc;
             }
         }
         .orderclickouter{
             display:flex;
             justify-content: center;

              .orderclick{
            // text-align:center;
            color:#ff0000;
             display:flex;
            
            .tubiao{
                width:16px;
                height:14px;
                background:url(../../xiala.png) no-repeat;
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
        //  text-align:center;
        //  justify-content: center;
         align-items: center;
         background:#f7f7f7;
        border:1px solid #b6b6b6;

      }
      
  }

  //支付方式样式
  .paystyle{
      font-size:14px;
      line-height:65px;
  }
}
</style>
