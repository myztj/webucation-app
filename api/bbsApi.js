import request from "@/utils/request.js"

const getBbsNavListApi = (page)=>{
	return request({
		url:'/mobile/bbs?page='+page,
		method:'GET'
	})
}

const getBbsListApi = (data)=>{
	return request({
		url:'/mobile/post/list',
		method:'GET',
		data
	})
}

export default {
	getBbsNavListApi,
	getBbsListApi
}