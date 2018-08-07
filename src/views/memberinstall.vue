<template>
    <div class="Memberinstall">
        <div class="installNei">
            <el-tabs v-model="activeName2" @tab-click="handleClick" id="tit" class="hidden-xs-only">
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
                            <city @confirm="confirm"></city>
                            <button class="baocun zhang_bao" @click="updateUser">保存</button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="second">
                    <div class="zhang xiu oldpassword">
                        <p class="z_spe">旧密码：</p>
                        <input type="text" v-model="oldpassValue" @keyup="oldpassKey">
                        <p class="wrongTip">{{oldpassTip}}</p>
                    </div>
                    <div class="zhang newpassword xiu">
                        <p class="z_spe">新密码：</p>
                        <el-popover placement="bottom" width="300" trigger="click">
                            <div><i class="el-icon-circle-close-outline colori"></i>6-20个字符<br/><i class="el-icon-circle-close-outline colori"></i>只能包含字母、数字以及下划线<br/><i class="el-icon-circle-close-outline colori"></i>字母、数字和下划线至少包含2种</div>                 
                            <input type="text" v-model="passValue" slot="reference" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                        </el-popover> 
                        <p class="wrongTip">{{newpassTip}}</p>
                    </div>
                    <div class="zhang xiu againxiu">
                        <p class="z_spe">再次输入新密码：</p>
                        <div>
                            <input type="text" v-model="agapassValue" @keyup="agapassKey">
                            <button class="baocun xiu_bao" @click="updatePass">保存</button>
                        </div> 
                        <p class="wrongTip">{{agapassTip}}</p>                               
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div id="tits" class="hidden-sm-and-up"> 
                <p class="phone"><router-link to="/memberindex" class="jian">&lt;</router-link>账户设置</p>
                <p class="shezhiuser">账户设置</p>                                               
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
                        <city @confirm="confirm"></city>
                        <button class="baocun zhang_bao" @click="updateUser">保存</button>
                    </div>
                </div>
                <div class="bghui"></div>
                <p class="gaipass">修改密码</p>
                <div class="zhang xiu oldpassword">
                    <p class="z_spe">旧密码：</p>
                    <input type="text" v-model="oldpassValue" @keyup="oldpassKey">
                </div>
                <p class="wrongTip">{{oldpassTip}}</p>
                <div class="zhang newpassword xiu">
                    <p class="z_spe">新密码：</p>
                    <el-popover placement="bottom" width="300" trigger="click">
                            <div><i class="el-icon-circle-close-outline colori"></i>6-20个字符<br/><i class="el-icon-circle-close-outline colori"></i>只能包含字母、数字以及下划线<br/><i class="el-icon-circle-close-outline colori"></i>字母、数字和下划线至少包含2种</div>                 
                            <input type="text" v-model="passValue" slot="reference" @keyup="passKey" @keydown="passSign" @blur="passBlur">
                    </el-popover> 
                </div>
                <p class="wrongTip">{{newpassTip}}</p>
                <div class="zhang xiu againxiu">
                    <p class="z_spe">再次输入新密码：</p> 
                    <div>
                        <input type="text" v-model="agapassValue" @keyup="agapassKey">
                        <button class="baocun xiu_bao" @click="updatePass">保存</button>
                    </div>                                      
                </div>
                <p class="wrongTip">{{agapassTip}}</p>
                <div class="bghui"></div>
            </div>
        </div>
    </div>
</template>

<script>
import city from '../components/City'
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
        }
    },
    created(){
        this.$parent.orderRight='choose order';
        this.$parent.assessRight='choose assess hidden-xs-only';
        this.$parent.installRight='choose install liespe';
        var that=this;
        this.datavalue=this.ajax.post('/xinda-api/member/info',this.qs.stringify(
            {}
        )).then(
            function(data){
                // console.log(data);
                that.emailValue=data.data.data.email;
                that.userName=data.data.data.name;
                that.radio=data.data.data.gender+'';
                that.cityCode=data.data.data.regionId;                
        }).catch(function(){console.log('失败');})
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
                        console.log(data);
                }).catch(function(){console.log('失败');})
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
                            console.log(data);
                            if(data.data.status==-1){
                                that.oldpassTip=data.data.msg;
                            }
                            if(data.data.status==1){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            }
                    }).catch(function(){console.log('失败');})
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
        },
        passBlur(){
            if(this.passValue==''){
                this.newpassTip='';
            }else if(this.passValue.length<6||this.passValue.length>20){
                this.newpassTip='密码设置不符合要求';
            }else if(/\W/.test(this.passValue)){
                this.newpassTip='密码设置不符合要求';
            }else if(/^[A-Za-z]{6,20}$/.test(this.passValue)||/^\d{6,20}$/.test(this.passValue)||/^\_{6,20}$/.test(this.passValue)){
                this.newpassTip='密码设置不符合要求';
            }
        },
        confirm(value){
            this.cityCode=value;
        },
    },
    components:{
        city
    },
}
</script>

<style lang="less">
    .colori{&::before{color: red;margin-right: 5px}}
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
            .newpassword{margin-top:29px;margin-bottom:29px;}
            .oldpassword{margin-top:39px;}
            .againxiu{
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
    @media screen and (max-width: 768px){
        .Memberinstall{width: 100%;display: block;}
        .installNei{margin-left: 0;}
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
        .phone{
            text-align: center;
            font-size: 18px;
            line-height: 72px; 
            background-color: #e5e5e5;
            position: absolute;top:0;width:100%;
            .jian{
                float: left;
                left: 14px;
                font-size: 32px;
                position: absolute;
            }    
        }
    }
</style>