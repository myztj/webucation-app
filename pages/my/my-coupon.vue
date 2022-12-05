<template>
	<view class="mycoupon-box">
		<z-coupon-item v-for="(item,index) in couponList" :key="index" :item="item"></z-coupon-item>
		<view class="hint">没有更多数据了</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				couponParams:{
					page:1,
					limit:10
				},
				couponList:[]
			}
		},
		onLoad() {
			this.getUseCoupon()
		},
		methods: {
			async getUseCoupon(){
				uni.showLoading({mask:true})
				try{
					let res = await orderApi.getUseCouponApi(this.couponParams)
					console.log(res);
					this.couponList = res.data.data.rows
					uni.hideLoading()
				}catch(e){
					uni.hideLoading()
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.mycoupon-box{
	padding: 0 30rpx;
}
.hint{
	padding-top: 20rpx;
	text-align: center;
	font-size: 30rpx;
	color: rgb(119, 119, 119);
}
</style>
