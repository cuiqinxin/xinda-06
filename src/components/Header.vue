<template>
  <div class="header">
    <!-- <h1>我是首页等其他页面的搜索和导航部分</h1>
    <router-link to="register">财税服务</router-link>
    <router-link to="production">全部商品</router-link> -->
    <div class="grabble">
      <div class="grabble-con">
        <div class="grabble-top">
          <div class="grabble-left" >
            <div class="logo"></div>
            <div class="address">
              <p>{{datavalue}}</p>
              <p class="changeaddress">[切换城市]</p>
            </div>
          </div>
          <div>
            <p>
              <a>产品</a>
              <a>服务商</a>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <router-view/>

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
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      datavalue:'北京市',
    }
  },
    created(){
      var that = this;
      this.ajax.post('/xinda-api/common/select-region').then(function(data){
            that.datavalue = data.data.data.name;
        })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .grabble{
    border-bottom: 1px solid #2693d4;
    .grabble-con{
      height: 148px;
      max-width: 1200px;
      margin: 0 auto;
      .grabble-top{
        display: flex;
        .grabble-left{
          display: flex;
          .logo{
            width: 124px;
            height: 56px;
            background-image: url(../../static/data_image_jpeg;bas….jpg);
            margin-right: 28px;
          }
          .address{
            p{
              font-size: 14px;
            }
            .changeaddress{
              color: #2693d4;
            }
          }
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
</style>
