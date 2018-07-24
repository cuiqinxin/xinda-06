<template>
  <div class="hello">
    <!-- <h1 v-bind:class="style"> -->
    <!-- <h1 :class="style">
        欢迎{{info}}{{n+2}}{{infomassage}}
    </h1> -->
    <h1 :class="{test:true,test1:style}">
        欢迎{{info}}{{n+2}}{{infomassage}}
    </h1>
    <p v-if="seen" :class="style1">我是v-if的标签</p>
    <p v-else>我是v-if-else的标签</p>
    <p v-show="seen">我是v-if的标签</p>
    <p>{{fullName}}</p>
    <button v-on:click="change">按钮</button>
    <!-- <button @keydown.enter="change">按钮</button> -->
    <my-computed></my-computed>
<<<<<<< HEAD
    <p v-for="item in arr" :key="item">{{item}}</p> 
     <p v-for="(item,index) in arr" :key="index">{{item}}--{{index}}</p>
    <!-- <p v-for="item in obj" :key="item">{{item}}</p> -->
    <!-- <p v-for="(value,item,index) in obj" :key="index" :class="item=='b'?'test':''">
        <a href="">{{item}}</a>--{{value}}--{{index}}
   </p> -->
    <input type="text" v-model="msgg" @input="verity" @blur="aaaa">   <!--表单只要有输入就会触发input-->
=======
    <!-- <p v-for="(item,index) in arr" :key="item">{{item}}--{{index}}</p> -->
    <p v-for="item in data" :key="item" :class="q">{{item}}</p>
    <!-- <p v-for="(value,item,index) in obj" :key="item" :class="item == 'c'?'test':''">
        <a href="">{{item}}</a>
        --{{value}}--{{index}}
    </p> -->
    <input type="text" v-model="msg" @input="verify">
    <!-- <p>{{msg}}</p> -->
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357
    <p>{{msgvalue}}</p>
    <router-view/>
  </div>
</template>

<script>
// Vue.computed('my-computed',{
//     template:'<div><p class="foo bar"></p></div>'
// })
export default {
  name: 'Outter',
  data () {
    return {
      info:'登录1',
      style : true,
      style1 : 'test',
    //   style : false,
      n:1,
    //   seen : false,
      seen : true,
      firstName: '美玉',
      lastName: '宋',
<<<<<<< HEAD
      arr:[10,11,12,13],
      obj:{a:10,b:11},
      msgg:'',
      msgvalue:'',
      datavalue:''
=======
    //   arr : [10,11,12,13,{s:12}],
    //   obj : { a:10 , b:11 , c:12 , d:13 , e:14},
      msg:'',
      msgvalue:'',
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357
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
<<<<<<< HEAD
        // this.fullName = '丽莎 陈'
        // this.ajax({
        //     url:''
        // })
        this.ajax.post('http://123.58.241.146:8088/xinda/xinda-api/product/package/detail',this.qs.stringify(
            {sId:'0cb85ec6b63b41fc8aa07133b6144ea3'})).then(function(data){
            console.log(data);
        })
=======
        this.fullName = '丽莎 陈'
        
        // this.ajax({
        //     url:'',
        //     type:'post',
        //     data:{

        //     }
        // })
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357
      },
      news:function(){
              this.info = '新的登录'
      },
<<<<<<< HEAD
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
=======
      verify:function(){
        //   console.log(this.msg);
        if(!/^1[3456789]\d{9}$/.test(this.msg)){
            this.msgvalue="手机号输入不正确"
        }else{
            this.msgvalue="";
        };
      },
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357
  },
  created(){
      var that=this;
      this.datavalue=this.ajax.post('http://123.58.241.146:8088/xinda/xinda-api/ajaxAuthcode',this.qs.stringify({})).then(
          function(data){
            console.log(data);
            that.msgvalue=data;
        }).catch(function(){console.log('失败');})
  },
  watch : {
      firstName:function(newQ,old){
          console.log(newQ,old);
          this.info = '正在努力加载。。。'
          setTimeout(this.news,1500)
      }
  },
  created(){
      var that = this;
      this.ajax.post('http://123.58.241.146:8088/xinda/xinda-api/product/package/detail',this.qs.stringify(
          {'sId':'0cb85ec6b63b41fc8aa07133b6144ea3'}
      )).then(function(data){
        console.log(data)
      }).catch(function(data){
          console.log(data);
          return data;
        //   that.datavalue = data;
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
  },

//   data : function(){
//       return {
//           info:'登录1',
//           style:'test1'
//       }
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .test{
        color: red;
    }
    .test1{
        color: yellow
    }
</style>
