import vue from 'vue'
import vuex from 'vuex'


vue.use(vuex)

export default new vuex.Store({
    //设置全局变量  所有组件都能用
    state:{
        count:0,
        userPhoneNumber:'',
        cartNum:'0',
        cartId:[],
    },
    //改变全局变量
    mutations:{
        // sum(){
        //     this.state.count++;
        // },
        // sum1(){
        //     this.state.count+=2;
        // },
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
        },
        // 购物车数量加减
        cartNumreduce(){
            this.state.cartNum--;
        },
        //判断是否调用购物车加减方法
        cartNumber(state,e){
            if(state.cartId.indexOf(e)==-1){
                state.cartId.push(e);
                this.state.cartNum++;
            }else{
                return;
            }
           
        }
        
    },


    // //有关全局变量的全局函数
    // getters:{
    //     gett(state){
    //         //.....
    //        return state.count+100
    //     }
    // },
   
});
