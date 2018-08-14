<template>
    <div class="Memberorder">
        <div class="orderNei">
            <p class="tit hidden-xs-only">我的订单<span></span></p>
            <div class="orderNumber hidden-xs-only">
                <p>订单号：</p>
                <input type="text" placeholder="请输入订单号搜索" v-model="searchOrderNumber">
                <button @click="searchOrder">搜索</button>
                <p class="orderHint">{{orderHint}}</p>
            </div>
            <div id="createTime" class="hidden-xs-only">
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
            <p class="phone hidden-sm-and-up"><router-link to="/memberindex" class="jian">&lt;</router-link>我的订单</p>            
            <el-row class="orderHead hidden-xs-only">
                <el-col :span="21">
                    <el-col :span="16" class="orderspe">
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
                </el-col>
                <el-col :span="3">
                    <h4>订单操作</h4>                  
                </el-col>
            </el-row>
            <div :class="noneorder">还没有订单！</div>
            <div class="allorder">
                <el-row class="orderBody" v-for="(item,index1) in orderArr[pagei-1]" :key="index1">
                    <el-col :span="24" class="orderhao">
                        <p class="ohaoma">订单号：{{item.businessNo}}</p>
                        <p class="hidden-xs-only">下单时间：{{item.createTime}}</p>
                        <p class="hidden-sm-and-up">等待买家付款</p>
                    </el-col>
                    <el-col :span="24" class="wholeOrder">
                        <el-col :span="21" :xs="24">
                            <el-col :span="24" v-for="(item,index) in orderArr1[pagei-1][index1]" :key="index" class="onceOrder">
                                <el-col :span="16" :xs="24" class="orderspe">
                                    <div class="havepho">
                                        <span class="imgss"></span>
                                        <p>
                                            <span class="hidden-xs-only">{{item['providerName']}}</span>
                                            <span class="phocom">{{item['serviceName']}}</span>
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
            </div>
            <div class="page myorder">
                <div>
                    <button :class="prevClick" @click="prevp">上一页</button>
                    <p class="shows">{{pagei}}</p>
                    <button :class="nextClick" @click="nextp">下一页</button>
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
            value1: '',
            nextClick:'unclick',
            prevClick:'click',
            orderArr:[], 
            orderArr1:[],
            lalala:[],
            pagei:1,
            fenye:0,
            callbackSign:0,
            searchOrderNumber:'',
            orderHint:'',
            noneorder:'yincangorder',
            lengthLimit:1
        }
    },
    created(){
        this.$parent.orderRight='choose order liespe';
        this.$parent.assessRight='choose assess hidden-xs-only';
        this.$parent.installRight='choose install';
        var that=this;
        this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
            {'start':0}
        )).then(
            function(data){
                if(data.data.status=='-999'){return;}
                if(data.data.data.length==0){return;}
                that.fenye=Math.ceil(data.data.data.length/2);
        }).catch(function(){console.log('失败');})
        this.orderChange(0);      
    },
    methods:{      //v-if="!(index1+1==delesign&&delepage==pagei)"
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
                            var sign=that.pagei-1;
                            that.orderArr[sign].splice(dis,1);
                            that.orderArr1[sign].splice(dis,1);
                            if(that.orderArr[0].length==0){that.noneorder='showorder noneorder';that.fenye=0;return;}
                            that.noneorder='yincangorder';
                            while(sign<=that.fenye){
                                if(that.orderArr[sign+1]!=undefined){
                                    that.orderArr[sign].push(that.orderArr[sign+1][0]);
                                    that.orderArr[sign+1].shift();
                                    that.orderArr1[sign].push(that.orderArr1[sign+1][0]);
                                    that.orderArr1[sign+1].shift();
                                }
                                sign++;
                            }
                            var bbb=that.orderArr.length;
                            if(that.orderArr[bbb-1].length==0){that.orderArr.pop();that.orderArr1.pop();}
                            that.fenye=that.orderArr.length;
                    })
            }).catch(() => { 
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
            }); 
        },
        nextp(){
            if(this.pagei>=this.fenye){ return;}
            // if(this.pagei==this.fenye-1){
            //     this.nextClick='unclick';
            //     this.prevClick='click';
            //     this.pagei++;
            //     return;
            // }
            // this.nextClick='click';
            // this.prevClick='click';
            if(this.lengthLimit>this.pagei){this.pagei++;return;}
            this.pagei++;
            this.lengthLimit=this.pagei;
            var chuan=(this.pagei-1)*2;
            this.orderChange(chuan);
        },
        prevp(){
            if(this.pagei<=1){return;}
            // if(this.pagei==2){
            //     this.nextClick='click';
            //     this.prevClick='unclick';
            //     this.pagei--;
            //     return;
            // }
            // this.prevClick='click';
            // this.nextClick='click';
            this.pagei--;
        },
        datachoose(){
            if(this.value1[0]==undefined||this.value1[1]==undefined||this.value1[0]==null||this.value1[1]==null){return;}
            var newDate = new Date();
            var newDate1 = new Date();
            newDate.setTime(this.value1[0].getTime());
            newDate1.setTime(this.value1[1].getTime());
            var startdate=newDate.toLocaleDateString().replace(/\//g,'-');
            var enddate=newDate1.toLocaleDateString().replace(/\//g,'-');
            var that=this;
            that.orderArr=[];that.chuliArr=[];
            this.ajax.post('/xinda-api/service-order/grid',this.qs.stringify(
                {'businessNo':1,'startTime':startdate,'endTime':enddate,'start':0}
            )).then(
                function(data){
                    for(var i in data.data.data){
                        that.orderArr.push(data.data.data[i]);
                    }
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
                            }
                        }
                        that.orderArr[i]=b;
                    }
                    for(var i in that.orderArr){
                        var totalOrder=0;
                        for(var j in that.orderArr[i]){
                            totalOrder+=that.orderArr[i][j].totalPrice;
                        }
                        that.orderArr[i][0].totalOrder=totalOrder;
                    }
                    that.fenye=Math.ceil(that.orderArr.length/2);
                    for(var i=0;i<that.orderArr.length;i=i+2){
                        var b=[that.orderArr[i],that.orderArr[i+1]];
                        if(b[1]==undefined){b.pop()};
                        that.chuliArr.push(b);
                    }           
                    if(that.fenye>1){that.nextClick='click';}
            }).catch(function(){console.log('失败');})
        },
        searchOrder(){
            if(this.searchOrderNumber==''){
                this.orderHint='';
                if(this.callbackSign==1){
                    this.chuliArr=[];
                    this.pagei=1;
                    this.fenye=Math.ceil(this.orderArr.length/2);
                    if(this.fenye>1){this.nextClick='click';}
                    for(var i=0;i<this.orderArr.length;i=i+2){
                        var b=[this.orderArr[i],this.orderArr[i+1]];
                        if(b[1]==undefined){b.pop()};
                        this.chuliArr.push(b);
                    } 
                }
            }else if(!/^S\d{19}$/.test(this.searchOrderNumber)){
                this.orderHint='订单号格式错误'
            }else{
                this.orderHint='';
                this.fenye=1;
                this.pagei=1;
                this.callbackSign=1;
                this.nextClick='unclick';
                this.prevClick='unclick';
                for(var i=0; i<this.chuliArr.length;i++){
                    for(var j=0;j<this.chuliArr[i].length;j++){
                        if(this.chuliArr[i][j][0].businessNo!=this.searchOrderNumber){
                            this.chuliArr[i].splice(j,1);
                            j--;
                        }
                    }
                    if(this.chuliArr[i].length==0){
                        this.chuliArr.splice(i,1);
                        i--;
                    }
                }
            }
            if(this.chuliArr.length==0){
                    this.noneorder='showorder noneorder';
            }else{
                    this.noneorder='yincangorder';
            }
        },
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
        orderChange(page){
            var that=this;
            this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                {'start':page,'limit':2}
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
                    if(data.data.data.length==0){that.noneorder='showorder noneorder';return;}
                    that.noneorder='yincangorder';
                    that.changeDate(data.data.data);
                    that.orderArr.push(data.data.data);
                    var xun=that.pagei-1;
                    // that.orderArr1[xun]=[]; 
                    // console.log(that.orderArr);                   
                    // for(let i in that.orderArr[xun]){
                    //     // let ji=that.orderArr[xun][i].businessNo;
                    //     (function(i){that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                    //         {'businessNo':that.orderArr[xun][i].businessNo}
                    //     )).then(
                    //         function(data){
                    //             that.changeDate(data.data.data);
                    //             // var bb=[];
                    //             // if(data.data.data[0].businessNo==ji){
                    //                 // var b=;
                    //                 // console.log(xun);
                    //                 // lalala.push(data.data.data);
                    //                 that.orderArr1[xun].push(data.data.data);                                   
                    //             // }
                    //     })
                    //     })(i)
                    // }
                    if(that.orderArr[xun].length==2){
                        that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                            {'businessNo':that.orderArr[xun][0].businessNo}
                        )).then(
                            function(data){
                                that.changeDate(data.data.data);
                                that.lalala.push(data.data.data);  
                        })
                        that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                            {'businessNo':that.orderArr[xun][1].businessNo}
                        )).then(
                            function(data){
                                that.changeDate(data.data.data);
                                that.lalala.push(data.data.data);
                                that.orderArr1.push(that.lalala); 
                                that.lalala=[];   
                        })
                    }else{
                        that.ajax.post('/xinda-api/service-order/grid',that.qs.stringify(
                            {'businessNo':that.orderArr[xun][0].businessNo}
                        )).then(
                            function(data){
                                that.changeDate(data.data.data);
                                that.lalala.push(data.data.data);
                                that.orderArr1.push(that.lalala); 
                                that.lalala=[]; 
                        })
                    }
                    console.log(that.orderArr1);
            }).catch(function(){console.log('失败');})
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
        line-height: 270px;
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
            margin: 34px 0;
            p{
                font-size: 14px;
                margin-left: 1px;
                line-height: 25px;
            }
            .el-input__inner{height: 25px;width: 40%;margin-left: 4px;}
            .el-date-editor .el-range__close-icon,.el-date-editor .el-range-separator,.el-date-editor .el-range__icon{margin-top: -15px;}
        }
@media screen and (max-width: 768px){
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