<template>
    <div class="Login">
        <div class="deng">
            <el-row>
                <el-col :md="12" :xs="24" :sm="24" class="left">
                    <el-col :md={span:11,offset:6} :xs={span:18,offset:3} :sm={span:18,offset:3} class="shu">
                        <input type="text" placeholder="请输入手机号码" v-model="phoneValue" @keyup="phoneKey" @blur="phoneBlur">
                        <p class="wrongTip">{{phoneTip}}</p>
                        <div class="pass">
                            <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey">
                            <span :class="style" @click="show"></span>
                        </div>
                        <p class="wrongTip">{{passTip}}</p>
                        <div class="yan">
                            <input type="text" placeholder="请输入图片验证码" class="yanma" v-model="photoValue" @keyup="photoKey">
                            <img :src="imgurl" @click="imgchange">
                        </div>
                        <p class="wrongTip">{{photoTip}}</p>
                        <router-link to="/outter/forget" class="forget hidden-xs-only">忘记密码？</router-link>
                        <a href="javascript:void(0)" class="log" @click="logyan">立即登录</a>
                    </el-col>
                </el-col>
                <el-col :span="12" class="hidden-sm-and-down">
                    <el-col :span="9" :offset="6" class="shu">
                        <p class="size">还没有账号？</p>
                        <router-link to="/outter/zhuce" class="size">立即注册&gt;&gt;</router-link>
                        <img src="../../static/getRight.d3bbcd8.png" alt="">
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <el-row class="now hidden-md-and-up">
            <el-col :span="20" :offset="2" id="spe"><p>还没有信达账号？</p><router-link to="/outter/zhuce" class="liji">立即注册</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
import store from '../store'
export default {
    name: 'Login',
    data () {
        return {
            imgurl:'/xinda-api/ajaxAuthcode',
            style:'bi',          //睁眼闭眼的样式
            types:'password',
            phoneValue:'',       //手机号的值
            passValue:'',        //密码的值
            photoValue:'',       //图片验证码的值
            phoneTip:'',         //手机号提示
            passTip:'',          //密码提示
            photoTip:'',         //图片验证码提示
            panduan:'',          //判断登陆后跳转的标记
        }
    },
    created(){
        this.$parent.info = '欢迎登录';
        this.$parent.infoWeb = '登录';
        this.panduan=this.$route.query.pan;
        document.onkeyup=(e)=>{       //按回车键登录
            var key=window.event.keyCode;
            if(key==13){
                this.logyan();
            }
        }
    },
    methods:{
        logyan(){                     //登录验证
            var logins=0;
            if(this.phoneValue==''){
                this.phoneTip='手机号不能为空！';
            }else if(!/^1[23456789]\d{9}$/.test(this.phoneValue)){
                this.phoneTip='手机号格式不正确！';
            }else{
                this.phoneTip='';logins++;
            }
            if(this.passValue==''){
                this.passTip='请输入密码';
            }else{
                this.passTip='';logins++;
            }
            if(this.photoValue==''){
                this.photoTip='请输入图片验证码';
            }else{
                this.photoTip='';logins++;
            }
            if(logins==3){                   //都不为空且手机号格式正确才发送验证
                var that=this;
                var md5=require('md5');
                this.ajax.post('/xinda-api/sso/login',this.qs.stringify(
                    {'loginId':this.phoneValue,'password':md5(that.passValue),'imgCode':this.photoValue}
                )).then(
                    function(data){
                        if(data.data.msg=="账号或密码不正确！"){
                            that.passTip='密码不正确，请重新输入';
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }else if(data.data.msg=="账号不存在"){
                            that.phoneTip=data.data.msg;
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }else if(data.data.msg=="图片验证码错误！"){
                            that.photoTip=data.data.msg;
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }else if(data.data.status==1){
                            store.commit('loginStatus',that.phoneValue)
                            that.ajax
                            .post("/xinda-api/cart/list", that.qs.stringify({}))
                            .then(function(data) {
                                store.commit('gaincartNum',data.data.data.length);
                                for(var i=0;i<data.data.data.length;i++){
                                    var imgurlcart='http://123.58.241.146:8088/xinda/pic/'+data.data.data[i].providerImg;
                                    var obj={'id':data.data.data[i].serviceId,'price':data.data.data[i].unitPrice,'sname':data.data.data[i].serviceName,'sinfo':data.data.data[i].serviceInfo,'simg':imgurlcart}
                                    store.commit('gaincartId',obj);
                                }
                            })
                            if(that.panduan=='123'){
                                that.$router.go(-1);
                            }else{
                                that.$router.push({path:'/'});
                            }
                        }
                })
            }
        },
        phoneBlur(){                  //手机号失焦验证
            if(this.phoneValue==''){
                this.phoneTip='手机号码不能为空';
            }else if(!/^1[23456789]\d{9}$/.test(this.phoneValue)){
                this.phoneTip='手机号码格式不正确';
            }else{
                this.phoneTip='';
            }
        },
        phoneKey(){
           this.phoneTip='';
        },
        passKey(){
            this.passTip='';
        },
        photoKey(){
            this.photoTip='';
        },
        imgchange(){          //点击切换验证码
            var data=(new Date()).getTime();
            this.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`
        },
        show(){               //睁眼闭眼效果
            if(this.style=='zheng'){
                this.style='bi';
                this.types='password';
            }else{
                this.style='zheng';
                this.types='text';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    span{display: inline-block;}
    a{color:#3f9cd9;}
    input{
        height: 34px;
        border:1px solid #cbcbcb;
        padding: 0 20px;
        border-radius: 5px;
    }
    .wrongTip{color:red;line-height: 28px;font-size: 14px;}
    .Login{
        background-color: #f5f5f5;
        overflow: hidden;
    }
    .deng{
        max-width: 1200px;
        margin:52px auto 180px;
        background-color: #fff;
        padding-top: 32px;
    }
    .left{
        border-right: 1px solid #dadada;
        margin: 13px 0 124px;
    }
    .shu{
        display: flex;
        flex-direction: column;
    }
    .forget{
        font-size: 14px;
        margin:27px 0 20px;
        text-align: right;
    }
    .log{
        line-height: 36px;
        font-size: 18px;
        text-align: center;
        border:1px solid #3f9cd9;
        border-radius: 5px;
    }
    .size{
        font-size: 18px;
        margin-left: 32px;
        line-height: 40px;
    }
    .now{
        background-color: #4d4d4d;
        font-size: 18px;
        bottom: 90px;
        position: fixed;
        width: 100%;
        #spe{
            display: flex;
            justify-content: space-between;
        }
        p{
            color: #fff;
            line-height: 46px;
        }
        .liji{
            color: #fff;
            line-height: 36px;
            height: 36px;
            width: 27.4%;
            text-align: center;
            border-radius: 5px;
            background-color: #2693d4;
            margin:5px 0;
        }
    }
    .yan{
        font-size: 0;
        margin-top: 24px;
        img{
            width:30%;
            vertical-align: bottom;
            float: right;
            cursor: pointer;
            height: 36px;
        }
    }
    .yanma{width:48.484%;}
    .pass{
        margin:24px 0 0;
        border: 1px solid #cbcbcb;
        border-radius: 5px;
        input{
            border:0;
            width: 62%;
        }
        span{
            width: 23px;
            vertical-align: top;
            float: right;
            cursor: pointer;
        }
    }
    .bi{
        margin:12px 8px 11px;
        height: 11px;
        background: url(../../static/bi.png) no-repeat;
    }
    .zheng{
        margin:9px 8px 8px;
        height: 17px;
        background: url(../../static/zheng.png) no-repeat;
    }
    @media screen and (max-width: 992px){
        .pass{margin:32px 0 0;input{width: 58%;}}
        .yan{margin-top: 30px;}
        .deng{margin-top: 0;padding-top: 0;margin-bottom: 34px;}
        .left{margin-top:20%;margin-bottom: 44%;}
        .log{
            margin-top:30%;
            color: #fff;
            background-color: #2693d4;
        }
    }
</style>
