<template>
  <div class="Store">
    <div class="f_shop">首页/{{info}}</div>
    <div class="list">
        <ul class="serve">
            <li class="serve_eara">
               <p >服务区域</p>
            </li>
            <li class="eara">
                <div>
                    <city  @confirm="confirm" display="12345"></city>
                </div>
            </li>
        </ul>
        <ul class="pro_kind">
            <li class="production">
                <p>产品类型</p>
            </li>
            <li class="pro_list">
            <p @click="alll" :style="allstyle">所有</p>
            <template v-for="dp in dianpu1"   >
                 <p v-for="(item,key,index) in dp.productTypes.split(',')" :key="index" @click="typeChoose(item,dp.productTypeCodes)" :class="{active:item==indexp}" :codes="dp.productTypeCodes">{{item}}
                  </p>
            </template>
            </li>
        </ul>
    </div>
    <div class="shop_li">
        <div class="shop_sort">
            <div>{{post}}</div>
            <ul class="choose">
            <li :style="zonghe" @click="zongxu">综合排序</li>
            <li @click="goodp" :style="haoping">好评</li>
            <li :style="jiedan" @click="danshu">接单数</li>
            </ul>
        </div>
        <div class="shop_shop">

            <div
            v-for="(dp,index) in dianpu" :key="index"
            class="shop_1"
            v-if="areaCode==dp.regionId||areaCode=='-----区-----'"
            :codes="dp.productTypeCodes"
            v-show="dshow==''||dshow==dp.productTypeCodes"
            >
                <ul class="shop_1_left">
                    <li class="logo">
                       <img :src="'http://123.58.241.146:8088/xinda/pic/'+(dp.providerImg)">
                       <!-- <img :src="dp.providerImg" alt="">  -->
                    </li>
                    <li class="gold">
                       <img src="../../static/gold.png" alt="">
                    </li>
                </ul>
                <ul class="shop_1_right">
                    <h5 class="title">{{dp.providerName}}</h5>
                    <li class="credit">
                        荣誉
                        <img src="../../static/rongyu.png" alt="">
                    </li>
                    <li class="region">{{dp.regionName}}</li>
                    <li class="num">
                        <p class="num_1">累计客户服务次数:{{dp.orderNum}}</p>
                        <p class="num_2">好评率:{{dp.goodJudge == 0?0 :dp.goodJudge/dp.totalJudge*100}}%</p>
                        </li>
                    <li class="type">
                        <p v-for="(value,item) in dp.productTypes.split(',')" :key="item">{{value}}
                            <a v-for="(valuec,itemc) in dp.productTypes.split(',')" :key="itemc"></a>
                        </p>
                    </li>
                    <router-link :to="{path:'/dianpu',query:{id:dp.id}}" >
                <div class="enter" >
                    进入店铺
                </div>
                    </router-link>
                </ul>
            </div>
            <div class="none"
             >
             <!-- <p class="h1">抱歉！暂无此类商品</p> -->
                <h1>抱歉！暂无此类商品</h1>
            </div>
        </div>
    </div>
    <div class="paging">
    <page @change="pageChange" :parentCount="j"></page>
    </div>
    <router-view/>
  </div>
</template>

<script>
 import page from '../components/Page'
import city from '../components/City'
import store from '../store';
export default {
  name: 'Shop',
  data () {
    return {
    title:'',
    credit:'',
    region:'',
    num:'',
    type:'',
    msg:'',
    msgvalue:'',
    info:'店铺',
    img:'',
    dianpu:'',
    dianpu1:'',
    providerId:'',
    perPages:3,
    radio3:'',
    areaCode:'-----区-----',
    p:'0',
    indexp:'11',
    bao:true,
    haoping:'',
     fullscreenLoading: false,
    lan:{
         backgroundColor: "#2393d3",
         color:"white",
    },
    jiedan:'',
    zonghe:'',
    dshow:'',
    allstyle:'',
    none:true,
     j:{
            pageSize : 5 , //每页显示6条数据
            currentPage : 1, //当前页码
            count : 0, //总记录数
            limit:5,
            pageIndex:1,
            all:1,
            perPages:1  //页面中显示的页码数只能为单数
         },
    screenWidth:document.body.clientWidth,
    }
  },
  created(){
      [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] =
      [false,false,false,false,true]
           var that = this;
           this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:1})).then(function(data){
           that.dianpu1=data.data.data;
        if((!/\?/.test(location.href))){
           that.j.all=data.data.data.length;
           that.dianpu=data.data.data;
           that.none=false;
        }
        });
        var that = this
        store.commit('loading',true)
      this.ajax.post(
          '/xinda-api/provider/search-grid',this.qs.stringify({
        searchName:this.$route.query.searchName,
        sort:1,
      }))
      .then(function(data){
            that.dianpu=data.data.data
        store.commit('loading',false)

        });

  },
  components:{
      page,
      city,
      'my-computed':{
          template:'<div><p class="foo bar">1221</p></div>'
      }
    },
  methods:{
       pageChange (page) {
            this.currentPage = page
            var that = this;
            this.ajax.post('/xinda-api/provider/grid',that.qs.stringify({
            start:(page-1)*6,
            limit:6,
            sort:2})).then(function(data){
                    that.dianpu=data.data.data
            console.log(data.data.data);
        });
        },
        shopmobile(){
        this.$router.push({
            path:"/shopmobile",
        //    query:{ id:this.$route.query.id}
        })
     },
      goodp(){
        this.haoping=this.lan
        this.jiedan=''
        this.zonghe=''
        var that = this
        this.ajax.post(
        '/xinda-api/provider/search-grid',this.qs.stringify({
        sort:2,
        }))
        .then(function(data){
                // console.log(data.data.data);
                that.dianpu=data.data.data
            });
      },
        danshu(){
        this.haoping=''
        this.jiedan=this.lan
        this.zonghe=''
        // console.log('sss')
        var that = this
        this.ajax.post(
        '/xinda-api/provider/search-grid',this.qs.stringify({
        sort:3,
        }))
        .then(function(data){
                // console.log(data.data.data);
                that.dianpu=data.data.data
            });
      },
        zongxu(){
        this.haoping=''
        this.jiedan=''
        this.zonghe=this.lan
        // console.log('sss')
        var that = this
        this.ajax.post(
        '/xinda-api/provider/search-grid',this.qs.stringify({
        //   start:0,
        // searchName:this.$route.query.searchName,
        sort:1,
        }))
        .then(function(data){
                that.dianpu=data.data.data
            });
      },
      link(){
        this.providerId = dp.providerId;
      },
    typeChoose(aaa,code){
        this.indexp=aaa;
        this.dshow=code;
        this.allstyle='';
    },
  alll(){
      this.dshow='';
      this.allstyle=this.lan;
      this.indexp='';
  },
      choose1:function(val){
        alert(this.$children.productTypes)
    },

    confirm(value){
        this.areaCode=value
      },
  },
  mounted() {
  if(this.screenWidth<=992){
                  this.shopmobile()
        }

        const that = this
         window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
  },
watch:{
    screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    if(that.screenWidth<=992){
                that.shopmobile()
        }
                    that.timer = false
                }, 400)
            }
        },
    $route(newval,oldval){
        var that = this;
        this.ajax.post(
            '/xinda-api/provider/search-grid',this.qs.stringify({
            searchName:this.$route.query.searchName,
        }))
        .then(function(data){
                // console.log(data.data.data);
                that.dianpu=data.data.data
            });}
},
  computed:{
      post:function(){

      },
  }
}
</script>

<style scoped lang="less">
.paging{
    width:100%;
    text-align: center;
}
.none{
    width:85%;
    height:328px;
    margin:0 auto;
    text-align: center;
    line-height: 328px;
    color:#ccc;
   z-index: -1;
   .h1{
       width:100%;
   }
}
.choose{
    width:267px;
    display:flex;
    height: 50px;
    justify-content: space-between;
    line-height: 50px;
    li{
    border-right: 1px solid #ccc;
    text-align: center;
    padding:0 20px;
    }
}
.active{
    background-color: #2393d3;
    color:white;
    border-radius: 5px;
}
.Store{
    width:1200px;
    margin: 20px auto;

    .list{
        border:1px solid #ccc;
        background-color: #f7f7f7;
        width:100%;
    .serve{
        display:flex;
            height:48px;
         .serve_eara{
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            font-size: 16px;
            font-weight: 700;
            width:10%;
            line-height: 48px;
            text-align: center;
        }

    }
    .pro_kind{
            height:48px;
            display:flex;

        .production{
            border-right: 1px solid #ccc;
            font-size: 16px;
            font-weight: 700;
            width:10%;
            height:48px;
            line-height: 48px;
            text-align: center;
        }
        .pro_list{
            display:flex;
            width:90%;
            font-size: 14px;
            border-top: 1px solid #ccc;
            justify-content: space-around;
            line-height:48px;
            p:hover{
                background-color: #2393d3;
                color:white;
                border-radius: 5px;
            }
            p{
                padding:0 10px;
                line-height: 25px;
                height:25px;
                text-align: center;
                margin-top: 11px;
            }
            active{
                background-color: #2393d3;
                color:white;

            }
        }
    }
    }
    .shop_li{
        border:1px solid #ccc;
        margin:15px 0 55px;
        .shop_sort{
            border-bottom:1px solid #ccc;
            el-radio-button{
                // .el-radio-button__inner{
                    background-color: red!important;
                    // border:none;
                    border-radius: 0;
                // }
            }


        }
    }

    .shop_shop{
        overflow: hidden;
        justify-content: space-around;
        .shop_1{
            margin:15px 1.4%;
            float:left;
            border:1px solid #ccc;
            display:flex;
            width:47%;
             .shop_1_left{
                margin-top: 15px;
                width:38%;
                text-align:center;
                .logo{
                    height:42%;
                    margin-top:40%;
                }
            }
            .shop_1_right{
                margin-top: 15px;
                width:62%;
                .num{
                    margin:5px 0;
                    p{
                        display:inline-block;
                        font-size:14px;
                    }
                }
                .title{
                    font-size: 14px;
                    margin:5px 0;
                }
                .credit{
                    color:#ccc;
                    font-size: 12px;
                    margin:5px 0;
                }
                .region{
                    color:#ccc;
                    font-size: 12px;
                }
                .type{
                    height:80px;
                    p{
                        padding:8px 7px;
                        display:inline-block;
                        background-color: #2393d3;
                        color:white;
                        border-radius: 3px;
                        margin:3px;
                        font-size: 13px;

                    }
                }
                .enter{
                    width:54px;
                    border:none;
                    background-color: #ff591b;
                    padding:10px 20px;
                    font-size: 13px;
                    display:block;
                    color:white;
                    margin:5px 0 15px;
                    outline:none;
                    a{
                        color:white;
                    }
                }
            }
        }
    }
    .page{
        text-align: center;
        margin-bottom: 148px;
        button{
            background-color:white;
            border: 1px solid #ccc;
            width:68px;
            height:36px;
            font-size: 12px;
            color: #ccc;
            display: inline-block;
            outline: none;
        }
        p{
            display: inline-block;
            width:37px;
            height: 34px;
            line-height: 32px;
            border:1px solid #2393d3;
            color:#2393d3;
        }
    }
}
</style>

