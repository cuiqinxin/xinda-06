<template>
    <div class="password">
        <el-popover placement="right" width="300" trigger="click">
            <div><i :class="lengthLimit"></i>6-20个字符<br/><i :class="typeLimit"></i>只能包含字母、数字以及下划线<br/><i :class="twiceType"></i>字母、数字和下划线至少包含2种</div>                 
            <div class="pass" slot="reference">
                <input :type="types" placeholder="请输入密码" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur" @input="oninput">
                <span :class="style" @click="show"></span>
            </div>
        </el-popover> 
        <p class="wrongTip">{{passTip}}</p>        
    </div>
</template>

<script>
export default {
    name: 'Password',
    data () {
        return {
            style:'bi',
            types:'password',
            passValue:'',
            passTip:'',
            passSigns:'',
            lengthLimit:'el-icon-circle-close-outline colori',
            typeLimit:'el-icon-circle-close-outline colori',
            twiceType:'el-icon-circle-close-outline colori',
        }
    },
    methods:{
        oninput(e){
            var value=event.target.value;
            this.$emit('input',value);            
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
    // created(){
    //     this.$emit('passti',this.passTip);
    // }
}
</script>

<style lang="less">
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
    .colori{&::before{color: red;margin-right: 5px}}
    .righti{&::before{color: rgb(36, 228, 78);margin-right: 5px}} 
    @media screen and (max-width: 768px){
        .pass{margin:32px 0 0;}
    }
</style>
