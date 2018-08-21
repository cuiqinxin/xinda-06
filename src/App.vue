<template>
  <div id="app">
    <!-- 开始公共头部 -->
    <div class="top hidden-md-and-down">
      <el-row class="top-con" type="flex" justify="space-between">
        <el-col :span="12" class="top-left">
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
          <router-link to="/outter/login" v-if="!userPhoneNumber">登录</router-link>
          <router-link to="/outter/zhuce" v-if="!userPhoneNumber">快速注册</router-link>
        </el-col>
        <el-col :span="12" class="top-right">
          <router-link to="" class="shop-cart" v-if="userPhoneNumber">
            <span class="shop-img"></span>
            <router-link to="/shoppingcart">购物车<a>{{cartNum}}</a>件</router-link>
            <div class="showcart">
                <h4 :class="cartfirsthint">{{isdenglu}}</h4>    
                <div class="xiangxi" v-for="(item,index) in showlist.slice(0,4)" :key="index">
                  <router-link :to="{path:'/goodsdetail',query:{id:item.serviceId}}">
                    <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item['providerImg'])"  class="imgsss">                    
                  </router-link>
                  <div class="cartmid">
                    <h4><router-link :to="{path:'/goodsdetail',query:{id:item.serviceId}}">{{item['serviceName']}}</router-link></h4>
                    <p class="miaoshu">{{item['serviceInfo']}}</p>
                  </div>
                  <div class="cartright">
                    <p class="cartzuizuo">￥<span>{{item['unitPrice']}}.00</span></p>
                    <a href="javascript:void(0)" @click="deletecarts(index,item.serviceId)">删除</a>
                  </div>
                </div>
                <div :class="lookforcarter">
                  <router-link to="/shoppingcart" class="lookforc">查看我的购物车</router-link>
                </div>
            </div>
          </router-link>
          <router-link to="" class="service-enter">服务商入口
            <p class="red-p">暂未开放，敬请期待</p>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <!-- 结束公共头部 -->

    <router-view/>

    <!-- 开始公共底部 -->
    <footer class="footer2 hidden-md-and-down">ⒸCopyright 2016北京信达科技有限公司 京ICP备 16011621号</footer>
    <!-- 结束公共底部 -->

    <!-- loading正在加载组件 -->
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import store from './store';
import {mapState} from 'vuex'
import Loading from './components/Loading.vue'
export default {
    name: 'App',
    data() {
      return {
        status: 0,
        cartNum: 0,
        // sta: true, 
        userPhoneNumber1:'',
        cartfirsthint:'carttitsss cartzuiyou',
        isdenglu:'购物车是空的哦！',
        lookforcarter:'lookforcarts',
        showlist:[],
        changebiao:0,         //第几次加到showlist
        endqingqiu:2
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
      },
      errorImage(item){
        item.productImg = "../../static/errorImg.png";
      },
      deletecarts(index,order){
        console.log(index,order);
        this.ajax.post("/xinda-api/cart/del",this.qs.stringify(
            {'id':order}
        )).then(data=>{
          if(data.data.status==1){
            this.cartNum--;
            this.showlist.splice(index,1);
            if(this.showlist.length==4&&this.endqingqiu==2){
              this.showlister();
            }
            if(this.showlist.length==0){
              this.cartfirsthint='carttitsss cartzuiyou';
              this.isdenglu='购物车是空的哦！';
              this.lookforcarter='lookforcarts';return;
            }
          }
        })
      },
      showlister(){
        this.ajax.post("/xinda-api/cart/list").then(data=>{
          if(this.endqingqiu!=2){return;}
          if(data.data.data.length==0){
            this.cartfirsthint='carttitsss cartzuiyou';
            this.isdenglu='购物车是空的哦！';
            this.lookforcarter='lookforcarts';return;
          }else{
            this.cartfirsthint='carttitsss';
            this.isdenglu='最近加入的商品：';
            this.lookforcarter='lookforcart';
          }
          var listend=(this.changebiao+1)*8;
          if(listend>data.data.data.length){
            listend=data.data.data.length;
            this.endqingqiu=0;
          }
          for(var i=this.changebiao*8;i<listend;i++){
            this.showlist.push(data.data.data[i]);
          }
          this.changebiao++;
          console.log(this.showlist);
        })
      }
    },
    computed:{
      userPhoneNumber(){
        return store.state.userPhoneNumber;
      },
      ...mapState({
        loading: state => state.loading
      })
    },
    created(){
      var that = this;
      this.ajax.post("/xinda-api/cart/cart-num").then(data=>{
        this.cartNum = data.data.data.cartNum;
      })
      fun:{
          this.ajax.post("/xinda-api/sso/login-info").then(data=>{
            if(data.data.status === 0){
              store.commit('loginStatus','')
            }else if(data.data.status === 1){
              store.commit('loginStatus',data.data.data.loginId);
            }
        })
      }
      this.showlister();     
    },
    components:{
        Loading,
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
      }
      .top-right{
        display: flex;
        justify-content: flex-end;
        text-align: right;
        .shop-cart{
          color: #000;
          margin-right: 4px;
          padding: 0 12px;
          position: relative;
          &:hover{background-color: #fff;}
          &:hover .showcart{display: block;}
          .showcart{text-align: left;font-size: 12px;line-height: 20px}
          .cartzuiyou{text-align: right;}
          .cartright a{float: right;} 
          .lookforc{color: #fff;}         
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
          &:hover .red-p{
            display: block;
          }
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
  .showcart{
    position: absolute;
    display: none;
    cursor: initial;
    right: 0;
    z-index: 9999;
    padding: 8px 8px;
    width: 310px;
    min-height: 40px;
    border: 1px solid #e6e6e6;
    border-top: 0;
    background-color: #fff;
    .carttitsss{margin:9px 0;}
    .xiangxi{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .imgsss{
        width: 40px;
        height: 30px;
        margin:5px 0;
      }
      .cartmid{
        margin:0 20px 0 10px;
        width: 59%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .miaoshu{color:#9c9c9c;}
      }
      .cartzuizuo{
        font-weight: bold;
        span{color: #f22e00;}
      }
    }
    .lookforc{
      padding:0 10px;
      background-color: #ff4400;
      line-height: 25px;
      margin:10px 0 0;
      float: right;
    }
  }
  .lookforcart{border-top: 1px solid #e6e6e6;}
  .lookforcarts{border-top: 0;}
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
  .red-p{
    display: none;
    color: red;
    border: 1px solid red;
    border-radius: 4px;
    padding: 0 5px; 
    margin-top: 8px;
    position: absolute;
    right: 0px;
    top: 23px;
    line-height: 25px;
  }
  
</style>
