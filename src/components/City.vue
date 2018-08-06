<template>
    <div class="city">
        <select name="" id="" v-model="provinceCode" @change="provinceChange">
<<<<<<< HEAD
            <option value="">-----省-----</option>
            <option :value="item" v-for="(value,item) in province" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="cityCode" @change="cityChange">
            <option value="">-----城-----</option>
            <option :value="item" v-for="(value,item) in city" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="areaCode" @change="areaChange">
            <option value="">-----区-----</option>
=======
            <option value="">--请选择省份--</option>
            <option :value="item" v-for="(value,item) in province" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="cityCode" @change="cityChange">
            <option value="">--请选择城市--</option>
            <option :value="item" v-for="(value,item) in city" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="areaCode" @change="areaChange">
            <option value="">--请选择区县--</option>
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
            <option :value="item" v-for="(value,item) in area" :key="item">{{value}}</option>
        </select>
    </div>
</template>

<script>
import citydata from '../citydata'
export default {
  name: 'City',
<<<<<<< HEAD
=======

>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
  data () {
    return {
      province:citydata[100000],
      provinceCode:'',
<<<<<<< HEAD
      city:'',
        cityCode:'',
        area:'',
        areaCode:''
=======
      cityCode:'',
      city:'',
      area:'',
      areaCode:'',
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
    }
  },
  props:{
      display:String
  },
  methods:{
      provinceChange(){
<<<<<<< HEAD
          this.city=citydata[this.provinceCode];
      },
      cityChange(){
          this.area=citydata[this.cityCode];
      },
      areaChange(){
        //   console.log(this.areaCode);
        this.$emit('confirm',this.areaCode);
        // console.log(this.display);
      }
=======
          this.city = citydata[this.provinceCode];
      },
      cityChange(){
          this.area = citydata[this.cityCode];
      },
      areaChange(){
        //   this.area = citydata[this.data]
        this.$emit('confirm',this.areaCode);
        console.log(this.display);
      },
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
