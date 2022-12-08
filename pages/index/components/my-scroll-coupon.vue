<template>
	<scroll-view scroll-x="true" style="width: 100%">
		<view class="scroll-view" style="transform: scale(0.95);">
			<view class="scroll-item" v-for="(item, index) in couponList" :key="index" :item="item"><z-coupon-item @getCoupon="getCoupon" :item="item"></z-coupon-item></view>
		</view>
	</scroll-view>
</template>

<script>
	import {mapState} from "vuex"
	import indexApi from '@/api/indexApi.js';
	export default{
		data(){
			return{
				couponList:[]
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		created() {
			//获取优惠券列表
			this.getCouponList();
		},
		watch:{
			userInfo(){
				//当用户发生改变时，重新获取优惠券列表
				this.getCouponList();
			}
		},
		methods:{
			//领取优惠券
			async getCoupon(item) {
				if(!this.$store.state.userInfo.token){
					uni.showToast({title:'请先登录',icon:"none"})
					setTimeout(()=>{this.navTo('/pages/login/login')},500)
					return false
				}
				if(!this.$store.state.userInfo.phone) return uni.showToast({title:'请先绑定手机号',icon:"none"})
				if (item.isgetcoupon && !item.btn) return uni.showToast({ title: '已领取', icon: 'none' });
				console.log(item);
				try {
					let res = await indexApi.getcouponApi({ coupon_id: item.id });
					if (res.statusCode === 200) {
						uni.showToast({ title: '领取成功', icon: 'none' });
						this.getCouponList();
					}
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
			},
			//获取优惠券列表
			async getCouponList() {
				try {
					let res = await indexApi.getCouponListApi();
					this.couponList = res.data.data;
					console.log(this.couponList);
				} catch (e) {
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		display: flex;
		.scroll-item {
			margin: 0 30rpx 0 0;
		}
	}
</style>