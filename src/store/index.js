//该文件用来创建store
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
//响应动作
const actions={
    Addqian(context,value){
        value='你好'+value
        context.commit('Jiaqian',value)
    }
}

//mutation操作数据
const mutations={
    Jiaqian(state,value){
        state.newname=value
    },
    Addname(state,value){
        state.name=value
    }
}

//准备state放置数据
const state={
    name:'wang',
    newname:''
}

const store=new Vuex.Store({
    actions,
    mutations,
    state
})
//导出
export default store
