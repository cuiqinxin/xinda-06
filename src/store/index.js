import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
    //设置全局变量  所有组件都能用
    state:{
        count:0
    },
    //改变全局变量
    mutations:{
        sum(){
            this.state.count++;
        },
        sum1(){
            this.state.count+=2;
        }
    },
    //有关全局变量的全局函数
    getters:{
        gett(state){
            //.....
           return state.count+100
        }
    },
    //异步操作 写ajax
    actions:{
        act(context){
            setTimeout(function(){
               context.commit('sum');
            },2000)
        }
    }
})