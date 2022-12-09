<template>
	<view class="mycoupon-box">
		<z-coupon-item v-for="(item,index) in couponList" :key="index" :item="item" :goodsId="goodsId" @immediateUse="immediateUse"></z-coupon-item>
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
				couponList:[],
				goodsId:0,
				goodsParams:{
					type:'',
					id:''
				}
			}
		},
		async onLoad(option) {
			console.log(option);
			this.goodsParams.type = option.type
			this.goodsParams.id = option.goods_id
			this.goodsId = option.goods_id
			try{
				let res = await this.getUseCoupon()
				this.couponList = res.data.data.rows
			}catch(e){
				console.log(e);
				//TODO handle the exception
			}
			this.getUseCoupon()
		},
		async onPullDownRefresh() {
			this.couponList = []
			try{
				let res = await this.getUseCoupon(this.couponParams)
				this.couponList = res.data.data.rows
				uni.stopPullDownRefresh()
			}catch(e){
				uni.stopPullDownRefresh()
				//TODO handle the exception
			}
		},
		methods: {
			//使用优惠券
			immediateUse(item){
				console.log(item);
				this.navTo(`/pages/create-order/create-order?id=${this.goodsParams.id}&type=${this.goodsParams.type}&price=${item.price}`)
			},
			//获取优惠券列表
			async getUseCoupon(){
				uni.showLoading({mask:true})
				try{
					let res = await orderApi.getUseCouponApi(this.couponParams)
					uni.hideLoading()
					return res
					// this.couponList = res.data.data.rows
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
