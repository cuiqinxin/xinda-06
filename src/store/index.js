<<<<<<< HEAD
import vue from 'vue'
import vuex from 'vuex'
=======
import vue from 'vue';
import vuex from 'vuex';
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276

vue.use(vuex)

export default new vuex.Store({
<<<<<<< HEAD
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
=======
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
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
