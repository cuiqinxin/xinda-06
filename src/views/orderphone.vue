<template>
    <div class="Memberorder">
        <div class="orderNei hidden-sm-and-up">
            <p class="phone hidden-sm-and-up"><router-link to="/memberindex" class="jian">&lt;</router-link>我的订单</p>
            <div :class="noneorder">还没有订单！</div>
            <div class="allorder">
                <el-row class="orderBody" v-for="(item,index1) in orderArr" :key="index1">
                    <el-col :span="24" class="orderhao">
                        <p class="ohaoma">订单号：{{item.businessNo}}</p>
                        <p class="hidden-sm-and-up">等待买家付款</p>
                    </el-col>
                    <el-col :span="24" class="wholeOrder">
                        <el-col :span="21" :xs="24">
                            <el-col :span="24" v-for="(item,index) in orderArr1[index1]" :key="index" class="onceOrder">
                                <el-col :span="16" :xs="24" class="orderspe">
                                    <div class="havepho">
                                        <span class="imgss"></span>
                                        <p>
                                            <span class="phocom">{{item['serviceName']}}</span>
                                            <span class="hidden-sm-and-up">下单时间：{{item['createTime']}}</span>
                                            <span class="hidden-sm-and-up yuanchen"><span class="moneyred">￥{{item['unitPrice']}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;×{{item['buyNum']}}</span>
                                        </p>
                                    </div>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="3" :xs="24" class="orderoper">
                            <p class="heji hidden-sm-and-up">合计：<span class="moneyred">￥{{item.totalPrice}}</span></p>
                            <div class="fushan">
                                <router-link :to="{path:'/pay',query:{businessNo:item.businessNo,total:item.totalPrice}}" class="paymoney">付款</router-link>
                                <a href="javascript:void(0)" @click="deleOrder(item.id,index1)">删除订单</a>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="hidden-sm-and-up gekai"></el-col>
                </el-row>
                <scrollTop></scrollTop>
            </div>
        </div>
    </div>
</template>

<script>
import scrollTop from '../components/ScrollTop'
export default {
    name: 'orderphone',
    data () {
        return {
            orderArr:[],                  //订单号
            orderArr1:[],                 //详细订单
            pagei:1,                      //页数
            noneorder:'yincangorder',     //订单为空
            showloading: true,
            delesign:0,

        }
    },
    methods:{
        //删除订单
        deleOrder(value,dis){
            var that=this;
            that.$confirm('此操作将删除该订单，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                that.ajax.post('/xinda-api/business-order/del',that.qs.stringify(
                    {'id':value}
                )).then(
                    function(data){
                        if(data.data.status==1){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                        that.orderArr.splice(dis,1);
                        that.orderArr1.splice(dis,1);
                        that.delesign++;
                        if(dis==that.orderArr.length){
                            var chuanru=(that.pagei-1)*4+3;
                            // var chuanru=(that.pagei-1)*3+2;
                            that.orderChange(chuanru,1);
                        }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //将时间戳转为日期格式
        changeDate(arr){
            for(var i in arr){
                var newDate = new Date();
                newDate.setTime(arr[i].createTime);
                var nianfen=newDate.toLocaleDateString().replace(/\//g,'-');
                var shijian=newDate.toTimeString().substr(0,8);
                var sss=nianfen+' '+shijian;
                arr[i].createTime=sss;
            }
        },
        //向后台请求订单
        orderChange(page,limited){
            var that=this;
            this.showloading = true;
            this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                {'start':page,'limit':limited}
            )).then(
                function(data){
                    if(data.data.status=='-999'){
                        that.noneorder='showorder noneorder';
                        that.$alert('请先登录', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning',
                            callback: action => {
                                that.$router.push({path:'/outter/login',query:{pan:123}});
                            }
                        });
                        return;
                    }
                    if(data.data.data.length==0&&that.pagei==1){that.noneorder='showorder noneorder';return;}
                    if(data.data.data.length==0){return;}
                    that.noneorder='yincangorder';
                    that.changeDate(data.data.data);
                    for(var i in data.data.data){
                        that.orderArr.push(data.data.data[i]);
                        that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                            {'businessNo':data.data.data[i].businessNo}
                        )).then(
                            function(data){
                                that.changeDate(data.data.data);
                                that.orderArr1.push(data.data.data);
                        })
<<<<<<< HEAD
                    }  
                    that.showloading = false;               
=======
                    }
                    that.showloading = false;
                    // console.log(that.orderArr,that.orderArr1);
>>>>>>> 695a371fd063dd0e03f703145c4c55849f7a3674
            })
        }
    },
    mounted(){
        var chuanru=(this.pagei-1)*4;
        this.orderChange(chuanru,4);
        window.addEventListener('scroll',()=>{
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //判断是否滚动到底部
            if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
                if (!this.showloading) { //防止多次加载
                    this.pagei+=1;
                    var chuanru=(this.pagei-1)*4-this.delesign;
                    this.orderChange(chuanru,4);
<<<<<<< HEAD
=======
                    // console.log(this.showloading);
>>>>>>> 695a371fd063dd0e03f703145c4c55849f7a3674
                }
            }
        })
    },
    components: {
        scrollTop
    },
}
</script>

<style scoped lang="less">
    .noneorder{
        background-color: #f7f7f7;
        color: #999;
        font-size: 38px;
        text-align: center;
        line-height: 270px;
    }
    .yincangorder{
        display: none;
    }
    .showorder{
        display: block;
    }
    .Memberorder{
        display: block;
        width: 100%;
    }
    .orderBody{
        text-align: center;
        margin-bottom: 10px;
        p{font-size: 12px;}
        .orderoper{
            display: flex;
            justify-content: space-between;
            padding: 0 24px;
            height: 40px;
            .fushan{display: flex;flex-direction: row-reverse;margin:0 0;}
            .paymoney{
                width: 56px;
                font-size: 14px;
                line-height: 23px;
                margin:8px 0 7px;
                background-color: #2693d4;
                color: #fff;
            }
            a{
                color: #ff4747;
                font-size: 14px;
                outline: none;
                line-height: 40px;
                margin:0 20px 0 0;
            }
            .heji{
                line-height: 40px;
                font-size: 14px;
            }
        }
        .orderhao{
            display: flex;
            background-color: #fff;
            p{line-height: 37px;}
            justify-content: space-between;
            padding: 0 17px;
            .ohaoma{margin:0 0;}
        }
        .moneyred{color:#ff4747;}
        .gekai{
            background-color: #f8f8f8;
            height: 20px;
        }
    }
    .orderspe{
        display: flex;
        justify-content: space-between;
        background-color: #f8f8f8;
        .havepho{
            width: 100%;
            display: flex;
            .imgss{
                width: 52px;
                height: 56px;
                background: url(../../static/assesss.jpg) no-repeat;
                margin:22px 17px;
            }
            .phocom,.yuanchen{font-size: 14px;}
            .yuanchen{margin-top: 8px;}
            p{margin-top: 18px;text-align: left;display: flex;flex-direction: column;width: 65%;}
        }
    }
    .onceOrder{border-bottom:5px solid #fff;}
    .wholeOrder{display: flex;flex-direction: column;}
    .orderNei{margin-left: 0;overflow: hidden;}
    .allorder,.noneorder{margin-top: 72px;}
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
</style>
