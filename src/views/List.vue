
<template>
    <div>

        <el-row :gutter='10' class="row">
            <el-col :span="24" v-if="show" class="hidden-xs-only">
                <p>首页/{{homePage}}</p>
            </el-col>
            <el-col :sm="19" :xs="24">
                <div>
                    <div class="top-box hidden-xs-only" v-if="show">
                        <el-row class="line">
                            <el-col :span="3">
                                <div class="classify">服务分类</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box">
                                    <div v-for="(item,index1) in items" v-bind:class="{blue:index1==current1}"  class="serviceClassify" :value="item" :key="index1" @click="sort1(index1,$event)">{{item}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="line">
                            <el-col :span="3">
                                <div class="classify">类型</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box">
                                    <div v-bind:class="{blue:index2==current2}" class="serviceClassify" :value="item" v-for="(item,index2) in classify" :key="index2" @click="sort2(index2,$event)" >{{item}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <div class="classify">服务区域</div>
                            </el-col>
                            <el-col :span="21">
                                <div class="header-box">
                                    <city @confirm="confirm" display="12345" ref="notice_add"></city>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="xs-sortBox hidden-sm-and-up">
                        <div v-for="(todo, index3) in todos" :key="index3" v-bind:class="{blue:index3==current3}" class="sort" @click="sortprice(index3,$event)">{{ todo.text }}<li :id="index3" v-show="index3==1" class="el-icon-sort-up"></li><li :id="index3" v-show="index3==1" class="el-icon-sort-down"></li> </div>
                    </div>
                    <div class="bottom-box">
                        <div class="sort-box hidden-xs-only">
                            <div v-for="(todo, index3) in todos" :key="index3" v-bind:class="{blue:index3==current3}" class="sort " @click="sortprice(index3,$event)">{{ todo.text }}<li :id="index3" v-show="index3==1" class="el-icon-sort-up"></li><li :id="index3" v-show="index3==1" class="el-icon-sort-down"></li> </div>
                        </div>
                        <div class="product">
                            <div>
                                <span>商品</span>
                                <span>价格</span>
                            </div>
                        </div>
                        <div class="good-list"  v-for="(item,index) in thisProduct" :key="index">
                            <el-row>
                                <el-col :md="18"  :sm="16">
                                    <div class="list-left">
                                        <el-col :md="4" :sm="5" :xs="0" v-if="item['productImg']"><img :src="item['productImg']" @error='errorImage(item)'  class="proImg"></el-col>
                                        <el-col :md="20" :sm="19" :xs="24"><div class="proInfo">
                                            <p v-if="item['errorInfo']" class="errorInfo">{{item['errorInfo']}}</p>
                                            <h3  v-if="item['serviceName']"><router-link :to="{path:'/goodsdetail',query:{id:item.id}}">{{item['serviceName']}}</router-link></h3>
                                            <p  v-if="item['serviceInfo']">{{item['serviceInfo']}}</p>
                                            <div class="xs-flex" v-if="item['serviceInfo']">
                                                <p  v-if="item['regionName']">{{item['regionName']}}</p>
                                                 <p class="hidden-sm-and-up">￥ {{item['price']}}.00<span>元</span></p>
                                            </div>
                                        </div></el-col>
                                    </div>
                                </el-col>

                                <el-col :md="6" :sm="8" v-if="item['price']" class="hidden-xs-only">
                                    <div class="list-right">
                                        <p>￥ {{item['price']}}.00</p>
                                        <div>
                                            <button :id="item['id']" @click="buy($event)">立即购买</button>
                                            <button :id="item.id" @click="cart($event)">加入购物车</button>
                                        </div>
                                    </div>
                                </el-col>
                                <p class="error">当前选项无内容</p>
                            </el-row>
                        </div>
                       <el-col :xs="24"><p v-show="isShow" class="moreload">{{loadText}}</p></el-col>
                    </div>
                    <div class="pagebox hidden-xs-only">
                         <page @change="pageChange" :parentCount="parentCount" ref="pagemore"></page>
                    </div>
                    
                </div>
            </el-col>
            <el-col :span="5">
                <div>
                    <img :src="url" alt="" class="rightImg hidden-xs-only" >
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import city from '../components/City'
import page from '../components/Page'
export default {
    
    name: "Outter",
    data() {
        return {
            loadText:' loading...',
            isShow: false,
            homePage:this.$route.query.name,
            page:1,
            // length:0,
            current1: 0,
            current2: -1,
            current3: 0,
            todos: [{ text: "综合排序" }, { text: "价格" }],
            url: "../../static/u684.23c4d55.png",
            goodImg: [],
            items: [],
            classify: [],
            currentTarget: "",
            currentTarget1: "",
            typeList: "",
            thisProduct:[],
            temporaryList:'',
            firstLevel: "",
            productTypeCode: "",
            nowTestlist: '',
            obj: {
                productTypeCode: "",
                productId: "",
                limit: 5,
                start: 0,
                sort: ''
            },
            newCode: '',
            buyAdd:{
                id:'0cb85ec6b63b41fc8aa07133b6144ea3',
                num:1
            },
            cartAdd:{
                id: '',
                num:0
            },
            id: 0,
            code: '',
            index1:'',
            Data: '',
            // name: '',
            storageCode: [],
            list:'',
            thirdName:'',
            region:'',
            searchName:'',
            searchAdd:{
                start:0,
                limit:5,
                searchName:'',
                sort: ''
            },
            show: true,
            parentCount:{
                pageSize : 5 , //每页显示6条数据
                currentPage : 1, //当前页码
                limit:5,
                pageIndex:1,
                all:1,
                perPages:1  //页面中显示的页码数只能为单数
                    },
            flag:0 ,
            start:4,
            screenWidth: document.body.clientWidth,
            loginStatus:0
        };
    },
    created() {
        var that = this
        that.ajax.post(
                    "/xinda-api/sso/login-info",
                    that.qs.stringify({})
                ).then(function(data){
                    // 未登陆
                    if(data.data.status==0){
                        that.loginStatus = 0;
                    }else{
                        that.loginStatus = 1;
                    }
                });            
        if(this.homePage=="财税服务"){
            [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,true,false,false,false]
        }else if(this.homePage=="公司工商"){
            [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,false,true,false,false]
        }else{
            [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,false,false,false,false]
        }
        this.firstLevel=this.$route.query.name;
        this.id = this.$route.query.id;
        this.code = this.$route.query.code;
        this.searchAdd.searchName = this.$route.query.searchName
        this.searchAdd.start = 0
        if(this.$route.query.index>=0){
            this.current1 = this.$route.query.index
        }else{
            this.current1 = this.$route.query.index2
            this.current2 = this.$route.query.index3
        }
        var that = this;
        if(this.$route.query.searchName == undefined){
            this.ajax.post("/xinda-api/product/style/list").then(function(data) {
                var classify1 = [];
                that.Data = data.data.data
                var newData = that.Data;
                //服务分类渲染      
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
                //点击一级 类型渲染
                if(that.code == undefined){
                    var secondName = []
                    for(let key in secondlevel){
                        secondName.push(that.typeList[key]['name'])
                        that.storageCode.push(that.typeList[key]["code"])
                        that.newCode = that.storageCode[0];
                        that.obj.productTypeCode = that.newCode
                        that.obj.productId = ''
                        if(that.typeList[key]['name'] == secondName[0]){
                            var thirdName = that.typeList[key]
                            var level2 = []
                            for(let key in thirdName.itemList){
                                level2.push(thirdName.itemList[key].name)
                                if(thirdName.itemList[key]['name'] == level2[0]){
                                    that.nowTestlist = thirdName
                                }
                                that.classify.push(thirdName.itemList[key]['name'])
                            }
                        }
                    }       
                }
                //点击二级 类型渲染
                else if(that.id == undefined){
                    that.obj.productTypeCode = that.code
                    that.obj.productId = '' 
                    for(let key in secondlevel){
                        if(that.code == secondlevel[key]['code']){
                            var storage = secondlevel[key].itemList
                            that.nowTestlist = secondlevel[key]
                            for(let key in storage){
                                that.classify.push(storage[key].name)
                            }
                        }
                    }
                }else{
                    that.obj.productTypeCode = 0
                    that.obj.productId = that.id
                    for(let key in secondlevel){
                        var thirdlevel = secondlevel[key].item
                        if(that.code == secondlevel[key]['code']){
                            var storage = secondlevel[key].itemList
                            that.nowTestlist = secondlevel[key]
                            for(let key in storage){
                                that.classify.push(storage[key].name)
                            }
                        }
                    }
                }
                //符合请求的宣布数据数量
                that.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify({
                        productTypeCode : that.obj.productTypeCode,
                        productId : that.obj.productId 
                    })
                )
                .then(function(data) {
                    that.parentCount.all=data.data.data.length
                })
                that.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify(that.obj)
                )
                .then(function(data) {
                    that.temporaryList = data.data.data;
                    that.thisProduct = that.temporaryList
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
                
            });
        }else{
            //搜索页面渲染
            // this.ajax.post("/xinda-api/product/style/list").then(function(data) {
            //     that.Data = data.data.data
            // })
            this.show = false;
            that.ajax.post(
                    "/xinda-api/product/package/search-grid",
                    that.qs.stringify({
                        searchName:that.searchAdd.searchName
                    })
            ).then(function(data) {
                that.parentCount.all=data.data.data.length
                if(that.parentCount.all == 0){
                    that.parentCount.all = 1
                }
            })
            this.ajax.post(
                    "/xinda-api/product/package/search-grid",
                    that.qs.stringify(that.searchAdd)
            )
            .then(function(data){
                that.thisProduct = data.data.data
                if(that.thisProduct.length == 0){
                    that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                }else{
                    var production = that.thisProduct;
                    for(let key in production){
                        var pro = production[key]['providerImg']
                        pro = "http://123.58.241.146:8088/xinda/pic" + pro
                        production[key]['productImg'] = pro
                    }
                }                
            })
        }
    },
    mounted(){
        //监听屏幕大小
        if(document.body.offsetWidth<=762){
            window.addEventListener('scroll', this.scrollBottom)
        }

        const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
       
    },
    components: {
        city,
        page
    },
    methods: {
        //图片报错
        errorImage(item){
            item.productImg = "../../static/errorImg.png";
        },
        //滚动高度
        getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
 
        // 获取当前可视范围的高度
        getClientHeight() {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight,
                        document.documentElement.clientHeight);
            } else {
                clientHeight = Math.max(document.body.clientHeight,
                        document.documentElement.clientHeight);
            }
            return clientHeight;
        },
 
        // 获取文档完整的高度
        getScrollHeight() {
            return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
        },
        scrollBottom(){ 
            var that = this
            if (this.getScrollTop()+ this.getClientHeight() == this.getScrollHeight()) {
                //到达底部
                this.start++
                this.page++
                this.isShow = true
                if(that.thisProduct.length<that.parentCount.all){
                    this.ajax.post('/xinda-api/product/package/grid',that.qs.stringify(
                        {
                            start:that.start,
                            limit:1,
                            providerId: that.obj.productId,
                            productTypeCode: that.obj.productTypeCode,
                        }
                    )).then(function(data){
                        for(let key in data.data.data){
                            that.thisProduct.push(data.data.data[key])
                            if(that.thisProduct.length == that.parentCount.all){
                                that.loadText = 'No more loading'
                            }
                        }    
                    });
                }
                if(that.thisProduct.length == that.parentCount.all){
                     that.isShow = false;
                }
            }
        },
        //分页器组件
        pageChange (page) {
            document.documentElement.scrollTop = 200;
            this.currentPage = page
            var that = this;
            if(this.searchAdd.searchName == '' || this.searchAdd.searchName == undefined){
                if(that.obj.sort==2 || that.obj.sort == 3){
                    this.thisProduct = this.temporaryList.slice((page-1)*5,(page-1)*5+5)
                }else{
                    that.ajax.post('/xinda-api/product/package/grid',that.qs.stringify(
                        {
                            start:(page-1)*5,
                            limit:5,
                            providerId: that.obj.productId,
                            productTypeCode: that.obj.productTypeCode,
                        }
                        )).then(function(data){
                            that.thisProduct=data.data.data
                            var production = that.thisProduct;
                            for(let key in production){
                                var pro = production[key]['productImg']
                                pro = "http://123.58.241.146:8088/xinda/pic" + pro
                                production[key]['productImg'] = pro
                        }
                    });
                }
            }else{
                if(that.searchAdd.sort==2 || that.searchAdd.sort == 3){
                     this.thisProduct = this.temporaryList.slice((page-1)*5,(page-1)*5+5)
                }else{
                    that.ajax.post('/xinda-api/product/package/search-grid',that.qs.stringify(
                    {
                        start:(page-1)*5,
                        limit:5,
                        searchName: that.searchAdd.searchName
                    })).then(function(data){
                        that.thisProduct=data.data.data
                        var production = that.thisProduct;
                        for(let key in production){
                            var pro = production[key]['providerImg']
                            pro = "http://123.58.241.146:8088/xinda/pic" + pro
                            production[key]['productImg'] = pro
                        }
                    });
                }
            }
        }, 
        //点击服务分类渲染
        sort1(index1, event) {
            document.getElementsByClassName('el-icon-sort-up')[1].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-down')[1].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-up')[3].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-down')[3].setAttribute('style','color:#000')
            this.flag = 0
            this.show = true
            this.$refs.pagemore.go(1)
            this.parentCount.currentPage = 1;
            this.parentCount.all = ''
            this.current3 = 0;
            this.$refs.notice_add.provinceCode = ''
            this.$refs.notice_add.cityCode = ''
            this.$refs.notice_add.areaCode = ''
            this.page = 1;
            this.classify = [];
            this.current1 = index1;
            this.current2 = -1;
            this.currentTarget = event.currentTarget.innerHTML;
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
                that.qs.stringify({
                    productTypeCode : that.obj.productTypeCode,
                    productId : that.obj.productId 
                })
            )
            .then(function(data) {
                 that.parentCount.all=data.data.data.length
                 if(that.parentCount.all == 0){
                    that.parentCount.all = 1
                }
            })
            that.obj.sort = ''
            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                that.thisProduct = that.temporaryList
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
        //点击类型渲染
        sort2(index2, event) {
            document.getElementsByClassName('el-icon-sort-up')[1].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-down')[1].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-up')[3].setAttribute('style','color:#000')
            document.getElementsByClassName('el-icon-sort-down')[3].setAttribute('style','color:#000')
            this.flag = 0
            this.show = true
            this.$refs.pagemore.go(1)
            this.parentCount.currentPage = 1;
            this.parentCount.all = ''
            this.current3 = 0;
            this.$refs.notice_add.provinceCode = ''
            this.$refs.notice_add.cityCode = ''
            this.$refs.notice_add.areaCode = ''
            this.page = 1;
            var that = this; 
            that.current2 = index2;
            that.currentTarget1 = event.currentTarget.innerHTML;
            var productList = that.nowTestlist.itemList;
            for(let key in productList){
                if(productList[key]['name'] == that.currentTarget1){
                     
                    that.obj.productId = productList[key]['id'];
                    that.obj.productTypeCode = 0;
                }
            }
            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify({
                    productTypeCode : that.obj.productTypeCode,
                    productId : that.obj.productId 
                })
            )
            .then(function(data) {
                that.parentCount.all=data.data.data.length
                if(that.parentCount.all == 0){
                    that.parentCount.all = 1
                }
            })

            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                that.thisProduct = that.temporaryList
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
        //价格排序
        sortprice(index3, event) {
            this.$refs.pagemore.go(1)
            this.current3 = index3
            this.flag++;
            if(this.current3 == 0){
                this.flag = -1;
                document.getElementsByClassName('el-icon-sort-up')[1].setAttribute('style','color:#000')
                document.getElementsByClassName('el-icon-sort-down')[1].setAttribute('style','color:#000')
                document.getElementsByClassName('el-icon-sort-up')[3].setAttribute('style','color:#000')
                document.getElementsByClassName('el-icon-sort-down')[3].setAttribute('style','color:#000')
                this.obj.sort = ''
                this.flag = 0
            }
            if(this.flag == 1){
                this.obj.sort = 2
                this.searchAdd.sort = 2
                document.getElementsByClassName('el-icon-sort-up')[1].setAttribute('style','color:#fff')
                document.getElementsByClassName('el-icon-sort-down')[1].setAttribute('style','color:#3171b4')
                document.getElementsByClassName('el-icon-sort-up')[3].setAttribute('style','color:#fff')
                document.getElementsByClassName('el-icon-sort-down')[3].setAttribute('style','color:#3171b4')
            }else if(this.flag > 1){
                this.obj.sort = 3
                this.searchAdd.sort = 3
                this.flag = 0
                document.getElementsByClassName('el-icon-sort-up')[1].setAttribute('style','color:#3171b4')
                document.getElementsByClassName('el-icon-sort-down')[1].setAttribute('style','color:#fff')
                document.getElementsByClassName('el-icon-sort-up')[3].setAttribute('style','color:#3171b4')
                document.getElementsByClassName('el-icon-sort-down')[3].setAttribute('style','color:#fff')
            }
            var that = this
            if(this.searchAdd.searchName == '' || this.searchAdd.searchName == undefined){
                that.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify({
                        productTypeCode : that.obj.productTypeCode,
                        productId : that.obj.productId,
                        sort :  that.obj.sort
                    })
                )
                .then(function(data) {
                    that.parentCount.all=data.data.data.length
                    if(that.parentCount.all == 0){
                        that.parentCount.all = 1
                    }
                    that.temporaryList = data.data.data
                    that.thisProduct = that.temporaryList.slice(0,5)
                    if(that.thisProduct.length == 0){
                        that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                    }else{
                        var production = that.temporaryList;
                        for(let key in production){
                            var pro = production[key]['productImg']
                            pro = "http://123.58.241.146:8088/xinda/pic" + pro
                            production[key]['productImg'] = pro
                        }
                    }
                })
            }else{
                that.ajax.post('/xinda-api/product/package/search-grid',that.qs.stringify(
                    {
                    searchName: that.searchAdd.searchName,
                    sort :  that.searchAdd.sort,
                    sort:that.obj.sort
                    }
                    )).then(function(data){
                        that.parentCount.all=data.data.data.length
                        if(that.parentCount.all == 0){
                            that.parentCount.all = 1
                        }
                        that.temporaryList=data.data.data
                        that.thisProduct = that.temporaryList.slice(0,5)
                        if(that.thisProduct.length == 0){
                    that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                    }else{
                        var production = that.temporaryList;
                        for(let key in production){
                            var pro = production[key]['providerImg']
                            pro = "http://123.58.241.146:8088/xinda/pic" + pro
                            production[key]['productImg'] = pro
                        }
                    }
                });
            }
        },
        //立即购买
        buy(event){
            var that = this
            that.buyAdd.id = event.currentTarget.id
            // 登录判断
            // that.ajax.post(
            //         "/xinda-api/sso/login-info",
            //         that.qs.stringify({})
            //     ).then(function(data){
            //         // 未登陆
                    if(this.loginStatus==0){
                        that.open2();
                    }else{
                         // 已登录则向购物车列表发送数据
                        that.$router.push('/shoppingcart')
                        that.ajax.post(
                            "/xinda-api/cart/add",
                            that.qs.stringify(that.buyAdd)
                        ).then(function(data){
                        })
                    }
                // });             
            
        },
        //加入购物车
        cart(event){
            var that = this
            var id = event.currentTarget.id
            // that.ajax.post(
            //     "/xinda-api/sso/login-info", 
            //     that.qs.stringify({})
            // ).then(function(data){
            //     // 未登陆
                if(this.loginStatus==0){
                    that.open2();
                }else{
                    that.$confirm('是否加入购物车', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确定加入购物车
                            that.cartAdd.id = id
                            that.cartAdd.num = 1;
                            that.ajax.post(
                                "/xinda-api/cart/add",
                                that.qs.stringify(that.cartAdd)
                            ).then(function(data){
                                that.$message({
                                    type: 'success',
                                    showClose: true,
                                    message: '已加入购物车'
                                }); 
                            })                 
                    }).catch(() => {
                        //取消
                        that.$message({
                            type: 'info',
                            message: '未加入购物车'
                        });          
                    });
                }
            // });       
        },
        //服务区域
        confirm(value){
            this.thisProduct = ''
            this.region = value
            var that = this;
            if(this.region == ''){
                //点击--区-- 未选择地区
                that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify({
                    productTypeCode : that.obj.productTypeCode,
                    productId : that.obj.productId 
                })).then(function(data) {
                    that.parentCount.all=data.data.data.length
                    })
                that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
                ).then(function(data) {
                    that.temporaryList = data.data.data;
                    that.thisProduct = that.temporaryList
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
            }else{
                //选择地区
                that.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify({
                        productTypeCode : that.obj.productTypeCode,
                        productId : that.obj.productId 
                    })
                )
                .then(function(data) {
                    that.parentCount.all=data.data.data.length
                    if(that.parentCount.all == 0){
                        that.parentCount.all = 1
                    }
                    var count = 0
                    that.temporaryList = data.data.data;
                    for(let key in that.temporaryList){
                        if(that.temporaryList[key].regionId == that.region){
                            count++
                        }
                    }
                    if(count == 0){
                        //该地区无产品
                        that.parentCount.all = 1
                        that.temporaryList = {0:{errorInfo:'当前选项无内容'}}
                        that.thisProduct = that.temporaryList
                    }else{
                        //有产品渲染
                        that.ajax.post(
                            "/xinda-api/product/package/grid",
                            that.qs.stringify(that.obj)
                        )
                        .then(function(data) {
                            that.temporaryList = data.data.data;
                            for(let key in that.temporaryList){
                                if(that.temporaryList[key].regionId == that.region){
                                    that.thisProduct = that.temporaryList
                                    var production = that.thisProduct
                                }
                            }
                            for(let key in production){
                                var pro = production[key]['productImg']
                                pro = "http://123.58.241.146:8088/xinda/pic" + pro
                                production[key]['productImg'] = pro
                            }
                        })
                    }
                })
            }
        }, 
        //未登录跳转
        open2() {
            var that=this;
            this.$confirm('您需要登陆才能进行此操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$router.push({path:'/outter/login',query:{pan:123}});
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消登陆'
                });          
            });
        },
    },
    watch: {
        //监听屏幕宽度
         screenWidth (val,oldval) {
            this.screenWidth = val
            //手机端渲染
            if(val<=762){
                window.addEventListener('scroll', this.scrollBottom)
            }
                    
        },


        //路由跳转
        $route(val,oldval){
            this.items = []
            this.classify = []
            this.show = true
            this.parentCount.currentPage = 1;
            this.parentCount.all = ''
            this.homePage = this.$route.query.name
            this.current3 = 0;
            this.firstLevel=this.$route.query.name;            
            this.code = val.query.code;
            this.id = val.query.id;
            this.searchAdd.searchName = val.query.searchName
            this.searchAdd.start = 0
            var that = this
            this.storageCode = []
            this.classify = []
            this.page = 1;
            if(this.homePage=="财税服务"){
                [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,true,false,false,false]
            }else if(this.homePage=="公司工商"){
                [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,false,true,false,false]
            }else{
                [this.$parent.nav,this.$parent.nav1,this.$parent.nav2,this.$parent.nav3,this.$parent.nav4] = [false,false,false,false,false]
            }
            //二三级列表默认选择
            if(val.query.index2 == undefined && val.query.code == undefined){
                this.current1 = val.query.index
            }else if(val.query.index2 == undefined && val.query.code != undefined){
                this.current1 = val.query.index;
                this.current2 = 0;
            }else{
                this.current1 = val.query.index2;
                this.current2 = val.query.index3
            }
            if(this.id == undefined && this.code == undefined){
                this.current2=-1
                this.firstLevel=val.query.name;
                
            }else if(this.id == undefined && this.code != undefined ){
                this.current2=-1
                this.firstLevel=val.query.name;
                this.code = val.query.code;
            }else{
                this.firstLevel=val.query.name;
                this.code = val.query.code;
                this.id = val.query.id
            }
            //服务分类渲染
            var newData = this.Data;
            for (let key in newData) {
                var myData = newData[key];
                if (myData["name"] == this.firstLevel) {
                    this.typeList = myData.itemList;
                    var level2 = []
                    for (let key in this.typeList) {
                        level2.push(this.typeList[key].name)
                        
                        if(this.typeList[key]["name"] == level2[0]){
                            this.nowTestlist = this.typeList[key]
                        }
                        this.items.push(this.typeList[key]["name"]); 
                        this.storageCode.push(this.typeList[key].code)
                        this.obj.productTypeCode = this.typeList[key].code
                        this.obj.productId = ''
                    }          
                }
            }
            //类型渲染
            for(let key in this.typeList){
                if(this.typeList[key].code == this.code){
                    this.nowTestlist = this.typeList[key]
                    this.obj.productTypeCode = this.typeList[key].code
                    this.obj.productId = ''
                    this.classify = []
                    this.thirdName = this.typeList[key].itemList
                    for(let key in this.thirdName){
                        this.classify.push(this.thirdName[key]['name'])
                    }

                }else{
                    if(this.storageCode[0] == this.typeList[key].code){
                        this.obj.productTypeCode = this.typeList[key].code
                        this.obj.productId = ''
                        this.list = this.typeList[key].itemList
                        for(let key in this.list){
                            this.classify.push(this.list[key].name)
                        }
                    }
                }
            }
            if(this.id != undefined){
                this.obj.productId = this.id
                this.obj.productTypeCode = 0;
            }
            //商品列表渲染
            if(this.searchAdd.searchName == undefined){
                that.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify({
                        productTypeCode : that.obj.productTypeCode,
                        productId : that.obj.productId 
                    })
                ).then(function(data) {
                    that.parentCount.all=data.data.data.length
                })

                this.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify(that.obj)
                )
                .then(function(data) {
                    that.temporaryList = data.data.data;
                    that.thisProduct = that.temporaryList
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
            }
            else{
                //搜索时商品列表
                this.show = false;
                that.ajax.post(
                    "/xinda-api/product/package/search-grid",
                    that.qs.stringify({
                        searchName:that.searchAdd.searchName
                    })
                ).then(function(data) {
                    that.parentCount.all=data.data.data.length
                    if(that.parentCount.all == 0){
                        that.parentCount.all = 1
                    }
                })

                this.ajax.post(
                    "/xinda-api/product/package/search-grid",
                    that.qs.stringify(that.searchAdd)
                )
                .then(function(data) {
                    that.thisProduct = data.data.data
                    if(that.thisProduct.length == 0){
                        that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
                    }else{
                        var production = that.thisProduct;
                        for(let key in production){
                            var pro = production[key]['providerImg']
                            pro = "http://123.58.241.146:8088/xinda/pic" + pro
                            production[key]['productImg'] = pro
                        }
                    }
                
                })
            }
        },
        
    },
    computed: {}

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// @media screen and (min-width:1200px){
.blue {
    background: #2693d6;
    color: #fff;
    position: relative;
}
.el-icon-sort-down{
    position: absolute;
    left: 80px;
    top: 15px;
    color: #000
}
.el-icon-sort-up{
    position: absolute;
    left: 64px;
    top: 15px;
    color: #000
}
.row {
    max-width: 1200px;
    margin: 20px auto !important;

}
.top-box {
    border: 1px solid #dcdfe6;
    margin-top: 3px;
}

.line {
    border-bottom: 1px solid hsl(222, 17%, 88%);
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
        }
        .proImg {
            width: 100%;
            height: 110%;
        }
        .proInfo {
            height: 100px;
            // width: 81%;
            padding-left: 10px;
            h3 {
                line-height: 30px;
                margin-bottom: 5px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1;
                a{
                    color: #000;
                }
                
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
.xs-flex{
    display: flex;
    justify-content: space-between;
    .hidden-sm-and-up{
        color: #f00!important;
        font-size: 20px!important;
        align-self: flex-end;
        span{
            color:#909399;
            font-size: 14px;
        }
    }
}
.xs-sortBox{
    display: flex;
    justify-content: center;
    .sort {
            width: 105px;
            height: 35px;
            text-align: center;
            line-height: 45px;
            position: relative;
            font-size: 16px;
            line-height: 35px;
            border: 1px solid  #5aa3dd;
            .el-icon-sort-down{
                position: absolute;
                left: 80px;
                top: 10px;
                color: #000
            }
            .el-icon-sort-up{
                position: absolute;
                left: 64px;
                top: 10px;
                color: #000
            }
        }
}

.moreload{
    color: #2693d4;
    text-align: center;
    width:100%;
    height: 25px;
    margin-top: 5px;
}
</style>
