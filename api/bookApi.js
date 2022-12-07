import request from "@/utils/request.js"
//获取电子书列表
const getBookLIstApi = (data)=>{
	return request({
		url:'/mobile/book/list',
		method:'GET',
		data
	})
}
export default{
	getBookLIstApi
}