import config from "@/config/config.js"
import {TOKEN} from "@/common/storageName.js"
const upload = (options)=>{
	return new Promise((resolve,reject)=>{
	uni.uploadFile({
		url : config.baseUrl + options.url,
		filePath : options.file || "",
		method : 'POST',
		name : options.name || "file",
		header : options.header || {},
		formData : options.data || {},
		timeout : 8000,
		header : {
			appid:'bd9d01ecc75dbbaaefce',
			token : uni.getStorageSync(TOKEN) || ''
		},
		success : res=>{
			if(res.statusCode === 200){
				resolve(JSON.parse(res.data))
			}
		},
		fail : err => {
			reject(err)
		}
	})
	})
}

export default upload