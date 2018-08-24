<template>
 
<div ref="scroll" class="r-scroll">
 <div class="r-scroll-wrap">
  <slot>1</slot>
 </div>
 <slot name="loading">
  <div v-show="isLoading" class="r-scroll-loading">
   <span class="r-scroll-loading-text">{{loadingText}}</span>
  </div>
 </slot>
 <slot name="complate">
  <div v-show="isComplate" class="r-scroll-loading">{{complateText}}</div>
 </slot>
</div>
</template> 

<script>
export default {
  name: 'rScroll',
  //  props:{
  //      scrollCount:{
  //          type: Object,
  //      },
  //   },
    props: {
      scrollCount:{
           type: Object,
       },
  // 距离底部数值，小于或等于该数值触发自定义事件loadmore
  bottomDistance: {
   type: [Number, String],
   default: 70
  },
  // 加载中的文字
  loadingText: {
   type: String,
   default: '加载中...'
  },
  // 数据加载完成的文字
   isComplate: {
   type: Boolean,
   default: false
  },
  complateText: {
   type: String,
   default: '-- 我是个有底线的列表 --'
  }
 },
  data () {
    return {
      name:'',
      dianpu:'',
      provide:'',
      // 用来判定数据是否加载完成
      // isComplate:false,
      // 用来判定是否正在加载数据
      isLoading: false,
      // 组件容器
      scroll: null,
      // 正文容器
      scrollWrap: null,
      page:0,
      isComplate:this.scrollCount.isComplate,
    }
  },
  methods:{
  loaded () {
   this.isLoading = false
  },
  // 所有数据加载完成后调用该函数
  compleate () {
   this.isLoading = false
   this.isComplate = true
   console.log(over)
   this.scroll.removeEventListener('scroll', this.scrollEvent)
  //  console.log(this.scrollEvent)
  }
        },
  watch : {
      // 监听isLoading，如果isLoading的值为true则代表触发了loadmore事件
  isLoading:function() {
   if (this.isLoading) {
    this.$emit('loadmore',this.page)
    console.log(this.page)
    console.log(this.isComplate)
   }
  }
  },
  created(){
 
        },
 mounted () {
      this.scroll = this.$refs.scroll
   this.scrollWrap = this.scroll.childNodes[0]
   function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
  //  this.$emit('loadmore',this.page)
  //  console.log(this.$refs.scroll.offsetHeight)
  //  console.log(this.$refs.scroll.childNodes[0])
  //  window.addEventListener('scroll', this.scrollEvent)
  //  this.$emit('init', this.scroll)
  //  console.log(this.isComplate)
var context = this
    // context.$emit('loadmore',context.page)
   var hhh=debounce(function(){
   // 如果数据全部加载完成了，则再也不触发loadmore事件
   console.log(context.isComplate)
   console.log(context.isLoading)
   if (context.isComplate){ return}
   var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // let scrollTop = context.scroll.scrollTop
    // let scrollH = context.scroll.offsetHeight
    // let scrollWrapH = context.scrollWrap.offsetHeight
    //  console.log(scrollTop);
    //  console.log(scrollH);
    //  console.log(scrollWrapH);
   // 组件容器滚的距离 + 组件容器本身距离大于或者等于正文容器高度 - 指定数值 则触发loadmore事件
  //  if (scrollTop + scrollH >= scrollWrapH - context.bottomDistance) {
  if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) {
    //0 表示距离底部多少的距离的开始触发loadmore效果    
    context.isLoading = true;
    console.log(scrollTop)
    // console.log(scrollH)
    // console.log(scrollWraop)
    // ++context.page
    console.log(context.page)
    context.$emit('loadmore',context.page+=1)
   }
  }
  ,500);
   window.addEventListener('scroll',  hhh)
  // this.$emit('loadmore',this.page)
  // this.page+=1;
  console.log(context.page)
 }
}
</script>

<style scoped lang="less" >
 .index{
   position:relative;
 }
.r-scroll{
 position: absolute;
//  left:0;
//  top:0;
 width:100%;
//  height:100vh;
 overflow: hidden;
 overflow: scroll;
 -webkit-overflow-scrolling: touch;
 .r-scroll-loading{
  width:100%;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 3%;
  font-size: 14px;
  color: #656565;
  line-height: 20px;
  .r-scroll-loading-text{
   
   display: inline-block;
   vertical-align: middle;
  }

 }
}
  
</style>
