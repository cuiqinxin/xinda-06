<template>
  <div id="app">
    <!-- 开始公共头部 -->
    <div class="top hidden-md-and-down">
      <el-row class="top-con" type="flex" justify="space-between">
        <el-col :span="12" class="top-left">
          <!-- <button @click="link">等</button> -->
          <div class="topHover">
            <router-link to="/member/memberorder" 
              v-if="userPhoneNumber">
              {{userPhoneNumber}}
            </router-link>
            <div class="member">
              <div class="member-img"><img src="../static/pep.png"></div>
              <div>
                <p class="guanli">
                  <router-link to="/member/memberorder">账号管理</router-link>
                  <span></span>
                  <a @click="logout">退出</a>
                </p>
                <p>{{userPhoneNumber}}</p>
                <p class="join"><router-link to="/join">加盟我们</router-link></p>
              </div>
            </div>
          </div>
          <span>欢迎来到信达！</span>
          <router-link :to="{path:'/outter/login',query:{id:123}}" v-if="!userPhoneNumber">登录</router-link>
          <router-link to="/outter/zhuce" v-if="!userPhoneNumber">快速注册</router-link>
        </el-col>
        <el-col :span="12" class="top-right">
          <router-link to="" class="shop-cart" v-if="userPhoneNumber">
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
        // sta: true,
        userPhoneNumber1:'',
      };
    },
    methods:{
        // link(){
        //     this.$router.push({
        //         path:'/outter/login',query:{id:123456}
        //     })
        // },
      logout() {
        var that=this;
        this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.commit('loginStatus','')
          this.ajax.post("/xinda-api/sso/logout").then(data=>{
            that.$router.push({path:'/header'});
          });
          this.$message({
            type: 'success',
            message: '成功退出登陆!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      }
    },
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
          this.ajax.post("/xinda-api/sso/login-info").then(data=>{
            if(data.data.status === 0){
              store.commit('loginStatus','')
            }else if(data.data.status === 1){
              store.commit('loginStatus',data.data.data.loginId);
            }
        })
      }
    },
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
        >a{
          color: #2693d4;
        }
        >div{
          display: inline-block;
          a{
            position: relative;
            color:#2693d4;
            margin: 0 12px;
          }
        }
        // a{
        //   position: relative;
        //   color:#2693d4;
        //   margin: 0 12px;
        // }
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
  .header {
    .grabble-input{
      input{
        border-radius: 4px 0 0 4px;
        width: 485px;
        height: 41px;
        border: 2px solid #2693d4;
      }
    }
    .color_red input{
      border: 2px solid red!important;
    }
  }
  .member{
    position: absolute;
    background-color: #fff;
    border: 1px solid rgb(230, 230, 230);
    border-top: none;
    z-index: 9999;
    // display: flex;
    display: none;
    padding: 0 10px 10px;
    .member-img{
      width: 50px;
      height: 50px;
      margin:20px 10px;
      img{
        width: 100%;
      }
    }
    .guanli{
      line-height: 26px!important;
      width: 135px;
      text-align: right;
      a{
        cursor: pointer;
        display: inline-block;
        color: #000!important;
        margin: 0!important;
        line-height: 26px!important;
        &:hover{
          color: #2693d4!important;
        }
      }
      span{
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: #999;
        vertical-align: middle;
      }
    }
    .join{
      border: 1px solid #FFE8DE;
      background: #FFF0E8;
      text-align: center;
      // margin: 10px;
      line-height: 26px;
      &:hover a{
        color: #f40!important;
      }
      a{
        color: #000!important;
      }
    }
  }
  .topHover{
    &:hover {
      background-color: #fff;
      // border: 1px solid #999;
      .member{
        display: flex;
      }
    }
  }

  
</style>
