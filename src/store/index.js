// import vue from 'vue'
// import vuex from 'vuex'

// Vue.use(vuex)

export default new Vuex.Store({
    //设置全局变量  所有组件都能用
    state:{
        userPhoneNumber:'',
        cartNum:'0',
        loading:false
    },
    //改变全局变量
    mutations:{
        loginStatus(state,n){
            state.userPhoneNumber=n;
        },
        cartNum(){
            this.state.count++;
        },
        cartNum2(){
            this.state.count--;
        },
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
    // //异步操作 写ajax
    // actions:{
    //     act(context){
    //         setTimeout(function(){
    //            context.commit('sum');
    //         },2000)
    //     }
    // }
});
