import request from "@/utils/request.js"

const getCourseApi = (urls="course",data)=>{
	return request({
		url:`/mobile/${urls}/read`,
		method:'GET',
		data
	})
}
//收藏
const userCollectApi = (url,data)=>{
	return request({
		url:`/mobile/${url}`,
		method:'POST',
		data
	})
}

//拼团信息
const getGroupDateApi = (data) =>{
	return request({
		url:'/mobile/group_work/list',
		method:'GET',
		data
	})
}
export default {
	getCourseApi,
	userCollectApi,
	getGroupDateApi
}