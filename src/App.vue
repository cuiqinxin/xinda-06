<template>
  <div id="app">
    <!-- 开始公共头部 -->
    <div class="top hidden-md-and-down">
      <el-row class="top-con" type="flex" justify="space-between">
        <el-col :span="12" class="top-left">
          <!-- <button @click="link">等</button> -->
          <router-link to="" 
            
            v-if="!sta">
            {{userPhoneNumber}}{{userPhoneNumber1}}
          </router-link>
          <span>欢迎来到信达！</span>
          <router-link :to="{path:'/outter/login',query:{id:123}}" v-if="sta">登录</router-link>
          <router-link to="/outter/zhuce" v-if="sta">快速注册</router-link>
        </el-col>
        <el-col :span="12" class="top-right">
          <router-link to="" class="shop-cart">
            <span class="shop-img"></span>
            <router-link to="/shoppingcart">购物车<a>{{cartNum}}</a>件</router-link>
          </router-link>
          <router-link to="" class="service-enter">服务商入口</router-link>
        </el-col>
      </el-row>
    </div>
    <!-- 结束公共头部 -->

    <router-view/>

    <!-- 开始公共底部 -->
    <footer class="footer2 hidden-md-and-down">ⒸCopyright 2016北京信达科技有限公司 京ICP备 16011621号</footer>
    <!-- 结束公共底部 -->
  </div>
</template>

<script>
import store from './store';
export default {
    name: 'App',
    data() {
      return {
        status: 0,
        cartNum: 0,
        sta: true,
        userPhoneNumber1:'',
      };
    },
    // methods:{
    //     link(){
    //         this.$router.push({
    //             path:'/outter/login',query:{id:123456}
    //         })
    //     },
    // },
    computed:{
      userPhoneNumber(){
        return store.state.userPhoneNumber;
      }
    },
    created(){
      var that = this;
      this.ajax.post("/xinda-api/cart/cart-num").then(data=>{
          this.cartNum = data.data.data.cartNum;
      });
      fun:{
        if(store.state.userPhoneNumber == ''){
          this.ajax.post("/xinda-api/sso/login-info").then(data=>{
              if(data.data.status === 0){
                that.sta = true;
              }else if(data.data.status === 1){
                that.sta = false;
                this.userPhoneNumber1 = data.data.data.loginId;
              }
          });
          that.sta = true;
        }else {
          that.sta = false;
        }
      }
    },
    // watch:{
    //   userPhoneNumber(){
    //     return store.state.userPhoneNumber;
    //   }
    //   $route : function(){
    //     this.ajax.post("/xinda-api/cart/cart-num").then(data=>{
    //       this.cartNum = data.data.data.cartNum;
    //     });
    //   },
    //   $route : function(){
    //     this.ajax.post("/xinda-api/sso/login-info").then(data=>{
    //       this.status = data.data.status;
    //     });
    //   },
    //   $route: function(){
    //     if(this.status === 1){
    //       sta = false;
    //     }else{
    //       sta = true;
    //     }
    //   }
    // },
}
</script>

<style lang="less">
  #app{position: relative;}
  *{margin: 0;padding:0};
  li{list-style: none};
  a{text-decoration: none};

  .top{
    font-size: 12px;
    letter-spacing: 1px;
    background-color: #f2f2f2;
    .top-con{
      max-width: 1200px;
      margin: 0 auto;
      height: 35px;
      line-height: 35px;
      .top-left{
        a{
          color:#2693d4;
          margin: 0 12px;
        }
      }
      .top-right{
        text-align: right;
        .shop-cart{
          color: #000;
          margin-right: 16px;
          .shop-img{
            display: inline-block;
            width: 21px;
            height: 18px;
            vertical-align: middle;
            background-image: url(../static/shop.png);
            background-size: 21px 18px;
          }
          a{
            color: #000;
            a{
              color: #2693d4;
            }
          }
        }
        .service-enter{
          color: #2693d4;
        }
      }
    }
  }
  .footer2{
    background-color: #cbcccc;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .header .grabble-input{
    input{
      border-radius: 4px 0 0 4px;
      width: 485px;
      height: 41px;
      border: 2px solid #2693d4;
      // &:hover{
      //    border: 2px solid #2693d4;
      // }
    }
  }
</style>
