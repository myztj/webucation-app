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

export default {
	getBbsNavListApi,
	getBbsListApi,
	addInvitationApi
}