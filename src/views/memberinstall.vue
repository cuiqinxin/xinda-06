<template>
    <div class="Memberinstall">
        <div class="installNei">
            <el-tabs v-model="activeName2" @tab-click="handleClick" id="tit" class="hidden-sm-and-down">
                <el-tab-pane label="账户设置" name="first">
                    <div class="zhang dangqian">
                        <p class="z_spe">当前头像：</p>
                        <span class="touxiang"></span>
                    </div>
                    <div class="zhang mingzi">
                        <p class="z_spe">姓名：</p>
                        <input type="text" v-model="userName">
                    </div>
                    <div class="zhang genders">
                        <p class="z_spe">性别：</p>
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="2">女</el-radio>
                    </div>
                    <div class="zhang emails">
                        <p class="z_spe">邮箱：</p>
                        <input type="text" placeholder="请输入邮箱" v-model="emailValue">
                    </div>
                    <div class="zhang areas">
                        <p class="z_spe">所在地区：</p>
                        <div>
                            <city @confirm="confirm" ref="msg"></city>
                            <button class="baocun zhang_bao" @click="updateUser">保存</button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="second">
                    <div class="zhang xiu oldpassword">
                        <p class="z_spe">旧密码：</p>
                        <input type="password" v-model="oldpassValue" @keyup="oldpassKey">
                        <p class="wrongTip">{{oldpassTip}}</p>
                    </div>
                    <div class="zhang newpassword xiu">
                        <p class="z_spe">新密码：</p>
                        <el-popover placement="bottom" width="300" trigger="focus">
                            <div><i :class="lengthLimit1"></i>6-20个字符<br/><i :class="typeLimit1"></i>只能包含字母、数字以及下划线<br/><i :class="twiceType1"></i>字母、数字和下划线至少包含2种</div>
                            <input type="password" v-model="passValue" slot="reference" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                        </el-popover>
                        <p class="wrongTip">{{newpassTip}}</p>
                    </div>
                    <div class="zhang xiu againxiu">
                        <p class="z_spe">再次输入新密码：</p>
                        <div>
                            <input type="password" v-model="agapassValue" @keyup="agapassKey">
                            <button class="baocun xiu_bao" @click="updatePass">保存</button>
                        </div>
                        <p class="wrongTip">{{agapassTip}}</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div id="tits" class="hidden-md-and-up">
                <p class="phone"><router-link to="/memberindex" class="jian">&lt;</router-link>账户设置</p>
                <p class="shezhiuser hidden">账户设置</p>
                <div class="zhang dangqian">
                    <p class="z_spe">当前头像：</p>
                    <span class="touxiang"></span>
                </div>
                <div class="zhang mingzi">
                    <p class="z_spe">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</p>
                    <input type="text" v-model="userName">
                </div>
                <div class="zhang genders">
                    <p class="z_spe">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</p>
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="2">女</el-radio>
                </div>
                <div class="zhang emails">
                    <p class="z_spe">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</p>
                    <input type="text" placeholder="请输入邮箱" v-model="emailValue">
                </div>
                <div class="zhang areas">
                    <p class="z_spe">所在地区：</p>
                    <div>
                        <city @confirm="confirm" ref="msgs"></city>
                        <button class="baocun zhang_bao" @click="updateUser">保存</button>
                    </div>
                </div>
                <div class="bghui"></div>
                <p class="gaipass">修改密码</p>
                <div class="zhang xiu oldpassword">
                    <p class="z_spe">旧密码：</p>
                    <input type="password" v-model="oldpassValue" @keyup="oldpassKey">
                </div>
                <p class="wrongTip">{{oldpassTip}}</p>
                <div class="zhang newpassword xiu">
                    <p class="z_spe">新密码：</p>
                    <input type="password" v-model="passValue" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                </div>
                <p class="wrongTip">{{newpassTip}}</p>
                <div class="zhang xiu againxiu">
                    <p class="z_spe">再次输入新密码：</p>
                    <div>
                        <input type="password" v-model="agapassValue" @keyup="agapassKey">
                        <p class="wrongTip wrongspe">{{agapassTip}}</p>
                        <button class="baocun xiu_bao" @click="updatePass">保存</button>
                    </div>
                </div>
                <div class="bghui"></div>
            </div>
        </div>
    </div>
</template>

<script>
import city from '../components/City'
import store from '../store';
export default {
    name: 'Memberinstall',
    data () {
        return {
            activeName2: 'first',
            userName:'',
            emailValue:'',
            radio: '1',
            cityCode:'',
            oldpassValue:'',
            passValue:'',
            agapassValue:'',
            oldpassTip:'',
            newpassTip:'',
            agapassTip:'',
            lengthLimit1:'el-icon-circle-close-outline colori',
            typeLimit1:'el-icon-circle-close-outline colori',
            twiceType1:'el-icon-circle-close-outline colori',
        }
    },
    created(){
        store.commit('loading',true)
        this.$parent.orderRight='choose order';
        this.$parent.assessRight='choose assess hidden-sm-and-down';
        this.$parent.installRight='choose install liespe';
        var that=this;
        this.ajax.post('/xinda-api/member/info',this.qs.stringify(
            {}
        )).then(
            function(data){
                if(data.data.data==null){
                    that.$alert('请先登录', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            that.$router.push({path:'/outter/login',query:{pan:123}});
                        }
                    });
                    store.commit('loading',false)  
                    return;
                }
                that.emailValue=data.data.data.email;
                that.userName=data.data.data.name;
                that.radio=data.data.data.gender+'';
                that.cityCode=data.data.data.regionId; 
                var a=that.cityCode.substr(0,2)+'0000';
                var b=that.cityCode.substr(0,4)+'00';            
                that.$refs.msg.getcity(a,b,that.cityCode); 
                that.$refs.msgs.getcity(a,b,that.cityCode);   
                store.commit('loading',false)            
        })
    },
    methods:{
        handleClick(tab, event) {
        },
        updateUser(){
            var that=this;
            that.$confirm('是否修改当前用户信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.ajax.post('/xinda-api/member/update-info',that.qs.stringify(
                    {headImg:'/2016/10/28/152843b6d9a04abe83a396d2ba03675f',name:that.userName,gender:that.radio,email:that.emailValue,regionId:that.cityCode}
                )).then(
                    function(data){
                })
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            });
        },
        updatePass(){
            var that=this;
            var md5=require('md5');
            var lastzhu=0;
            that.$confirm('是否修改当前密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                    that.ajax.post('/xinda-api/sso/change-pwd',that.qs.stringify(
                    {oldPwd:md5(that.oldpassValue),newPwd:md5(that.newpassValue)}
                    )).then(
                        function(data){
                            if(data.data.status==-1){
                                that.oldpassTip=data.data.msg;
                            }
                            if(data.data.status==1){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            }
                    })
            }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
            });
            if(this.oldpassValue==''){
                this.oldpassTip='请输入登录密码';
            }else{
                this.oldpassTip='';lastzhu++;
            }
            if(this.passValue==''){
                this.newpassTip='请设置新密码';
            }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.newpassTip='密码设置不符合要求';
            }else if(this.passValue==this.oldpassValue){
                this.newpassTip='新密码不能与旧密码相同';
            }else{
                this.newpassTip='';lastzhu++;
            }
            if(this.agapassValue==''){
                this.agapassTip='请再次填写新密码';
            }else if(this.agapassValue!=this.passValue){
                this.agapassTip='两次密码不一致';
            }else{
                this.agapassTip='';lastzhu++;
            }
            if(lastzhu==3){


            }
        },
        agapassKey(){
            this.agapassTip='';
        },
        oldpassKey(){
            this.oldpassTip='';
        },
        passSign(){
            if(this.passValue==''){
                this.passSigns='1';
            }else{this.passSigns='2';}
        },
        passKey(){
            if(this.passSigns=='2'&&this.passValue==''){
                this.newpassTip='请输入密码';
            }else if(this.passSigns=='2'&&this.passValue!=''){
                this.newpassTip='';
            }
            if(this.passValue.length>5&&this.passValue.length<21){
                this.lengthLimit1='el-icon-circle-check-outline righti';
            }else{
                this.lengthLimit1='el-icon-circle-close-outline colori';
            }
            if(!/\W/.test(this.passValue)){
                this.typeLimit1='el-icon-circle-check-outline righti';
            }else{
                this.typeLimit1='el-icon-circle-close-outline colori';
            }
            if((/[A-Za-z]/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/[A-Za-z]/.test(this.passValue)&&/\_/.test(this.passValue)&&(!/\W/.test(this.passValue)))||(/\_/.test(this.passValue)&&/\d/.test(this.passValue)&&(!/\W/.test(this.passValue)))){
                this.twiceType1='el-icon-circle-check-outline righti';
            }else{
                this.twiceType1='el-icon-circle-close-outline colori';
            }
        },
        passBlur(){
            if(this.passValue==''){
                this.newpassTip='';
            }else if(this.passValue.length<6||this.passValue.length>20||/\W/.test(this.passValue)||/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.newpassTip='密码设置不符合要求';
            }
        },
        confirm(value){
            this.cityCode=value;
            var aa=this.cityCode.substr(0,2)+'0000';
            var bb=this.cityCode.substr(0,4)+'00';            
            this.$refs.msg.getcity(aa,bb,this.cityCode); 
            this.$refs.msgs.getcity(aa,bb,this.cityCode);
        },
    },
    components:{
        city
    },
}
</script>

<style lang="less">
    .colori{&::before{color: red;margin-right: 5px}}
    .righti{&::before{color: rgb(36, 228, 78);margin-right: 5px}}
    .intro{
        font-size: 14px;
        margin:23px 0 10px;
    }
    .Memberinstall{
        display: inline-block;
        vertical-align: top;
        width: 75%;
        .wrongTip{color:red;line-height: 28px;font-size: 14px;margin-left: 15px;}
    }
    .installNei{
        input{border:1px solid #b0b0b0;border-radius: 0;height:23px;padding: 0 20px;}
        margin:3px 0 0 22px;
        #tit,#tits{
            .zhang{display: flex;}
            .xiu .z_spe{width: 135px;margin-left: 8px;}
            .newpassword{
                margin-top:29px;
                .lalala{
                    width: 44%;
                    input{width: 100%;}
                }
            }
            .oldpassword{margin-top:39px;}
            .againxiu{
                margin-top:29px;
                div{
                    display: flex;
                    flex-direction: column;
                }
                .baocun{margin-top: 30px;}
            }
            .z_spe{width: 92px;margin-left: 2px;font-size: 14px;line-height:25px;}
            .dangqian p{line-height: 134px;}
            .mingzi{margin-top:27px;margin-bottom:22px;}
            .genders{
                .el-radio__label{line-height: 19px;}
                p{line-height: 19px;}
            }
            .emails{margin-top:23px;margin-bottom:20px;}
            .baocun{
                width: 68px;
                background-color: #fff;
                line-height: 24px;
                cursor: pointer;
                color: #2793d4;
                border:1px solid #2793d4;
                margin-top: 45px;
                border-radius: 5px;
            }
            .areas{
                select{
                    height:23px;
                    width: 75px;
                    margin:0 11px 0 0;
                }
            }
            .el-tabs__item{
                height: 28px;
                line-height: 28px;
                padding: 0 28px;
                margin-right: 14px;
            }
            .el-tabs__nav-scroll{padding-left: 9px;}
            #tab-second{padding-left: 34px;}
            .el-tabs__header{margin-bottom: 18px;}
            .el-tabs__active-bar{
                width: 112px !important;
            }
        }
    }
    @media screen and (max-width: 992px){
        .Memberinstall{
            width: 100%;
            display: block;
            .wrongTip{margin-left: 151px;}
            .wrongspe{margin-left: 0;}
        }
        .installNei{
            margin-left: 0;
            #tits .againxiu div{
                width: 44%;
                input{width: 100%;}
            }
        }
        .installNei #tits .xiu .z_spe{margin-left:0px;}
        #tits{
            overflow: hidden;
            .baocun{margin:43px 0 26px;}
            .xiu input,.mingzi input,.emails input{width:44%;}
        }
        .zhang{margin-left: 16px;}
        .bghui{height: 6px;background-color: #dfdfdf;}
        .shezhiuser,.gaipass{
            font-size: 16px;
            border-bottom: 2px solid #2793d4;
            padding-left: 18px;
            line-height: 32px;
            margin-top: 15px;
        }
        .shezhiuser{margin-top: 72px;}
        .phone{
            text-align: center;
            font-size: 18px;
            line-height: 72px;
            background-color: #e5e5e5;
            position: absolute;top:-3px;width:100%;
            .jian{
                float: left;
                left: 14px;
                font-size: 32px;
                position: absolute;
            }
        }
    }
</style>
