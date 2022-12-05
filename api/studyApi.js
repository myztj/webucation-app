import request from "@/utils/request.js"

const gteHistoryListApi = (data)=>{
	return request({
		url:'/mobile/user_history/list',
		method:'GET',
		data
	})
}


export default {
	gteHistoryListApi
}