<template>
    <div class="Zhuce">
        <div class="zhu">
            <el-row>
                <el-col :md="12" :xs="24" :sm="24" class="left">
                    <el-col :md={span:11,offset:6} :xs={span:18,offset:3} :sm={span:18,offset:3} class="shu">
                        <validate @inputaa="yanzheng" ref="msg" @confirmss="confirmss"></validate>
                        <city @confirm="confirm" display="12345"></city>
                        <p class="wrongTip">{{cityTip}}</p>
                        <el-popover placement="right" width="300" trigger="focus" class="hidden-sm-and-down">
                            <div><i :class="lengthLimit"></i>6-20个字符<br/><i :class="typeLimit"></i>只能包含字母、数字以及下划线<br/><i :class="twiceType"></i>字母、数字和下划线至少包含2种</div>                 
                            <div class="pass" slot="reference">
                                <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                                <span :class="style" @click="show"></span>
                            </div>
                        </el-popover> 
                        <el-popover placement="bottom" width="300" trigger="focus" class="hidden-md-and-up">
                            <div><i :class="lengthLimit"></i>6-20个字符<br/><i :class="typeLimit"></i>只能包含字母、数字以及下划线<br/><i :class="twiceType"></i>字母、数字和下划线至少包含2种</div>                 
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
                <el-col :span="12" class="hidden-sm-and-down">
                    <el-col :span="9" :offset="6" class="shu">
                        <p class="size">已有账号？</p>
                        <router-link to="/outter/login" class="size">立即登录&gt;&gt;</router-link>
                        <img src="../../static/getRight.d3bbcd8.png" alt="">
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <el-row class="now hidden-md-and-up">
            <el-col :span="20" :offset="2" id="spe"><p>已有账号？</p><router-link to="/outter/login" class="liji">立即登录</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
import city from '../components/City'
import validate from '../components/Validate'
export default {
    name: 'Zhuce',
    created(){
        this.$parent.info = '欢迎注册';
        this.$parent.infoWeb = '注册';
        document.onkeyup=(e)=>{
            var key=window.event.keyCode;
            if(key==13){
                this.regisyan();
            }
        }
    },
    data () {
        return {
            style:'bi',
            types:'password',
            passValue:'',
            photoValue:'',
            phoneValue:'',
            phoneYan:'',
            passTip:'',
            cityTip:'',
            passSigns:'',
            phoneClick:0,
            cityCode:'',
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
        regisyan(){
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
                            that.$refs.msg.gettel(data.data.msg);
                            var data=(new Date()).getTime();
                            that.$refs.msg.getimg(`/xinda-api/ajaxAuthcode?t=${data}`);
                        }else if(data.data.status==-2){
                            that.$refs.msg.getphone(data.data.msg);                            
                            var data=(new Date()).getTime();
                            that.$refs.msg.getimg(`/xinda-api/ajaxAuthcode?t=${data}`);
                        }else if(data.data.status==1){
                            var md5=require('md5');
                            that.ajax.post('/xinda-api/register/register',that.qs.stringify(
                                {'cellphone':that.phoneValue,'smsType':1,'validCode':that.phoneYan,'password':md5(that.passValue),'regionId':that.cityCode}
                            )).then(
                                function(data){
                                    if(data.data.status==-2){
                                        that.$refs.msg.getphone(data.data.msg);                                        
                                        var data=(new Date()).getTime();
                                        that.$refs.msg.getimg(`/xinda-api/ajaxAuthcode?t=${data}`);
                                    }else if(data.data.status==1){
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
                            });
                        }
                });
            }
        },
        confirm(value){
            this.cityCode=value;
            if(this.cityCode==''){
                this.cityTip='地域信息不能为空';
            }else{
                this.cityTip='';
            }
        },
        confirmss(value){
            this.phoneClick=value;
        },
        show(){
            if(this.style=='zheng'){
                this.style='bi';
                this.types='password';
            }else{
                this.style='zheng';
                this.types='text';
            }
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
        city,
        validate
    },
}
</script>

<style lang="less">
    span{display: inline-block;}
    .Zhuce a{color:#3f9cd9;}
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
        position: fixed;
        bottom: 90px;
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
    @media screen and (max-width: 768px){
        .pass{margin:19px 0 0;}
        .deng{margin-top: 77px;padding-top: 0;}
        .left{margin-top:31px;}
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
            background-color: #fff;
            color: #3f9cd9;
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
    .zunshou{
        text-align: center;
        font-size: 14px;
        line-height: 34px;
    }
    .Zhuce{
        background-color: #f5f5f5;
        overflow: hidden;
        .zhu{
            max-width: 1200px;
            margin:42px auto 180px;
            background-color: #fff;
            padding-top: 42px;
            .left .shu select{
                width: 32%;
                height: 36px;
                border-radius: 5px;
                margin:21px 0 0;
            }
            .yan{margin:19px 0 0;}
            .left{margin-bottom: 22px;}
            .log{margin-top:24px;}
        }
    }
    @media screen and (max-width: 1200px){ 
        .Zhuce .zhu .left .shu select{width: 31%;} 
        .phoyan button{font-size: 12px;}    
    }  
    @media screen and (max-width: 992px){
        .Zhuce{
            .zhu{
                margin-top: 0;
                padding-top: 0;
                margin-bottom: 0;
                .yan{margin:19px 0 0;}
                .left .shu select{margin:19px 0 0 0;}
                .left{margin-bottom: 22%;margin-top: 12%;}
                .log{margin-top:30%;color:#fff;background-color: #2693d4;}
                .pass input{width: 58%;}
            }
        }
        .phoyan button{
            color: #fff;
            background-color: #2693d4;
            font-size: 14px;
            width: 30%;
        }
    }
</style>
