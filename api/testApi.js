import request from "@/utils/request.js"

const getTestTopicApi = (data) =>{
	return request({
		url:'/mobile/testpaper/read',
		method:'GET',
		data
	})
}

export default{
	getTestTopicApi
}