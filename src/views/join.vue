<template>
<div class="join">
<div class="top">
    <p class="join_us">加盟我们</p>
    <p>只做有价值的平台</p>
</div>
<div class="to_join">
    <img src="../../static/jiameng_03.jpg" alt="">
    <h3>信达提供线上精准营销方案、帮助服务商快捷、低成本的获取有效客户，为传统优质服务商插上互联连网的翅膀，助力企业的腾飞。</h3>
    <img src="../../static/12_01.jpg" alt="">
</div>
<div class="receive">
    <img src="../../static/huodea_06.jpg" alt="" class="receive_1">
    <el-row>
        <el-col :span=12>
            <ul>
            <img src="../../static/huode_03.jpg" alt="">
            <a>精准的线上曝光机会</a>
            </ul>          
        </el-col>
           <el-col :span=12>
           <ul>
            <img src="../../static/huode_05.jpg" alt="">
            <a href="">万亿市场份额></a>
            </ul>
        </el-col>
           <el-col :span=12>
               <ul>
                    <img src="../../static/huode_09.jpg" alt="">
                    <a href="">系统化的营销解决方案</a>
               </ul>            
        </el-col>
           <el-col :span=12>
               <ul>
                    <img src="../../static/huode_10.jpg" alt="">
                    <a href="">各种补贴优惠</a>
               </ul>
        </el-col>
    </el-row>
</div>

    <div class="service">
        <div class="ser_img">
            <img src="../../static/jiameng_03.jpg" alt="">
        </div>
        <ul class="service_n">
            <li class="service_1">
                <img src="../../static/12_03.jpg" alt="">
                 <p @mouseover="green1">工商注册</p>
                 <span>REGISTRED</span>
            </li>
            <li  @mouseover="green2" class="service_1">
                <img src="../../static/12_05.jpg" alt="">
                 <p>财税服务</p>
                 <span>SERVICE</span>
            </li>
            <li class="service_1">
                <img src="../../static/12_07.jpg" alt="">
                 <p @mouseover="green3">知识产权</p>
                 <span>INTELLECTUAL&nbsp;PROPERTY</span>
            </li>
            <li class="service_1">
                <img src="../../static/12_09.jpg" alt="">
                 <p @mouseover="green4">人力外包</p>
                 <span>HR&nbsp;OUTSOURCING</span>
            </li>
        </ul>
        <div class="weneed">
            <h3>我们需要什么样的服务商？</h3>
        </div> 
        <el-row class="serve_n">
            <li v-if="registred" class="serve_1">在公司注册、公司变更、资质审批等领域深耕多年，在业内享有一定的知名度，可以提供优质优价的服务；与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务</li>
            <li v-else-if="service" class="serve_2">在代理记账、审计验资等领域深耕多年，可以提供涉足各个行业优秀的财会人员；与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。</li>
            <li v-else-if="property" class="serve_3">在商标注册，版权专利，著作权等领域深耕多年，具有丰富的知识产权经验；与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务</li>
            <li v-else  class="serve_4">在人事代理、企业社保、个人社保等领域深耕多年，具有丰富的社保代理经验。</li>
        </el-row>
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
   dianpu:'',
   registred:'fale',
   service:'false',
   property:'true',
   hr:'false'
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
     green1:function(){
         [this.registred,this.service,this.property,this.hr] = [true,false,false,false]

          },
    green2:function(){
             [this.registred,this.service,this.property,this.hr] = [false,true,false,false]

        },
        
    green3:function(){
        [this.registred,this.service,this.property,this.hr] = [false,false,true,false]

    },
    
    green4:function(){
        [this.registred,this.service,this.property,this.hr] = [false,false,false,true]
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

 
    .top{
        width:1200px;
        height: 250px;
        margin:0 auto;
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
 .to_join{
     width:1200px;
     margin: 50px auto;
     text-align: center;
     h3{
           margin: 50px 0 0;
       }
 }
.receive{
    background-color: #edf1f4;
    width:1200px;
    margin:0 auto;
    text-align: center;
     .receive_1{
        margin-top:50px;
        display: inline-block;
    }
   .el-col-12{
       margin: 30px 0;
       line-height:77px;
       display: flex;
       justify-content: space-around;
       ul{
       display: flex;
       
       a{
           color:#2693d4;
           margin-left: 20px;
       }
       }
  }
}
.service{
    width:1200px;
    margin: 50px auto;
   .ser_img{
        width:100%;
        text-align: center;
   }
.service_n{
    display:flex;
    justify-content: space-between;
    width:1100px;
    margin:30px auto;
    .service_1{
        text-align: center;
        p:hover {
            color:#00ff7f;
        }
    }
}
.service_e{
    display:flex;
    justify-content: space-between;
    // width:1100px;
    margin:0 auto;
    .ser_1{
        margin-left:42px; 
    }
      .ser_2{
        margin-left:80px; 
    }
     .ser_3{
        margin-left:26px; 
    }
}
.weneed{
    margin-top: 50px;
    width:100%;
    text-align: center;
}
.serve_n{
    width:60%;
    margin:30px auto;
    text-align: center;
    li{
        height:42px;
    }
}
}


</style>

