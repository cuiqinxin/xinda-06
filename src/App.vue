<template>
  <div id="app">
    <!-- <h3>我是页面的公共头部 -->
      <!-- <a href="#/login">登录</a> -->
      <!-- <router-link to="/outter/login">登录</router-link>
      <router-link to="/outter/zhuce">注册</router-link>
    </h3> -->

    <!-- 开始公共头部 -->
    <div class="top">
      <el-row class="top-con" type="flex" justify="space-between">
        <el-col :span="12" class="top-left">
          <span>欢迎来到信达！</span><router-link to="">登录</router-link><router-link to="">快速注册</router-link>
        </el-col>
        <el-col :span="12" class="top-right">
          <router-link to="" class="shop-cart">
            <span class="shop-img"></span>
            <span>购物车<a>0</a>件</span>
          </router-link>
          <router-link to="" class="service-enter">服务商入口</router-link>
        </el-col>
      </el-row>
    </div>
    <!-- 结束公共头部 -->

    <router-view/>

    <!-- 开始公共底部 -->
    <footer class="footer1">
      <el-row class="footer1-con">
        <h4>关于我们</h4>
        <ul>
          <li>联系我们：contact@xinkeher.com</li>
          <li>公司地址：北京市朝阳区大望路soho现代城</li>
          <li>官方客服电话:010-83421842</li>
        </ul>
      </el-row>
    </footer>
    <footer class="footer2">ⒸCopyright 2016北京信达科技有限公司 京ICP备 16011621号</footer>
    <!-- 结束公共底部 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
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
            background-image: url(../static/images/shop.png);
            background-size: 21px 18px;
          }
          a{
            color: #2693d4;
          }
        }
        .service-enter{
          color: #2693d4;
        }
      }
    }
  }
  .footer1{
    background-color: #f8f8f8;
    height: 201px;
    .footer1-con{
      max-width: 1200px;
      padding-left: 24px;
      margin: 0 auto;
      h4{
        font-size: 16px;
        font-weight: normal;
        margin: 36px 0 30px;
      }
      ul{
        margin-left: 3px;
        li{
          font-size: 12px;
          letter-spacing: 1px;
          margin-bottom: 8px;
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
</style>
