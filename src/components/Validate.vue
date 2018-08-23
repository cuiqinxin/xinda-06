<template>
    <div class="Validate">
        <div class="shoujihaoma">
            <input type="text" placeholder="请输入手机号码" v-model="phoneValue" @blur="phoneBlur" @keyup="phoneKey" @input="oninput(1)">             
        </div>
        <p class="wrongTip">{{phoneTip}}</p> 
        <div class="yan">
            <input type="text" placeholder="请输入图片验证码" class="yanma" v-model="photoValue" @keyup="photoKey" @input="oninput(2)">
            <img :src="imgurl" @click="imgchange">
        </div>
        <p class="wrongTip">{{photoTip}}</p>
        <div class="phoyan">
            <input type="text" placeholder="请输入手机验证码" class="yanma" v-model="phoneYan" @keyup="telKey" @input="oninput(3)">
            <button @click="telget" :id="showyan">{{phoneClick}}</button>
        </div>
        <p class="wrongTip">{{telTip}}</p>        
    </div>
</template>

<script>
export default {
    name: 'Validate',
    data () {
        return {
            imgurl:'/xinda-api/ajaxAuthcode',
            phoneValue:'',
            photoValue:'',
            phoneYan:'',
            phoneTip:'',
            photoTip:'',
            telTip:'',
            // passSigns:'',
            phoneClick:'点击获取',
            showyan:'valid',
        }
    },
    methods:{
        oninput(sign){
            var value=event.target.value;
            this.$emit('inputaa',value,sign);       
        },
        getphone(m){
            this.phoneTip=m;
        },
        getphoto(m){
            this.photoTip=m;
        },
        gettel(m){
            this.telTip=m;
        },
        getimg(m){
            this.imgurl=m;
        },
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
                                that.$emit('confirmss',2);
                                var second=60;
                                that.phoneClick=second+'秒后获取';
                                that.showyan='invalid';
                                that.telTip='';
                                var jishi=setInterval(function(){
                                    second--;
                                    that.phoneClick=second+'秒后获取';
                                    if(second==-1){
                                        clearInterval(jishi);
                                        that.phoneClick='点击获取';
                                        that.showyan='valid';
                                        that.$emit('confirmss',0);
                                    }
                                },1000);
                            }
                    });
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
        imgchange(){
            var data=(new Date()).getTime();
            this.imgurl=`/xinda-api/ajaxAuthcode?t=${data}`;
        },
        // passSign(){
        //     if(this.passValue==''){
        //         this.passSigns='1';
        //     }else{this.passSigns='2';}
        // },
        // passKey(){
        //     if(this.passSigns=='2'&&this.passValue==''){
        //         this.passTip='请输入密码';
        //     }else if(this.passSigns=='2'&&this.passValue!=''){
        //         this.passTip='';
        //     }
        //     if(this.passValue.length>5&&this.passValue.length<21){
        //         this.lengthLimit='el-icon-circle-check-outline righti';
        //     }else{
        //         this.lengthLimit='el-icon-circle-close-outline colori';
        //     }
        //     if(!/\W/.test(this.passValue)){
        //         this.typeLimit='el-icon-circle-check-outline righti';
        //     }else{
        //         this.typeLimit='el-icon-circle-close-outline colori';
        //     }
        //     if((/[A-Za-z]/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/[A-Za-z]/.test(this.passValue)&&/\_/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/\_/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))){
        //         this.twiceType='el-icon-circle-check-outline righti';
        //     }else{
        //         this.twiceType='el-icon-circle-close-outline colori';
        //     }
        // },
        // passBlur(){            
        //     if(this.passValue==''){
        //         this.passTip='';
        //     }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
        //         this.passTip='密码设置不符合要求';
        //     }
        // },
    }
}
</script>
<style scoped>
    .shoujihaoma{display: flex}
    .shoujihaoma input{flex:1}     
</style>

