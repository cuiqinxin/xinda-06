// import vue from 'vue'
// import vuex from 'vuex'

// Vue.use(vuex)

export default new Vuex.Store({
    //设置全局变量  所有组件都能用
    state:{
        userPhoneNumber:'',
        cartNum:'0',
        cartId:[],
        loading:false
    },
    //改变全局变量
    mutations:{
        loginStatus(state,n){
            state.userPhoneNumber=n;
        },
       
        gaincartNum(state,a){
            state.cartNum= a;
            // console.log(this.state.cartNum)

        },
        gaincartId(state,b){
            state.cartId.push(b);
            // console.log(this.state.cartId[0])
        },
        // 清空购物车
        cartNum0(){
            this.state.cartNum=0;
            this.state.cartId=[];
        },
        // 购物车数量加减
        cartNumreduce(state,e){
            this.state.cartNum--;
            state.cartId.splice(state.cartId.indexOf(e),1);
            
        },
        //判断是否调用购物车加减方法
        cartNumber(state,e){
            if(state.cartId.indexOf(e)==-1){
                state.cartId.push(e);
                this.state.cartNum++;
            }else{
                return;
            }},
           
        // cartNum2(){
        //     this.state.count--;
        // },
        loading (state,extra) {
			state.loading = extra
        }
        
    },


    // //有关全局变量的全局函数
    // getters:{
    //     showLoading(state){
    //         return state.showLoading 
    //     },
    // },
   
});
