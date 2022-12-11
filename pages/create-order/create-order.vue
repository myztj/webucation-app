<template>
	<view>
		<view class="goobs-item" @click="navBack()">
			<z-goods-item :newLitStyle="true" :item="payList"></z-goods-item>
		</view>
		<view class="row-list">
			<z-list v-for="(item,index) in userParams" :key="index" :item="item" :isBb="true"></z-list>
		</view>
		<view class="btn-box">
			<button class="btn" type="default" v-if="payList.price">立即购买￥{{payList.price-couponPrice}}</button>
		</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				userParams: [
					{ id: 1, text: '优惠券',word:'暂无可用',isIconColor:true,isText:true, icon: 'iconfont icon-jinru', option: this.getCoupon},
					{ id: 2, text: '支付方式',word:'微信支付',isColor:true, option: this.payType },
				],
				payParams:{
					id:'',
					type:''
				},
				isCoupon:0,
				payList:{},
				couponPrice:0
			}
		},
		onLoad(option) {
			console.log(option);
			if(option.price){
				this.userParams[0].word=`减（${option.price}元）`
				this.couponPrice = option.price
			}
			this.payParams.id = option.id
			this.payParams.type = option.type
				// this.getBookList()
			this.getPayList()
			this.findGoodsCoupon()
		},
		methods: {
			//选者支付方式
			payType(){
				
			},
			//挑选优惠券
			getCoupon(){
				if(!this.isCoupon) return
				this.navTo(`/pages/my/my-coupon?goods_id=${this.payParams.id}&type=${this.payParams.type}`)
			},
			//查询优惠券
			async findGoodsCoupon(){
				try{
					let res = await orderApi.findGoodsCouponApi({goods_id:this.payParams.id,type:this.payParams.type})
					console.log(res);
					this.isCoupon = res.data.data
					if(this.isCoupon && !this.couponPrice){
						this.userParams[0].word=`请选者优惠券（${res.data.data}张）`
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取订单详情
			async getPayList(){
				try{
					let res = await orderApi.getPayListApi(this.payParams)
					console.log(res);
					this.payList = res.data.data
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取订单详情
			async getBookList(){
				try{
					let res = await orderApi.getBookListApi({goods_id:this.payParams.id,type:this.payParams.type})
					console.log(res);
					this.payList = res.data.data
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.goobs-item{
	padding: 20rpx 15rpx;
	border-bottom: 15rpx solid #f5f5f3;
}
.btn-box{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	border-top: 1rpx solid #dee2e6;
	.btn{
		background-color: #5ccc84;
		color: #f5f5f3;
		font-size: 35rpx;
		padding: 7rpx;
	}
}
</style>
