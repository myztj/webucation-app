<template>
	<view class="good-box">
		<view v-if="collectList">
			<z-goods-item v-for="(item,index) in collectList" :key="index" :item="item.goods"></z-goods-item>
		</view>
		<view class="hint">没有更多数据了</view>
	</view>
</template>

<script>
	import goodsApi from "@/api/goodsApi.js"
	export default {
		data() {
			return {
				collectList:null,
				orderparams:{
					page:1,
					limit:10
				}
			}
		},
		onLoad() {
			this.getCollectList()
		},
		methods: {
			async getCollectList(){
				uni.showLoading({mask:true})
				try{
					let res =await goodsApi.getCollectListApi(this.orderparams)
					console.log('res=>>>>>',res);
					this.collectList = res.data.data.rows
					console.log(res.data.data.rows);
					uni.hideLoading()
				}catch(e){
					//TODO handle the exception
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style lang="scss">
	.good-box{
		padding: 20rpx;
	}
.hint{
	padding-top: 30rpx;
	text-align: center;
	font-size: 30rpx;
	color: rgb(119, 119, 119);
}
</style>
