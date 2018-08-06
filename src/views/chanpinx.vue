<template>
  
    <router-view/>
   
</template> 

<script>
export default {
  name: 'Outter',
  data () {
    return {
      
    }
  },

  components:{
      'my-computed':{
          template:'<div><p class="foo bar">1221</p></div>'
      }
    }, 
  methods:{

 
  },

  watch : {
      
  },
  created(){
//       var obj={
//        id: '9080f0c120a64eb3831d50ba93c33e78'
//         }
//       var that = this;
//       this.ajax.post(
//           '/xinda-api/provider/detail',
//       this.qs.stringify(obj))
//   .then(function(data){
//             // console.log(data.data.data);
//             // that.name=data.data.data
//         });
        var that = this;
      this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
productTypeCode: "0",
productId: "0bf3dffb6beb49078a7ede5f51125c44",
})).then(function(data){
            // that.provide=data.data.data
            console.log(data.data);
           
        });
         var that = this;
      this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
productTypeCode: "1",
productId: "3e2987b535946e dd2e5f686e42b67454",
providerId: "8a82f52b674543e298d2e5f685946e6e"
})).then(function(data){
            // that.provide=data.data.data
            console.log(data.data);
           
        });
  },
  computed:{
    
  }
}
</script>

<style scoped lang="less">

// 9080f0c120a64eb3831d50ba93c33e78
// a7304eecbd7246b4b424874e0359eab0
 
</style>
