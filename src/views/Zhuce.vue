<template>
    <div class="Zhuce">
        <div class="zhu">
            <el-row>
                <el-col :span="12" :xs="24" class="left">
                    <el-col :sm={span:11,offset:6} :xs={span:18,offset:3} class="shu">
                        <input type="text" placeholder="请输入手机号码" v-model="phoneValue" @blur="phoneBlur" @keyup="phoneKey"> 
                        <p class="wrongTip">{{phoneTip}}</p>                      
                        <div class="yan">
                            <input type="text" placeholder="请输入图片验证码" class="yanma" v-model="photoValue" @keyup="photoKey">
                            <img :src="imgurl" @click="imgchange">
                        </div>
                        <p class="wrongTip">{{photoTip}}</p>
                        <div class="phoyan">
                            <input type="text" placeholder="请输入手机验证码" class="yanma" v-model="phoneYan" @keyup="telKey">
                            <button @click="telget" :class="showyan">{{phoneClick}}</button>
                        </div>
                        <p class="wrongTip">{{telTip}}</p>
                        <city @confirm="confirm" display="12345"></city>
                        <p class="wrongTip">{{cityTip}}</p>
                        <el-popover placement="right" width="300" trigger="click">
                            <div><i class="el-icon-circle-close-outline colori"></i>6-20个字符<br/><i class="el-icon-circle-close-outline colori"></i>只能包含字母、数字以及下划线<br/><i class="el-icon-circle-close-outline colori"></i>字母、数字和下划线至少包含2种</div>                 
                            <div class="pass" slot="reference">
                                <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                                <span :class="style" @click="show"></span>
                            </div>
                        </el-popover> 
                        <p class="wrongTip">{{passTip}}</p>
                        <a href="javascript:void(0)" class="log" @click="regisyan">立即注册</a>
                        <p class="zunshou hidden-xs-only">注册即同意遵守<a href="javascript:void(0)">《服务协议》</a></p>
                    </el-col>
                </el-col>
                <el-col :span="12" class="hidden-xs-only">
                    <el-col :span="9" :offset="6" class="shu">
                        <p class="size">已有账号？</p>
                        <router-link to="/outter/zhuce" class="size">立即登录&gt;&gt;</router-link>
                        <img src="../../static/getRight.d3bbcd8.png" alt="">
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <el-row class="now hidden-sm-and-up">
            <el-col :span="20" :offset="2" id="spe"><p>已有账号？</p><router-link to="/outter/login" class="liji">立即登录</router-link></el-col>
        </el-row>
        <!--  -->
        <!-- <p>{{count}}</p> -->
    </div>
</template>

<script>
import city from '../components/City'
import password from '../components/Password'
import photoyan from '../components/Photoyan'
// import store from '../store'
export default {
    name: 'Zhuce',
    created(){
        this.$parent.info = '欢迎注册';
        this.$parent.infoWeb = '注册';
    },
    data () {
        return {
            imgurl:'/xinda-api/ajaxAuthcode',
            style:'bi',
            types:'password',
            passValue:'',
            photoValue:'',
            phoneValue:'',
            phoneYan:'',
            passTip:'',
            photoTip:'',
            phoneTip:'',
            telTip:'',
            cityTip:'',
            passSigns:'',
            phoneClick:'点击获取',
            showyan:'valid',
            cityCode:'',
        }
    },
    methods:{
        phoneBlur(){
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
        passSign(){
            if(this.passValue==''){
                this.passSigns='1';
            }else{this.passSigns='2';}
        },
        passKey(){
            if(this.passSigns=='2'&&this.passValue==''){
                this.passTip='请输入密码';
            }else if(this.passSigns=='2'&&this.passValue!=''){
                this.passTip='';
            }
        },
        passBlur(){
            if(this.passValue==''){
                this.passTip='';
            }else if(this.passValue.length<6||this.passValue.length>20){
                this.passTip='密码设置不符合要求';
            }else if(/\W/.test(this.passValue)){
                this.passTip='密码设置不符合要求';
            }else if(/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.passTip='密码设置不符合要求';
            }
        },
        telget(){
            if(this.phoneClick=='点击获取'){
                if(/^1[23456789]\d{9}$/.test(this.phoneValue)){
                    var that=this;
                    this.datavalue=this.ajax.post('/xinda-api/register/sendsms',this.qs.stringify(
                        {'cellphone':this.phoneValue,'smsType':1,'imgCode':this.photoValue}
                    )).then(
                        function(data){
                            if(data.data.status==-1){
                                that.photoTip=data.data.msg;
                                var data=(new Date()).getTime();
                                that.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
                            }
                            if(data.data.status==1){
                                var second=60;
                                that.phoneClick=second+'秒后获取';
                                that.showyan='invalid';
                                var jishi=setInterval(function(){
                                    second--;
                                    that.phoneClick=second+'秒后获取';
                                    if(second==-1){clearInterval(jishi);that.phoneClick='点击获取';that.showyan='valid';}
                                },1000);
                            }
                    }).catch(function(){console.log('失败');});
                }else{
                    this.phoneTip='手机号不正确';
                }
            }else{
                return;
            }
        },
        telKey(){
            this.telTip='';
        },
        photoKey(){
            this.photoTip='';
        },
        regisyan(){
            var lastzhu=0;
            if(this.phoneValue==''){
                this.phoneTip='手机号码不能为空';
            }else if(!/^1[23456789]\d{9}$/.test(this.phoneValue)){
                this.phoneTip='手机号码格式不正确';
            }else{
                this.phoneTip='';lastzhu++;
            }
            if(this.photoValue==''){
                this.photoTip='图片验证码不能为空';
            }else{
                this.photoTip='';lastzhu++;
            }
            if(this.phoneYan==''){
                this.telTip='手机验证码不能为空';
            }else if(this.phoneClick=='点击获取'){
                this.telTip='请发送手机验证码';
            }else{
                this.telTip='';lastzhu++;
            }
            if(this.cityCode==''){
                this.cityTip='地域信息不能为空';
            }else{
                this.cityTip='';lastzhu++;
            }
            if(this.passValue==''){
                this.passTip='请设置登录密码';
            }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.passTip='密码设置不符合要求';
            }else{
                this.passTip='';lastzhu++;
            }
            if(lastzhu==5){
                var that=this;
                this.datavalue=this.ajax.post('/xinda-api/register/valid-sms',this.qs.stringify(
                    {'cellphone':this.phoneValue,'smsType':1,'validCode':this.phoneYan}
                )).then(
                    function(data){
                        if(data.data.status==-3){
                            that.telTip=data.data.msg;
                        }
                        if(data.data.status==-2){
                            that.phoneTip=data.data.msg;
                        }
                        if(data.data.status==1){
                            var md5=require('md5');
                            that.ajax.post('/xinda-api/register/register',that.qs.stringify(
                                {'cellphone':that.phoneValue,'smsType':1,'validCode':that.phoneYan,'password':md5(that.passValue),'regionId':that.cityCode}
                            )).then(
                                function(data){
                                    if(data.data.status==-2){
                                        that.phoneTip=data.data.msg;
                                    }
                                    if(data.data.status==1){
                                        that.$confirm('注册成功！是否跳转到登录页?', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            that.$router.push({path:'/outter/login'});
                                            this.$message({
                                                type: 'success',
                                                message: '跳转成功!'
                                            });
                                        }).catch(() => {   
                                        });
                                    }
                            }).catch(function(){console.log('失败');});
                        }
                }).catch(function(){console.log('失败');});
            }
        },
        confirm(value){
            this.cityCode=value;
        },
        imgchange(){
            var data=(new Date()).getTime();
            this.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
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
        city,
        photoyan
    },
    computed:{
        count(){
            return store.state.count;
        }
    }
}
</script>

<style lang="less"> 
    .colori{&::before{color: red;margin-right: 5px}} 
    .phoyan{
        button{
            height: 36px;
            background-color: #fff;
            width: 32.5%;
            float: right;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .valid{
        color: #3f9cd9;
        border:1px solid #3f9cd9;
    }
    .invalid{
        color: #ccc;
        border:1px solid #ccc;
    }
    .zunshou{
        text-align: center;
        font-size: 14px;
        line-height: 34px;
    }
   .Zhuce{
        background-color: #f5f5f5;
        overflow: hidden;
    } 
    .zhu{
        max-width: 1200px;
        margin:42px auto 180px;
        background-color: #fff;
        padding-top: 42px;
        select{
            width: 32%;
            height: 36px;
            border-radius: 5px;
            margin:21px 0 0;
        }
        .yan{
            margin:19px 0;
        }
        .left{margin-bottom: 22px;}
    }
    @media screen and (max-width: 768px){
        .zhu{
            margin-top: 0;
            .yan{margin:32px 0;}
            select{margin-top: 32px;}
            .log{margin-top:115px;}
            // .pass{margin-bottom: 145px;}
        }
        .phoyan button{
            color: #fff;
            background-color: #2693d4;
        }
    }
</style>
