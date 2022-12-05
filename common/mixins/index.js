export default {
	data(){
		return{
			
		}
	},
	methods:{
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
		}
	}
}