<template>
    <div class="Memberassess">
        <div :class="assessWan">
            <p class="tit">我的评价<span></span></p>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" id="assessCard">
                <el-tab-pane label="未评价" name="first">
                    <div class="willOne">
                        <div class="img"><span></span></div>
                        <div class="server">
                            <h4>信达北京服务中心</h4>
                            <p class="danhao">服务单号：<span>B1823</span></p>
                            <p>购买内容：test</p>
                        </div>
                        <p class="buytime">购买时间：2016-01-01 02:12:21</p>
                        <button class="goping will" @click="goassess">去评价</button>
                    </div>                       
                </el-tab-pane>
                <el-tab-pane label="已评价" name="second">
                    <div class="alwaysOne">
                        <div class="img"><span></span></div>
                        <div class="server">
                            <h4>信达北京服务中心</h4>
                            <p class="danhao">服务单号：<span>B1823</span></p>
                            <p>购买内容：test</p>
                        </div>
                        <p class="buytime">购买时间：2016-01-01 02:12:21</p>
                        <p class="goping always">已评价</p> 
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="page myassess">
                <div>
                    <button class="unclick" disabled>上一页</button>
                    <p class="shows">1</p>
                    <button class="unclick" disabled>下一页</button>
                </div>
            </div>
        </div>
        <div :class="assessGo">
                    <p class="tit">评价<span></span></p>
                    <div class="dan ser">
                        <p>服务单号：B1213231222</p>
                        <p class="buynei">购买内容：test</p>
                        <p>购买时间：2016-11-11</p>
                    </div>
                    <div class="dan ass">
                        <p class="danspe">评价：</p>
                        <div><input type="radio" name="assesses" checked @click="stars(1)">好评</div>
                        <div><input type="radio" name="assesses" @click="stars(2)">中评</div>
                        <div><input type="radio" name="assesses" @click="stars(3)">差评</div>                                               
                    </div>
                    <div class="dan fen">
                        <p class="danspe">评分：</p>
                        <div slot="reference">
                            <i :class="starone" @click="starsone"></i>
                            <i :class="startwo" @click="starstwo"></i>
                            <i :class="starthree" @click="starsthree"></i>
                            <i :class="starfour" @click="starsfour"></i>
                            <i :class="starfive" @click="starsfive"></i>
                        </div>
                    </div>
                    <div class="dan">
                        <p class="danspe">感受：</p>
                        <div class="feel">
                            <textarea name="" id="" cols="0" rows="9"></textarea>
                            <button @click="tijiaoasse">提交</button>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
export default {
    name: 'Memberassess',
    data () {
        return {
            activeName: 'first',
            assessWan:'assessNei hidden-xs-only showassess',
            assessGo:'gopingjia hidden-xs-only noneassess',
            starone:'el-icon-star-on iconred',
            startwo:'el-icon-star-on iconred',
            starthree:'el-icon-star-on iconred',
            starfour:'el-icon-star-on iconred',
            starfive:'el-icon-star-on iconred',
        }
    },
    created(){
        this.$parent.orderRight='choose order';
        this.$parent.assessRight='choose assess hidden-xs-only liespe';
        this.$parent.installRight='choose install';
        var that=this;
        this.datavalue=this.ajax.post('/xinda-api/service/judge/grid',this.qs.stringify(
            {start:0,limit:6,status:2}
        )).then(
            function(data){
                console.log(data);
        }).catch(function(){console.log('失败');})
    },
    methods:{
        handleClick(tab, event) {
        },
        tijiaoasse(){
            var that=this;
            this.ajax.post('/xinda-api/service/judge/submit',this.qs.stringify(
                {id:'e456a5952fd6486091b9a229a85c45fd',type:1,score:2,content:1121}
            )).then(
                function(data){
                    console.log(data);
            }).catch(function(){console.log('失败');});

            this.assessWan='assessNei hidden-xs-only showassess';
            this.activeName='second';
            this.assessGo='gopingjia hidden-xs-only noneassess';
        },
        goassess(){
            this.assessWan='assessNei hidden-xs-only noneassess';
            this.assessGo='gopingjia hidden-xs-only showassess';
        },
        stars(value){
            if(value==3){
                this.starone='el-icon-star-on iconhui';
                this.startwo='el-icon-star-off iconhui';
                this.starthree='el-icon-star-off iconhui';
                this.starfour='el-icon-star-off iconhui';
                this.starfive='el-icon-star-off iconhui';
            }else if(value==2){
                this.starone='el-icon-star-on iconyellow';
                this.startwo='el-icon-star-on iconyellow';
                this.starthree='el-icon-star-on iconyellow';
                this.starfour='el-icon-star-off iconhui';
                this.starfive='el-icon-star-off iconhui';
            }else{
                this.starone='el-icon-star-on iconred';
                this.startwo='el-icon-star-on iconred';
                this.starthree='el-icon-star-on iconred';
                this.starfour='el-icon-star-on iconred';
                this.starfive='el-icon-star-on iconred';
            }
        },
        starsone(){
            this.starone='el-icon-star-on iconhui';
            this.startwo='el-icon-star-off iconhui';
            this.starthree='el-icon-star-off iconhui';
            this.starfour='el-icon-star-off iconhui';
            this.starfive='el-icon-star-off iconhui';
        },
        starstwo(){
            this.starone='el-icon-star-on iconhui';
            this.startwo='el-icon-star-on iconhui';
            this.starthree='el-icon-star-off iconhui';
            this.starfour='el-icon-star-off iconhui';
            this.starfive='el-icon-star-off iconhui';
        },
        starsthree(){
            this.starone='el-icon-star-on iconyellow';
            this.startwo='el-icon-star-on iconyellow';
            this.starthree='el-icon-star-on iconyellow';
            this.starfour='el-icon-star-off iconhui';
            this.starfive='el-icon-star-off iconhui';
        },
        starsfour(){
            this.starone='el-icon-star-on iconyellow';
            this.startwo='el-icon-star-on iconyellow';
            this.starthree='el-icon-star-on iconyellow';
            this.starfour='el-icon-star-on iconyellow';
            this.starfive='el-icon-star-off iconhui';
        },
        starsfive(){
            this.starone='el-icon-star-on iconred';
            this.startwo='el-icon-star-on iconred';
            this.starthree='el-icon-star-on iconred';
            this.starfour='el-icon-star-on iconred';
            this.starfive='el-icon-star-on iconred';
        }
    }
}
</script>

<style lang="less">
    .Memberassess{
        display: inline-block;
        vertical-align: top;
        width: 75%;
    }
    .assessNei{
        margin-left: 8px;
            .tit{margin-left: 14px;}
        }
        #assessCard{
            margin:31px 0 38px;
            .el-tabs__nav-scroll{
                background-color: #f7f7f7;
                border:1px solid #ccc;
            }
            .el-tabs__header{margin:0 0;}
            .el-tabs__nav{border:0;}
            .el-tabs__item{height:50px;line-height: 50px;}
            .is-active{
                background-color: #2693d4;
                color: #fff;
            }
            .el-tabs__content{
                border:1px solid #ccc;
                border-top: 0;
                padding-top: 33px;
            }
            .willOne,.alwaysOne{
                margin-bottom: 31px;
                p{font-size: 14px;}
                .goping{font-size: 18px;}
            }
            .server{
                display: inline-block;
                vertical-align: top;
                h4{font-size: 18px;}
            }
            .danhao{
                margin:17px 0 19px;
                span{color: #fc6c6b}
            }
            .buytime{
                margin:40px 0 0 46px;
                display: inline-block;
                vertical-align: top;
            }
            .goping{
                width: 112px;
                line-height: 35px;
                height: 35px;
                text-align: center;
                float: right;
                margin:27px 29px 0 0;
                border-radius: 5px;
            }
            .will{
                border:1px solid #2592d3;
                color: #2592d3;
                cursor: pointer;
                background-color: #fff;
            }
            .always{
                border:1px solid #ccc;
                color: #fff;
                background-color: #ccc;
            }
            .img{
                width: 98px;
                height: 98px;;
                margin:0 12px 0 8px;
                border: 1px solid #ccc;
                display: inline-block;
                text-align: center;
                span{
                    margin-top: 14px;
                    width: 52px;
                    height: 56px;
                    background: url(../../static/assesss.jpg) no-repeat;
                }
            }
        }
        .intro{
            font-size: 14px;
            margin:23px 0 10px;
        }
    .gopingjia{
            margin-left: 22px;
            p{font-size: 14px;}
            .tit span{width: 86px;}
            .ser{
                margin:32px 0 42px;
                .buynei{margin:0 20% 0 5.5%;}
            }
            .ass{
                font-size: 14px;
                div{margin-right: 30px;}
                input{
                    margin-top: 4px;
                    vertical-align: top;
                }
            }
            .fen{
                margin:48px 0 40px;
                p{line-height: 24px;}
                i{
                    font-size: 23px;
                    &::before{
                        cursor: pointer;
                    }
                }
                .iconhui{
                    &::before{
                        color: #999;
                    }
                }
                .iconyellow{
                    &::before{
                        color: #ffd700;
                    }
                }
                .iconred{
                    &::before{
                        color: rgb(233, 19, 19);
                    }
                }
            }
            .feel{
                width: 80%;
                textarea{width: 100%;}
                button{
                    float: right;
                    width: 148px;
                    color: #fff;
                    background-color: #2693d5;
                    line-height:39px;
                    border-radius: 5px;
                    border:0;
                    cursor: pointer;
                    margin-top: 18px;
                }
            }
            .dan{
                display: flex;
                margin-left: 29px;
            }
            .danspe{
                width: 70px;
            }
    }
    .showassess{
        display: block;
    }
    .noneassess{
        display: none;
    }
</style>