<template>
  <div id="payfailed" >
      
        <p class="firstpay">首页/支付</p>
         
        <p class="failedpay">支付成功</p>

      <div class="payfailed">
            <div class="payfaildimg">
                <img src="../../static/paysuccess.png" alt="#">
            </div>
            <div class="detail">
                <p class="blue">支付成功！</p>
                <p class="tip">我们将尽快确认您的付款信息</p>
                <!-- <p class="buttonouter"><a href="javascript:void(0)" class="button">返回支付首页</a></p> -->
                <p class="contact">如有问题，请联系客服：<span>010-83421842</span></p>
            </div>
      </div>
     
  </div>
</template>

<script>
// import store from './store';
export default {
    name: 'payfailed',
    data() {
      return {
       
      };
    },
    methods:{
      
    },
    computed:{
     
    },
    created(){
      
    },
}
</script>

<style lang="less">

@media screen and (max-width:769px){

  .payfailed{
    flex-direction:column;
    text-align:center;
    height:650px!important;
  }

  .payfaildimg{
      margin:0 0 30px;
      margin-right:20px!important;
  }
  .firstpay,.failedpay{
      display:none;
  }
}



    .firstpay{
        font-size: 14px;
        line-height: 50px;
        margin-top: 10px;
        max-width:1200px;
        margin:0 auto;
    }
    .failedpay{
        font-size: 14px;
        color: #2693d4;
        border-bottom: 1px solid #bdbdbd;
        padding-bottom: 7px;
        margin:0 auto;
        max-width:1200px;
        margin-bottom:15px;
    }
    .payfailed{
        margin:0 auto;
        max-width:1200px;
        height:380px;
        display:flex;
        justify-content: center;
        align-items: center;
        background:#f7f7f7;
        margin-bottom:15px;
        .payfaildimg{
            width:128px;
            height:128px;
            margin-right:50px;
            // border:1px solid;
            img{
                width:100%;
            }
        }
        .detail{
            // text-align:center;
            .blue{
                color: #2494d6;
                font-size: 30px;
            }
            .tip{
                font-size: 18px;
                margin: 25px 0 10px;
            }
            .button{
                display:block;
                color: #2494d6;
                border: 1px solid;
                border-radius: 4px;
                padding: 8px 15px;
                font-size: 14px;
                width:100px;
                // margin:0 auto;
                text-align:center;
            }
            .contact{
                font-size:13px;
                span{
                    font-size: 20px;
                }
            }
        }
    }
  
</style>
