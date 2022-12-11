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

//获取立即购买订单详情
const getPayListApi = (data)=>{
	return request({
		url:'/mobile/goods/read',
		method:'GET',
		data
	})
}

//获取书籍立即购买订单详情
const getBookListApi = (data)=>{
	return request({
		url:'/mobile/book/read',
		method:'GET',
		data
	})
}

//差查询是否有优惠券
const findGoodsCouponApi = (data)=>{
	return request({
		url:'/mobile/user_coupon/count',
		method:'GET',
		data
	})
}
export default {
	getMyOrderListApi,
	getMyInfoApi,
	getUseCouponApi,
	getPayListApi,
	findGoodsCouponApi,
	getBookListApi
}