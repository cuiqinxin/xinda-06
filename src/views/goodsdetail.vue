<template>
    <div  class="goodsdetail">
        <div class="block">
                <p class="littletip" >首页/公司注册</p>
            <!-- 具体商品描述盒子 -->
            <div class="singlegoods">
                <!-- 图片 -->
                <div class="img">
                    <img :src="newsrc" alt="#"  :onerror="logo">
                </div>
                <!-- 商品参数 -->
                <div class="parameterouter">
                    <div class="parameter">
                        <p class="servicename">
                            {{detailproviderProduct.serviceName}}
                        </p>
                        <p class="serviceinfo">
                            {{detailproviderProduct.serviceInfo}}
                        </p>
                        <!-- 价格 -->
                        <div class="price">
                            <div class="marketprice">
                                <p class="left">
                                    市场价：
                                </p>
                                <span>￥{{detailproduct.marketPrice}}</span>
                            </div>
                            <div class="realprice">
                                <p class="left">
                                    价<span class="distance">格：</span>
                                </p>
                                <span>￥{{detailproviderProduct.price}}.00</span>
                            </div>
                        </div>
                        <!-- 类型 -->
                        <div class="type">
                            <span>类型：</span>
                            <div class="servicetype">
                                公司工商
                            </div>
                        </div>
                        <!-- 地区 -->
                        <div class="area">
                                <span>地区：</span>
                                {{detailregion}}
                        </div>
                        <!-- 购买数量 -->
                        <div class="buynum">
                                <span>购买数量：</span>
                                <a href="javascript:void(0)"  class="reduce" @click="inputvalue==1?open4():reduce()">-</a>
                                <input type="text" class="input" :value="inputvalue" readOnly="true">
                                <a href="javascript:void(0)"  class="add" @click="add" >+</a> 
                        </div>
                        <!-- 最底部button -->
                        <div class="bottom">
                                <a href="javascript:void(0)" class="shopnext" @click="gobuy">立即购买</a>
                                <a href="javascript:void(0)"  class="addcart"  @click="addcart">加入购物车</a>
                        </div>
                    </div>
                </div> 
                <!-- 供应商 -->
                <div class="provider">
                    <p class="title">
                        顶级服务商
                    </p>
                    <div class="providername">  
                        <p >
                        {{detailprovider.name}}
                    </p>
                    </div>
                    
                    <a href="javascript:void(0)" class="question" @click="dialogVisible = true">马上咨询</a>
                    <div class="aboutprovider">
                        <router-link
                        :to="{
                            path: '/dianpu', 
                            query: { 
                                
                                id:detailprovider.id
                            },
                        }" class="providerlink">查看服务商</router-link>
                    </div>
                </div> 
            </div>
         
            <!-- 具体商品描述盒子over -->
            <div class="banner">
                <img src="../../static/goodsdetailbanner.png" alt="#">
            </div>
            <!-- 分页底部 -->
            <div class="goodsbottom">
                <div class="title">
                    <a href="javascript:void(0)" :class="servicestyle" @click="bottomstyle" >服务内容</a>
                    <a href="javascript:void(0)" :class="servicestyle1" @click="bottomstyle1"  >商品评价</a>
                </div>
                <div class="servicecontain" v-if="ok" v-html="detailproviderProduct.serviceContent"></div>
                <div class="evaluatecontain" v-else>
                    <!-- 评价详情 -->
                    <div class="valuenum">
                        <!-- 评价统计-->
                        <div class="total">
                            <div class="biggoodnum">
                            <span>0%</span> <p>好评</p>    
                            </div>
                            <div class="percent">
                                <div class="up demo">
                                    <div class="goodnum">好评（0%）</div>
                                    <div class="goodnumtip demo1 "></div>
                                </div>
                                <div class="middle demo">
                                    <div class="midnum">中评（0%）</div>
                                    <div class="midnumtip demo1"></div>
                                </div>
                                <div class="down demo">
                                    <div class="badnum">差评（0%）</div>
                                    <div class="badgoodnumtip demo1"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 客户印象-->
                        <div class="right">
                            客户印象
                        </div>
                    </div>
                    <!-- 评价详情结束 -->
                    <div class="button">
                        <div class="all littlebutton">全部评价（0）</div>
                        <div class="good littlebutton">好评（0）</div>
                        <div class="mid littlebutton">中评（0）</div>
                        <div class="bad littlebutton">差评（0）</div>
                    </div>
                    <div class="inin">
                        <div class="incontain">
                            <div class="title">
                                <div>评价</div>
                                <div>满意度</div>
                                <div>用户</div>
                            </div>
                            <div class="content"></div>
                            <div class="page">
                                <el-button class="pre">上一页</el-button>
                                <input type="text" value="1" readOnly="true"  outline="none">
                                <el-button class="nex">下一页</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xsblock" >
              <!-- 具体商品描述盒子 -->
            <div class="singlegoods">
                <!-- 图片 -->
                <div class="img">
                    <img :src="newsrc" alt="#"  :onerror="logo">
                    <div class="xuanfu">
                        <!-- 服务名称 -->
                         <p class="servicename">
                            {{detailproviderProduct.serviceName}}
                        </p>
                        <p class="serviceinfo">
                            {{detailproviderProduct.serviceInfo}}
                        </p>
                    </div>
                </div>
                <!-- 商品参数 -->
                <div class="parameterouter">
                    <div class="parameter">
                         <!-- 地区 -->
                        <div class="area">
                                <span>地区：</span>
                                {{detailregion}}
                        </div>
                        <!-- 价格 -->
                        <div class="price">
                            
                                <p >
                                    价格：
                                </p>
                                <span class="middle">￥{{detailproviderProduct.price}}.00</span>
                                 <span class="right">￥{{detailproduct.marketPrice}}</span>
                           
                        </div>
                          <!-- 供应商 -->
                          <p class="providerp">
                              服务商家
                          </p>
                          <div class="provider">
                              <div class="img">
                                    <img :src="'http://123.58.241.146:8088/xinda/pic'+detailprovider.providerImg" alt="#" :onerror="logo" width='100' height="100">
                              </div>

                              <div class="contain">
                                  <p>{{detailprovider.name}}</p>
                                  <div class="xinyu">
                                         信誉<img src="../../static/信誉.png" alt="#">
                                  </div>
                               
                                  <p>{{detailregion}}</p>
                                  <p>累计服务客户次数：<span>{{serviceNum}}</span></p>
                                   <div class="aboutprovider">
                                <router-link
                                :to="{
                                    path: '/dianpu', 
                                    query: { 
                                        
                                        id:detailprovider.id
                                    },
                                }" class="providerlink">查看服务商</router-link>
                            </div>
                           
                              </div>
                             <img class="jinpai" src="../../static/金牌服务商.png" alt="#">
                          </div>
                     <!-- 供应商jieshu --> 
                      <p class="providerp">
                              服务介绍
                          </p>
                        <div class="servicecontain" v-html="detailproviderProduct.serviceContent"></div>
                     <p class="providerp">
                             用户评价
                          </p>
                          <div class="pingjia">

                          </div>
                     
                    </div>
                    <div class="goosbottom">
                       <el-col :span="8" class="lianxi"  >
                           <div @click="dialogVisible = true">

                           
                           <p><img src="../../static/联系商家.png" alt="#"></p>
                           <a href="javascript:void(0)" class="lianxishangjai" >联系商家</a>
                         </div>
                       </el-col>
                       
                       <el-col :span="8" class="gouwuche"><a href="javascript:void(0)" class="addcart" @click="addcart">加入购物车</a></el-col>

                       <el-col :span="8" class="goumai">
                           <a href="javascript:void(0)" class="gobuy" @click="gobuy">立即购买</a></el-col>
                    </div>
                </div> 
              
            </div>
        </div>
       
       <!-- 马上咨询 -->
            <el-dialog  class="zixunzixun"  title="免费电话咨询" :visible.sync="dialogVisible"  >
                <div class="zixunyemian" v-if='zixunyemianstate'>
                    <!-- 步骤条 -->
                    <el-steps  :active="active" align-center>
                        <el-step class="steptitle" title="输入手机号码" ></el-step>
                        <el-step title="您接听来电" ></el-step>
                        <el-step title="被叫方接听"></el-step>
                        <el-step title="咨询结束"></el-step>
                    </el-steps>
                    <!-- 步骤条结束 -->
                    <div class="inputarea">
                        <!-- 顶部 -->
                        <div class="upouter">

                            <el-input class="up" v-model="phoneinput" placeholder="请输入手机号" @blur="phonetest"></el-input>

                            <p class="phoneerro" v-if="phoneerro"> {{phoneerrocontain}}</p>
                        </div>
                    

                        <!-- 中部 -->
                        <div class="mid">

                            <el-input v-model="picinput" placeholder="请输入图形验证码" @blur="imgblur"></el-input> 

                            <div class="tuxing">
                                <img :src="imgurl" alt="11" @click="imgchange" :onerror="provideralt">
                            </div>

                            <p class="picerro" v-if="picerro">{{picerrocontain}}</p>

                        </div>
                        <!-- 底部 -->
                        <div class="down">

                            <el-input v-model="codeinput" placeholder="请输入验证码"  @blur="msgblur"></el-input>
                            <el-button @click="codeclick">获取验证码</el-button>

                            <p class="msgerro" v-if="msgerro"> {{msgerrocontain}}</p>

                        </div>

                            <el-button class="tijiao"  @click='questioncommit'>开始免费咨询</el-button>
                    </div>
                    
                    <p style="text-align:center">本次电话咨询完全免费，我们将对您的号码严格保密，请放心使用！</p>
                   
                </div>
                <div class="commitsuccess" v-else>
                    <p class='commitup'>本次电话咨询完全免费，我们将对您的号码严格保密，请放心使用！</p>
                    <p class='commitmid'>正在为您接通电话</p>
                    <p class='commitdown'>请您注意接听来电</p>
                </div>
                 <span slot="footer" class="dialog-footer">
                 </span>
            </el-dialog>
       <!-- 马上咨询 结束-->
   
    </div> 

     
   
</template> 
<script>  
import store from '../store'
 export default {
      name: "goodsdetail",

    created(){
        // 商品详情渲染
        var that = this;
        this.ajax.post("/xinda-api/product/package/detail", this.qs.stringify({
           sId:that.$route.query.id
            })).then(function(data) {
            that.detaildata=data.data.data;
            // console.log(that.detaildata);
            that.detailproduct=that.detaildata.product;
            // console.log(that.detaildata.product);
            that.detailprovider=that.detaildata.provider;
            that.detailproviderProduct=that.detaildata.providerProduct;
            that.detailregion=that.detaildata.regionText;
            that.serviceNum=that.detaildata.providerBusiness.serviceNum
            // console.log(that.detaildata);
            }).catch(function(data) {
                // console.log("请求失败");
            });  
        //登录判断
           that.ajax.post(
                    "/xinda-api/sso/login-info",
                    that.qs.stringify({})
                ).then(function(data){
                    // console.log(data.data);
                    that.loginstate=data.data.status;
            })
        // over
        that.ajax.post(
                    "/xinda-api/ajaxAuthcode",
                    that.qs.stringify({})
                ).then(function(data){
                    // console.log(data);
                    that.pic_href=data.data;
                    
            });

    // 购物车数量判断
//   this.$store.dispatch('gaincartdata',store);

    },
    data () { 
        return {
             detaildata:'',
             detailproduct:"",
             detailprovider:'',
             detailproviderProduct:'',
             detailregion:'',
             inputvalue:1,
             servicestyle:'goodsbottomservice',
             servicestyle1:'',
             serviceNum:'',
             ok:true,
             active: 0,
             dialogVisible: false,
             logo:'this.src="' + require('../../static/errorImg.png') + '"',
             provideralt:'this.src="' + require('../../static/ajaxAuthcode.jpg') + '"',

             phoneinput: '',
             picinput: '',
             codeinput: '',
             loginstate:'',
            
             imgurl:`/xinda-api/ajaxAuthcode`,

             phoneerro:false,
             picerro:false,
             msgerro:false,
            
            phoneerrocontain:'图片验证码不正确！',
            picerrocontain:'图片验证码不正确！',
            msgerrocontain:'图片验证码不正确！',

            picstatus:"",
            zixunyemianstate:true,

            
            } 
    }, 
    computed:{
        newsrc:function(){
            return 'http://123.58.241.146:8088/xinda/pic'+this.detailproduct.img
        },
      
    },
//   watch:{
//         


//   },
    methods:{
        reduce:function(){
                this.inputvalue--;
        },
        add:function(){
            this.inputvalue++; 
        },
        open4() {
            this.$message.error('购买数量不能为 0');
        },
        // 加入购物车,在此之前需要进行登录判断
        addcart:function(){
            var that=this;
                    if(that.loginstate==0){
                        that.open2();
                    }else{
                        that.open3();
                        var obj={'id':that.detailproviderProduct.id,'price':that.detailproviderProduct.price,'sname':that.detailproviderProduct.serviceName,'sinfo':that.detailproviderProduct.serviceInfo,'simg':that.detailproduct.img}
                        that.$store.commit('cartNumber',obj)
                         // 成功则进行添加购物车请求
                        that.ajax.post(
                        "/xinda-api/cart/add",
                        that.qs.stringify({                 id:that.detailproviderProduct.id,num:that.inputvalue})
                            ).then(function(){
                                // console.log(data);
                                // that.$router.push({path:"/header/shoppingcart"})
                            });  
                        // 添加购物车请求结束
                    }
                // });             
        },
        //立即购买
        gobuy(){
            var that=this;
                    if(that.loginstate==0){
                        that.open2();
                    }else{
                        that.$store.commit('cartNumber',{'id':that.detailproviderProduct.id,'price':that.detailproviderProduct.price,'sname':that.detailproviderProduct.serviceName,'sinfo':that.detailproviderProduct.serviceInfo,'simg':that.detailproduct.img})
                         // 成功则进行添加购物车请求
                        that.ajax.post(
                        "/xinda-api/cart/add",
                        that.qs.stringify({                 id:that.detailproviderProduct.id,num:that.inputvalue})
                            ).then(function(){
                                // console.log(data);
                                that.$router.push({path:"/header/shoppingcart"})
                            });  
                        // 添加购物车请求结束
                    }
        },
    // 马上咨询部分函数

      // 手机号验证
        phonetest(){
                if( this.phoneinput=='' ){
                    this.phoneerrocontain='请输入手机号'; 
                    this.phoneerro=true;
                    return;
                }else{
                    if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoneinput)){
                        this.phoneerrocontain='请输入手机号'; 
                        this.phoneerro=false;
                    }else{
                        this.phoneerrocontain='手机号错误'; 
                        this.phoneerro=true;
                        return;
                    }
                }
        },
        // 图片验证码切换
        imgchange(){
            var data=(new Date()).getTime();
            this.imgurl=`/xinda-api/ajaxAuthcode?=${data}`
        },
        //图片验证码失焦判断
        imgblur(){
             if( this.picinput=='' ){
                    this.picerrocontain='请输入图片验证码'; 
                    this.picerro=true;
                    this.imgchange();
                    return;}else{
                        this.picerrocontain='请输入图片验证码'; 
                        this.picerro=false;
                        
                    }

        },


        //验证码短信接口
        codeclick(){
            var that=this;
            this.phonetest();
            // 先验证手机号
            //  if( this.phoneinput=='' ){
            //         this.phoneerrocontain='请输入手机号'; 
            //         this.phoneerro=true;
            //         return;
            //     }else if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoneinput)){
            //             this.phoneerrocontain=''; 
            //             this.phoneerro=false;
            //     }else{
            //             this.phoneerrocontain='手机号错误'; 
            //             this.phoneerro=true;
            //             return;
            //     }
            //手机号正确后，进行图片验证码判断 
            if( this.picinput=='' ){
                    this.picerrocontain='请输入图片验证码'; 
                    this.picerro=true;
                    this.imgchange();
                    return;
                }else{
                         // 信息无误后可请求短信验证码
                        that.ajax.post(
                            "/xinda-api/register/sendsms",
                            that.qs.stringify({
                            cellphone: that.phoneinput,					
                            smsType:1,							
                            imgCode:that.picinput	
                            })
                            ).then(function(data){
                                console.log(data.data);
                                if(data.data.status==-1){
                                    that.picerrocontain='图片验证码不正确'; 
                                    that.picerro=true;
                                    that.picinput='';
                                    that.imgchange();
                                }else{
                                    that.picerro=false;  
                                    that.picstatus=data.data.status;
                                }
                            });  
                }


           

        },
        // msg验证码
        msgblur(){
             if( this.codeinput=='' ){
                    this.msgerrocontain='请输入短信验证码'; 
                    this.msgerro=true;
                    // this.imgchange();
                    return;
                    }else if(/^888888$/.test(this.codeinput)==false){
                        this.msgerrocontain='短信验证码错误'; 
                        this.msgerro=true;
                        return;
                    }else{
                        this.msgerrocontain=''; 
                        this.msgerro=false;
                    }

        },
        //咨询提交函数
        questioncommit(){
            var that=this;
            this.phonetest();
            this.imgblur();
            this.msgblur();
            if(that.picstatus=='-1'){
                that.picerrocontain='图片验证码不正确';
                that.picerro=true;
            }else if(that.picstatus==''){
                this.msgerrocontain='短信验证码错误'; 
                this.msgerro=true;
            }else{
                 if( this.codeinput=='' ){
                    this.msgerrocontain='请输入短信验证码'; 
                    this.msgerro=true;
                    // this.imgchange();
                    return;
                    }else if(/^888888$/.test(this.codeinput)==false){
                        this.msgerrocontain='短信验证码错误'; 
                        this.msgerro=true;
                        return;
                    }else{
                        this.msgerrocontain=''; 
                        this.msgerro=false;
                        this.zixunyemianstate=false;
                    }
            }
        },


    // 马上咨询部分函数




        // 提示框函数
        open2() {
            var that=this;
            this.$confirm('您需要登陆才能进行此操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                that.$router.push({path:'/outter/login',query:{pan:123}});
            // this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            // });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消登陆'
            });          
            });
        },
           // 提示框函数
        open3() {
            var that=this;
            this.$alert('加入购物车成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$message({
                    // type: 'info',
                    // message: `action: ${ action }`
                    // });
                }
                });
        },
        // 提示框函数open5
        // open5() {
        //     this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        //     dangerouslyUseHTMLString: true,
        //     showConfirmButton:false,
        //     });
        // },
        // 马上咨询步骤函数结束
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        evaluate:function(){
             // 评价数据获取
             var that=this;
             this.ajax.post("/xinda-api/product/judge/grid", this.qs.stringify({
                start:0,
                limit:10,
                serviceId:that.detailproviderProduct.id,
                type:1
                })).then(function(data) {
                    // console.log(data);
            }).catch(function(data) {
                console.log("请求失败");
            });
        },
        //样式操控方法
        bottomstyle:function(){
            this.servicestyle="goodsbottomservice";
            this.servicestyle1="";
            this.ok=true;
        },
         bottomstyle1:function(){
            this.servicestyle1="goodsbottomservice";
            this.servicestyle="";
            this.ok=false;
        },
        //样式操控方法jieshu 
        
    },

    } 
</script>

<style  lang="less" > 
@media screen and (min-width:769px){

  
    .xsblock{
        display:none;
    }
    .block{
        display:block;
    }
  .goodsdetail{
        max-width:1200px;
        // height:1200px;
        // border:1px solid ;
        margin:0 auto;
        // 首页/公司注册
        .littletip{
            font-size: 14px;
            line-height: 50px;
            margin-top: 10px;
            color:#686868;
            // border:1px solid ;
        }
        //具体商品描述盒子
        .singlegoods{
            display:flex;
            margin-top:10px;
            //图片
            .img{
                max-width:525px;
                min-width:250px;
                max-height:395px;
                display:flex;
                justify-content: center;
                align-items: center;
                // border:1px solid;
                img{
                    width:100%;
                }
            }
        } 
        // 商品参数
        .parameterouter{
            display:flex;
            width:445px;
            // min-width:200px;
            // width:445px;
            align-items: center;
            .parameter{
            width:100%;
            margin-left:30px;
            font-size: 13px;
            color: #676767;
            .servicename{
                height:50px;
                display:flex;
                align-items: center;
                font-size:25px;
                font-weight:bold;
            }
            .serviceinfo{
                font-size: 13px;
                color: #676767;
                line-height:25px;
            }
            // 价格
            .price{
                // min-width:350px;
                width:100%;
                background:#f7f7f7;
                height:70px;
                font-size: 13px;
                color: #676767;
                padding-left: 15px;
                border-top:1px solid #fff;
                .marketprice{
                    display:flex;
                    align-items: center;
                    margin-top:14px;
                    height:20px;
                    .left{
                        width: 52px;
                        margin: 0 5px 0 0;
                        height: 18px;
                        display:flex;
                        justify-content: space-between;
                    }
                    span{
                         color:#ccc;
                         text-decoration:line-through;
                         font-weight:bold;
                    }
                }
                .realprice{
                    display:flex;
                    align-items: center;
                    height:20px;
                    // height:36px;
                    .left{
                        width: 52px;
                        margin: 0 5px 0 0;
                        height: 18px;
                        justify-content: space-between;
                        .distance{
                            position:relative;
                            color: #676767;
                            font-size: 13px;
                            left:13px;;
                            font-weight:350;
                        }
                    }
                    span{
                        color: red;
                        font-size: 22px;
                        font-weight: 700
                    }
                }
            }  
            // 类型
            .type{
                display:flex;
                align-items: center;
                margin-top:15px;
                .servicetype{
                    border: 1px solid #52a5db;
                    color:#52a5db;
                    line-height:19px;
                    padding:3px;
                }
            } 
            .area{
                margin-top:15px;
            } 
            // 购买数量 
            .buynum{
                margin-top:15px;
                display:flex;
                a{
                    display: block;
                    width: 18px;
                    height: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #202020;
                    border: 0;
                    background: #bcbdbd;
                    text-align: center;
                    line-height: 20px;  
                }
                .input {
                    height: 18px;
                    width: 35px;
                    border: 1px solid #bcbdbd;
                    border-radius:0;
                    outline: none;
                    text-align: center;
                    padding:0;
                }
            } 
            // 最底部button
            .bottom{
                margin-top:20px;
                margin-bottom:20px;
                display:flex;
                .shopnext{
                    display:block;
                    color: #fff;
                    background-color: #2693d4;
                    margin-right: 20px;
                    padding:6px 18px 6px 18px;
                }
                .addcart{
                    display:block;
                    background-color: #fff;
                    border: 1px solid #2693d4;
                    color: #2693d4;
                    padding:5px 10px 5px 10px;
                }
            }     
         }
        }
        // 服务商
        .provider{
            width:200px;
            min-width:150px;
            height:235px;
            border:1px solid #2693d4;
            margin-left:50px;
            text-align:center;
            margin-top:50px;

            .title{
                align-items: center;
                font-size: 20px;
                line-height:50px;
                margin-top:10px;
                font-weight: bold;
                text-align:center;
            }
            .providername{
                font-size:14px;
                margin-top:10px;
                height:45px;
            }
            .question{
                display:block;
                background-color: #fff;
                border: 1px solid #2693d4;
                color: #2693d4;
                padding:5px 10px 5px 10px;
                font-size:14px;
                width:90px;
                margin:0  auto;
                margin-bottom:25px;
            }
            .aboutprovider{
                background:#bddef2;
                // border:1px solid;
                height:64px;
                display:flex;
                align-items: center;
                justify-content: center;
                .providerlink{
                    display:block;
                    color: #fff;
                    background-color: #2693d4;
                    // margin-right: 20px;
                    padding:6px 16px 6px 16px;
                    font-size:13px;
                }
            }
        }
        .banner{
            margin-top:20px;
            img{
                width:100%;
            }
        }
        .goodsbottom{
            margin-top:40px;
            .title{
                height:40px;
                border:1px solid #cccccc;
                display:flex;
                background:#f0eeee;
                a{
                    height:40px;
                    display:block;
                    line-height:40px;
                    text-align:center;
                    width:135px;
                    color:#000;
                } 
            }  
            .servicecontain,.evaluatecontain{
                min-height:200px;
                border:1px solid #cccccc;
                padding:20px;
                margin-bottom:50px;
                line-height:30px;
                font-size:14px;
                color:#676767;
            }
            .evaluatecontain{
                padding:0;
                color:#000;

            }
        }
    }
    .goodsbottomservice{
        
        background:#2693d4;
        color:#fff !important;
    }
    .valuenum{
        height:120px;
        display:flex;
        justify-content:space-between;
        align-items: center;
        border-bottom:1px solid #cccccc;
        .total{
            width:410px;
            display:flex;
            .biggoodnum{
                width:140px;
                display:flex;
                justify-content:center;
                align-items: center;
                color: #2693d4;
                span{
                    font-size: 45px;
                    font-weight: 700;
                }
                p{
                    position:relative;
                    top:9px;
                    left:7px;
                }
            }
            .percent{
                margin-left:10px;
                .demo{
                    height:30px;
                    line-height:30px;
                    text-align:center;
                    display:flex;
                }
                // 底部评价部分
                .demo1{
                    width: 167px;//需动态设置
                    height: 20px;
                    background-color: #e4e4e4;
                    margin: 5px;
                }
            }
        }
        .right{
            height:80px;
            width:200px;
            padding-left:30px;
            border-left:1px solid #e4e4e4;
        }
    }
    .evaluatecontain{
        .button{
            line-height:48px;
            display:flex;
            .littlebutton{
                width:117px;
                border-right:1px solid #e4e4e4;
                text-align:center;
            }
        }
        .inin{
            padding: 20px;
            .incontain{
                padding:20px;
                border-left:1px solid #e4e4e4;
                .title{
                    display:flex;
                    border:0;
                    border-bottom:1px solid #e4e4e4;
                    div{
                        width:373px;
                        line-height:40px;
                        text-align:center;
                        background:#fff !important;
                    }
                }
                .page{
                    display:flex;
                    justify-content: center;
                    margin-top:40px;
                    input{
                        width:30px;
                        text-align:center;
                        height:30px;
                    }
                    .pre,.nex{
                        // width:px;
                        height:34px;
                        margin:0 5px 0 5px;
                        padding:0 15px ;
                    }
                }
            }
        }
    }
}
@media screen and (max-width:769px){
    .el-message-box{
        width:300px;
    }
    .xsblock{
        display:block; 
    }
    
    .block{
        display:none;
    }
    .singlegoods{
        .img{
            width:100%;
            position:relative;
            // max-height:475px;
            img{
                width:100%;
            }
        }
        .xuanfu{
            width:100%;
            height:90px;
           
            // border:1px solid;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            white-space:nowrap;
            position:absolute;
            bottom:4px;
            right:0;
            background:rgba(0, 0, 0, 0.4);
            color:white;
            
            // display:flex;
            // align-items: center;
            .servicename{
                line-height:40px;
                font-size: 20px;
                font-weight: bold;
                margin-top:12px;
                margin-left:5px;
            }
            .serviceinfo{
                margin-left:5px;
            }
        }
        .area{
            margin:0 15px;
            line-height:44px;
            border-bottom:1px solid #c5c5c5;
            font-size:15px;
        }
        .price{
            padding:0 15px;
            line-height:44px;
            border-bottom: 5px solid #ebebeb;
            font-size:15px;
            display:flex;
            
            .middle{
                color: red;
                font-size: 22px;
                font-weight: 700;
            }
            .right{
                color: #ccc;
                text-decoration:line-through;
            }
        }
        .providerp{
                line-height: 45px;
                margin-top: 10px;
                font-size: 18px;
                padding-left: 2%;
                border-bottom: 2px solid #2393d3;
        }
        .provider{
            display:flex;
            position:relative;
            margin-top:10px;
            padding:10px;
            border-bottom: 5px solid #ebebeb;
            .xinyu{
               line-height:22px;
               img{
                   height:100%;
                   width:90px;
                   position: relative;
                   top:3px;;
               } 
            }
            .img{
                width:150px;
                height:100px;
                // border:1px solid;
                display:flex;
                justify-content: center;
                align-items: center;
            }
            .contain{
                margin-left:50px;
                font-size:12px;
                line-height:22px;
                margin-bottom:20px;
                    .providerlink{
                        display:block;
                        width: 90px;
                        line-height: 30px;
                        background-color: #ff591b;
                        color: #fff;
                        // border-right: 4px;
                        border: none;
                        outline: none;
                        margin-top: 10px;
                        text-align:center;
                    }
                    
                
            }
            .jinpai{
                width:100px;
                position:absolute;
                bottom:25px;
                left:30px;
                
            }
        }
        .servicecontain{
            padding:15px;
            padding-bottom:0;
            border-bottom: 5px solid #ebebeb;
        }
        .pingjia{
            height:100px;
        }
        .goosbottom{
            height:60px;
            .lianxi{
                height:100%;
                background:#edeff2;
                text-align:center;
                img{
                    width:30px;
                    margin-top:6px;
                }
                .lianxishangjai{
                    color:#2d2d2d;
                }
            }
            .gouwuche{
                height:100%;
                 line-height:60px;
                background:#2693d4;
                text-align:center;
                .addcart{
                    color:white;
                }
            }
            .goumai{
                height:100%;
                line-height:60px;
                background:#fc4145;
                text-align:center;
                .gobuy{
                   color:white; 
                }

            }

        }
    }
}


    .el-dialog{
        max-width:520px;
        min-width:340px;
    }
    // .zixunyemian{
    //    max-height:520px;
    //     min-width:340px;
    // }
    .zixunzixun{
        
        
        .steptitle{
            flex-basis: 30% !important;
        }
        .el-step__title{
            font-size:13px;
            line-height:20px;
            
            // font-weight:300;
        }
        .el-dialog__body{
            padding-top:15px;
            padding-bottom:0;
          
        }
       .el-steps{
           width:100%;
           margin:0 auto;
       }
       .inputarea{
          max-width:338px; 
          margin:0 auto;
       }
       .up,.mid,.down{
           display:flex;
           margin-top:20px;
       }
       .el-input__inner{
           height:30px;
       }
       .tuxing{
           width:150px;
           text-align:right;
           img{
               width:70%;
               height:30px;
           }
       }
       .el-button{
           padding:0 5px 0 5px!important;
           line-height:30px;
           margin-left:21px;
           background:#f5f4f4;
       }
       .tijiao{
           width:100%;
           height:30px;
           margin:20px 0 20px 0;
           background:#4eb5ba;
           color:white;
       }
       .el-dialog__header{
           padding:0;
           line-height: 40px;
           background-color: #a1eaec;
           padding-left:20px;
       }
       .el-dialog__close{
           position:relative;
           top:-7px;
       }

    }
    .upouter,.mid,.down{
        position:relative;
    }
    .phoneerro,.picerro,.msgerro{
        position:absolute;
        top:31px;
        left:2px;
        color:red;
    }
    .commitup{
        font-size:20px;
    }
    .commitmid,.commitdown{
        font-size: 18px;
        color: #4ca8e6;
        text-align:center;
        margin-top:30px;
    }
    .commitdown{
        margin-bottom:30px;
    }
    // .commitsuccess{
    //     min-height:400px;
    // }
         
</style>