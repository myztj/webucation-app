import request from "@/utils/request.js"

const gteHistoryListApi = (pageUrl="/mobile/user_history/list",data)=>{
	return request({
		url:pageUrl,
		method:'GET',
		data
	})
}


export default {
	gteHistoryListApi
}