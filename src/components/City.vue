<template>
    <div class="city">
        <select name="" id="" v-model="provinceCode" @change="provinceChange">
            <option value="">-----省-----</option>
            <option :value="item" v-for="(value,item) in province" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="cityCode" @change="cityChange">
            <option value="" >-----市-----</option>
            <option :value="item" v-for="(value,item) in city" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="areaCode" @change="areaChange">
            <option  :areaCode='0'  value="">-----区-----</option>
            <option :value="item" v-for="(value,item) in area" :key="item">{{value}}</option>
        </select>
    </div>
</template>

<script>
import citydata from '../citydata'
export default {
  name: 'City',
  data () {
    return {
      province:citydata[100000],
      provinceCode:'',
      city:'',
        cityCode:'',
        area:'',
        areaCode:'',
    }
  },
  props:{
      display:String,
  },
  methods:{
      provinceChange(){
          this.city = citydata[this.provinceCode];
          this.cityCode = ''
          this.areaCode = ''
      },
      cityChange(){
          this.area = citydata[this.cityCode];
           this.areaCode = ''
      },
      areaChange(){
        //   this.area = citydata[this.data]
        this.$emit('confirm',this.areaCode);
        console.log(this.areaCode);
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.city{
    select{
       height:36px;
       margin:5px 10px 0;
    } 
    
}
</style>
