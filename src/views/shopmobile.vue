<template>
  <div class="Store">
       <div class="sort">
           <ul clsss="sort_top">
               <li :class="{active:sort1==sort2}" @click="defaultsort">默认排序</li>
               <li :class="{active:sort1==sort3}" @click="valume">销量</li>
           </ul>
       </div>
        <div class="shop_shop">
            
            <div 
            v-for="(dp,index) in dianpu" :key="index" 
            class="shop_1"
            :codes="dp.productTypeCodes"
            >
                <ul class="shop_1_left">           
                       <img :src="'http://123.58.241.146:8088/xinda/pic/'+(dp.providerImg)">
                       <!-- <img :src="dp.providerImg" alt="">  -->
                </ul>
                <ul class="shop_1_right">
                    <h5 :class="title">{{dp.providerName}}</h5>                  
                    <li class="region">{{dp.regionName}}</li>
                    <li class="num">
                        <p class="num_1">累计客户服务次数:<a>{{dp.orderNum}}</a></p>
                        <p class="num_2">好评率:<a>{{dp.goodJudge == 0?0 :dp.goodJudge/dp.totalJudge*100}}%</a></p>
                    </li>
                </ul>
            </div>
        
        </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Shopmobile',
  data () {
    return {
    title:'',
    credit:'',
    region:'',
    dianpu:'',
    dianpu1:'',
    providerId:'',
    sort1:1,
    sort2:2,
    sort3:2,
    }
  },
  created(){
           var that = this;
           this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:1})).then(function(data){
           that.dianpu1=data.data.data;
        if((!/\?/.test(location.href))){
           that.dianpu=data.data.data;
        }
        });
        var that = this
      this.ajax.post(
          '/xinda-api/provider/search-grid',this.qs.stringify({
        //   start:0,
        searchName:this.$route.query.searchName,
        // sort:2,
      }))
      .then(function(data){
            console.log(data.data.data);
            // console.log(searchName);
            that.dianpu=data.data.data  
        });
          
  },
  components:{
      
    }, 
  methods:{
 defaultsort(){
     this.sort2=1,
     this.sort3=2;
      var that = this;
           this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:1})).then(function(data){
           that.dianpu1=data.data.data;
        if((!/\?/.test(location.href))){
           that.dianpu=data.data.data;
        }
        });
 },
 valume(){
     this.sort2=2,
     this.sort3=1;
      var that = this;
           this.ajax.post('/xinda-api/provider/grid',this.qs.stringify({start:0,limit:6,sort:3})).then(function(data){
           that.dianpu1=data.data.data;
        if((!/\?/.test(location.href))){
           that.dianpu=data.data.data;
        }
        });
 },
  },
watch:{
$route(newval,oldval){
    var that = this;
console.log(newval.query.searchName)
      this.ajax.post(
          '/xinda-api/provider/search-grid',this.qs.stringify({
        searchName:this.$route.query.searchName,
      }))
      .then(function(data){
            console.log(data.data.data);
            that.dianpu=data.data.data  
        });}
},
  computed:{
   
  }

}
</script>

<style scoped lang="less">
.active{
    background-color: #2693d4;
    color:white;
}
     .sort{
        width:100%;
        text-align: center;
        ul{
            width:40%;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            border: 1px solid #2693d4;
            border-radius: 5px;
            display: flex;
            justify-content: space-around;
            li{
                width:50%;
            }
        }
    }
 
.Store{
    width:100%;

    .list{
        border:1px solid #ccc;
        background-color: #f7f7f7;
        width:100%;
    .serve{
        display:flex;
            height:48px;
         .serve_eara{
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            font-size: 16px;
            font-weight: 700;            
            width:10%;
            line-height: 48px;
            text-align: center;
        }
         .eara{
            border-bottom: 1px solid #ccc;
        }
    }
    }
    }
    .shop_shop{
        width:100%;
        overflow: hidden;
        justify-content: space-around;
        .shop_1{
            margin:0 auto;
            float:left;
            border-bottom:1px solid #ccc;
            display:flex;
            width:96%;
            height:135px;
             .shop_1_left{
                margin: 15px;                 
                width:20%;
                text-align:center;
                border:1px solid #ccc;
                line-height: 105px;
                img{
                    display: inline-block;
                    width:90%;
                }
               
            }
            .shop_1_right{
                margin: 15px 0 15px 15px;
                width:62%;
               
                .num{
                    margin:5px 0;
                    p{
                        display:inline-block;
                        font-size:16px;
                        a{
                            color:red;
                        }
                    }
                }
                .title{
                    font-size: 20px;
                    margin-bottom:10px;
                }
                .credit{
                    color:#ccc;
                    font-size: 12px;
                    margin:5px 0;
                }
                .region{
                    color:#ccc;
                    font-size: 14px;
                }
            }
        }
    }


</style>

