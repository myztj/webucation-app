import request from "@/utils/request.js"

const getCourseApi = (data)=>{
	return request({
		url:`/mobile/course/read`,
		method:'GET',
		data
	})
}

export default {
	getCourseApi
}