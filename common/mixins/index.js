export default {
	data(){
		return{
			days:'',
			hr:'',
			min:'',
			sec:'',
			groupTime:{
				grouphr:'',
				groupmin:'',
				groupsec:'',
			}
		}
	},
	methods:{
		//全局页面跳转
		navTo(url,istabbar=false){
			if(!url) return uni.showToast({title:'请输入要跳转的路径',icon:'none'})
			if(istabbar){
				uni.switchTab({
					url:url
				})
			}else{
				uni.navigateTo({
					url:url
				})
			}
		},
		navBack(delta=1){
			uni.navigateBack({
				delta
			})
		},
		//时间处理
		formDate(value){
			const end  = new Date(value);
			const now = Date.parse(new Date());
			const msec = end - now;
			 let day = parseInt(msec / 1000 / 60 / 60 / 24);
			 let hr = parseInt(msec / 1000 / 60 / 60 % 24);
			 let min = parseInt(msec / 1000 / 60 % 60);
			 let sec = parseInt(msec / 1000 % 60);
			 this.days = Number(day)
			 this.hr = Number(hr<10?'0'+hr : hr)
			 this.min = Number(min<10?'0'+min : min)
			 this.sec = Number(sec<10?'0'+sec : sec)
		},
		//时间处理
		formGroupDate(value){
			console.log(value);
			const end  = new Date(value).getTime();
			const now = Date.parse(new Date());
			const msec = now - end;
			let nowTime = (1000 * 60 * 60 * 24)-msec
			 let hr = parseInt(nowTime / 1000 / 60 / 60 % 24);
			 let min = parseInt(nowTime / 1000 / 60 % 60);
			 let sec = parseInt(nowTime / 1000 % 60);
			 console.log(hr,min,sec);
			 this.groupTime.grouphr = Number(hr<10?'0'+hr : hr)
			 this.groupTime.groupmin = Number(min<10?'0'+min : min)
			 this.groupTime.groupsec = Number(sec<10?'0'+sec : sec)
		}
	}
}