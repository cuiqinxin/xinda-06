<template>
    <div class="Login">       
        <div class="deng">
            <!-- <p @click="chufa">{{count}}</p> -->
            <!-- <p class="nadaoshuju">{{userPhoneNumber}}</p> -->
            <!-- <p>{{gett}}</p> -->
            <el-row>
                <el-col :span="12" :xs="24" class="left">
                    <el-col :sm={span:11,offset:6} :xs={span:18,offset:3} class="shu">
                        <input type="text" placeholder="请输入手机号码" v-model="phoneValue" @keyup="phoneKey">
                        <p class="wrongTip">{{phoneTip}}</p>
                        <div class="pass">
                            <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey">
                            <span :class="style" @click="show"></span>
                        </div>
                        <p class="wrongTip">{{passTip}}</p>
                        <!-- <photoyan></photoyan> -->
                        <div class="yan">
                            <input type="text" placeholder="请输入图片验证码" class="yanma" v-model="photoValue" @keyup="photoKey">
                            <img :src="imgurl" @click="imgchange">
                        </div>
                        <p class="wrongTip">{{photoTip}}</p>
                        <router-link to="/outter/forget" class="forget hidden-xs-only">忘记密码？</router-link>
                        <a href="javascript:void(0)" class="log" @click="logyan">立即登录</a>
                    </el-col>
                </el-col>
                <el-col :span="12" class="hidden-xs-only">
                    <el-col :span="9" :offset="6" class="shu">
                        <p class="size">还没有账号？</p>
                        <router-link to="/outter/zhuce" class="size">立即注册&gt;&gt;</router-link>
                        <img src="../../static/getRight.d3bbcd8.png" alt="">
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <el-row class="now hidden-sm-and-up">
            <el-col :span="20" :offset="2" id="spe"><p>还没有信达账号？</p><router-link to="/outter/zhuce" class="liji">立即注册</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
import store from '../store'
import password from '../components/Password'
import photoyan from '../components/Photoyan'
export default {
    name: 'Login',
    data () {
        return {
            id:'',
            imgurl:'/xinda-api/ajaxAuthcode',
            style:'bi',
            types:'password',
            phoneValue:'',
            passValue:'',
            photoValue:'',
            phoneTip:'',
            passTip:'',
            photoTip:''
        }
    },
    created(){
        this.$parent.info = '欢迎登录';
        this.$parent.infoWeb = '登录';
        this.id=this.$route.query.id;
        document.onkeyup=(e)=>{
            var key=window.event.keyCode;
            if(key==13){
                this.logyan();
            }
        }
    },
    methods:{
        logyan(){
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
            if(logins==3){
                var that=this;
                var md5=require('md5');
                this.datavalue=this.ajax.post('/xinda-api/sso/login',this.qs.stringify(
                    {'loginId':this.phoneValue,'password':md5(that.passValue),'imgCode':this.photoValue}
                )).then(
                    function(data){
                        if(data.data.msg=="账号或密码不正确！"){
                            that.passTip='密码不正确，请重新输入';
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }
                        if(data.data.msg=="账号不存在"){
                            that.phoneTip=data.data.msg;
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }
                        if(data.data.msg=="图片验证码错误！"){
                            that.passTip=data.data.msg;
                            var data=(new Date()).getTime();
                            that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                        }
                        if(data.data.status==1){
                            store.commit('loginStatus',that.phoneValue)
                            //{path:'/outter/login',query:{id:123}}
                            // that.$router.push({path:'/header/index1'});
                            that.$router.go(-1);
                        }
                }).catch(function(){console.log('失败');})
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
        imgchange(){
            var data=(new Date()).getTime();
            this.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`
        },
        show(){
            if(this.style=='zheng'){
                this.style='bi';
                this.types='password';
            }else{
                this.style='zheng';
                this.types='text';
            }
        }
    },
    components:{
        password,
        photoyan
    },
}
</script>

<style lang="less">
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
        position: absolute;
        bottom: 0;
        width: 100%;
        #spe{
            display: flex;
            justify-content: space-between;
        }
        p{
            color: #fff;
            line-height: 78px;
        }
        .liji{
            color: #fff; 
            line-height: 49px;
            height: 49px;
            width: 27.4%;
            text-align: center;
            border-radius: 5px;
            background-color: #2693d4;
            margin:14px 0 15px;
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
    @media screen and (min-width: 768px) and (max-width: 992px){
        .pass input{width: 52%;}
        .yanma{width:44%;}       
    }
    @media screen and (max-width: 768px){
        .pass{margin:32px 0 0;input{width: 58%;}}
        .yan{margin-top: 30px;}
        .deng{margin-top: 77px;padding-top: 0;}
        .left{margin-top:71px;}
        .log{
            margin-top:213px;
            color: #fff;
            background-color: #2693d4;
        }
    }
</style>
