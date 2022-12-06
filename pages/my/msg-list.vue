<template>
	<view class="msg-box">
		<z-msg-item v-for="(item,index) in myInfoList" :key="item.id" :item="item"></z-msg-item>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				myInfoList:[],
				orderparams:{
					page:1,
					limit:5
				}
			}
		},
		onLoad() {
			this.getMyInfo()
		},
		onPullDownRefresh() {
			this.myInfoList = []
			this.getMyInfo()
		},
		methods: {
		async getMyInfo(){
			uni.showLoading({mask:true})
				try{
					let res = await orderApi.getMyInfoApi(this.orderparams)
					console.log(res);
					if(res.statusCode==200){
						this.myInfoList = res.data.data.rows
					}
					uni.stopPullDownRefresh()
					uni.hideLoading()
				}catch(e){
					uni.hideLoading()
					uni.stopPullDownRefresh()
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #eeeeee;
}
.msg-box{
	padding: 20rpx;
}
</style>
