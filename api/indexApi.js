import request from "@/utils/request.js"

const getSwiperListApi = ()=>{
	return request({
		url:'/mobile/index',
		method:'GET'
	})
}

//考试列表数据
const getTestListApi = (data)=>{
	return request({
		url:'/mobile/testpaper/list',
		method:'GET',
		data
	})
}

//秒杀列表
const GetflashsaleListApi = (data)=>{
	return request({
		url:'/mobile/flashsale',
		method:'GET',
		data
	})
}

//优惠券列表
const getCouponListApi = ()=>{
	return request({
		url:'/mobile/coupon',
		method:'GET'
	})
}

//领取优惠券列表
const getcouponApi =(data)=>{
	return request({
		url:'/mobile/user_coupon/receive',
		method:'POST',
		data
	})
}

//获取拼团列表
const getGroupListApi = (data) =>{
	return request({
		url:'/mobile/group',
		method:'GET',
		data
	})
}
export default {
	getSwiperListApi,
	getTestListApi,
	GetflashsaleListApi,
	getCouponListApi,
	getcouponApi,
	getGroupListApi
}