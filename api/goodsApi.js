import request from "@/utils/request.js"

const getCollectListApi = (data)=>{
	return request({
		url:'/mobile/user_fava',
		method:'GET',
		data
	})
}


export default {
	getCollectListApi
}