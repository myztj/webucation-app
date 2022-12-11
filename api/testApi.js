import request from "@/utils/request.js"

const getTestTopicApi = (data) =>{
	return request({
		url:'/mobile/testpaper/read',
		method:'GET',
		data
	})
}

//交卷
const submitTestApi = (data)=>{
	return request({
		url:'/mobile/user_test/save',
		method:'POST',
		data
	})
}

//我的考试记录
const getMyTestListApi = (data)=>{
	return request({
		url:'/mobile/user_test/list',
		method:'GET',
		data
	})
}

export default{
	getTestTopicApi,
	getMyTestListApi,
	submitTestApi
}