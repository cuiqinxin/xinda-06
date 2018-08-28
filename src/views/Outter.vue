<template>
  <div class="Outter">
    <div class="useruser hidden-sm-and-down">
        <el-row>
            <el-col :span="24">
                <router-link to="/"><span class="xinda hidden-xs-only"></span></router-link><span class="line hidden-xs-only"></span><p class="wel hidden-xs-only">{{info}}</p>
                <p class="hidden-sm-and-up phone"><router-link to="/quit" class="jian">&lt;</router-link>{{infoWeb}}</p>
            </el-col>
        </el-row>
    </div>
    <p class="hidden-md-and-up phone"><router-link to="/quit" class="jian">&lt;</router-link>{{infoWeb}}</p>
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
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'Outter',
    data () {
        return {
            info:'欢迎登录',
            infoWeb:'登录',
            footer2: false,
            footer3: false,
            footer4: false,
            footer5: false,
        }
    },
    methods:{
        phonelogin(){
            this.ajax.post("/xinda-api/sso/login-info").then(data=>{
                if(data.data.status==1){this.$router.push({path:'/memberindex'});}
                if(data.data.status!=1){this.$router.push({path:'/quit'});}
            })
        }
    }

}

</script>

<style scoped lang="less">
    span{display: inline-block;}
    .footer1-2{
        width: 100%;
        height: 88px;
        border-top: 2px solid #f9f9f9;
        position: fixed;
        z-index: 1000;
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
    .useruser{
        max-width:1200px;
        margin:0 auto;
        height:97px;
    }
    .xinda{
        width: 124px;
        height: 56px;
        background: url(../../static/data_image_jpeg;bas….jpg) no-repeat;
        margin-top:21px;
        cursor: pointer;
    }
    .line{
        width:1px;
        height:47px;
        background-color:#b4b4b4;
        margin:4px 25px 0 28px;
    }
    .wel{
        font-size:18px;
        display:inline-block;
        vertical-align: top;
        margin-top:36px;
    }
    .phone{
        text-align: center;
        font-size: 18px;
        line-height: 77px;
        position: relative;
        background-color: #f5f5f5;
        .jian{
            float: left;
            left: 20px;
            font-size: 32px;
            position: absolute;
        }
    }
    @media screen and (max-width: 768px){
        .useruser{
            height: 77px;
            background-color: #e5e5e5;
            position: absolute;
            top:0;
            width: 100%;
        }
    }
</style>
