import request from "@/utils/request.js"
//获取电子书列表
const getBookLIstApi = (data)=>{
	return request({
		url:'/mobile/book/list',
		method:'GET',
		data
	})
}

//获取电子书详情
const getBookDetailApi = (id) =>{
	return request({
		url:'/mobile/book/read?id='+id,
		method:'GET',
	})
}

//获取电子书章节详情
const getBookSectionDetailApi = (book_id,id)=>{
	return request({
		url:`/mobile/book/detail?book_id=${book_id}&id=${id}`,
		method:'GET'
		
	})
}
export default{
	getBookLIstApi,
	getBookDetailApi,
	getBookSectionDetailApi
}