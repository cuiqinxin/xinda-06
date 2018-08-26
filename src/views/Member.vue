<template>
    <div class="Member">
        <p class="intro hidden-sm-and-down">首页 / 个人主页</p>
            <div class="dings hidden-sm-and-down">   
                <div class="user">
                    <span class="touxiang"></span>
                    <p>{{userPhoneNumber}}</p>
                </div>
                <div :class="orderRight">
                    <div>
                        <span></span>
                        <router-link to="/member/memberorder" class="cholink">我的订单</router-link>
                    </div>
                </div>
                <div :class="assessRight">
                    <div>
                        <span></span>
                        <router-link to="/member/memberassess" class="cholink">用户评价</router-link>
                    </div>
                </div>
                <div :class="installRight">
                    <div>
                        <span></span>
                        <router-link to="/member/memberinstall" class="cholink">账户设置</router-link>
                    </div>
                </div>
                <div class="cheng"></div>
                <router-link to="/quit" class="photui hidden-md-and-up">退出登录</router-link>
            </div>
        <router-view/>
    </div>
</template>

<script>
import store from '../store'
export default {
    name: 'Member',
    data () {
        return {
            orderRight:'choose order liespe',
            assessRight:'choose assess hidden-sm-and-down',
            installRight:'choose install'
        }
    },
    created(){
        if(store.state.userPhoneNumber==''){
            var that=this;
            this.ajax.post('/xinda-api/member/info',this.qs.stringify(
                {}
            )).then(
                function(data){
                    if(data.data.data==null){
                        return;
                    }
                    store.commit('loginStatus',data.data.data.loginId)              
            })
        }
    },
    computed:{
        userPhoneNumber(){
            return store.state.userPhoneNumber;
        }
    }
}
</script>

<style lang="less">
    span{display: inline-block;}
    .cheng{
        background-color: #f7f7f7;
        height: 171px;
        margin-bottom: 30px;
    }
    .Member{
        max-width: 1200px;
        margin:0 auto;
        font-size: 0;
    }
    .dings{display: inline-block;width: 25%;}
        .page{
            display: flex;
            .shows{font-size: 14px;}
            div{margin:0 auto 30px;display: flex;}
            button{
                height: 36px;
                width: 68px;
                background-color: #fff;
            }
            .unclick{
                color: #ccc;
                border:1px solid #ccc;
                cursor: initial;
            }
            .click{
                color: #2693d4;
                border:1px solid #2693d4;
                cursor: pointer;
            }
            p{
                width: 37px;
                line-height: 34px;
                border:1px solid #2693d4;
                color:#2693d4;
                text-align: center;
                margin:0 6px;
            }
        }
        .tit{
            line-height: 28px;
            width: 93.5%;
            font-size: 14px;
            color: #73b3e1;
            position: relative;
            padding-left: 37px;
            margin-top: 3px;
            border-bottom: 2px solid #e9e9e9;
            span{
                position: absolute;
                bottom: -2px;
                left: 8px;
                background-color: #2692d3;
                height: 2px;
                width: 112px;
            }
        }
        .user{
            background-color: #e9e9e9;
            margin-bottom: 9px;
            text-align: center;
            p{
                font-size: 20px;
                line-height: 34px;
            }
        }
        .touxiang{
            width: 125px;
            height:125px;
            background: url(../../static/pep.png) no-repeat;
            margin-top: 9px;
        }
        .choose{
            background-color: #f7f7f7;
            display: flex;
            div{display: flex;margin:0 auto;}
            .cholink{
                font-size: 18px;
                line-height: 50px;
                white-space: nowrap;
                color: #333;
            }
        }
        .liespe{background-color: #e9e9e9;}
        .order span{
            width: 20px;
            height:21px;
            background: url(../../static/u5092.png) no-repeat;
            margin:15px 12px 14px 0;
        }
        .assess span{
            width: 21px;
            height:22px;
            background: url(../../static/u5098.png) no-repeat;
            margin:14px 11px 14px 0;
        }
        .install span{
            width: 20px;
            height:21px;
            background: url(../../static/u5102.png) no-repeat;
            margin:15px 12px 14px 0;
        }
    @media screen and (max-width: 992px){
            .user{background-color: #fff;margin:140px 0 80px;}
            .liespe{background-color: #f7f7f7;}
            .install{margin:35px 0 100px;}
            .photui{
                display: block;
                text-align: center;
                line-height: 55px;
                background-color: #2693d4;
                color:#fff;
                font-size: 18px;
            }
            .choose{
                display: flex;
                justify-content: space-between;
                div{width:50%}
                span{margin:15px 14.8% 14px 17px;}
                p{
                    line-height: 50px;
                    font-size: 26px;
                    margin-right: 26px;
                }
            }
    }
</style>