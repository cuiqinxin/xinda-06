<template>
    <div  class="goodsdetail">
        <p class="littletip">首页/公司注册</p>
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
                            <a href="javascript:void(0)" class="shopnext" @click="addcart">立即购买</a>
                            <a href="javascript:void(0)"  class="addcart"  @click="addcart">加入购物车</a>
                    </div>
                </div>
            </div> 
            <!-- 供应商 -->
            <div class="provider">
                <p class="title">
                    顶级服务商
                </p>
                <p class="providername">
                    {{detailprovider.name}}
                </p>
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
        <!-- 马上咨询 -->
        <el-dialog  class="zixunzixun"  title="免费电话咨询" :visible.sync="dialogVisible"  width="43%"  >
            <!-- 步骤条 -->
            <el-steps  :active="active" align-center>
                <el-step title="输入手机号码" ></el-step>
                <el-step title="您接听来电" ></el-step>
                <el-step title="被叫方接听"></el-step>
                <el-step title="咨询结束"></el-step>
            </el-steps>
            <!-- 步骤条结束 -->
            <div class="inputarea">
                <!-- 顶部 -->
                 <el-input class="up" v-model="input" placeholder="请输入手机号"></el-input>
                 <!-- 中部 -->
                <div class="mid">
                     <el-input v-model="input" placeholder="请输入图形验证码"></el-input> 
                    <div class="tuxing">
                        <img src="" alt="#" :onerror="provideralt">
                    </div>
                </div>
                <!-- 底部 -->
                <div class="down">
                    <el-input v-model="input" placeholder="请输入验证码"></el-input>
                    <el-button>获取验证码</el-button>
                </div>

                    <el-button class="tijiao">开始免费咨询</el-button>
            </div>
            
            <p style="text-align:center">本次电话咨询完全免费，我们将对您的号码严格保密，请放心使用！</p>
            <span slot="footer" class="dialog-footer">
             </span>
        </el-dialog>
        <!-- 马上咨询 结束-->
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

     
   
</template> 
<script>  
 export default {
      name: "goodsdetail",
    created(){
        // 商品详情渲染
        var that = this;
        this.ajax.post("/xinda-api/product/package/detail", this.qs.stringify({
           sId:that.$route.query.id
            })).then(function(data) {
            that.detaildata=data.data.data;
            console.log(that.detaildata);
            that.detailproduct=that.detaildata.product;
            // console.log(that.detaildata.product);
            that.detailprovider=that.detaildata.provider;
            that.detailproviderProduct=that.detaildata.providerProduct;
            that.detailregion=that.detaildata.regionText;
            }).catch(function(data) {
                console.log("请求失败");
            });  
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
             ok:true,
             active: 0,
             dialogVisible: false,
             logo:'this.src="' + require('../../static/errorImg.png') + '"',
             provideralt:'this.src="' + require('../../static/ajaxAuthcode.jpg') + '"',
             input: ''
            
            } 
    }, 
    computed:{

        newsrc:function(){
            return 'http://123.58.241.146:8088/xinda/pic'+this.detailproduct.img
        }

    },
  
    methods:{
        //  isHasImg(item) {
        //     item= "";
        // },

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
            // 登录判断
            that.ajax.post(
                    "/xinda-api/sso/login-info",
                    that.qs.stringify({})
                ).then(function(data){
                    console.log(data.data);
                    // 未登陆
                    if(data.data.status==0){
                        that.open2();
                    }else{
                         // 成功则进行添加购物车请求
                        that.ajax.post(
                        "/xinda-api/cart/add",
                        that.qs.stringify({                 id:that.detailproviderProduct.id,num:that.inputvalue})
                            ).then(function(data){
                                console.log(data);
                            });  
                        // 添加购物车请求结束
                    }
                });             
        },
        // 提示框函数
        open2() {
            var that=this;
            this.$confirm('您需要登陆才能进行此操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                that.$router.push('/Outter/Zhuce');
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
                    console.log(data);
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
        
    }     
    } 
</script>

<style lang="less" > 
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
                    padding:6px 16px 6px 16px;
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
            }
            .question{
                display:block;
                background-color: #fff;
                border: 1px solid #2693d4;
                color: #2693d4;
                padding:5px 10px 5px 10px;
                font-size:14px;
                width:90px;
                margin:25px auto;
            }
            .aboutprovider{
                background:#bddef2;
                // border:1px solid;
                height:65px;
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
                    }
                }
            }
        }
    }
    .zixunzixun{
        .el-dialog__body{
            padding-top:15px;
            padding-bottom:0;
        }
       .el-steps{
           width:80%;
           margin:0 auto;
       }
       .inputarea{
          width:55%; 
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
           padding:0 5px 0 5px;
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
         
</style>