
<template>
    <div>

        <el-row :gutter='10' class="row">
            <el-col :span="24">
                <p>首页</p>
            </el-col>
            <el-col :span="19">
                <div>
                    <div class="top-box">
                        <el-row class="line">
                            <el-col :span="3">
                                <div class="classify">服务分类</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box">
                                    <div v-for="(item,index1) in items" v-bind:class="{blue:index1==current1}" class="serviceClassify" :value="item" :key="index1" @click="sort1(index1,$event)">{{item}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="line">
                            <el-col :span="3">
                                <div class="classify">类型</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box">
                                    <div v-bind:class="{blue:index2==current2}" class="serviceClassify" :value="item" v-for="(item,index2) in classify" :key="index2" @click="sort2(index2,$event)">{{item}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <div class="classify">服务区域</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box"></div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="bottom-box">
                        <div class="sort-box">
                            <div v-for="(todo, index3) in todos" :key="index3" v-bind:class="{blue:index3==current3}" class="sort " @click="sort3(index3,$event)">{{ todo.text }}
                                <ul></ul>
                            </div>
                            <!-- <div v-bind:class="{blue:2==current}" @click="sort(2)">价格</div> -->
                        </div>
                        <div class="product">
                            <div>
                                <span>商品</span>
                                <span>价格</span>
                            </div>
                        </div>
                        <div class="good-list"  v-for="(item,index) in thisProduct" :key="index">
                            <el-row>
                                <el-col :span="18">
                                    <div class="list-left">
                                        <el-col :span="4"  v-if="item['productImg']"><img :src="item.productImg" @error="isHasImg(item)"  class="proImg"></el-col>
                                        <div class="proInfo">
                                            <p v-if="item['errorInfo']" class="errorInfo">{{item['errorInfo']}}</p>
                                            <h3  v-if="item['serviceName']">{{item['serviceName']}}</h3>
                                            <p  v-if="item['serviceInfo']">{{item['serviceInfo']}}</p>
                                            <p  v-if="item['regionName']">{{item['regionName']}}</p>
                                        </div>
                                    </div>
                                </el-col>

                                <el-col :span="6" v-if="item['price']">
                                    <div class="list-right">
                                        <p>￥ {{item['price']}}.00</p>
                                        <div>
                                            <button :id="item['id']" @click="buy($event)">立即购买</button>
                                            <button :id="item['id']" @click="cart($event)">加入购物车</button>
                                        </div>
                                    </div>
                                </el-col>
                                <p class="error">当前选项无内容</p>
                            </el-row>
                        </div>
                        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
                        <transition
                            name="custom-classes-transition"
                            enter-active-class="animated bounceOutRight"
                            leave-active-class="animated bounceOutRight">
                            <div v-if="show" class="cart-count">hello</div>
                        </transition>
                    </div>
                    <div class="pagebox">
                        <div class="pageUp" @click="up">上一页</div>
                        <div>{{page}}</div>
                        <div class="pageDown"  @click="down">下一页</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <!-- <div class="promise-box"></div> -->
                <div>
                    <img :src="url" alt="" class="rightImg">
                </div>

            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    name: "Outter",
    data() {
        return {
            page:1,
            length:0,
            current1: 0,
            current2: 0,
            current3: 0,
            todos: [{ text: "综合排序" }, { text: "价格" }],
            url: "../static/u684.23c4d55.png",
            goodImg: [],
            items: [],
            classify: [],
            serviceName: "",
            serviceInfo: "",
            regionName: "",
            price: "",
            currentTarget: "",
            currentTarget1: "",
            serviceClassify: [],
            typeList: "",
            product: '',
            thisProduct:[],
            temporaryList:'',
            firstLevel: "知识产权",
            productTypeCode: "",
            classifyName: "1eff122d06604fc1aadf9e7acefba21a",
            menuList: "",
            nowTestlist: '',
            obj: {
                productTypeCode: "0",
                productId: "24d919ba0eb545dd9a3132dfb87cf599"
            },
            add:{
                id:'0cb85ec6b63b41fc8aa07133b6144ea3',
                num:'1'
            },
            show: ''
        };
    },
    created() {
        var that = this;
        this.ajax.post("/xinda-api/product/style/list").then(function(data) {
            var classify1 = [];
            var newData = data.data.data;
            for (let key in newData) {
                var myData = newData[key];
                if (myData["name"] == that.firstLevel) {
                    that.typeList = myData.itemList;
                    var secondlevel = myData.itemList;
                    for (let key in secondlevel) {
                        that.items.push(secondlevel[key]["name"]); 
                    }
                }
            }
            for(let key in secondlevel){
                if(secondlevel[key]['name'] == '专利申请'){
                    var thirdName = secondlevel[key].itemList
                    for(let key in thirdName){
                        that.classify.push(thirdName[key]['name'])
                    }
                }       
            }
            
        });
        that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                
                that.temporaryList = data.data.data;
                that.length = Math.ceil(that.temporaryList.length/3)
                that.thisProduct = that.temporaryList.slice(0,3)
                if( that.thisProduct.length == 0){
                    that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                }else{
                    var production = that.thisProduct;
                    for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }
                
            })
    },
    components: {},
    methods: { 
        sort1(index1, event) {
            this.show = '';
            this.page = 1;
            this.classify = [];
            this.current1 = index1;
            this.currentTarget = event.currentTarget.innerHTML;
            this.productTypeCode = event.currentTarget;
            var testlist = this.typeList;
            for(let key in testlist){
                if(this.currentTarget == testlist[key]['name']){
                    this.nowTestlist = testlist[key];
                    var newtestlist = testlist[key].itemList;
                    for(let key in newtestlist){
                        this.classify.push(newtestlist[key]['name'])
                    }
                }
            }

            var that = this;
            var productList = that.nowTestlist;
            for(let key in productList){
                if(productList['name'] == that.currentTarget){
                    that.obj.productTypeCode = productList['code'];
                    that.obj.productId = '';
                }
            }
            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                that.length = Math.ceil(that.temporaryList.length/3)
                that.thisProduct = that.temporaryList.slice(0,3)
                if( that.thisProduct.length == 0){
                    that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                }else{
                    var production = that.thisProduct;
                        for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                        
                    
                }
            
            })
            document.querySelector('.pageDown').style = 'cursor:pointer'
            document.querySelector('.pageUp').style = 'cursor:no-drop'
           
        },
        sort2(index2, event) {
            this.show = '';
            this.page = 1;
            var that = this; 
            that.current2 = index2;
            that.currentTarget1 = event.currentTarget.innerHTML;
            var productList = that.nowTestlist.itemList;
            for(let key in productList){
                if(productList[key]['name'] == that.currentTarget1){
                    that.obj.productId = productList[key]['id'];
                }
            }
            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                that.length = Math.ceil(that.temporaryList.length/3)
                that.thisProduct = that.temporaryList.slice(0,3)
                if( that.thisProduct.length == 0){
                    that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                }else{
                    var production = that.thisProduct;
                    for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }
            })
            document.querySelector('.pageUp').style = 'cursor:no-drop'
            document.querySelector('.pageDown').style = 'cursor:no-drop'
        },
         isHasImg(item) {
            item.productImg = "../static/errorImg.png";
        },
        sort3(index3, event) {
            this.current3 = index3;
        },
        buy(event){
            console.log(event.currentTarget.id)
            var that = this
            that.add.id = event.currentTarget.id

            that.ajax.post(
                "/xinda-api/cart/add",
                that.qs.stringify(that.add)
            ).then(function(data){
                console.log(data)
            })
        },
        cart(event){
            
            this.show = true
            var Div=document.createElement('div');
            Div.innerHTML = '1111'
            // console.log(event.clientY)
            Div.style.position = 'absolute'
            Div.style.left=(event.offsetX + 100)+'px';    
            Div.style.top=(event.offsetY + 100)+'px';    
            document.querySelector('.list-right').appendChild(Div); 
            // var Div = document.querySelector('.cart-count')
            
        },
        up(){
            document.querySelector('.pageDown').style = 'cursor:pointer'
            this.page -=1;
            if(this.page == 1){
                this.thisProduct = this.temporaryList.slice(0,3)
                document.querySelector('.pageUp').style = 'cursor:no-drop'
            }else if(this.page == 2){
                this.thisProduct = this.temporaryList.slice(3,6)
            }else{
                this.page = 1;
            }
        },
        down(){
            this.page +=1;
            document.querySelector('.pageUp').style = 'cursor:pointer'
            if(this.page<this.length){
                
                if(this.page == 2){
                    this.thisProduct = this.temporaryList.slice(3,6)
                    var production = this.thisProduct;
                        for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }
            }else if(this.page==this.length){
                if(this.page == 2){
                    this.thisProduct = this.temporaryList.slice(3,6)
                    var production = this.thisProduct;
                        for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }
                if(this.page == 3){
                     this.thisProduct = this.temporaryList.slice(7,10)
                     var production = this.thisProduct;
                        for(let key in production){
                        var pro = production[key]['productImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }
                document.querySelector('.pageDown').style = 'cursor:no-drop'
            }else{
                this.page = this.length
            }
        }
    },
    watch: {

    },
    computed: {}

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.blue {
    background: #2693d6;
    color: #fff;
}
.row {
    max-width: 1200px;
    margin: 0 auto !important;
}
.top-box {
    border: 1px solid #dcdfe6;
    margin-top: 3px;
}

.line {
    border-bottom: 1px solid #dcdfe6;
}
.classify {
    font-weight: 600;
    line-height: 40px;
    text-align: center;
}
.header-box {
    border-left: 1px solid #dcdfe6;
    padding: 5px 50px 5px 10px;
    display: flex;
    flex-wrap: wrap;
    .serviceClassify {
        line-height: 18px;
        font-size: 13px;
        padding: 5px 12px;
        //border: 1px solid #DCDFE6;
        border-radius: 5px;
        cursor: pointer;
    }
}

.bottom-box {
    margin-top: 20px;
    border: 1px solid #dcdfe6;
    .sort-box {
        display: flex;
        border-bottom: 1px solid #dcdfe6;
        .sort {
            width: 105px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            position: relative;
            //    background: #2693d6;
            cursor: pointer;
            ul {
                left: 45%;
                position: absolute;
                border: 6px solid transparent;
                border-top: 6px solid #2693d4;
                opacity: 0;
            }
        }
    }
}
.product {
    padding: 0 10px;

    div {
        border-bottom: 1px solid #dcdfe6;
        height: 45px;
        display: flex;
        justify-content: space-between;
        span {
            padding: 0 20px;
            line-height: 45px;
            font-size: 14px;
        }
    }
}
.good-list {
    height: 120px;
    padding: 0 10px;
    .el-row {
        display: flex;
        justify-content:center;
        border-bottom: 1px solid #dcdfe6;
    }
    .list-left {
        height: 120px;
        display: flex;
        align-items: center;
        // justify-content: center;
        .el-col-4 {
            height: 100px;
            border: 1px solid #dcdfe6;
            display: flex;
            align-items: center;
            justify-content: center;
            .proImg {
                width: 100%;
                height: 110%;
            }
        }
        .proInfo {
            height: 100px;
            width: 81%;
            padding-left: 10px;
            h3 {
                line-height: 30px;
                margin-bottom: 5px;
            }
            p {
                font-size: 14px;
                color: #909399;
                line-height: 30px;
                margin-bottom: 10px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1;
            }
            .errorInfo{
                font-size: 40px;
                line-height: 110px;
                margin-bottom: 0;
                display: flex;
                justify-content: center;
                color: #dcdfe6;
            }
        }
    }
    .list-right {
        position: relative;
        p {
            font-size: 24px;
            line-height: 40px;
            color: #f00;
            text-align: end;
            padding: 10px 20px 10px 0;
        }
        div {
            display: flex;
            justify-content: flex-end;
            button {
                font-size: 14px;
                color: #fff;
                background: #2693d6;
                padding: 5px 10px;
                border: 0;
                border-radius: 3px;
                margin-left: 10px;
                cursor: pointer;
            }
        }
        .cart-count{
            position: absolute;
            
        }
    }
    .error{
        display: none;
        font-size: 40px;
        text-align: center;
        line-height: 110px;
        color:#dcdfe6;
    }
}
.rightImg {
    width: 100%;
}
.pagebox{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    div{
        padding: 5px 10px;
        border: 1px solid #5aa3dd;
        margin-left: 10px;
        color: #5aa3dd;
    }
    .pageUp,.pageDown{
        cursor: pointer;
    }
}
</style>
