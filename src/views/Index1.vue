<template>
  <div class="index1">
    <div class="hidden-md-and-down">
        <el-carousel class="lunbo" height="400px">
            <el-carousel-item>
                <img src="../../static/timg.jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (1).jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (2).jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (3).jpg">
            </el-carousel-item>
        </el-carousel>
        <div class="star public">
            <ul class="title">
                <li>明星产品推荐</li>
            </ul>
            <div class="star-con public-con">
                <div>
                    <div @click="rou1">
                        <div class="star-img1"></div>
                        <h4>标准五险一金</h4>
                        <p>定制化社保代理，定制化代缴服务</p>
                        <p><span>20</span>元/人/月</p>
                    </div>
                </div>
                <div>
                    <div @click="rou2">
                        <div class="star-img2"></div>
                        <h4>内资有限公司注册</h4>
                        <p>一键完成注册，快速开办公司</p>
                        <p><span>600</span>元/次</p>
                    </div>
                </div>
                <div>
                    <div @click="rou3">
                        <div class="star-img3"></div>
                        <h4>小规模代理记账/年</h4>
                        <p>专业会计报税，高效，便捷，贴心</p>
                        <p><span>3000</span>元/年</p>
                    </div>
                </div>
                <div>
                    <div @click="rou4">
                        <div class="star-img3"></div>
                        <h4>国内普通商标注册</h4>
                        <p>次日提交商标申请，最快保护品牌价值</p>
                        <p><span>1000</span>元/年</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="hq public">
            <ul class="title">
                <li>初创企业必备</li>
            </ul>
            <div class="hq-con public-con">
                <div v-for="(item,key,index) in hq" :key="index">
                    <div class="hq-img">
                        <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)">
                    </div>
                    <h4>{{item.providerName}}</h4>
                    <h5>{{item.serviceName.split('（')[0].split('(')[0]}}</h5>
                    <p class="hq-p1">{{item.serviceInfo}}</p>
                    <p><span>￥{{item.price}}</span>{{item.unit}}</p>
                    <router-link :to="{path:'/header/goodsdetail',query:{id:item.id}}">查看详情</router-link>
                </div>
            </div>
        </div>
        <div class="zhi">
            <ul class="title">
                <li>知识产权</li>
            </ul>
            <div class="zhi-con">
                <div class="zhi-con-left">
                    <img src="../../static/property_03.503817a.jpg">
                    <div class="zhi-p zhi-pl">
                        <h6>知识产权</h6>
                        <ul>
                            <li><router-link :to="{path:'/list',query:{name:'知识产权',code:8,index:1}}">商标注册</router-link></li>
                            <li><router-link :to="{path:'/list',query:{name:'知识产权',code:9,index:2}}">版权保护</router-link></li>
                            <li><router-link :to="{path:'/list',query:{name:'知识产权',code:10,index:0}}">专利申请</router-link></li>
                        </ul>
                    </div>
                </div>
                <div class="zhi-con-right">
                    <div class="zhi-con-rtop">
                        <div>
                            <img src="../../static/property_05.5160ddd.jpg">
                            <div class="zhi-pr">
                                <h5>商标注册</h5>
                                <p>急速申报，办理简便</p>
                                <div><span>￥1000</span>/次</div>
                            </div>
                        </div>
                        <div>
                            <img src="../../static/property_07.20bed75.jpg">
                            <div class="zhi-pr">
                                <h5>版权专利</h5>
                                <p>快速提交，全程跟踪</p>
                                <div><span>￥1000</span>/次</div>
                            </div>
                        </div>
                    </div>
                    <div class="zhi-con-rb">
                        <div>
                            <img src="../../static/property_11.a620967.jpg">
                            <div class="zhi-pr zhi-prb">
                                <h5>著作权</h5>
                                <p>专业顾问，经验丰富，快速响应，顺利拿证！</p>
                                <div><span>￥1000</span>/次</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner">
            <ul>
                <li>
                    <span class="banner-img1"></span>
                    <div>
                        <p class="banner-p1">资质认证</p>
                        <p class="banner-p2">服务商100%实名认证</p>
                    </div>
                </li>
                <li>
                    <span class="banner-img2"></span>
                    <div>
                        <p class="banner-p1">支付安全</p>
                        <p class="banner-p2">明码标价支付</p>
                    </div>
                </li>
                <li>
                    <span class="banner-img3"></span>
                    <div>
                        <p class="banner-p1">保险赔付</p>
                        <p class="banner-p2">出现问题平赔付</p>
                    </div>
                </li>
                <li>
                    <span class="banner-img4"></span>
                    <div>
                        <p class="banner-p1">售后无忧</p>
                        <p class="banner-p2">客户经理全程跟进</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tui">
            <ul class="title">
                <li :class="{title_active:active,title_active1:active1}" v-on:click="change_active">推荐服务商</li>
                <li :class="{title_active1:active,title_active:active1}" v-on:click="change_active1">推荐服务</li>
            </ul>
            <div class="tui-con public">
                <div class="provider-con public-con" :class="{tui_display: active,tui_display1:active1}">
                    <div v-for="(item,key,index) in provider" :key="index" @click="providerr(item)">
                        <div class="provider-img">
                            <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)">
                        </div>
                        <h4>{{item.providerName}}</h4>
                        <p>服务指数：8.9分</p>
                        <p>提供的服务</p>
                        <p class="provider-p1">
                            <span>{{item.products.split(',')[0]}}</span>
                            <span>{{item.products.split(',')[1]}}</span>
                            <span>{{item.products.split(',')[2]}}</span>
                            <span>{{item.products.split(',')[3]}}</span>
                        </p>
                    </div>
                </div>
                <div class="product-con public-con hq-con" :class="{tui_display: active1,tui_display1:active}">
                    <div v-for="(item,key,index) in product" :key="index">
                        <div class="product-img hq-img">
                            <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)">
                        </div>
                        <h4>{{item.providerName}}</h4>
                        <h5>{{item.serviceName.split('（')[0].split('(')[0]}}</h5>
                        <p class="hq-p1">{{item.serviceInfo}}</p>
                        <p><span>￥{{item.price}}</span>{{item.unit}}</p>
                        <router-link :to="{path:'/header/goodsdetail',query:{id:item.id}}">查看详情</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="he">
            <ul class="title">
                <li>合作伙伴</li>
            </ul>
            <ul class="he-con">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
    <div class="hidden-lg-and-up index1-2">
        <el-carousel class="lunbo1" height="250px">
            <el-carousel-item>
                <img src="../../static/timg.jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (1).jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (2).jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../static/timg (3).jpg">
            </el-carousel-item>
        </el-carousel>
        <div class="nav2">
            <el-row class="nav2-1" type="flex" justify="space-around">
                <el-col :span="4">
                    <div>
                        <router-link :to="{path:'/list',query:{name:'财税服务',index:0}}"><img src="../../static/1.png"></router-link>
                        <p>财税服务</p>
                    </div>
                    <div>
                        <router-link :to="{path:'/list',query:{name:'社保代理',code:6,index:0}}"><img src="../../static/5.png"></router-link>
                        <p>公司社保</p>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <router-link :to="{path:'/list',query:{name:'公司工商',code:4,index:0}}"><img src="../../static/2.png"></router-link>
                        <p>开公司</p>
                    </div>
                    <div>
                        <router-link :to="{path:'/list',query:{name:'知识产权',index:0}}"><img src="../../static/6.png"></router-link>
                        <p>知识产权</p>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <router-link :to="{path:'/list',query:{name:'公司工商',code:5,index:1}}"><img src="../../static/3.png"></router-link>
                        <p>公司变更</p>
                    </div>
                    <div>
                        <router-link to=""><img src="../../static/7.png"></router-link>
                        <p>全部服务</p>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <router-link :to="{path:'/list',query:{name:'社保代理',code:7,index:1}}"><img src="../../static/4.png"></router-link>
                        <p>个人社保</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="zhi2">
            <ul class="title">
                <li>知识产权</li>
            </ul>
            <div class="zhi2-con">
                <el-row type="flex" justify="space-between" :gutter="20">
                    <el-col :span="12">
                        <img src="../../static/property_05.5160ddd.jpg">
                        <p>商标注册</p>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../static/property_07.20bed75.jpg">
                        <p>版权专利</p>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="24">
                        <img src="../../static/property_11.a620967.jpg">
                        <p>著作权</p>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="chu2">
            <ul class="title">
                <li>初创企业必备</li>
            </ul>
            <div class="chu2-con">
                <div v-for="(item,key,index) in hq" :key="index">
                    <div class="chu2-img">
                        <img :src="'http://123.58.241.146:8088/xinda/pic/'+(item.providerImg)">
                    </div>
                    <div class="chu2-p">
                        <h5>{{item.serviceName.split('（')[0].split('(')[0]}}</h5>
                        <p class="chu2-p1">{{item.serviceInfo}}</p>
                        <p class="chu2-p2"><span>￥{{item.price}}</span>{{item.unit}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner2">
            <div>
                <img src="../../static/data_image_jpeg;bas….jpg">
                <p>一站式企业交易中心</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index1',
  data () {
    return {
      hq:'',
      product:'',
      provider:'',
      active: true,
      active1: false,
    }
  },
  created(){
    //   this.$parent.hover = true;
    this.ajax.post("/xinda-api/recommend/list").then(data=>{
        this.hq=data.data.data.hq;
        this.product=data.data.data.product;
        this.provider=data.data.data.provider;
        console.log(this.hq)
    });
  },
  methods:{
      rou1(){
          this.$router.push({
              path:'/header/goodsdetail',query:{id:'0bf3dffb6beb49078a7ede5f51125c44'}
          })
      },
      rou2(){
          this.$router.push({
              path:'/header/goodsdetail',query:{id:'721292878b0747a99cde87b5453ed661'}
          })
      },
      rou3(){
          this.$router.push({
              path:'/header/goodsdetail',query:{id:'3d007512185842fbad3525a9d13c7ebc'}
          })
      },
      rou4(){
          this.$router.push({
              path:'/header/goodsdetail',query:{id:'659a52363c324a7a94d980695251e7d9'}
          })
      },
      providerr(item){
          this.$router.push({
            path:'/header/dianpu',query:{id:item.id}
          })
      },
      change_active(){
          [this.active,this.active1] = [true,false]
      },
      change_active1(){
          [this.active,this.active1] = [false,true]
      },
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @color-269:#2693d4;
    .index1{
        max-width: 1200px;
        margin: 0 auto;
    }
    .lunbo{
        img{
            width: 100%;
            height: 400px;
        }
    }
    .title{
        font-size: 14px;
        letter-spacing: 1px;
        border-bottom: 1px solid @color-269;
        font-weight: 500;
        margin-bottom: 48px;
        li{
            padding: 10px;
            margin-top: 37px;
            display: inline-block;
            position: relative;
            &::after{
                content: '';
                display: inline-block;
                border-bottom: 6px solid @color-269;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                position: absolute;
                left: 50%;
                bottom: 0;
            }
        }
        .title-active{
            color: @color-269;
        }
    }
    .public{
        .public-con{
            display: flex;
            justify-content: space-between;
            >div{
                &:hover{
                    box-shadow: 0 9px 25px rgba(0,0,0,0.15);
                    transform: translateY(-2px);
                }
                width: 270px;
                height: 398px;
                border: 1px solid #e8e8e8;
                transition: all .3s linear;
            }
        }
    }
    .star{
        .star-con{
            >div{ 
                cursor: pointer;
                >div{
                    width: 254px;
                    height: 382px;
                    margin: 8px;
                    background-color: #fafafa;
                    text-align: center;
                    overflow: hidden;
                    >div{
                        width: 124px;
                        height: 124px;
                        margin: 0 auto;
                        margin-top: 51px;
                    }
                    h4{
                        font-size: 14px;
                        margin: 18px 0;
                    }
                    p{
                        font-size: 14px;
                        margin-bottom: 50px;
                        span{
                            font-size: 24px;
                            color: @color-269;
                            font-weight: 300;
                        }
                    }
                    .star-img1{
                        background-image: url(../../static/star1.png);
                    }
                    .star-img2{
                        background-image: url(../../static/star2.png);
                    }
                    .star-img3{
                        background-image: url(../../static/star3.png);
                    }
                }
            }
        }
    }
    .hq-con{
        >div{
            text-align: center;
        }
        .hq-img{
            margin-top: 30px;
        }
        h4{
            font-size: 16px;
            color: @color-269;
            font-weight: 400;
            margin: 15px 0 50px;
        }
        h5{
            font-size: 16px;
            font-weight: 500;
        }
        p{
            font-size: 12px;
            span{
                color: @color-269;
                font-size: 24px;
                font-weight: 300;
            }
        }
        .hq-p1{
            text-align: left;
            height: 48px;
            margin: 15px 15px 25px;
        }
        a{
            display: inline-block;
            color:@color-269;
            padding: 8px 20px;
            margin-top: 20px;
            border-radius: 4px;
            border: 1px solid @color-269;
            background-color: #fafafa;
            &:hover{
                background-color: #fff;
            }
        }
    }
    .zhi{
        .zhi-con{
            font-size: 0;
            img{
                width: 100%;
            }
            display: flex;
            justify-content: space-between;
            .zhi-con-left{
                position: relative;
            }
            .zhi-con-right{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .zhi-con-rtop{
                    display: flex;
                    justify-content: space-between;
                }
            }
            .zhi-p{
                font-size: 16px;
            }
            .zhi-pl{
                position: absolute;
                top: 0;
                left: 0;
                color: @color-269;
                display: flex;
                align-items: center;
                margin: 30px 0 0 27px;
                h6{
                    font-size: 16px;
                    margin-right: 28px;
                }
                li{
                    font-size: 14px;
                    // cursor: pointer;
                    margin: 5px 0;
                    border-left: 1px solid @color-269;
                    padding-left: 5px;
                    a{
                        color: @color-269;
                    }
                }

            }
            .zhi-con-right{
                >div{
                    >div{
                        position: relative;
                    }
                }
            }
            .zhi-pr{
                position: absolute;
                bottom: 0;
                right: 0;
                margin: 0 20px 40px 0;
                h5{
                    font-size: 18px;
                    font-weight: 400;
                }
                p{
                    font-size: 14px;
                    color: #696969;
                    margin: 5px 0;
                }
                div{
                    font-size: 16px;
                    color: @color-269;
                    span{
                        font-size: 20px;
                    }
                }
            }
            .zhi-prb{
                margin-right: 50px;
            }
        }
    }
    .banner{
        background-color: #f7f7f7;
        margin-top: 43px;
        ul{
            display: flex;
            justify-content: space-around;
            height: 154px;
            li{
                display: flex;
                align-items: center;
                span{
                    width: 62px;
                    height: 61px;
                }
                div{
                    color: #696969;
                    letter-spacing: 1px;
                    margin-left: 10px;
                    .banner-p1{
                        font-size: 24px;
                        margin-bottom: 5px;
                    }
                }
                .banner-img1{
                    background-image: url(../../static/banner1.jpg);
                }
                .banner-img2{
                    background-image: url(../../static/banner2.jpg);
                }
                .banner-img3{
                    background-image: url(../../static/banner3.jpg);
                }
                .banner-img4{
                    background-image: url(../../static/banner4.jpg);
                }
            }
        }
    }
    .tui{
        .title{
            li{
                cursor: pointer;
            }
            .title_active{
                color: @color-269;
            }
            .title_active1{
                &::after{
                    display: none;
                }
            }
        }
        .tui-con{
            .tui_display{
                display: flex;
            }
            .tui_display1{
                display: none;
            }
            .provider-con{
                justify-content: flex-start;
                >div{
                    margin-right: 40px;
                    text-align: center;
                    cursor: pointer;
                    .provider-img{
                        margin: 60px 0;
                    }
                    h4{
                        margin-bottom: 40px;
                    }
                    p{
                        font-size: 12px;
                    }
                    .provider-p1{
                        display: inline-flex;
                        flex-wrap: wrap;
                        margin: 20px 35px;
                        span{
                            width: 80px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding: 5px;
                            margin: 5px;
                            background-color: #ffecb7;
                        }
                    }
                }
            }
        }
        
    }
    .he{
        margin-bottom: 100px;
       .he-con{
           display: flex;
           li{
               flex-grow: 1;
                // width: 198px;
                height: 145px;
                border: 1px solid #ececec;
                border-right: none;
               &:nth-child(1){
                   background-image: url(../../static/he1.jpg);
                   background-repeat: no-repeat;
               }
               &:nth-child(2){
                   background-image: url(../../static/he2.jpg);
                   background-repeat: no-repeat;
               }
               &:nth-child(3){
                   background-image: url(../../static/he3.jpg);
                   background-repeat: no-repeat;
               }
               &:nth-child(4){
                   background-image: url(../../static/he4.jpg);
                   background-repeat: no-repeat;
               }
               &:nth-child(5){
                   background-image: url(../../static/he5.jpg);
                   background-repeat: no-repeat;
               }
               &:nth-child(6){
                   background-image: url(../../static/he6.jpg);
                   background-repeat: no-repeat;
                   border-right: 1px solid #ececec;
               }
           }
       } 
    }
    .index1-2{
        .lunbo1{
            img{
                width: 100%;
                height: 250px;
            }
        }
        .nav2{
            margin: 40px 0 0;
            .nav2-1{
                text-align: center;
                img{
                    width: 100%;
                }
                p{
                    font-size: 14px;
                    margin-bottom: 20px;
                }
            }
        }
        .zhi2{
            .zhi2-con{
                padding: 0 15px;
                img{
                    width: 100%;
                }
                >div{
                    >div{position: relative;}
                    margin-bottom: 15px;
                    p{
                        font-size: 14px;
                        position: absolute;
                        bottom: 20%;
                        right: 15%;
                    }
                }
            }
        }
        .chu2-con{
            padding: 0 15px;
            >div{
                display: flex;
                height: 120px;
                border-bottom: 1px solid #cfcfcf;
                padding: 15px 0;
            }
            .chu2-img{
                flex-shrink: 0;
                width: 120px;
                border: 1px solid #e3e3e3;
                display: flex;
                align-items: center;
                margin-right: 15px;
                img{
                    width: 100%;
                }
            }
            .chu2-p{
                h5{
                    font-size: 16px;
                    width: 140px;
                    white-space: nowrap; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    margin-bottom: 8px;
                }
            }
            .chu2-p1{
                height: 38px;
                font-size: 14px;
                overflow: hidden;			/*多行溢出变点*/
                text-overflow: ellipsis;
                display:-webkit-box; 
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
            }
            .chu2-p2{
                font-size: 12px;
                color: #a3a3a3;
                margin-top: 15px;
                span{
                    color: #ff1515;
                    font-size: 24px;
                }
            }
        }
        .banner2{
            height: 118px;
            >div{
                margin-top: 20px;
                text-align: center;
                margin: 30px auto 0;
                width: 220px;
            }
            p{
                font-size: 24px;
                color: #8e8e8e;
            }
        }
    }
</style>
