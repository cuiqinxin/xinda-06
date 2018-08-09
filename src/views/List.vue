
<template>
    <div>

        <el-row :gutter='10' class="row">
            <el-col :span="24" v-if="show">
                <p>首页/{{homePage}}</p>
            </el-col>
            <el-col :span="19">
                <div>
                    <div class="top-box" v-if="show">
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
                                    <div v-bind:class="{blue:index2==current2}" class="serviceClassify" :value="item" v-for="(item,index2) in classify" :key="index2" @click="sort2(index2,$event)">{{item}}</div>
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
                    <div class="bottom-box">
                        <div class="sort-box">
                            <div v-for="(todo, index3) in todos" :key="index3" v-bind:class="{blue:index3==current3}" class="sort " @click="sortprice(index3,$event)">{{ todo.text }}</div>
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
                                            <h3  v-if="item['serviceName']"><router-link :to="{path:'/goodsdetail',query:{id:item.id}}">{{item['serviceName']}}</router-link></h3>
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
                        <!-- <transition
                            name="custom-classes-transition"
                            enter-active-class="animated bounceOutRight"
                            leave-active-class="animated bounceOutRight">
                            <div v-if="show" class="cart-count">hello</div>
                        </transition> -->
                    </div>
                    <div class="pagebox">
                        <!-- <div class="pageUp" @click="up">上一页</div>
                        <div>{{page}}</div>
                        <div class="pageDown"  @click="down">下一页</div> -->
                         <page @change="pageChange" :parentCount="parentCount"></page>
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
import city from '../components/City'
import page from '../components/Page'
export default {
    
    name: "Outter",
    data() {
        return {
            homePage:this.$route.query.name,
            page:1,
            length:0,
            current1: 0,
            current2: -1,
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
            save:'',
            firstLevel: "",
            productTypeCode: "",
            classifyName: "1eff122d06604fc1aadf9e7acefba21a",
            menuList: "",
            nowTestlist: '',
            obj: {
                productTypeCode: "",
                productId: "",
                limit: 5,
                start: 0
            },
            newCode: '',
            buyAdd:{
                id:'0cb85ec6b63b41fc8aa07133b6144ea3',
                num:'1'
            },
            cartAdd:{
                id: '',
                num:0
            },
            id: 0,
            code: '',
            index1:'',
            Data: '',
            name: '',
            storageCode: [],
            list:'',
            thirdName:'',
            region:'',
            eventSort: '',
            searchName:'',
            searchAdd:{
                start:0,
                limit:3,
                searchName:''
            },
            show: true,
         parentCount:{
            pageSize : 5 , //每页显示6条数据
            currentPage : 1, //当前页码
            count : 0, //总记录数
            limit:5,
            pageIndex:1,
            all:20,
            perPages:3  //页面中显示的页码数只能为单数
         }  
        };
    },
    created() {
        this.firstLevel=this.$route.query.name;
        this.id = this.$route.query.id;
        this.code = this.$route.query.code;
        if(this.$route.query.index>=0){
            this.current1 = this.$route.query.index
            // this.current2 = '';
        }else{
            this.current1 = this.$route.query.index2
            this.current2 = this.$route.query.index3
        }
        var that = this;
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
                    secondName.push(secondlevel[key]['name'])
                    that.storageCode.push(secondlevel[key]["code"])
                    that.newCode = that.storageCode[0];
                    that.obj.productTypeCode = that.newCode
                    that.obj.productId = ''
                    if(secondlevel[key]['name'] == secondName[0]){
                        var thirdName = secondlevel[key].itemList
                        for(let key in thirdName){
                            that.classify.push(thirdName[key]['name'])
                        }
                    }       
                }
            }
            //点击二级 类型渲染
            else if(that.code>=0){
                that.obj.productTypeCode = that.code
                that.obj.productId = '' 
                for(let key in secondlevel){
                    if(that.code == secondlevel[key]['code']){
                        var storage = secondlevel[key].itemList
                        for(let key in storage){
                            that.classify.push(storage[key].name)
                        }
                    }
                }
            }

            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify({
                    productTypeCode : that.code,
                    productId : '' 
                })
            )
            .then(function(data) {
                 that.count=data.data.data.length
                 console.log(that.count)
            })


            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                // that.count=data.data.data.length
                // that.length = Math.ceil(that.temporaryList.length/3)
                // that.thisProduct = that.temporaryList.slice(0,3)
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
        
    },
    components: {
        city,
        page
    },
    methods: {
        pageChange (page) {
            console.log(111)
            console.log(page)
            this.currentPage = page
            // this.obj.start = (page-1)*5;
            // this.obj.limit = 5;
            // this.obj.providerId = this.id;
            // this.obj.productTypeCode = this.code;
            var that = this;
            that.ajax.post('/xinda-api/product/package/grid',that.qs.stringify(
                // that.obj
            {
            start:(page-1)*5,
            limit:5,
            providerId: that.obj.productId,
            productTypeCode: that.obj.productTypeCode,
            // sort:2
            }
            )).then(function(data){
                    that.thisProduct=data.data.data
                    console.log(that.thisProduct)
        });
        }, 

        sort1(index1, event) {
            this.current3 = 0;
            this.$refs.notice_add.provinceCode = ''
            this.$refs.notice_add.cityCode = ''
            this.$refs.notice_add.areaCode = ''
            this.page = 1;
            this.classify = [];
            this.current1 = index1;
            this.current2 = -1;
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
                that.save = JSON.parse(JSON.stringify(that.temporaryList))
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
                 console.log(that.save)
            })
            document.querySelector('.pageDown').style = 'cursor:pointer'
            document.querySelector('.pageUp').style = 'cursor:no-drop'
        },
        sort2(index2, event) {
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
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                
                that.temporaryList = data.data.data;
                that.save = JSON.parse(JSON.stringify(that.temporaryList))
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
            // document.querySelector('.pageUp').style = 'cursor:no-drop'
            // document.querySelector('.pageDown').style = 'cursor:no-drop'
        },
         isHasImg(item) {
            item.productImg = "../static/errorImg.png";
        },
        sortprice(index3, event) {
            this.page = 1;
            this.current3 = index3;
            this.eventSort = event.currentTarget.innerHTML
            if(event.currentTarget.innerHTML == '价格'){
                for(let i = 0;i<this.save.length;i++){
                    for(let j = 0;j<this.save.length-i-1;j++){
                        if(this.save[j].price>this.save[j+1].price){
                            var flag = this.save[j];
                            this.save[j] = this.save[j+1];
                            this.save[j+1] = flag;
                        }
                    }
                }
                
                this.thisProduct = this.save.slice(0,3)
                
               
            }else{
                this.thisProduct = this.temporaryList.slice(0,3)
            }
        },
        buy(event){
            var that = this
            that.buyAdd.id = event.currentTarget.id
            // 登录判断
            that.ajax.post(
                    "/xinda-api/sso/login-info",
                    that.qs.stringify({})
                ).then(function(data){
                    console.log(data.data);
                    // 未登陆
                    if(data.data.status==0){
                        that.open2();
                    }else{
                         // 已登录则向购物车列表发送数据
                        that.$router.push('/shoppingcart')
                        that.ajax.post(
                            "/xinda-api/cart/add",
                            that.qs.stringify(that.buyAdd)
                        ).then(function(data){
                            console.log(data)
                        })
                    }
                });             
            
        },
        cart(event){
            var that = this
            var id = event.currentTarget.id
            that.ajax.post(
                "/xinda-api/sso/login-info",
                that.qs.stringify({})
            ).then(function(data){
                console.log(data.data);
                // 未登陆
                if(data.data.status==0){
                    that.open2();
                }else{
                    that.$confirm('是否加入购物车', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确定加入购物车
                        if(id != that.cartAdd.id){
                            that.cartAdd.num = 0;
                            that.cartAdd.id = id
                            that.cartAdd.num += 1;
                            that.ajax.post(
                                "http://123.58.241.146:8088/xinda/xinda-api/cart/add",
                                that.qs.stringify(that.cartAdd)
                            ).then(function(data){
                                console.log(data)
                            })
                        }else{
                            that.cartAdd.num += 1;
                            that.ajax.post(
                                "http://123.58.241.146:8088/xinda/xinda-api/cart/add",
                                that.qs.stringify(that.cartAdd)
                            ).then(function(data){
                                console.log(data)
                            })
                        }                            
                    }).catch(() => {
                        that.$message({
                            type: 'info',
                            message: '未加入购物车'
                        });          
                    });
                }
            });       
        },
        // up(){
        //     // document.querySelector('.pageDown').style = 'cursor:pointer'
        //     this.page -=1;
        //     if(this.page == 1){
        //         // this.thisProduct = this.temporaryList.slice(0,3)
        //         if(this.eventSort == '综合排序'){
        //                 this.thisProduct = this.temporaryList.slice(0,3)
        //             }else{
        //                 this.thisProduct = this.save.slice(0,3)
        //             }
        //         document.querySelector('.pageUp').style = 'cursor:no-drop'
        //     }else if(this.page == 2){
        //         // this.thisProduct = this.temporaryList.slice(3,6)
        //         if(this.eventSort == '综合排序'){
        //             this.thisProduct = this.temporaryList.slice(3,6)
        //         }else{
        //             this.thisProduct = this.save.slice(3,6)
        //         }
        //     }else{
        //         this.page = 1;
        //     }
        // },
        // down(){
        //     if(this.$route.query.searchName == undefined){
        //         this.page +=1;
        //         document.querySelector('.pageUp').style = 'cursor:pointer'
        //         if(this.page<this.length){
                    
        //             if(this.page == 2){
        //                 if(this.eventSort == '综合排序'){
        //                     this.thisProduct = this.temporaryList.slice(3,6)
        //                 }else{
        //                     this.thisProduct = this.save.slice(3,6)
        //                 }
        //                 var production = this.thisProduct;
        //                     for(let key in production){
        //                     var pro = production[key]['productImg']
        //                     pro = "http://123.58.241.146:8088/xinda/pic" + pro
        //                     production[key]['productImg'] = pro
        //                 }
        //             }
        //         }else if(this.page==this.length){
        //             if(this.page == 2){
        //                 // this.thisProduct = this.temporaryList.slice(3,6)
        //                 if(this.eventSort == '综合排序'){
        //                     this.thisProduct = this.temporaryList.slice(3,6)
        //                 }else{
        //                     this.thisProduct = this.save.slice(3,6)
        //                 }
        //                 var production = this.thisProduct;
        //                     for(let key in production){
        //                     var pro = production[key]['productImg']
        //                     pro = "http://123.58.241.146:8088/xinda/pic" + pro
        //                     production[key]['productImg'] = pro
        //                 }
        //             }
        //             if(this.page == 3){
        //                 //  this.thisProduct = this.temporaryList.slice(7,10)
        //                 if(this.eventSort == '综合排序'){
        //                     this.thisProduct = this.temporaryList.slice(7,10)
        //                 }else{
        //                     this.thisProduct = this.save.slice(7,10)
        //                 }
        //                 var production = this.thisProduct;
        //                     for(let key in production){
        //                     var pro = production[key]['productImg']
        //                     pro = "http://123.58.241.146:8088/xinda/pic" + pro
        //                     production[key]['productImg'] = pro
        //                 }
        //             }
        //             document.querySelector('.pageDown').style = 'cursor:no-drop'
        //         }else{
        //             this.page = this.length
        //         }
        //     }else{
        //        document.querySelector('.pageDown').style = 'cursor:pointer'
        //        this.page += 1;
        //         var that = this
                
        //             this.searchAdd.start +=3
        //             this.ajax.post(
        //             "/xinda-api/product/package/search-grid",
        //             that.qs.stringify(that.searchAdd)
        //             ).then(function(data) {
        //                 console.log(data.data.data)
        //                 that.thisProduct = data.data.data
        //                 if(that.thisProduct.length == 0){
        //                     console.log(111)
        //                     // that.thisProduct = {0:{errorInfo:'当前选项无内容'}};
        //                     document.querySelector('.pageDown').style = 'cursor:no-drop'
        //                 }else{
        //                     if(that.thisProduct.length < 3){
        //                         document.querySelector('.pageDown').style = 'cursor:no-drop'
        //                     }
        //                     var production = that.thisProduct;
        //                     for(let key in production){
        //                         var pro = production[key]['productImg']
        //                         pro = "http://123.58.241.146:8088/xinda/pic" + pro
        //                         production[key]['productImg'] = pro
        //                     }
        //                 }
                    
        //             })
                
                
               
        //     }
        // },
        confirm(value){
            console.log(value);
            console.log(this.obj)
            this.region = value
            console.log(this.region)
            var that = this;
            console.log(that.obj)
            that.ajax.post(
                "/xinda-api/product/package/grid",
                that.qs.stringify(that.obj)
            )
            .then(function(data) {
                that.temporaryList = data.data.data;
                that.length = Math.ceil(that.temporaryList.length/3)
                for(let key in that.temporaryList){
                    if(that.temporaryList[key].regionId != that.region){
                        that.temporaryList.length = 0;
                        that.temporaryList = {0:{errorInfo:'当前选项无内容'}}
                        that.thisProduct = that.temporaryList;
                    }else{
                        that.thisProduct = that.temporaryList.slice(0,3)
                        var production = that.thisProduct;
                        for(let key in production){
                            var pro = production[key]['productImg']
                            pro = "http://123.58.241.146:8088/xinda/pic" + pro
                            production[key]['productImg'] = pro
                        }
                    }
                }
                that.length = Math.ceil(that.temporaryList.length/3)
            })
        }, 
        open2() {
            var that=this;
            this.$confirm('您需要登陆才能进行此操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$router.push('/Outter/Zhuce');
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消登陆'
                });          
            });
        },


    },
    watch: {
        
        $route(val,oldval){
            this.homePage = this.$route.query.name
            this.current3 = 0;
            this.firstLevel=val.query.name;
            this.code = val.query.code;
            this.id = val.query.id;
            this.searchAdd.searchName = val.query.searchName
            this.searchAdd.start = 0
            console.log(this.searchAdd)
            var that = this
            this.storageCode = []
            this.classify = []
            this.page = 1;
            if(val.query.index2 == undefined && val.query.code == undefined){
                this.current1 = val.query.index
            }else if(val.query.index2 == undefined && val.query.code != undefined){
                this.current1 = val.query.index;
                this.current2 = 0;
            }
            else{
                this.current1 = val.query.index2;
                this.current2 = val.query.index3
            }
            
            
            if(oldval.query.name != val.query.name){
                this.items = []
                this.classify = []
            }else if(oldval.query.code != val.query.code){
                this.items = []
                this.classify = []
            }else if(this.code!=undefined){
                this.items = []
                 this.classify = []
            }else if(this.firstLevel != undefined){
                this.items = []
                this.classify = []
            }else if(oldval.query.code == val.query.code){

            }
            if(this.id == undefined && this.code == undefined){
                this.firstLevel=val.query.name;
                
            }else if(this.id == undefined && this.code != undefined && oldval.query.name != val.query.name){
                this.firstLevel=val.query.name;
                this.code = val.query.code;
                
            }else{
                this.firstLevel=val.query.name;
                this.code = val.query.code;
                this.id = val.query.id
            }
            var newData = this.Data;
            for (let key in newData) {
                var myData = newData[key];
                if (myData["name"] == this.firstLevel) {
                    this.typeList = myData.itemList;
                    for (let key in this.typeList) {
                        this.items.push(this.typeList[key]["name"]); 
                        this.storageCode.push(this.typeList[key].code)
                        this.obj.productTypeCode = this.typeList[key].code
                        this.obj.productId = ''
                    }          
                }
            }
            for(let key in this.typeList){
                if(this.typeList[key].code == this.code){
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
            if(this.searchAdd.searchName == undefined){
                // document.querySelector('.pageUp').style = 'cursor:no-drop'
                if(this.page=this.length){
                    // document.querySelector('.pageDown').style = 'cursor:no-drop'
                }else{
                    // document.querySelector('.pageDown').style = 'cursor:pointer'
                }
                console.log(this.show)
                this.$refs.notice_add.provinceCode = ''
                this.$refs.notice_add.cityCode = ''
                this.$refs.notice_add.areaCode = ''
                this.ajax.post(
                    "/xinda-api/product/package/grid",
                    that.qs.stringify(that.obj)
                )
                .then(function(data) {
                    that.temporaryList = data.data.data;
                    that.save = JSON.parse(JSON.stringify(that.temporaryList))
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
            }
            else{
                this.show = false;
                console.log(this.searchAdd)
                this.ajax.post(
                    "/xinda-api/product/package/search-grid",
                    that.qs.stringify(that.searchAdd)
                )
                .then(function(data) {
                    console.log(data.data.data)
                    that.thisProduct = data.data.data
                    console.log(that.thisProduct.length) 
                    if(that.thisProduct.length == 0){
                        console.log(111)
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
        },
        
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
    margin: 20px auto !important;

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
</style>
