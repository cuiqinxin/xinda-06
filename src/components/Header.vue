<template>
  <div class="header">
    <div class="grabble hidden-sm-and-down">
      <div class="grabble-con">
        <div class="grabble-top">
          <div class="grabble-left" >
            <router-link to="/" class="logo"></router-link>
            <div class="address">
              <p>{{datavalue}}</p>
              <p class="changeaddress">
                [切换城市]
                <a class="red">当前仅北京开放</a>
              </p>
            </div>
          </div>
          <div class="grabble-input" :class="{color_red:color_red}">
            <p class="p1">
              <a :class="{color:style}" @click="changecolor">产品</a>
              <span></span>
              <a :class="{color:style1}" @click="changecolor1">服务商</a>
            </p>
            <div>
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                :placeholder='placeholder'
                @select="handleSelect"
                @keyup.enter.native="search"
                :value="state4"
              ></el-autocomplete><button
                @click="link1"
                v-if="style"><span></span>
              </button><button
                @click="link"
                v-if="!style"><span></span></button>
            </div>
            <p class="p2 ">
              <a>热门服务：</a>
              <router-link :to="{path:'/list',query:{name:'社保代理',code:6,id:'5e0220d58f30436e92a8d0052b4b8203',index2:0,index3:1}}" class="color1">社保开户</router-link>
              <router-link :to="{path:'/list',query:{name:'公司工商',code:4,index:0}}" class="color1">公司注册</router-link>
            </p>
          </div>
          <div class="grabble-right hidden-md-and-down">
            <span></span>
            <a>010-83421842</a>
          </div>
        </div>
        <div class="nav">
          <ul>
            <li class="hov">
              <router-link to="/" :class="{active:nav}">全部产品</router-link>
              <ul class="nav-select" v-if="none" :class="{hover:hover}">
                <li v-for="(item,key,index) in menuList" :key="index">
                  <span></span>
                  <div>
                    <router-link
                      @click.native="none1"
                      :to="{path:'/list',query:{name:item.name,index: 0}}"
                      class="nav-h2">{{item.name}}
                    </router-link>
                    <p>
                      <router-link
                        @click.native="none1"
                        :to="{path:'/list',query:{name:item.name,code:item1.code,index:index1}}"
                        v-for="(item1,key1,index1) in item.itemList" :key="index1"
                        class="nav-span">{{item1.name}}
                      </router-link>
                    </p>
                  </div>

                  <ul class="nav-select1">
                    <li v-for="(item2,key2,index2) in item.itemList" :key="index2">
                      <div>
                        <p class="nav-select11">{{item2.name}}></p>
                        <p class="nav-select12">
                          <router-link
                            @click.native="none1"
                            :to="{path:'/list',query:{name:item.name,code:item2.code,id:item3.id,index2:index2,index3:index3}}"
                            v-for="(item3,key3,index3) in item2.itemList"
                            :key="index3">{{item3.name}}
                          </router-link>
                        </p>
                      </div>
                    </li>
                  </ul>

                </li>
              </ul>
            </li>

            <li><router-link :to="{path:'/list',query:{name:'财税服务',index:0}}" :class="{active:nav1}">财税服务</router-link></li>
            <li><router-link :to="{path:'/list',query:{name:'公司工商',index:0}}" :class="{active:nav2}">公司工商</router-link></li>
            <li><router-link to="/join" :class="{active:nav3}">加盟我们</router-link></li>
            <li><router-link to="/shop" :class="{active:nav4}">店铺</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    
    <router-view/>

    <footer class="footer1 hidden-sm-and-down">
      <el-row class="footer1-con">
        <h4>关于我们</h4>
        <ul>
          <li>联系我们：contact@xinkeher.com</li>
          <li>公司地址：北京市朝阳区大望路soho现代城</li>
          <li>官方客服电话:010-83421842</li>
        </ul>
      </el-row>
    </footer>
    <footer  class="footer2-2 hidden-md-and-up" style="height: 90px;width: 100%"></footer>
    <footer class="footer1-2 hidden-md-and-up">
      <ul>
        <li class="footer2-img1" :class="{footer2_img21:footer2}">
          <router-link to="/">
          <p class="footer1-2-img"></p>
          <p>首页</p>
          </router-link>
        </li>
        <li class="footer2-img2" :class="{footer2_img22:footer3}">
          <router-link to="/shop">
          <p class="footer1-2-img"></p>
          <p>店铺</p>
          </router-link>
        </li>
        <li class="footer2-img3" :class="{footer2_img23:footer4}">
          <router-link to="/shoppingcart">
          <p class="footer1-2-img"></p>
          <p>购物车</p>
          </router-link>
        </li>
        <li class="footer2-img4" :class="{footer2_img24:footer5}">
          <a href="javascript:void(0)" @click="phonelogin">
          <p class="footer1-2-img"></p>
          <p>我的</p>
          </a>
        </li>
      </ul>
    </footer>

  </div>
</template>
<script>
import scrollTop from '../components/ScrollTop'
export default {
  name: "Header",
  data() {
    return {
      id:'',
      msg: "Welcome to Your Vue.js App",
      datavalue: "北京市",
      style: true,
      style1: false,

      restaurants: [],
      state4: "",
      productstatus: "0",
      timeout: null,
      menuList:{},
      nav: true,
      nav1: false,
      nav2:false,
      nav3: false,
      nav4: false,
      color_red: false,
      placeholder:'搜索您需要的服务或服务商',
      none: true,
      hover: false,
      footer2: false,
      footer3: false,
      footer4: false,
      footer5: false,
    };
  },
  components:{
    scrollTop
  },
  created() {
    var navArr={};
    var that = this;
    this.ajax.post("/xinda-api/common/select-region").then(function(data) {
      that.datavalue = data.data.data.name;
    });
    this.ajax.post("/xinda-api/product/style/list").then(function(data) {
      var navSelect = data.data.data;
        for(let key in navSelect){
          navArr[navSelect[key].showOrder] = navSelect[key];
        }
      that.menuList = navArr;
    });
    var href=this.$route.path;

    if(href=='/'){
      this.hover = true;
      [this.footer2,this.footer3,this.footer4,this.footer5] = [false,false,false,false];
    }else{
      this.hover = false;
    }
    if(href!='/index1'||href!='/list'||href!='/join'||href!='/shop'){
      [this.nav,this.nav1,this.nav2,this.nav3,this.nav4] = [false,false,false,false,false]
    }
    // if(href!='/list'){
    //   this.state4 = '';
    // }
    if(href=='/shopmobile'){
      [this.footer2,this.footer3,this.footer4,this.footer5] = [true,true,false,false];
    }
    if(href=='/shoppingcart'){
      [this.footer2,this.footer3,this.footer4,this.footer5] = [true,false,true,false];
    }
    if(href=='/quit'){
      [this.footer2,this.footer3,this.footer4,this.footer5] = [true,false,false,true];
    }
  },
  methods: {
    search(){
      if(this.style===true){
        this.link1();
      }else{
        this.link();
      }
    },
    none1(){
      this.none = false;
      setTimeout(() => {
        this.none = true;
      }, 400);
    },
    link(){
      if(this.state4 === ''){
        this.color_red = true;
        this.placeholder = '请输入内容';
      }else{
        this.color_red = false;
        this.placeholder='搜索您需要的服务或服务商',
        this.$router.push({
            path:'/shop',query:{searchName:this.state4}
        })
        // this.state4 = '';
      }
    },
    link1(){
      if(this.state4 === ''){
        this.color_red = true;
        this.placeholder = '请输入内容';
      }else{
        this.color_red = false;
        this.placeholder='搜索您需要的服务或服务商',
        this.$router.push({
            path:'/list',query:{searchName:this.state4}
        });
        // this.state4 = '';
      }
    },
    changecolor() {
      [this.style, this.style1] = [true, false];
      this.restaurants = this.grabble();
      this.productstatus = 0;
    },
    changecolor1() {
      [this.style, this.style1] = [false, true];
      this.restaurants = this.grabble();
      this.productstatus = 0;
    },
    grabble() {
      var production = [];
      var that = this;
      if (this.style) {
        this.ajax
          .post(
            "/xinda-api/product/package/search-grid",
            this.qs.stringify({
              start: 0,
              limit: 8,
              sort: 2
            })
          )
          .then(function(data) {
            var product = data.data.data;
            that.productstatus = 200;
            for (let i = 0; i < product.length; i++) {
              production[i] = {
                value: product[i].serviceName,
                id: product[i].id
              };
            }
          });
        return production;
      } else {
        this.ajax
          .post(
            "/xinda-api/provider/search-grid",
            this.qs.stringify({
              searchName:'',
              limit: 8
            })
          )
          .then(function(data) {
            var product = data.data.data;
            that.productstatus = 200;
            for (let i = 0; i < product.length; i++) {
              production[i] = {
                value: product[i].providerName,
                id: product[i].id
              };
            }
          });
        return production;
      }
    },
    querySearchAsync(queryString, cb) {
      var that = this;
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      var s = setInterval(function(){
        if(that.productstatus == 200){
          cb(results);
          clearInterval(s);
        }
      },160)
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      if(this.style===true){
        this.link1();
      }else{
        this.link();
      }
    },
    phonelogin(){
      this.ajax.post("/xinda-api/sso/login-info").then(data=>{
        if(data.data.status==1){this.$router.push({path:'/memberindex'});}
        if(data.data.status!=1){this.$router.push({path:'/quit'});}
      })
    }
  },
  mounted() {
    this.restaurants = this.grabble();
  },
  watch:{
    $route(val,oldval){
      if(oldval.query.searchName&&val.query.searchName == undefined){
        this.state4 = ''
      }
      var href=this.$route.path;
      if(href=='/'){
        this.hover = true;
        [this.footer2,this.footer3,this.footer4,this.footer5] = [false,false,false,false];
      }else{
        this.hover = false;
      }
      if(href!='/index1'||href!='/list'||href!='/join'||href!='/shop'){
        [this.nav,this.nav1,this.nav2,this.nav3,this.nav4] = [false,false,false,false,false]
      }
      if(href!='/list'){
        this.state4 = '';
      }
      if(href=='/shopmobile'){
        [this.footer2,this.footer3,this.footer4,this.footer5] = [true,true,false,false];
      }
      if(href=='/shoppingcart'){
        [this.footer2,this.footer3,this.footer4,this.footer5] = [true,false,true,false];
      }
      if(href=='/quit'){
        [this.footer2,this.footer3,this.footer4,this.footer5] = [true,false,false,true];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.grabble {
  font-size: 14px;
  border-bottom: 1px solid #2693d4;
  .grabble-con {
    height: 148px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 998;
    .grabble-top {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      .grabble-left {
        display: flex;
        align-items: center;
        .logo {
          width: 124px;
          height: 56px;
          background-image: url(../../static/data_image_jpeg;bas….jpg);
          margin-right: 28px;
        }
        .address {
          .changeaddress {
            color: #2693d4;
            &:hover .red{
              display: block;
            }
          }
        }
      }
      .grabble-input {
        .p1 {
          margin-bottom: 4px;
          span {
            width: 1px;
            height: 15px;
            display: inline-block;
            background-color: #2693d4;
            vertical-align: middle;
            margin: 0 10px;
          }
          a {
            cursor: pointer;
          }
        }
        button{
          border: none;
          width: 103px;
          height: 41px;
          line-height: 35px;
          background-color: #2693d4;
          vertical-align: bottom;
          outline: none;
          cursor: pointer;
          border-radius: 0 4px 4px 0;
          span{
            display: block;
            width: 24px;
            height: 24px;
            margin: 0 auto;
            background-image: url(../../static/grabble.png);
            background-repeat: no-repeat;
          }
        }
        .p2{
          margin-top: 5px;
          a{
            color: #c7c7c7;
          }
          .color1{
            margin-right: 14px;
          }
        }
      }
      .grabble-right{
        display: flex;
        align-items: center;
        span{
          width: 48px;
          height: 48px;
          background-image: url(../../static/phone.png);
          background-repeat: no-repeat;
        }
        a{
          color: #a3a3a3;
        }
      }
    }
    .nav{
      position: absolute;
      bottom: 0;
      ul{
        display: flex;
        >li{
          width: 195px;
          >a{
            display: block;
            width: 80px;
            margin: 0 auto;
            text-align: center;
            font-size: 16px;
            color:#000;
            padding: 10px 10px;
            &:hover{
              color: #2693d4;
            }
          }
          .hover{
            display: flex!important;
          }
          .nav-select{
            height: 400px;
            position: absolute;
            background-color: rgba(28,46,69,0.9);
            // display: flex;
            display: none;
            flex-direction: column;
            color: #fff;
            // justify-content: space-around;
            >li{
              display: flex;
              position: relative;
              padding: 16px 0;
              &:hover{
                background-color: rgba(38,147,211,1);
              }
              &:hover ul{
                display : flex;
              }
              >div{
                .nav-span{
                  height: 17px;
                  color: #fff;
                  font-size: 13px;
                  margin: 0 20px 5px 0;
                  display: inline-block;
                  cursor: pointer;
                }
              }
              .nav-h2{
                height: 21px;
                display: block;
                cursor: pointer;
                color: #fff;
                font-size: 16px;
                font-weight: 300;
                margin-bottom: 12px;
              }
              >span{
                width: 26px;
                height: 26px;
                margin: 0 10px 0 15px;
                background-repeat: no-repeat;
                flex-shrink: 0;
              }
              .nav-select1{
                display: none;
                position: absolute;
                left: 195px;
                top: 0;
                flex-direction: column;
                background-color: rgb(150,170,194);
                padding: 13px 0 4px;
                >li{
                  width: 1000px;
                  >div{
                    display: flex;
                    margin-bottom: 7px;
                    .nav-select11{
                      width: 100px;
                      text-align: center;
                    }
                    .nav-select12 {
                      width: 930px;
                      display: flex;
                      flex-wrap: wrap;
                      a{
                        cursor: pointer;
                        font-size: 14px;
                        color: #fff;
                        width: auto;
                        margin: 0 0 10px;
                        padding: 0 6px 0 10px;
                        border-left: 1px solid #fff;
                      }
                    }
                  }
                }
              }
            }
            li:nth-child(1) >span{
              background-image: url(../../static/shui.png);
              // align-self: flex-start;
            }
            li:nth-child(2) >span{
              background-image: url(../../static/gong.png);
            }
            li:nth-child(3) >span{
              background-image: url(../../static/zhi.png);
            }
            li:nth-child(4) >span{
              background-image: url(../../static/she.png);
            }
          }
        }
      }
    }
  }
}

.active{
  color: #2693d4!important;
  border-bottom: 4px solid #2693d4;
}
.hov:hover .nav-select{
  display: flex!important;
}
.footer1 {
  background-color: #f8f8f8;
  height: 201px;
  .footer1-con {
    max-width: 1200px;
    padding-left: 24px;
    margin: 0 auto;
    h4 {
      font-size: 16px;
      font-weight: normal;
      margin: 36px 0 30px;
    }
    ul {
      margin-left: 3px;
      li {
        font-size: 12px;
        letter-spacing: 1px;
        margin-bottom: 8px;
      }
    }
  }
}
.footer1-2{
  width: 100%;
  height: 88px;
  border-top: 2px solid #f9f9f9;
  position: fixed;
  z-index: 998;
  bottom: 0;
  left: 0;
  background-color: #fff;
  ul{
    height: 88px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .footer1-2-img{
      width: 35px;
      height: 35px;
      background-repeat: no-repeat;
    }
    .footer2-img1{
      .footer1-2-img{
        background-image: url(../../static/f1.png);
      }
      p{color: #2693d4};
    }
    .footer2-img2{
      .footer1-2-img{
        background-image: url(../../static/dian1.png);
      }
      p{color: #949496};
    }
    .footer2-img3{
      .footer1-2-img{
        background-image: url(../../static/car.png);
      }
      p{color: #949496};
    }
    .footer2-img4{
      .footer1-2-img{
        background-image: url(../../static/my.png);
      }
      p{color: #949496};
    }

    .footer2_img21{
      .footer1-2-img{
        background-image: url(../../static/f.png)!important;
      }
      p{color: #949496!important};
    }
    .footer2_img22{
      .footer1-2-img{
        background-image: url(../../static/dian.png)!important;
      }
      p{color: #2693d4!important};
    }
    .footer2_img23{
      .footer1-2-img{
        background-image: url(../../static/car1.png)!important;
      }
      p{color: #2693d4!important};
    }
    .footer2_img24{
      .footer1-2-img{
        background-image: url(../../static/my1.png)!important;
      }
      p{color: #2693d4!important};
    }
  }
}
.color {
  color: #2693d4;
}
.red{
  display: none;
  color: red;
  border: 1px solid red;
  border-radius: 4px;
  padding: 0 5px;
  margin-top: 8px;
  position: absolute;
}
@media screen and (min-width: 768px) and (max-width: 1200px){
  .nav-select :hover ul{
    display : none!important;
  }
}
</style>
