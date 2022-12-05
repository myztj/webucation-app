import upload from "@/utils/upload.js"
import request from "@/utils/request.js"
//上传头像
const editUserImgApi = (file) =>{
	return upload({
		url:'/mobile/upload',
		file
	})
}

//绑定手机号
const bindingMobileApi = (data)=>{
	return request({
		url:'/mobile/bind_mobile',
		method:'POST',
		data
	})
}

const sendCodeApi = (data)=>{
	return request({
		url:'/mobile/get_captcha',
		method:'POST',
		data
	})
}

const subUserInfoApi = (data)=>{
	return request({
		url:'/mobile/update_info',
		method:'POST',
		data
	})
}

//密码修改
const alterpassWordApi = (data)=>{
	return request({
		url:'/mobile/update_password',
		method:'POST',
		data
	})
}
//退出登录
const userOutApi = () =>{
	return request({
		url:'/mobile/logout',
		method:'POST'
	})
}
export default {
	editUserImgApi,
	bindingMobileApi,
	sendCodeApi,
	subUserInfoApi,
	alterpassWordApi,
	userOutApi
}