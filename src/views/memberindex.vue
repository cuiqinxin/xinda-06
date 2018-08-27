<template>
    <div class="memberindex">
        <p class="phone hidden-md-and-up"></p> 
        <el-row class="hidden-md-and-up">
            <el-col :md="5" :xs={span:20,offset:2} :sm={span:20,offset:2}>
                <div class="user">
                    <span class="touxiang"></span>
                    <p>{{userPhoneNumber}}</p>
                </div>
                <div class="choose order">
                    <div>
                        <span></span>
                        <router-link to="/member/orderphone" class="cholink">我的订单</router-link>
                    </div>
                    <p class="hidden-md-and-up">></p>
                </div>
                <div class="choose install">
                    <div>
                        <span></span>
                        <router-link to="/member/memberinstall" class="cholink">账户设置</router-link>
                    </div>
                    <p class="hidden-md-and-up">></p>
                </div>
                <a href="javascript:void(0)" class="photui hidden-md-and-up" @click="quitlog">退出登录</a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import store from '../store'
export default {
    name: 'memberindex',
    created(){
        if(store.state.userPhoneNumber==''){
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
                        return;
                    }
                    store.commit('loginStatus',data.data.data.loginId)              
            })
        }
    },
    methods:{
        quitlog(){
            store.commit('loginStatus','')
            this.ajax.post("/xinda-api/sso/logout").then(data=>{
                this.$router.push({path:'/quit'});
            });
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
    @media screen and (max-width: 992px){
        .touxiang{
            width: 125px;
            height:125px;
            background: url(../../static/pep.png) no-repeat;
            margin-top: 9px;
        }
        .order span{
            width: 20px;
            height:21px;
            background: url(../../static/u5092.png) no-repeat;
            margin:15px 12px 14px 0;
        }
        .install span{
            width: 20px;
            height:21px;
            background: url(../../static/u5102.png) no-repeat;
            margin:15px 12px 14px 0;
        }
        .memberindex{
            max-width: 1200px;
            margin:0 auto;
        }
        .user{
            text-align: center;
            background-color: #fff;
            margin:60px 0 40px;
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
        .install{margin:25px 0 60px;}
        .choose{
            display: flex;
            justify-content: space-between;
            background-color: #f7f7f7;
            cursor: pointer;
            div{width:50%;display: flex;margin:0 0;}
            span{margin:15px 14.8% 14px 17px;}
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
        .photui{
            display: block;
            text-align: center;
            line-height: 55px;
            background-color: #2693d4;
            color:#fff;
            font-size: 18px;
        }
        .memberindex .phone{
            height: 72px; 
            width: 100%;
            position: absolute;
            top:0; 
            background-color: #fff; 
        }
    }
</style>