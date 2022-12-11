import request from "@/utils/request.js"

const gteHistoryListApi = (pageUrl="/mobile/user_history/list",data)=>{
	return request({
		url:pageUrl,
		method:'GET',
		data
	})
}

//获取我的帖子数据
const getMyPostListApi =(data)=>{
	return request({
		url:'/mobile/mypost',
		method:'GET',
		data
	})
}

//删除出我的帖子
const delMyPostApi = (data)=>{
	return request({
		url:'/mobile/post/delete',
		method:'POST',
		data
	})
}

export default {
	gteHistoryListApi,
	getMyPostListApi,
	delMyPostApi
}