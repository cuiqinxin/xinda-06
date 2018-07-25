import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex)

export default new vuex.Store({
    state:{             //设置全局变量
        count: 0
    },
    // mutations:{         //改变全局变量
    //     sum(){
    //         this.state.cound++
    //     },
    //     sum1(){
    //         this.state.cound+2
    //     }
    // },
    // getters:{       //有关全局变量的全局函数
    //     gett(state){
    //         return state.count+100;
    //     }
    // },
    // actions:{       //异步操作，ajax

    // },
});