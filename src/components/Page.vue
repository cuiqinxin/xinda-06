<template>
    <ul class="page">
         <!-- first -->
        <li
        :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"
        @click="first">首页</li>
        
        <!-- prev -->
        <li
        :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"
        @click="prev">上一页</li>
        
        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showPrevMore">...</li>

        <li
        :class="['paging-item', {'paging-item--current' : index === pager}]"
        v-for="(pager,index) in pagers " :key="index"
        @click="go(pager)">{{ pager }}</li>

        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showNextMore">...</li>
        
    
        <!-- next -->
        <li
        :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"
        @click="next">下一页</li>
         <!-- last -->
        <li
        :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"
        @click="last">最后一页</li>
    </ul>
</template>

<script>
    export default {
    name : 'Page',
    //通过props来接受从父组件传递过来的值
    props : {
        parentCount:{
            type : Object,
        },
        all:{
            type : Number,
        },
        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : { 
            type : Number,
        },
        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },

        //每页显示条数
        pageSize : {
            type : Number,
            default : 6
        },

        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            this.active={color:'#ccc',
            backgroundColor:'#0275d8'}
            if (this.index !== page) {
                this.index = page
                // this.parentCount.page=(page-1)*6
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
                console.log(this.pagers)
            }
        }
    },
    computed : {

        //计算总页码
        pages(){
            return Math.ceil(this.parentCount.all/this.parentCount.pageSize)
        },
        //计算页码，当count等变化时自动计算

        pagers () {           //在数组里循环当前页面显示的页码  (为了得到当前页面显示的页码)
            const array = []
            const perPages = this.parentCount.perPages    //页面中显示的页码数
            const pageCount = this.pages    //总页码
            let current = this.index        //当前页码
            const _offset = (perPages - 1) / 2            
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end >pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)
            // }
            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)

            }
            return array
            console.log(array)
        }
    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            limit : this.parentCount.limit, //每页显示条数
            size : this.all, //总记录数
            showPrevMore : false,
            showNextMore : false,
            active:''
        }
    },
    watch : {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 6
        },
        total(val) {
            this.size = val || 1
        },
        $route(val){
            this.index = 1
        }
    }
}
</script>


<style scoped lang="less">
.page {
    display: inline-block;
    padding: 0;
    margin: 1rem 0;
    font-size: 0;
    list-style: none;
    user-select: none;
    > .paging-item {
        display: inline;
        font-size: 14px;
        position: relative;
        padding: 6px 12px;
        line-height: 1.42857143;
        text-decoration: none;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-left: -1px;
        cursor: pointer;
        color: #0275d8;
        &:first-child {
            margin-left: 0;
        }
        &:hover {
            background-color: #f0f0f0;
            color: #505050;
        }
        &.paging-item--disabled,
        &.paging-item--more{
            background-color: #fff;
            color: #505050;
        }
        //禁用
        &.paging-item--disabled {
            cursor: not-allowed;
            opacity: .75;
        }
        &.paging-item--more,
        &.paging-item--current {
            cursor: default;
        }
        //选中
        &.paging-item--current {
            background-color: #0275d8;
            color:#fff;
            position: relative;
            z-index: 1;
            border-color: #0275d8;
        }
    }
}
</style>