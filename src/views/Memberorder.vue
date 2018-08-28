<template>
    <div class="Memberorder">
        <div class="orderNei">
            <p class="tit hidden-sm-and-down">我的订单<span></span></p>
            <div class="orderNumber hidden-sm-and-down">
                <p>订单号：</p>
                <input type="text" placeholder="请输入订单号搜索" v-model="searchOrderNumber">
                <button @click="searchOrder">搜索</button>
                <p class="orderHint">{{orderHint}}</p>
            </div>
            <div id="createTime" class="hidden-sm-and-down">
                <p>创建时间：</p>
                <el-date-picker
                    @blur="datachoose"
                    v-model="value1"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <p class="phone hidden-md-and-up"><router-link to="/memberindex" class="jian">&lt;</router-link>我的订单</p>            
            <el-row class="orderHead hidden-sm-and-down">
                <el-col :sm="21" :xs="21">
                    <el-col :sm="16" :xs="16" class="orderspe">
                        <h4 class="ofirst">商品名称</h4>
                        <div class="nopho">
                            <h4 class="orderdan">单价</h4>
                            <h4 class="ordernums">数量</h4>
                        </div> 
                    </el-col>
                    <el-col :sm="4" :xs="4">
                        <h4>总金额</h4>
                    </el-col>
                    <el-col :sm="4" :xs="4">
                        <h4>订单状态</h4>
                    </el-col>
                </el-col>
                <el-col :sm="3" :xs="3">
                    <h4>订单操作</h4>                  
                </el-col>
            </el-row>
            <div :class="noneorder">还没有订单！</div>
            <div class="allorder">
                <el-row class="orderBody" v-for="(item,index1) in orderArr.slice((pagei-1)*2,pagei*2)" :key="index1">
                    <el-col :sm="24" :xs="24" class="orderhao">
                        <p class="ohaoma">订单号：{{item.businessNo}}</p>
                        <p class="hidden-sm-and-down">下单时间：{{item.createTime}}</p>
                        <p class="hidden-md-and-up">等待买家付款</p>
                    </el-col>
                    <el-col :sm="24" :xs="24" class="wholeOrder">
                        <el-col :md="21" :sm="24" :xs="24">
                            <el-col :sm="24" :xs="24" v-for="(item,index) in orderArr1.slice((pagei-1)*2,pagei*2)[index1]" :key="index" class="onceOrder">
                                <el-col :md="16" :sm="24" :xs="24" class="orderspe">
                                    <div class="havepho">
                                        <span class="imgss"></span>
                                        <p>
                                            <span class="hidden-sm-and-down">{{item['providerName']}}</span>
                                            <span class="phocom">{{item['serviceName']}}</span>
                                            <!-- <span class="phocom">{{item['businessNo']}}</span> -->
                                            <span class="hidden-md-and-up">下单时间：{{item['createTime']}}</span>
                                            <span class="hidden-md-and-up yuanchen"><span class="moneyred">￥{{item['unitPrice']}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;×{{item['buyNum']}}</span>
                                        </p>
                                    </div>
                                    <div class="nopho hidden-sm-and-down">
                                        <p class="orderdan">￥{{item['unitPrice']}}.00</p>
                                        <p class="ordernums">{{item['buyNum']}}</p>
                                    </div>
                                </el-col>
                                <el-col :sm="4" :xs="4" class="orderblue hidden-sm-and-down">
                                    <p>￥{{item['totalPrice']}}.00</p>
                                </el-col>
                                <el-col :sm="4" :xs="4" class="orderblue hidden-sm-and-down">
                                    <p>等待买家付款</p>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :md="3" :sm="24" :xs="24" class="orderoper">   
                            <p class="heji hidden-md-and-up">合计：<span class="moneyred">￥{{item.totalPrice}}</span></p>
                            <div class="fushan">         
                                <router-link :to="{path:'/pay',query:{businessNo:item.businessNo,total:item.totalPrice}}" class="paymoney">付款</router-link>  
                                <a href="javascript:void(0)" @click="deleOrder(item.id,index1)">删除订单</a> 
                            </div>                 
                        </el-col>
                    </el-col>
                    <el-col :sm="24" :xs="24" class="hidden-md-and-up gekai"></el-col>
                </el-row>
            </div>
            <div class="myorder hidden-sm-and-down">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="1"
                    layout="prev, pager, next, jumper"
                    :total="totalpage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store';
export default {
    name: 'Memberorder',
    data () {
        return {
            value1: '',                   //日期选择框的值
            orderArr:[],                  //订单号
            orderArr1:[],                 //详细订单
            pagei:1,                      //页数
            chushi:[],                    //搜索订单号为空时渲染页面初始数组
            chushi1:[],
            // chushifen:0,                  //初始总共分几页
            // delefen:0,
            // delezui:0,
            delesign:0,                   //删除几次
            delesign1:0,
            delesign2:0,
            // delelast:0,
            // biaoji:0,
            callbackSign:0,               //搜索订单号为空标志
            searchOrderNumber:'',         //搜索订单号
            orderHint:'',                 //订单号错误提示
            noneorder:'yincangorder',     //订单为空
            // lengthLimit:0,                 //点击下一页是否需要请求的标志
            loading: true,
            currentPage3: 1,
            totalpage:1,  
            requstlim:0,                 //正常请求次数
            single:0,                    //正常全部数据个数 
            requstnol:0,
            singlenol:0,
            nodate:0,                    //0是无日期，1是日期不等，2是日期等
        }
    },
    created(){
        this.$parent.orderRight='choose order liespe';
        this.$parent.assessRight='choose assess hidden-sm-and-down';
        this.$parent.installRight='choose install';
        var that=this;
        this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
            {'start':0}
        )).then(
            function(data){
                if(data.data.status=='-999'){
                    that.noneorder='showorder noneorder';
                    store.commit('loading',false) 
                    that.totalpage=1;that.currentPage3=1;
                    return;
                }
                // that.delefen=data.data.data.length;
                // that.delezui=data.data.data.length;
                that.single=data.data.data.length;
                that.totalpage=Math.ceil(data.data.data.length/2);
                // that.chushifen=Math.ceil(data.data.data.length/2);
        }).catch(function(){})
        this.orderChange(0,'','',8,1);      
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
                        if(that.nodate==0&&that.orderArr.length==2&&that.single-that.delesign>that.orderArr.length){
                            var start=that.requstlim*8-that.delesign-1;
                            console.log(888);
                            that.orderChange(start,'','',8,1);
                        }else if(that.nodate==1&&that.orderArr.length==2&&that.singlenol-that.delesign1>that.orderArr.length){
                            var start=that.requstnol*8-that.delesign1-1;
                            console.log(888888);
                            that.orderChange(start,'','',8,0);
                        }
                        var sign=that.pagei-1;
                        if(sign*2+dis==that.orderArr.length-1&&dis==0){
                            that.pagei--;
                            // that.currentPage3=that.pagei-1;
                            console.log(666);
                        }
                        that.orderArr.splice(sign*2+dis,1);
                        that.orderArr1.splice(sign*2+dis,1);
                        that.chushi.splice(sign*2+dis,1);
                        that.chushi1.splice(sign*2+dis,1);
                        if(that.nodate==0){
                            that.delesign++;                        
                            that.totalpage=Math.ceil((that.single-that.delesign)/2);
                        }else if(that.nodate==1){
                            that.delesign1++;                        
                            that.totalpage=Math.ceil((that.singlenol-that.delesign1)/2);
                        }else if(that.nodate==2){
                            that.delesign2++;                        
                            that.totalpage=Math.ceil((that.orderArr.length)/2);
                        }
                        if(that.nodate==0&&that.single==that.delesign){that.noneorder='showorder noneorder';that.currentPage3=1;}
                        if(that.nodate==1&&that.singlenol==that.delesign1){that.noneorder='showorder noneorder';that.currentPage3=1;}
                        if(that.nodate==2&&that.orderArr.length==that.delesign2){that.noneorder='showorder noneorder';that.currentPage3=1;}                        
                })                         
            }).catch(() => { 
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });  
            }); 
        },
        //日期选择订单
        datachoose(){
            if(this.value1[0]==undefined||this.value1[1]==undefined||this.value1[0]==null||this.value1[1]==null){
                this.totalpage=Math.ceil((this.single-this.delesign)/2);
                that.orderArr=[];
                that.orderArr1=[]; 
                that.nodate=0;
                // this.delefen=this.delezui;
                for(var i in that.chushi){
                    that.orderArr.push(that.chushi[i]);
                    that.orderArr1.push(that.chushi1[i]);                       
                }
                that.pagei=1;this.currentPage3=1;
                return;
            }
            var newDate = new Date();
            var newDate1 = new Date();
            newDate.setTime(this.value1[0].getTime());
            newDate1.setTime(this.value1[1].getTime());
            var startdate=newDate.toLocaleDateString().replace(/\//g,'-');
            var enddate=newDate1.toLocaleDateString().replace(/\//g,'-');
            var that=this;
            that.orderArr=[];that.orderArr1=[];that.pagei=1;that.currentPage3=1;
            if(enddate==startdate){
                that.nodate=2;
                this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                    {'startTime':startdate,'endTime':enddate,'start':0}
                )).then(
                    function(data){                 
                        if(data.data.data.length==0||data.data.status=='-999'){that.noneorder='showorder noneorder';that.currentPage3=1;that.totalpage=1;return;}
                        that.noneorder='yincangorder';
                        that.changeDate(data.data.data);
                        for(var i in data.data.data){
                            if(enddate==data.data.data[i].createTime.split(' ')[0]){
                                that.orderArr.push(data.data.data[i]);
                                that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                                    {'businessNo':data.data.data[i].businessNo}
                                )).then(
                                    function(data){
                                        that.changeDate(data.data.data);
                                        that.orderArr1.push(data.data.data);  
                                })
                            }
                        }
                        that.totalpage=Math.ceil(that.orderArr.length/2); 
                        // that.delefen=that.orderArr.length;                     
                        if(that.orderArr.length==0){that.noneorder='showorder noneorder';that.currentPage3=1;that.totalpage=1;return;}
                        that.noneorder='yincangorder';
                }).catch(function(){})
            }else{
                // that.delelast=0;
                that.nodate=1;
                this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                    {'startTime':startdate,'endTime':enddate,'start':0}
                )).then(
                    function(data){
                        if(data.data.status=='-999'){that.totalpage=1;return;}
                        that.totalpage=Math.ceil(data.data.data.length/2);
                        that.singlenol=data.data.data.length;
                }).catch(function(){})
                this.orderChange(0,startdate,enddate,8,0); 
                // if(that.orderArr.length==0){that.noneorder='showorder noneorder';}else{that.noneorder='yincangorder';}
            }                 
        },
        //搜索指定订单
        searchOrder(){
            var that=this;
            if(this.searchOrderNumber==''){
                this.orderHint='';
                if(this.callbackSign==1){
                    this.totalpage=Math.ceil((that.chushi.length)/2);
                    this.single=that.chushi.length;
                    that.orderArr=[];
                    that.orderArr1=[]; 
                    that.nodate=0;
                    // this.delefen=this.delezui;
                    for(var i in that.chushi){
                        that.orderArr.push(that.chushi[i]);
                        that.orderArr1.push(that.chushi1[i]);                       
                    }
                    that.pagei=1;this.currentPage3=1;
                }
            }else if(!/^S\d{19}$/.test(this.searchOrderNumber)){
                this.orderHint='订单号格式错误'
            }else{
                this.orderHint='';
                this.totalpage=1;
                this.currentPage3=1;
                this.pagei=1;
                that.nodate=0;
                that.orderArr=[];
                that.orderArr1=[];
                this.callbackSign=1;
                that.ajax.post('/xinda-api/business-order/grid',that.qs.stringify(
                    {'businessNo':that.searchOrderNumber}
                )).then(
                    function(data){                   
                        if(data.data.data.length==0||data.data.status=='-999'){that.noneorder='showorder noneorder';that.currentPage3=1;return;}
                        that.noneorder='yincangorder';
                        that.changeDate(data.data.data);
                        that.orderArr=data.data.data; 
                        that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                            {'businessNo':that.searchOrderNumber}
                        )).then(
                            function(data){
                                that.changeDate(data.data.data);
                                that.orderArr1.push(data.data.data); 
                        })
                })
            }
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
        orderChange(page,startdate,enddate,limited,panchu){
            store.commit('loading',true)
            var that=this;
            this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                {'startTime':startdate,'endTime':enddate,'start':page,'limit':limited}
            )).then(
                function(data){     
                    // console.log(data)         
                    if((data.data.status=='-999')||(data.data.data.length==0)){that.noneorder='showorder noneorder';that.currentPage3=1;that.totalpage=1;store.commit('loading',false);return;}
                    // if(shou==2&&data.data.data.length==0){that.noneorder='showorder noneorder';that.fenye=0;store.commit('loading',false);return;}
                    that.noneorder='yincangorder';
                    that.changeDate(data.data.data);
                    if(panchu==1){
                        that.requstlim++;
                        that.nodate=0;
                        for(var i in data.data.data){
                            that.orderArr.push(data.data.data[i]);
                            that.chushi.push(data.data.data[i]);
                                (function(i){that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                                    {
                                        'businessNo':data.data.data[i].businessNo
                                    }
                                )).then(
                                    function(data){
                                        that.changeDate(data.data.data);
                                        that.orderArr1.push(data.data.data); 
                                        that.chushi1.push(data.data.data); 
                                })})(i)
                        }
                    }else{
                        that.requstnol++;
                        that.nodate=1;
                        for(var i in data.data.data){
                            that.orderArr.push(data.data.data[i]);
                            that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                                {'businessNo':data.data.data[i].businessNo}
                            )).then(
                                function(data){
                                    that.changeDate(data.data.data);
                                    that.orderArr1.push(data.data.data); 
                            })
                        }
                    }
                    console.log(that.orderArr);
                    store.commit('loading',false)               
            }).catch(function(){})
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagei=val;
            if(this.nodate==2){return;}
            if(this.nodate==0&&this.pagei*2+2>this.orderArr.length&&this.single-this.delesign>this.orderArr.length){
                console.log(999);
                var start=this.requstlim*8;
                var jici=Math.floor(this.pagei*2/8+1-this.requstlim)*8;
                this.orderChange(start,'','',jici,1);
            }
            if(this.nodate==1&&this.pagei*2+2>this.orderArr.length&&this.singlenol-this.delesign1>this.orderArr.length){
                console.log(999999);
                var start=this.requstnol*8;
                var jici=Math.floor(this.pagei*2/8+1-this.requstnol)*8;
                this.orderChange(start,'','',jici,0);
            }
        }
    }
}
</script>

<style lang="less">
.orderNei .nadaoshuju{font-size: 14px;}
    button{outline: none;}
    .noneorder{
        background-color: #f7f7f7;
        color: #999;
        font-size: 38px;
        text-align: center;
        line-height: 242px;
    }
    .yincangorder{
        display: none;
    }
    .showorder{
        display: block;
    }
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
        border-bottom: 0;
        .orderoper{
            border-left:1px solid #e8e8e8;
            border-bottom:1px solid #e8e8e8;
            display: flex;
            .fushan{display: flex;flex-direction: column;margin:auto auto;}
            .paymoney{
                width: 56px;
                color:#69abdb;
                border:1px solid #2693d4;
                font-size: 14px;
                line-height: 23px;
                margin:0 auto 6px;
            }
            a{
                color: #ff4747;
                font-size: 14px;
                outline: none;
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
            p{margin-top: 22px;text-align: left;display: flex;flex-direction: column;width: 57%;}
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
    .intro{
        font-size: 14px;
        margin:23px 0 10px;
    }
    .onceOrder{border-bottom:1px solid #e8e8e8;}
    .wholeOrder{display: flex;}
    .ceshi{font-size: 12px;}
    .myorder{margin-top:37px;display: flex;.el-pagination{margin:0 auto 10px;}}
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
            .orderHint{color:red;margin-left: 15px;}
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
                cursor: pointer;
            }
        }
        #createTime{
            display: flex;
            margin: 32px 0 31px;
            p{
                font-size: 14px;
                margin-left: 1px;
                line-height: 25px;
            }
            .el-input__inner{height: 25px;width: 40%;margin-left: 4px;}
            .el-date-editor .el-range__close-icon,.el-date-editor .el-range-separator,.el-date-editor .el-range__icon{margin-top: -15px;}
        }
@media screen and (max-width: 992px){
    .Memberorder{display: block;width: 100%;}
    .orderNei{margin-left: 0;}
    .wholeOrder{flex-direction: column;}
    .onceOrder{border-bottom:5px solid #fff;}
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
            justify-content: space-between;
            padding: 0 24px;
            height: 40px;
            .fushan{
                flex-direction: row-reverse;
                margin:0 0;
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
            p{margin-top: 18px;width: 65%;}
        }
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