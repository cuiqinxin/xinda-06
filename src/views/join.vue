<template>
  <div class="join">
<div class="top">
    <p class="join_us">加盟我们</p>
    <p>只做有价值的平台</p>
</div>
<div class="to_join">
    <img src="../../static/join_8_03.f6fed56.jpg" alt="">
</div>
<div class="receive">
    <img src="../../static/receive.jpg" alt="" class="receive_1">
    <el-row>
        <el-col :span=12>
            <img src="../../static/ser_1.jpg" alt="">
            <span>精准的线上曝光机会</span>
        </el-col>
           <el-col :span=12>
            <img src="../../static/ser_1.jpg" alt="">
            <a href="">精准的线上曝光机会</a>
        </el-col>
           <el-col :span=12>
            <img src="../../static/ser_1.jpg" alt="">
            <a href="">精准的线上曝光机会</a>
        </el-col>
           <el-col :span=12>
            <img src="../../static/ser_1.jpg" alt="">
            <a href="">精准的线上曝光机会</a>
        </el-col>
    </el-row>
</div>
<div class="service">
    <img src="../../static/join_8_02.70e7772.jpg" alt="">
</div>
    <router-view/>
  </div>
</template>

<script>
import city from '../components/City'
// import store from '../store';
export default {
  name: 'Shop',
  data () {
    return {

    title:'',
    credit:'',
    region:'',
    num:'',
    type:'',
    msg:'',
    msgvalue:'',
    info:'店铺',
    img:'',
   dianpu:''
    }
  },
  created(){
           var that = this;
      this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:1})).then(function(data){
            // console.log(data.data.data);
           that.dianpu=data.data.data;
        console.log(that.dianpu)
           console.log(that.dianpu[0].id)
           console.log(typeof(that.dianpu[0].productTypes.split(',')))
           console.log(that.dianpu[0].productTypes.split(','))
        });
        console.log(that.dianpu)
  },
  components:{
      city,
      'my-computed':{
          template:'<div><p class="foo bar">1221</p></div>'
      }
    }, 
  methods:{
      link(){
          var that = this;
        //   this.$emit('dianpuid',that.dp.id)
          this.$router.push({
              path:'/shop/dianpu',
              query:{id:123}
          })
      },
   
          
    choose:function(e){
        alert(this.dp.productTypeCode)
        var that = this;
      this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:1})).then(function(data){
            // console.log(data.data.data);
            var b=data.data.data;
            for(let i=0;i<b.length;i++){
                that.providerName[i]=b[i].providerName,
                   that.regionName[i]=b[i].regionName,
                   that.orderNum[i]=b[i].orderNum,
                   that.productTypes[i]=b[i].productTypes.split(',')
                   that.img[i]="http://123.58.241.146:8088/xinda/pic"+b[i].providerImg
               }
        console.log(that.providerName[0])
        console.log(that.productTypes[0])
        console.log(b).
        return(that.c)
        
        });
        console.log(this.providerName)
      
        // alert(value)
    },
      choose1:function(val){
        alert(this.$children.productTypes)
    },
      
    confirm(value){
         
          value:'区县-',
          console.log(value)
      },
  },
// mounted(){
//         this.a=this.image();
        
// },
  watch : {
     
       
  },
  computed:{
      post:function(){

      },
   
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
//   filters:{

//   }
}
</script>

<style scoped lang="less"> 
.join{
    margin: 0 auto;
    width:1200px;
    .top{
        width:100%;
        height: 250px;
        background-image: url(../../static/joinus1.02aa3f5.jpg);
        background-size: cover;
        overflow: hidden;
        p{
            font-size: 26px;
            text-align: center;
        }
        .join_us{
              margin-top: 110px;
        }
    }
.receive{
    background-color: #edf1f4;
    width:100%;
    text-align: center;
   .el-col-12{
       vertical-align: center;
   }
}
}
</style>

