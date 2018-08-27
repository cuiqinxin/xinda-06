<template>
    <div class="Forget">
        <div class="zhu">
            <el-row>
                <el-col :span="12" :xs="24" class="left">
                    <el-col :sm={span:11,offset:6} :xs={span:18,offset:3} class="shu">
                        <validate @inputaa="yanzheng" ref="msg" @confirmss="confirmss"></validate>
                        <el-popover placement="right" width="300" trigger="focus" class="hidden-xs-only">
                            <div><i :class="lengthLimit"></i>6-20个字符<br/><i :class="typeLimit"></i>只能包含字母、数字以及下划线<br/><i :class="twiceType"></i>字母、数字和下划线至少包含2种</div>
                            <div class="pass" slot="reference">
                                <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                                <span :class="style" @click="show(1)"></span>
                            </div>
                        </el-popover>
                        <div class="pass hidden-sm-and-up">
                            <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                            <span :class="style" @click="show(1)"></span>
                        </div>
                        <p class="wrongTip">{{passTip}}</p>
                        <div class="pass again">
                            <input :type="types1" placeholder="请再次输入密码" v-model="againValue" @keyup="againKey">
                            <span :class="style1" @click="show(2)"></span>
                        </div>
                        <p class="wrongTip">{{againTip}}</p>
                        <a href="javascript:void(0)" class="log" @click="forgetyan">确认修改</a>
                    </el-col>
                </el-col>
                <el-col :span="12" class="hidden-xs-only">
                    <el-col :span="9" :offset="6" class="shu">
                        <p class="size">想起密码来了？</p>
                        <router-link to="/outter/login" class="size">立即登录&gt;&gt;</router-link>
                        <img src="../../static/getRight.d3bbcd8.png" alt="">
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <el-row class="now hidden-sm-and-up">
            <el-col :span="20" :offset="2" id="spe"><p>想起密码来了？</p><router-link to="/outter/login" class="liji">立即登录</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
import validate from '../components/Validate'
export default {
    name: 'Forget',
    created(){
        this.$parent.info = '忘记密码';
        this.$parent.infoWeb = '忘记密码';
        document.onkeyup=(e)=>{
            var key=window.event.keyCode;
            if(key==13){
                this.forgetyan();
            }
        }
    },
    data () {
        return {
            style:'bi',
            types:'password',
            style1:'bi',
            types1:'password',
            passValue:'',
            photoValue:'',
            phoneValue:'',
            phoneYan:'',
            againValue:'',
            passTip:'',
            againTip:'',
            passSigns:'',
            phoneClick:0,
            lengthLimit:'el-icon-circle-close-outline colori',
            typeLimit:'el-icon-circle-close-outline colori',
            twiceType:'el-icon-circle-close-outline colori',
        }
    },
    methods:{
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
            if(this.passValue.length>5&&this.passValue.length<21){
                this.lengthLimit='el-icon-circle-check-outline righti';
            }else{
                this.lengthLimit='el-icon-circle-close-outline colori';
            }
            if(!/\W/.test(this.passValue)){
                this.typeLimit='el-icon-circle-check-outline righti';
            }else{
                this.typeLimit='el-icon-circle-close-outline colori';
            }
            if((/[A-Za-z]/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/[A-Za-z]/.test(this.passValue)&&/\_/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/\_/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))){
                this.twiceType='el-icon-circle-check-outline righti';
            }else{
                this.twiceType='el-icon-circle-close-outline colori';
            }
        },
        passBlur(){
            if(this.passValue==''){
                this.passTip='';
            }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.passTip='密码设置不符合要求';
            }
        },
        againKey(){
            this.againTip='';
        },
        forgetyan(){
            var lastzhu=0;
            if(this.phoneValue==''){
                this.$refs.msg.getphone('手机号码不能为空');
            }else if(!/^1[23456789]\d{9}$/.test(this.phoneValue)){
                this.$refs.msg.getphone('手机号码格式不正确');
            }else{
                this.$refs.msg.getphone('');
                lastzhu++;
            }
            if(this.photoValue==''){
                this.$refs.msg.getphoto('图片验证码不能为空');
            }else{
                this.$refs.msg.getphoto('');
                lastzhu++;
            }
            if(this.phoneYan==''){
                this.$refs.msg.gettel('手机验证码不能为空');
            }else if(this.phoneClick!=2){
                this.$refs.msg.gettel('请发送手机验证码');
            }else{
                this.$refs.msg.gettel('');
                lastzhu++;
            }
            if(this.passValue==''){
                this.passTip='请设置登录密码';
            }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.passTip='密码设置不符合要求';
            }else{
                this.passTip='';lastzhu++;
            }
            if(this.againValue==''){
                this.againTip='请确认密码';
            }else if(this.againValue!=this.passValue){
                this.againTip='两次密码不一致';
            }else{
                this.againTip='';lastzhu++;
            }
            if(lastzhu==5){
                var that=this;
                var md5=require('md5');
                console.log(this.phoneYan);
                this.ajax.post('/xinda-api/register/findpas',this.qs.stringify(
                    {'cellphone':that.phoneValue,'smsType':2,'validCode':that.phoneYan,'password':md5(that.passValue)}
                )).then(
                    function(data){
                        console.log(data);
                        if(data.data.status==-3){
                            that.$refs.msg.gettel(data.data.msg);
                            var data=(new Date()).getTime();
                            that.$refs.msg.getimg(`/xinda-api/ajaxAuthcode?t=${data}`);
                        }else if(data.data.status==-2){
                            that.$refs.msg.getphone(data.data.msg);
                            var data=(new Date()).getTime();
                            that.$refs.msg.getimg(`/xinda-api/ajaxAuthcode?t=${data}`);
                        }else if(data.data.status==1){
                            that.$confirm('修改密码成功！是否跳转到登录页?', '提示', {
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
                });
            }
        },
        show(val){
            if(val==2){
                if(this.style1=='zheng'){
                    this.style1='bi';
                    this.types1='password';
                }else{
                    this.style1='zheng';
                    this.types1='text';
                }
            }else{
                if(this.style=='zheng'){
                    this.style='bi';
                    this.types='password';
                }else{
                    this.style='zheng';
                    this.types='text';
                }
            }
        },
        confirmss(value){
            this.phoneClick=value;
        },
        yanzheng(value,sign){
            if(sign==3){
                this.phoneYan=value;
            }else if(sign==2){
                this.photoValue=value;
            }else{this.phoneValue=value}
        }
    },
    components:{
        validate
    },
}
</script>

<style lang="less">
    span{display: inline-block;}
    .Forget a{color:#3f9cd9;}
    input{
        height: 34px;
        border:1px solid #cbcbcb;
        padding: 0 20px;
        border-radius: 5px;
    }
    .wrongTip{color:red;line-height: 28px;font-size: 14px;}
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
        img{
            width:30%;
            vertical-align: bottom;
            float: right;
            cursor: pointer;
            height: 36px;
        }
    }
    .yanma{
        width:48.484%;
    }
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
    @media screen and (max-width: 768px){
        .Forget .log{ margin-top:145px;}
        .pass{margin:32px 0 0;input{width: 58%;}}
        .deng{margin-top: 77px;padding-top: 0;}
        .left{margin-top:71px;}
        .log{
            margin-top:213px;
            color: #fff;
            background-color: #2693d4;
        }
    }
    .colori{&::before{color: red;margin-right: 5px}}
    .righti{&::before{color: rgb(36, 228, 78);margin-right: 5px}}
    .phoyan{
        margin-top: 19px;
        button{
            height: 36px;
            color: #3f9cd9;
            background-color: #fff;
            width: 32.5%;
            float: right;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
        }
    }
    #valid{
        border:1px solid #3f9cd9;
    }
    #invalid{
        color: #ccc;
        border:1px solid #ccc;
        background-color: #fff;
    }
    .Forget{
        background-color: #f5f5f5;
        overflow: hidden;
        .again{margin:24px 0 0}
        .log{margin: 26px 0 34px;}
        .zhu{
            max-width: 1200px;
            margin:42px auto 115px;
            background-color: #fff;
            padding-top: 42px;
            .yan{
                margin:19px 0 0;
            }
            .left{margin-bottom: 22px;}
        }
    }
    @media screen and (max-width: 1200px){ 
        .phoyan button{font-size: 12px;}    
    } 
    @media screen and (min-width: 768px) and (max-width: 992px){
        .pass input{width: 52%;}
        .yanma{width:41%;} 
        .phoyan button{width: 33%;}      
    } 
    @media screen and (max-width: 768px){
        .phoyan button{
            font-size: 14px;
            width: 30%;
            color: #fff;
            background-color: #2693d4;
        }
    }
</style>
