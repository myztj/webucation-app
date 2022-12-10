import request from "@/utils/request.js"
//获取社区头部导航数据
const getBbsNavListApi = (data)=>{
	return request({
		url:'/mobile/bbs',
		method:'GET',
		data
	})
}
//获取社区列表
const getBbsListApi = (data)=>{
	return request({
		url:'/mobile/post/list',
		method:'GET',
		data
	})
}

//社区增加帖子
const addInvitationApi = (data)=>{
	return request({
		url:'/mobile/post/save',
		method:'POST',
		data
	})
}
//点赞
const userLikeApi = (data)=>{
	return request({
		url:'/mobile/post/support',
		method:'POST',
		data
	})
}

//取消点赞
const userUnLikeApi = (data)=>{
	return request({
		url:'/mobile/post/unsupport',
		method:'POST',
		data
	})
}

//获取帖子详情
const getPostReadApi = (data)=>{
	return request({
		url:'/mobile/post/read',
		method:'GET',
		data
	})
}

//获取帖子评价回复数据
const getEvaluateReplyApi = (data)=>{
	return request({
		url:'/mobile/post_comment',
		method:'GET',
		data
	})
}
export default {
	getBbsNavListApi,
	getBbsListApi,
	addInvitationApi,
	userLikeApi,
	userUnLikeApi,
	getPostReadApi,
	getEvaluateReplyApi
}