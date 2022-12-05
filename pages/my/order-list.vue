<template>
	<view>
		<z-order-item v-for="(item,index) in myOrderList" :key="item.id" :item="item"></z-order-item>
		<view class="order-show" v-if="!myOrderList.length">你还有没订单，去转转吧</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				myOrderList:[],
				orderparams:{
					page:1,
					limit:5
				}
			}
		},
		onLoad() {
			this.getMyOrderList()
		},
		methods: {
			//获取我的订单列表
		async getMyOrderList(){
			uni.showLoading({mask:true})
			try{
				let res = await orderApi.getMyOrderListApi(this.orderparams)
				if(res.statusCode==200){
					this.myOrderList = res.data.data.rows
				}
				uni.hideLoading()
				console.log(res);
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
.order-show{
	margin-top: 50rpx;
	text-align: center;
	color: #666;
}
</style>
