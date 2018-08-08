<template>
    <div class="Quit">
        <p class="phone hidden-sm-and-up"></p>         
        <el-row>
            <el-col :sm="5" :xs={span:20,offset:2}>
                <div class="user">
                    <span class="touxiang"></span>
                    <div><div class="king">
                        <router-link to="/outter/zhuce" class="phozhu">注册</router-link>
                        <router-link to="/outter/login" class="phodeng">登录</router-link>
                    </div></div>
                </div>
                <div class="choose order" @click="unlogin">
                    <div>
                        <span></span>
                        <p class="cholink">我的订单</p>
                        <!-- <router-link to="/member/memberorder" class="cholink">我的订单</router-link> -->
                    </div>
                    <p class="hidden-sm-and-up">></p>
                </div>
                <div class="choose install" @click="unlogin">
                    <div>
                        <span></span>
                        <p class="cholink">账户设置</p>
                        <!-- <router-link to="/member/memberorder" class="cholink">账户设置</router-link> -->
                    </div>
                    <p class="hidden-sm-and-up">></p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Quit',
    methods:{
        unlogin(){
            var that=this;
            this.$confirm('请先登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$router.push({path:'/outter/login'});
            }).catch(() => {}); 
        }
    }
}
</script>

<style lang="less" scoped>
    span{display: inline-block;}
    // .el-popup-parent--hidden .el-message-box{width: 300px !important;}
    .phone{
            height: 72px; 
            width: 100%;
            position: absolute;
            top:0; 
            background-color: #fff; 
        }
    @media screen and (max-width: 768px){
        .touxiang{
            width: 125px;
            height:125px;
            background: url(../../static/pep.png) no-repeat;
            margin-top: 9px;
        }
        .order span{
            width: 22px;
            height:22px;
            background: url(../../static/u5092.png) no-repeat;
            margin:14px 12px 14px 0;
        }
        .install span{
            width: 26px;
            height:24px;
            background: url(../../static/u5102.png) no-repeat;
            margin:12px 9px 14px 0;
        }
        .Quit{
            max-width: 1200px;
            margin:0 auto;
        }
        .user{
            text-align: center;
            background-color: #fff;
            margin:80px 0 80px;
            p{
                font-size: 20px;
                line-height: 34px;
            }
            div{display: flex;}
            .king{margin:25px auto 0;}
            .phozhu,.phodeng{
                width: 82px;
                line-height: 35px;
                text-align: center;
                background-color: #2693d4;
                color:#fff;
                border-radius: 5px;
            }
            .phozhu{margin-right: 25px;}
        }
        .install{margin:35px 0 100px;}
        .choose{
            display: flex;
            justify-content: space-between;
            background-color: #f7f7f7;
            cursor: pointer;
            div{width:50%;display: flex;margin:0 0;}
            span{margin:14px 14.8% 14px 17px;}
            p{
                line-height: 50px;
                font-size: 26px;
                margin-right: 26px;
            }
            .cholink{
                font-size: 18px;
                line-height: 50px;
                white-space: nowrap;
                margin-right: 0;
            }
        }
    }
</style>