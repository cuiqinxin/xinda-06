<template>
  <div class="Outter">
    <div class="useruser">
        <el-row>
            <el-col :span="24">
                <span class="xinda hidden-xs-only"></span><span class="line hidden-xs-only"></span><p class="wel hidden-xs-only">{{info}}</p>
                <p class="hidden-sm-and-up phone"><router-link to="/quit" class="jian">&lt;</router-link>{{infoWeb}}</p>
                <!-- <p>{{datavalue}}</p> -->
            </el-col>
        </el-row>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Outter',
  data () {
    return {
      info:'欢迎登录',
      infoWeb:'登录',
      style : true,
      style1 : 'test',
    //   style : false,
      n:1,
    //   seen : false,
      seen : true,
      firstName: '美玉',
      lastName: '宋',
    //   arr : [10,11,12,13,{s:12}],
    //   obj : { a:10 , b:11 , c:12 , d:13 , e:14},
      msg:'',
      msgvalue:'',
      datavalue:''
    }
  },
//   created(){
//       this.obj={ a:10 , b:11 , c:12 , d:13 , e:14}
//   },
  components:{
      'my-computed':{
          template:'<div><p class="foo bar">1221</p></div>'
      }
    }, 
  methods:{
      change:function(){
        //   if(this.style=='test'){
        //       this.style='test1';
        //   }else{
        //       this.style='test';
        //   }
        // this.fullName = '丽莎 陈'
        // this.ajax({
        //     url:''
        // })
        this.ajax.post('/xinda-api/product/package/detail',this.qs.stringify(
            {sId:'0cb85ec6b63b41fc8aa07133b6144ea3'})).then(function(data){
            console.log(data);
        })
      },
      news:function(){
              this.info = '新的登录'
      },
      verity:function(){
          if(!/^1[3456789]\d{9}$/.test(this.msgg)){
              this.msgvalue='手机号输入不正确'
          }else{
              this.msgvalue=this.msgg;
          }
      },
      aaaa:function(){
          console.log('lalalala');
      }
  },
  created(){
      var that=this;
      this.datavalue=this.ajax.post('/xinda-api/ajaxAuthcode',this.qs.stringify({})).then(
          function(data){
            // console.log(data);
            that.msgvalue=data;
        }).catch(function(){console.log('失败');})
  },
//   created(){
//       var that=this;
//       this.datavalue=this.ajax.post('http://123.58.241.146:8088/xinda/xinda-api/ajaxAuthcode',this.qs.stringify({})).then(
//           function(data){
//             console.log(data);
//             that.msgvalue=data;
//         }).catch(function(){console.log('失败');})
//   },
  watch : {
      firstName:function(newQ,old){
          console.log(newQ,old);
          this.info = '正在努力加载。。。'
          setTimeout(this.news,1500)
      }
  },
  created(){
      var that = this;
    //   this.ajax.post('/xinda-api/product/package/detail',this.qs.stringify(
    //       {'sId':'0cb85ec6b63b41fc8aa07133b6144ea3'}
    //   )).then(function(data){
    //     console.log(data)
    //   }).catch(function(data){
    //       console.log(data);
    //     //   return data;
    //     //   that.datavalue = data;
    //   })
      this.ajax.post('/xinda-api/product/package/detail',this.qs.stringify({'sId':'0cb85ec6b63b41fc8aa07133b6144ea3'})).then(function(data){
            console.log(data);
            that.datavalue = data;
        })
  },
  computed:{
      infomassage(){
          return this.info.split('').reverse().join('')
      },
      fullName :{
          get:function(){
              return this.firstName + ' ' + this.lastName
          },
          set:function(newValue){
              var names = newValue.split(' ');
              this.firstName = names[0];
              this.lastName = names[names.length - 1];
          }
      }
  }
}
</script>

<style scoped lang="less">
    span{display: inline-block;}
    .useruser{
        max-width:1200px;
        margin:0 auto;
        height:97px;
    }
    .xinda{     
        width: 124px;
        height: 56px;
        background: url(../../static/data_image_jpeg;bas….jpg) no-repeat;
        margin-top:21px;
    }
    .line{
        width:1px;
        height:47px;
        background-color:#b4b4b4;
        margin:4px 25px 0 28px;
    }
    .wel{
        font-size:18px;
        display:inline-block;
        vertical-align: top;
        margin-top:36px;
    }
    .phone{
        text-align: center;
        font-size: 18px;
        line-height: 77px; 
        position: relative;
        .jian{
            float: left;
            left: 20px;
            font-size: 32px;
            position: absolute;
        }    
    }
    @media screen and (max-width: 768px){
        .useruser{
            height: 77px;
            background-color: #e5e5e5;
            position: absolute;
            top:0;
            width: 100%;
        }
    }
</style>



<!-- <h1 :class="{test:true,test1:style}">
        欢迎{{info}}{{n+2}}{{infomassage}}
    </h1>
    <p v-if="seen" :class="style1">我是v-if的标签</p>
    <p v-else>我是v-if-else的标签</p>
    <p v-show="seen">我是v-if的标签</p>
    <p>{{fullName}}</p>
    <button v-on:click="change">按钮</button>
     <button @keydown.enter="change">按钮</button> 
    <my-computed></my-computed>
     <p v-for="(item,index) in arr" :key="item">{{item}}--{{index}}</p> 
    <p v-for="item in data" :key="item" :class="q">{{item}}</p>
     <p v-for="(value,item,index) in obj" :key="item" :class="item == 'c'?'test':''">
        <a href="">{{item}}</a>
        --{{value}}--{{index}}
    </p> 
    <input type="text" v-model="msg" @input="verify">
     <p>{{msg}}</p> 
    <p>{{msgvalue}}</p> -->
