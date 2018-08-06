<template>
    <div class="Member">
        <p class="intro hidden-xs-only">首页 / 个人主页</p>
        <!-- <el-row> -->
            <!-- <el-col :sm="5" :xs={span:20,offset:2}> -->
                <!-- <div class="clear"> -->
            <div class="dings">   
                <div class="user">
                    <span class="touxiang"></span>
                    <p>18363992780</p>
                </div>
                <div class="choose order liespe">
                    <div>
                        <span></span>
                        <router-link to="/member/memberorder" class="cholink">我的订单</router-link>
                    </div>
                    <p class="hidden-sm-and-up">></p>
                </div>
                <div class="choose assess hidden-xs-only">
                    <div>
                        <span></span>
                        <router-link to="/member/memberorder" class="cholink">用户评价</router-link>
                    </div>
                </div>
                <div class="choose install">
                    <div>
                        <span></span>
                        <router-link to="/member/memberorder" class="cholink">账户设置</router-link>
                    </div>
                    <p class="hidden-sm-and-up">></p>
                </div>
                <router-link to="/quit" class="photui hidden-sm-and-up">退出登录</router-link>
            </div>
            <!-- </div> -->
            <!-- </el-col> -->
            <!-- <el-col :span="19" class="hidden-xs-only huiyuan">
                <div class="orderNei">
                    <p class="tit">我的订单<span></span></p>
                    <div class="orderNumber">
                        <p>订单号：</p>
                        <input type="text" placeholder="请输入订单号搜索">
                        <button>搜索</button>
                    </div>
                    <div id="createTiem">
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
                    <el-table
                        :data="tableData6"
                        :span-method="objectSpanMethod"
                        border>
                        <el-table-column
                            prop="goods"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="danjia"
                            label="单价">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            label="总金额">
                        </el-table-column>
                        <el-table-column
                            prop="states"
                            label="订单状态">
                        </el-table-column>
                        <el-table-column
                            prop="opt"
                            label="订单操作">
                        </el-table-column>
                    </el-table>
                    <div class="page myorder">
                        <div>
                            <button class="prevp" disabled>上一页</button>
                            <p class="shows">1</p>
                            <button class="nextp" disabled>下一页</button>
                        </div>
                    </div>
                </div>
                <div class="assessNei">
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
                                <button class="goping will">去评价</button>
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
                            <button class="prevp" disabled>上一页</button>
                            <p class="shows">1</p>
                            <button class="nextp" disabled>下一页</button>
                        </div>
                    </div>
                </div>
                <div class="gopingjia">
                    <p class="tit">评价<span></span></p>
                    <div class="dan ser">
                        <p>服务单号：B1213231222</p>
                        <p class="buynei">购买内容：test</p>
                        <p>购买时间：2016-11-11</p>
                    </div>
                    <div class="dan ass">
                        <p class="danspe">评价：</p>
                        <div><input type="radio" name="assesses" checked>好评</div>
                        <div><input type="radio" name="assesses">中评</div>
                        <div><input type="radio" name="assesses">差评</div>                                               
                    </div>
                    <div class="dan fen">
                        <p class="danspe">评分：</p>
                        <div>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                        </div>
                    </div>
                    <div class="dan">
                        <p class="danspe">感受：</p>
                        <div class="feel">
                            <textarea name="" id="" cols="0" rows="9"></textarea>
                            <button>提交</button>
                        </div>
                    </div>
                </div>
                <div class="installNei">
                    <el-tabs v-model="activeName2" @tab-click="handleClick" id="tit">
                        <el-tab-pane label="账户设置" name="first">
                            <div class="zhang dangqian">
                                <p class="z_spe">当前头像：</p>
                                <span class="touxiang"></span>
                            </div>
                            <div class="zhang mingzi">
                                <p class="z_spe">姓名：</p>
                                <input type="text">
                            </div>
                            <div class="zhang genders">
                                <p class="z_spe">性别：</p>
                                <div><input type="radio" name="gender" checked>男</div>
                                <div><input type="radio" name="gender">女</div>
                            </div>
                            <div class="zhang emails">
                                <p class="z_spe">邮箱：</p>
                                <input type="text" placeholder="请输入邮箱">
                            </div>
                            <div class="zhang areas">
                                <p class="z_spe">所在地区：</p>
                                <div>
                                    <city></city>
                                    <button class="baocun zhang_bao">保存</button>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="second">
                            <div class="zhang xiu oldpassword">
                                <p class="z_spe">旧密码：</p>
                                <input type="text">
                            </div>
                            <div class="zhang newpassword xiu">
                                <p class="z_spe">新密码：</p>
                                <input type="text">
                            </div>
                            <div class="zhang xiu againxiu">
                                <p class="z_spe">再次输入新密码：</p>
                                <div>
                                    <input type="text">
                                    <button class="baocun xiu_bao">保存</button>
                                </div>                                
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col> -->
        <!-- </el-row> -->
        <router-view/>
    </div>
</template>

<script>
import city from '../components/City'
export default {
  name: 'Member',
  data () {
    return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        activeName: 'first',
        activeName2: 'first',
        tableData6: [
        {
          goods: '订单号：S3477982544545455  下单时间：2017-04-01 01:23:32'
        }, 
        {
          goods: '信达北京服务中心注册分公司 ￥800.00',
          money: '￥800.00',
          states: '等待买家付款',
          opt: '付款'
        }, 
        {
          goods: '信达北京服务中心注册分公司 ￥800.00',
          money: '￥800.00',
          states: '等待买家付款',
          opt: '付款'
        },
        {
          goods: '订单号：S3477982544545455  下单时间：2017-04-01 01:23:32'
        },
        {
          goods: '信达北京服务中心注册分公司 ￥800.00',
          money: '￥800.00',
          states: '等待买家付款',
          opt: '付款'
        }]
    }
  },
  methods:{
    handleClick(tab, event) {
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 5) {
            if (rowIndex === 1) {
                return {
                    // rowspan: 2,
                    colspan: 1
                };
            } 
            // else {
            //     return {
                //     rowspan: 0,
                //     colspan: 0
            //     };
            // }
        }
        if (rowIndex === 0||rowIndex === 3){
            if (columnIndex === 0) {
                return [1, 6];
            } else if (columnIndex === 1) {
                return [0, 0];
            }
        }else{
            if (columnIndex === 0) {
                return [1, 2];
            } else if (columnIndex === 1) {
                return [0, 0];
            }
        }
    } 
  },
  components:{
      city
  },
}
</script>

<style lang="less">
    span{display: inline-block;}
    .Member{
        max-width: 1200px;
        margin:0 auto;
        font-size: 0;
    }
    .dings{display: inline-block;width: 25%;}
        .installNei{
            input{border:1px solid #b0b0b0;border-radius: 0;height:23px;}
            margin:3px 0 0 14px;
            #tit{
                .zhang{display: flex;}
                .xiu .z_spe{width: 135px;margin-left: 8px;}
                .newpassword{margin:29px 0;}
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
                .mingzi{ margin:27px 0 22px;}
                .genders{
                    div{font-size: 14px;margin-right: 60px;}
                    input{
                        height: 14px;
                        vertical-align: top;
                        margin-top: 4px;
                    }
                    p{line-height: 19px;}
                }
                .emails{margin:23px 0 20px;}
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
                        margin-right: 11px;
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
        .gopingjia{
            margin-left: 14px;
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
                        color: #ffd700;
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
        .assessNei{
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
            }
            .danhao{
                margin:20px 0 17px;
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
        .page{
            display: flex;
            div{margin:0 auto;display: flex;}
            button{
                height: 36px;
                width: 68px;
                color: #ccc;
                border:1px solid #ccc;
                background-color: #fff;
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
        .myorder{margin-top:37px;}
        .myassess{margin-top:34px;}
        .huiyuan{padding-left: 8px;}
        .orderNei{margin-left: 14px;}
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
        #createTiem{
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
            div{display: flex;}
            cursor: pointer;
            &:hover{background-color: #e9e9e9;}
            .cholink{
                font-size: 18px;
                line-height: 50px;
                white-space: nowrap;
            }
        }
        .liespe{background-color: #e9e9e9;}
        .order{
            span{
                width: 22px;
                height:22px;
                background: url(../../static/u5092.png) no-repeat;
                margin:14px 12px 14px 56px;
            }
        }
        .assess span{
            width: 23px;
            height:19px;
            background: url(../../static/u5098.png) no-repeat;
            margin:17px 11px 14px 56px;
        }
        .install span{
            width: 26px;
            height:24px;
            background: url(../../static/u5102.png) no-repeat;
            margin:12px 9px 14px 55px;
        }
    @media screen and (max-width: 768px){
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
                span{margin:14px 14.8% 14px 17px;}
                p{
                    line-height: 50px;
                    font-size: 26px;
                    margin-right: 26px;
                }
            }
    }
</style>