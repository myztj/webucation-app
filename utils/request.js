import comfig from "@/config/config.js"
import store from "@/store/index.js"
const request = (option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:comfig.baseUrl+option.url,
			method:option.method || 'GET',
			data:option.data || {},
			header:{
				appid:'bd9d01ecc75dbbaaefce',
				token:store.state.token || '',
				...option.header
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default request
