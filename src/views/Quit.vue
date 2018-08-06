<template>
    <div class="Member">
        <p class="intro hidden-xs-only">首页 / 个人主页</p>
        <el-row>
            <el-col :sm="5" :xs={span:20,offset:2}>
                <div class="user">
                    <span class="touxiang"></span>
                    <div><div class="king">
                        <router-link to="/outter/zhuce" class="phozhu">注册</router-link>
                        <router-link to="/outter/login" class="phodeng">登录</router-link>
                    </div></div>
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
            </el-col>
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
        </el-row>
    </div>
</template>

<script>
import city from '../components/City'
export default {
  name: 'Quit',
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
    // span{display: inline-block;}
    @media screen and (max-width: 768px){
        .Member{
            .user{
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
        }
    }
</style>