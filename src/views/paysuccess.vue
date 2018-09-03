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
                <p class='businessNo'>订单号：<span>{{$route.query.businessNo}}</span></p>
                <p class="tiaozhuan">即将为您跳转到 <router-link to='member/memberorder' class="tiaozhuan1">我的订单</router-link>（{{seconds}}s）</p>
                <p class="tip">我们将尽快确认您的付款信息</p>
                 
                <!-- <p class="buttonouter"><a href="javascript:void(0)" class="button">返回支付首页</a></p> -->
                <p class="contact">如有问题，请联系客服：<span>010-83421842</span></p>
            </div>
      </div>
     
  </div>
</template>

<script>
import store from "../store"
export default {
    name: 'payfailed',
    data() {
      return {
          seconds:5,
          s:''
      };
    },
    methods:{
      
    },
    computed:{
     
    },
    created(){
          if(!this.$store.state.userPhoneNumber){
           this.$router.push({path:'/'});
      }else{
          var that=this;
        this.s = setInterval(function(){that.seconds--},1000);
      }
        

    },
    watch:{
        seconds:function(){
            if(this.seconds==0){
                clearInterval(this.s);
                this.$router.push({path:"member/memberorder"});
                 
            }
        }
    }
}
</script>

<style lang="less">

@media screen and (max-width:769px){

  .payfailed{
    flex-direction:column;
    text-align:center;
    height:100vh!important;
  }

  .payfaildimg{
      margin:0 0 30px;
      margin-right:20px!important;
  }
  .firstpay,.failedpay{
      display:none;
  }
  .businessNo{
      position:relative;
      left:-4px;
  }
}




.businessNo{
    margin-top:10px;
    font-size:14px;
    margin-bottom:10px;
    span{
        color: #2693d4;
    }
}
.tiaozhuan{
    font-size:16px;
    .tiaozhuan1{
        font-size:16px;
        border-bottom:1px solid #2693d4;
        color:#2693d4;
        &:hover{
            font-weight:800;
            border-bottom:2px solid #2693d4;
        }
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
                margin: 10px 0 6px;
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
