<template>
    <div class="city">
        <select name="" id="" v-model="provinceCode" @change="provinceChange">
            <option value="">-----省-----</option>
            <option :value="item" v-for="(value,item) in province" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="cityCode" @change="cityChange">
            <option value="">-----城-----</option>
            <option :value="item" v-for="(value,item) in city" :key="item">{{value}}</option>
        </select>
        <select name="" id="" v-model="areaCode" @change="areaChange">
            <option value="">-----区-----</option>
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
        areaCode:''
    }
  },
  props:{
      display:String
  },
  methods:{
      provinceChange(){
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
