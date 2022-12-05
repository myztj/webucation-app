import Vue from "vue"
import Vuex from "vuex"
import loginApi from "@/api/loginApi.js"
import {USERINFO,TOKEN} from"@/common/storageName.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		token:uni.getStorageSync(TOKEN) || '',
		userInfo:uni.getStorageSync(USERINFO) || {}
	},
	getters:{
		istoken(state){
			return state.token
		}
	},
	mutations:{
		GETUSERLOGIN(state,data){
			if(data){
				state.userInfo = data
				uni.setStorageSync(USERINFO,state.userInfo)
			}
			if(data.token){
				state.token = data.token
				uni.setStorageSync(TOKEN,data.token)
			}
		},
		//退出登录
		OUTLOGIN(state){
			console.log(123);
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync(TOKEN)
			uni.removeStorageSync(USERINFO)
		}
	},
	actions:{
	 async getUserLogin({commit},data){
			try{
			let res = await loginApi.userLoginApi(data)
			commit('GETUSERLOGIN',res.data.data)
			return res
			}catch(e){
				//TODO handle the exception
			}
		}
	}
})

export default store