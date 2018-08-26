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
                                            <span class="phocom">{{item['businessNo']}}</span>
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
            <div class="page myorder hidden-sm-and-down">
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
import store from '../store';
export default {
    name: 'Memberorder',
    data () {
        return {
            value1: '',                   //日期选择框的值
            nextClick:'click',            //分页的样式
            prevClick:'unclick',
            orderArr:[],                  //订单号
            orderArr1:[],                 //详细订单
            pagei:1,                      //页数
            fenye:0,                      //总共分几页
            chushi:[],                    //搜索订单号为空时渲染页面初始数组
            chushi1:[],
            chushifen:0,                  //初始总共分几页
            delefen:0,
            delezui:0,
            delesign:0,
            delelast:0,
            biaoji:0,
            callbackSign:0,               //搜索订单号为空标志
            searchOrderNumber:'',         //搜索订单号
            orderHint:'',                 //订单号错误提示
            noneorder:'yincangorder',     //订单为空
            lengthLimit:1,                 //点击下一页是否需要请求的标志
            loading: true
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
                    that.$alert('请先登录', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            that.$router.push({path:'/outter/login',query:{pan:123}});
                        }
                    });
                    that.fenye=0;that.noneorder='showorder noneorder';
                    return;
                }
                that.delefen=data.data.data.length;
                that.delezui=data.data.data.length;
                that.fenye=Math.ceil(data.data.data.length/2);
                that.chushifen=Math.ceil(data.data.data.length/2);
                if(that.fenye>1){
                    that.nextClick='click';
                }else{that.nextClick='unclick';}
        }).catch(function(){})
        this.orderChange(0,'','',4,1,2);      
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
                        that.delesign++;
                        var sign=that.pagei-1;
                        that.orderArr.splice(sign*2+dis,1);
                        that.orderArr1.splice(sign*2+dis,1);
                        that.chushi.splice(sign*2+dis,1);
                        that.chushi1.splice(sign*2+dis,1);
                        if(that.value1==''){
                            if(that.orderArr.length+that.delesign-that.biaoji==that.delezui){
                                that.nextClick='unclick';
                                if(that.orderArr[(that.pagei-1)*2]==undefined){that.pagei=that.pagei-1;that.fenye=that.fenye-1;}
                                if(that.pagei==1){that.prevClick='unclick';}else{that.prevClick='click';}                               
                                if(that.delesign==that.delezui){that.noneorder='showorder noneorder';}
                                that.fenye=Math.ceil((that.delefen-that.delesign)/2);
                                if(that.delesign==that.delefen){that.noneorder='showorder noneorder';that.pagei=1;that.prevClick='unclick';return} 
                                return;
                            }
                            that.nextClick='click';
                            that.noneorder='yincangorder'; 
                            if(that.delesign==that.delefen){that.noneorder='showorder noneorder';that.pagei=1;that.prevClick='unclick';return}                                                                                   
                            if(sign*2+dis>=that.orderArr.length-2){
                                that.orderChange(that.orderArr.length,'','',2,1);                                                   
                            }
                            if(sign*2+1>=that.orderArr.length-1){
                                that.nextClick='unclick';
                            }else{that.nextClick='click';}
                            if(that.orderArr[sign*2]==undefined||that.orderArr[sign*2]==null){
                                if(that.delesign==that.delefen){that.noneorder='showorder noneorder';that.pagei=1;that.prevClick='unclick';return}
                                that.pagei=that.pagei-1;that.fenye=that.fenye-1;that.noneorder='yincangorder';
                            } 
                            if(that.pagei==1||that.pagei==0){that.prevClick='unclick';}else{that.prevClick='click';}
                        }else{
                            if(that.value1[0]==that.value1[1]||that.value1[0]==undefined||that.value1[1]==undefined||that.value1[0]==null||that.value1[1]==null){return;}
                            var newDate = new Date();
                            var newDate1 = new Date();
                            newDate.setTime(this.value1[0].getTime());
                            newDate1.setTime(this.value1[1].getTime());
                            var startdate=newDate.toLocaleDateString().replace(/\//g,'-');
                            var enddate=newDate1.toLocaleDateString().replace(/\//g,'-');
                            if(startdate==enddate){return}
                            if(sign*2+dis>=that.orderArr.length-2){
                                that.orderChange(that.orderArr.length,startdate,enddate,2,0);
                            }
                        }
                        that.fenye=Math.ceil((that.delefen-that.delesign)/2);
                        if(that.fenye>that.pagei){that.nextClick='click'} 
                })                         
            }).catch(() => { 
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });  
            }); 
        },
        //下一页
        nextp(){
            var that=this;
            if(this.pagei>=this.fenye){return;}
            var chuchang=this.orderArr.length;
            this.nextClick='click';
            this.prevClick='click';
            if(this.pagei==this.fenye-1&&this.delesign==0){this.nextClick='unclick';}
            if(this.lengthLimit>this.pagei){this.pagei++;return;}
            this.pagei++;
            this.lengthLimit=this.pagei;
            // var chuan=(this.pagei)*2;        //改变
            if(this.delesign==0){
                var chuan=this.orderArr.length+this.delesign;                
            }else{
                var chuan=this.orderArr.length;                
            }
            if(this.pagei==this.fenye&&this.delesign==0){return;}
            if(this.pagei==this.fenye&&this.delesign!=0){this.delelast=2;}
            if(this.value1==''){
                this.orderChange(chuan,'','',2,1);
            }else{
                if(this.value1[0]==this.value1[1]||this.value1[0]==undefined||this.value1[1]==undefined||this.value1[0]==null||this.value1[1]==null){return;}
                var newDate = new Date();
                var newDate1 = new Date();
                newDate.setTime(this.value1[0].getTime());
                newDate1.setTime(this.value1[1].getTime());
                var startdate=newDate.toLocaleDateString().replace(/\//g,'-');
                var enddate=newDate1.toLocaleDateString().replace(/\//g,'-');
                if(startdate==enddate){return}
                this.orderChange(chuan,startdate,enddate,2,0); 
            }
            var lastchang=this.orderArr;
            if(this.delesign==0){
                this.biaoji=this.biaoji+(lastchang-chuchang);
            }
            if(that.fenye==that.pagei){that.nextClick='unclick'}
        },
        //上一页
        prevp(){
            if(this.pagei<=1){return;}
            this.prevClick='click';
            this.nextClick='click';
            if(this.pagei==2){this.prevClick='unclick';}
            this.pagei--;
        },
        //日期选择订单
        datachoose(){
            if(this.value1[0]==undefined||this.value1[1]==undefined||this.value1[0]==null||this.value1[1]==null){return;}
            var newDate = new Date();
            var newDate1 = new Date();
            newDate.setTime(this.value1[0].getTime());
            newDate1.setTime(this.value1[1].getTime());
            var startdate=newDate.toLocaleDateString().replace(/\//g,'-');
            var enddate=newDate1.toLocaleDateString().replace(/\//g,'-');
            var that=this;
            that.orderArr=[];that.orderArr1=[];that.pagei=1;
            if(enddate==startdate){
                this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                    {'startTime':startdate,'endTime':enddate,'start':0}
                )).then(
                    function(data){                 
                        if(data.data.data.length==0||data.data.status=='-999'){that.noneorder='showorder noneorder';that.fenye=0;return;}
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
                                        that.orderArr1.unshift(data.data.data);  
                                })
                            }
                        }
                        that.fenye=Math.ceil(that.orderArr.length/2); 
                        that.delefen=that.orderArr.length;
                        if(that.fenye>1){
                            that.nextClick='click';
                        }else{that.nextClick='unclick';}                       
                        if(that.orderArr.length==0){that.noneorder='showorder noneorder';return;}
                        that.noneorder='yincangorder';
                }).catch(function(){})
            }else{
                that.delelast=0;
                this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                    {'startTime':startdate,'endTime':enddate,'start':0}
                )).then(
                    function(data){
                        if(data.data.status=='-999'){that.fenye=0;return;}
                        that.fenye=Math.ceil(data.data.data.length/2);
                        that.delefen=data.data.data.length;
                        if(that.fenye>1){
                            that.nextClick='click';
                        }else{that.nextClick='unclick';}
                }).catch(function(){})
                this.orderChange(0,startdate,enddate,4,0); 
                if(that.orderArr.length==0){that.noneorder='showorder noneorder';}else{that.noneorder='yincangorder';}
            }                 
        },
        //搜索指定订单
        searchOrder(){
            var that=this;
            if(this.searchOrderNumber==''){
                this.orderHint='';
                if(this.callbackSign==1){
                    this.fenye=Math.ceil((this.delezui-this.delesign)/2); 
                    this.delefen=this.delezui;
                    that.orderArr=that.chushi;
                    that.orderArr1=that.chushi1;
                    that.pagei=1;
                    this.nextClick='unclick';
                    this.prevClick='unclick';
                    if(this.fenye>1){this.nextClick='click';} 
                }
            }else if(!/^S\d{19}$/.test(this.searchOrderNumber)){
                this.orderHint='订单号格式错误'
            }else{
                this.orderHint='';
                this.fenye=1;
                that.orderArr=[];
                that.orderArr1=[];
                that.pagei=1;
                this.callbackSign=1;
                this.nextClick='unclick';
                this.prevClick='unclick';
                that.ajax.post('/xinda-api/business-order/grid',that.qs.stringify(
                    {'businessNo':that.searchOrderNumber}
                )).then(
                    function(data){                   
                        if(data.data.data.length==0||data.data.status=='-999'){that.noneorder='showorder noneorder';that.fenye=0;return;}
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
        orderChange(page,startdate,enddate,limited,panchu,shou){
            store.commit('loading',true)
            var that=this;
            this.ajax.post('/xinda-api/business-order/grid',this.qs.stringify(
                {'startTime':startdate,'endTime':enddate,'start':page,'limit':limited}
            )).then(
                function(data){              
                    if((data.data.status=='-999'&&that.delelast==1)||(data.data.data.length==0&&that.delelast==1)){that.noneorder='showorder noneorder';that.fenye=0;store.commit('loading',false);return;}
                    if(shou==2&&data.data.data.length==0){that.noneorder='showorder noneorder';that.fenye=0;store.commit('loading',false);return;}
                    that.noneorder='yincangorder';
                    that.changeDate(data.data.data);
                    if(panchu==1){
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
                    store.commit('loading',false)               
            }).catch(function(){})
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