<template>
    <div class="p_all">
            <ul class="left">
                <li v-for="(item,key,index) in menuList" :key="index" @click="xuan(key)" v-bind:class="{active:key==isActive}">{{item.name}}
                   <el-menu class="right" v-if="key==change">
                        <el-submenu :index="index1+''" v-for="(item1,key1,index1) in item.itemList" :key="index1" style="background-color: #f3f4f5">
                            <template slot="title">{{item1.name}}</template>
                            <el-menu-item-group v-for="(item2,key2,index2) in item1.itemList" :key="index2">
                                <el-menu-item :index="index2+''">
                                    <router-link :to="{path:'/list',query:{name:item.name,code:item1.code,id:item2.id,index2:index1,index3:index2}}">{{item2.name}}</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </li>
            </ul>
    </div>
</template>

<script>
    export default {
        name: 'p_all',
        data() {
            return {
                menuList:{},
                change: 1,
                isActive:1,
            }
        },
        created() {
            var navArr={};
            this.ajax.post("/xinda-api/product/style/list").then(data=> {
                var navSelect = data.data.data;
                for(let key in navSelect){
                navArr[navSelect[key].showOrder] = navSelect[key];
                }
                this.menuList = navArr;
            });
        },
        methods:{
            xuan(jie){
                this.change = jie;
                this.isActive=jie;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="less">
    .left{
        position: relative;
        >li{
            width: 30%;
            font-size: 16px;
            line-height: 40px;
            border-bottom: 1px solid #f3f4f5;
            text-align: center;
            cursor: pointer;
        }
        .key1{
            display: block;
        }
    }
    .right{
        width: 70%;
        position: absolute;
        top: 0;
        right: 0;
        margin-bottom: 90px;
        text-align: left;
        border-left: 1px solid #f3f4f5;
        border-bottom: 1px solid #f3f4f5;
        a{
            color: #000;
        }
    }
    .active{
        background-color: #f3f4f5;
    }
</style>
