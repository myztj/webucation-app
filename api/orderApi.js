import request from "@/utils/request.js"

//我的订单列表
const getMyOrderListApi = (data)=>{
	return request({
		url:'/mobile/order/list',
		method:'GET',
		data
	})
}

//我的消息，消息列表

const getMyInfoApi = (data) =>{
	return request({
		url:'/mobile/notice/list',
		method:'GET',
		data
	})
}


//我的优惠券
const getUseCouponApi = (data)=>{
	return request({
		url:'/mobile/user_coupon',
		method:'GET',
		data
	})
}
export default {
	getMyOrderListApi,
	getMyInfoApi,
	getUseCouponApi
}