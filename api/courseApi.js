import request from "@/utils/request.js"

const getCourseApi = (urls="course",data)=>{
	return request({
		url:`/mobile/${urls}/read`,
		method:'GET',
		data
	})
}

const userCollectApi = (url,data)=>{
	return request({
		url:`/mobile/${url}`,
		method:'POST',
		data
	})
}

export default {
	getCourseApi,
	userCollectApi
}