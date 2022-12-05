import request from "@/utils/request.js"

const userLoginApi = (data)=>{
	console.log("api=>>>",data);
	return request({
		url:'/mobile/login',
		method:'POST',
		data
	})
}
//注册
const userRegApi = (data)=>{
	return request({
		url:'/mobile/reg',
		method:'POST',
		data
	})
}
//找回密码
const mobileForgetApi = (data)=>{
	return request({
		url:'/mobile/forget',
		method:'POST',
		data
	})
}

export default {
	userLoginApi,
	userRegApi,
	mobileForgetApi
}