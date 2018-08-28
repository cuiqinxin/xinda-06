// import vue from 'vue'
// import vuex from 'vuex'

// Vue.use(vuex)


export default new Vuex.Store({
    //设置全局变量  所有组件都能用
    state:{
        userPhoneNumber:'',
        cartNum:'0',
        cartId:[],
        cartconcrete:[],
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
        gaincartId(state,obj){
            state.cartId.unshift(obj.id);
            state.cartconcrete.unshift(obj);
            // console.log(this.state.cartId[0])
        },
        // 清空购物车
        cartNum0(){
            this.state.cartNum=0;
            this.state.cartId.splice(0);
            this.state.cartconcrete.splice(0);
            // console.log(this.state.cartconcrete,111);
        },
        // 购物车数量加减
        cartNumreduce(state,e){
            this.state.cartNum--;
            var shan=state.cartId.indexOf(e);
            state.cartId.splice(shan,1);
            state.cartconcrete.splice(shan,1);
        },
        //判断是否调用购物车加减方法
        cartNumber(state,obj){
            if(state.cartId.indexOf(obj.id)==-1){
                state.cartId.unshift(obj.id);
                state.cartconcrete.unshift(obj);
                this.state.cartNum++;
                // console.log(this.state.cartNum,this.state.cartconcrete);
            }else{
                var weizhi=state.cartId.indexOf(obj.id);
                state.cartId.splice(weizhi,1);
                state.cartId.unshift(obj.id);
                state.cartconcrete.splice(weizhi,1);
                state.cartconcrete.unshift(obj);
                return;
            }},

        // cartNum2(){
        //     this.state.count--;
        // },
        loading (state,extra) {
			state.loading = extra
        }
    },




});
