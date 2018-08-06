<template>
    <div class="Memberorder">
        <div class="orderNei">
            <p class="tit hidden-xs-only">我的订单<span></span></p>
            <div class="orderNumber hidden-xs-only">
                <p>订单号：</p>
                <input type="text" placeholder="请输入订单号搜索">
                <button>搜索</button>
            </div>
            <div id="createTime" class="hidden-xs-only">
                <p>创建时间：</p>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="" class="data">
                </el-date-picker>
                <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="" class="data">
                </el-date-picker>
            </div>
            <el-row class="orderHead hidden-xs-only">
                <el-col :span="13" class="orderspe">
                    <h4 class="ofirst">商品名称</h4>
                    <div class="nopho">
                        <h4 class="orderdan">单价</h4>
                        <h4 class="ordernums">数量</h4>
                    </div> 
                </el-col>
                <el-col :span="4">
                    <h4>总金额</h4>
                </el-col>
                <el-col :span="4">
                    <h4>订单状态</h4>
                </el-col>
                <el-col :span="3">
                    <h4>订单操作</h4>                  
                </el-col>
            </el-row>
            <p class="phone hidden-sm-and-up"><a href="" class="jian">&lt;</a>我的订单</p>
            <div class="allorder">
                <el-row class="orderBody" v-for="(item,index) in orderArr" :key="index">
                    <el-col :span="24" class="orderhao">
                        <p class="ohaoma">订单号：{{item['businessNo']}}</p>
                        <p class="hidden-xs-only">下单时间：{{item['createTime']}}</p>
                        <p class="hidden-sm-and-up">等待买家付款</p>
                    </el-col>
                    <el-col :span="13" :xs="24" class="orderspe">
                        <div class="havepho">
                            <span class="imgss"></span>
                            <p>
                                <span class="hidden-xs-only">{{item['providerName']}}</span>
                                <span class="phocom">{{item['serviceName']}}</span>
                                <!-- <span class="hidden-xs-and-up">{{item['id']}}</span> -->
                                <span class="hidden-sm-and-up">下单时间：{{item['createTime']}}</span>
                                <span class="hidden-sm-and-up yuanchen"><span class="moneyred">￥{{item['unitPrice']}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;×{{item['buyNum']}}</span>
                            </p>
                        </div>
                        <div class="nopho hidden-xs-only">
                            <p class="orderdan">￥{{item['unitPrice']}}.00</p>
                            <p class="ordernums">{{item['buyNum']}}</p>
                        </div>
                    </el-col>
                    <el-col :span="4" class="orderblue hidden-xs-only">
                        <p>￥{{item['totalPrice']}}.00</p>
                    </el-col>
                    <el-col :span="4" class="orderblue hidden-xs-only">
                        <p>等待买家付款</p>
                    </el-col>
                    <el-col :span="3" :xs="24" class="orderoper">
                        <p class="heji hidden-sm-and-up">合计：<span class="moneyred">￥{{item['totalPrice']}}</span></p>
                        <div class="fushan">
                            <router-link to="/member/memberassess" class="paymoney">付款</router-link>  
                            <a href="javascript:void(0)" @click="deleOrder(item['businessNo'])">删除订单</a> 
                        </div>                 
                    </el-col>
                    <el-col :span="24" class="hidden-sm-and-up gekai"></el-col>
                </el-row>
            </div>
            <div class="page myorder">
                <div>
                    <button class="prevp" disabled>上一页</button>
                    <p class="shows">1</p>
                    <button class="nextp" disabled>下一页</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Memberorder',
    data () {
        return {
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            value1: '',
            value2: '',  
            orderArr:''  
        }
    },
    created(){
        var that=this;
        this.datavalue=this.ajax.post('/xinda-api/service-order/grid',this.qs.stringify(
            {'businessNo':1,'startTime':'2018-07-26','endTime':'2018-08-02','start':0}
        )).then(
            function(data){
                that.orderArr=data.data.data;
                for(var i in that.orderArr){   
                    var newDate = new Date();
                    newDate.setTime(that.orderArr[i].createTime);
                    var nianfen=newDate.toLocaleDateString().replace(/\//g,'-');
                    var shijian=newDate.toTimeString().substr(0,8);
                    var sss=nianfen+' '+shijian;
                    that.orderArr[i].createTime=sss;
                }
                for(let i=0;i<that.orderArr.length;i++){
                    let b=[that.orderArr[i]];
                    for(let j=i+1;j<that.orderArr.length;j++){  
                        if((that.orderArr[j].businessNo==that.orderArr[i].businessNo)&&(that.orderArr[j].createTime==that.orderArr[i].createTime)){  
                            b.push(that.orderArr[j]);
                            that.orderArr.splice(j,1);
                            j--;
                        }else{
                            break;
                        }
                    }
                    if(b.length>1){
                        that.orderArr[i]=b;
                    }
                }
                console.log(that.orderArr);
        }).catch(function(){console.log('失败');})
    },
    methods:{
        deleOrder(value){
            var that=this;
            console.log(value);
            this.datavalue=this.ajax.post('/xinda-api/business-order/del',this.qs.stringify(
                {'id':value}
            )).then(
                function(data){
                    console.log(data);
            }).catch(function(){console.log('失败');})
        }
    }
}
</script>

<style lang="less">
    .Memberorder{
        display: inline-block;
        vertical-align: top;
        width: 75%;
    }
    .orderBody{
        text-align: center;
        margin-bottom: 10px;
        p{font-size: 12px;}
        border:1px solid #e8e8e8;
        .orderoper{
            border-left:1px solid #e8e8e8;
            .paymoney{
                width: 56px;
                color:#69abdb;
                border:1px solid #2693d4;
                font-size: 14px;
                line-height: 23px;
                display: block;
                margin:14px auto 6px;
            }
            a{
                color: #ff4747;
                font-size: 14px;
                margin-bottom:12px ;
                display: block;
            }
        }
        .orderblue p{
            color:#69abdb;
            line-height: 76px;
            border-left:1px solid #e8e8e8;
        }
        .orderhao{
            display: flex;
            background-color: #f7f7f7;
            border-bottom:1px solid #e8e8e8;
            p{line-height: 37px;}
            .ohaoma{margin:0 23px;}
        }
        .orderdan,.ordernums{line-height: 76px;}
    }
    .orderspe{
        display: flex;
        justify-content: space-between;
        .ofirst{margin-left: 37px;}
        .orderdan{width: 56.8%;}
        .ordernums{width: 43.2%;}
        .nopho{
            width: 42%;
            display: flex;
        }
        .havepho{
            width: 58%;
            display: flex;
            .imgss{
                width: 52px;
                height: 56px;
                background: url(../../static/assesss.jpg) no-repeat;
                margin:10px 12px;
            }
            p{margin-top: 22px;text-align: left;display: flex;flex-direction: column;}
        }
    }
    .orderHead{
        text-align: center;
        background-color: #f7f7f7;
        margin-bottom: 12px;
        h4{
            font-size: 12px;
            line-height: 34px;
        }
    }
    .ceshi{font-size: 12px;}
    .myorder{margin-top:37px;}
        .myassess{margin-top:34px;}
        .huiyuan{padding-left: 8px;}
        .orderNei{margin-left: 22px;}
    .orderNumber{
            display: flex;
            margin-top: 30px;
            p{
                font-size: 14px;
                line-height: 26px;
                margin-left: 1px;
            }
            input{
                height: 21px;
                margin:1px 12px 0 18px;
                width: 253px;
                padding: 0 6px;
            }
            button{
                width: 70px;
                text-align: center;
                color: #2693d4;
                border:1px solid #2693d4;
                background-color: #fff;
                border-radius: 5px;
                height: 26px;
            }
        }
        #createTime{
            display: flex;
            margin: 34px 0;
            p{
                font-size: 14px;
                margin-left: 1px;
                line-height: 25px;
            }
            .data{width: 113px;margin:0 12px 0 4px;}
            .el-input--prefix .el-input__inner{  
                height:25px;
                padding: 0 5px;
            }
            .el-input__prefix{
                margin-left: 82px;
            }
            .el-input__icon{
                margin-top:-8px;
            }
        }
@media screen and (max-width: 768px){
    .Memberorder{display: block;width: 100%;}
    .orderNei{margin-left: 0;}
    .orderBody{
        border:0;
        .orderhao{
            border:0;
            background-color: #fff;
            justify-content: space-between;
            padding: 0 17px;
            .ohaoma{margin:0 0;}
        }
        .moneyred{color:#ff4747;}
        .orderoper{
            border:0;
            display: flex;
            justify-content: space-between;
            padding: 0 24px;
            height: 40px;
            .fushan{
                display: flex;
                flex-direction: row-reverse;
            }
            .heji{
                line-height: 40px;
                font-size: 14px;
            }
            .paymoney{
                margin:8px 0 7px;
                background-color: #2693d4;
                color: #fff;
            }
            a{line-height: 40px;margin:0 20px 0 0;}
        }
        .gekai{
            background-color: #f8f8f8;
            height: 20px;
        }
    }
    .orderspe{
        background-color: #f8f8f8;
        .havepho{
            width:100%;
            .imgss{margin:22px 17px;}
            .phocom,.yuanchen{font-size: 14px;}
            .yuanchen{margin-top: 8px;}
            p{margin-top: 18px;}
        }
    }
    .allorder{ margin-top: 42px;}
    .phone{
            text-align: center;
            font-size: 18px;
            line-height: 77px; 
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