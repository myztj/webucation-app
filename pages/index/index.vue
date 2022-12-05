<template>
	<view class="content">
		<!-- //头部搜索框 -->
		<z-nav-search :serchData="serchData"></z-nav-search>
		<!-- //轮播图 -->
		<my-swiper :swpierData="swpierData" @handlerSwiperGoto="handlerSwiperGoto"></my-swiper>
		<!-- 导航栏 -->
		<my-nav-list :navData="navData" @handlerNavGoto="handlerNavGoto"></my-nav-list>
		<!-- 滑动优惠券-->
		<scroll-view scroll-x="true" style="width: 100%">
			<view class="scroll-view" style="transform: scale(0.95);">
				<view class="scroll-item" v-for="(item, index) in couponList" :key="index" :item="item"><z-coupon-item @getCoupon="getCoupon" :item="item"></z-coupon-item></view>
			</view>
		</scroll-view>
		<!-- 拼团 -->
		<my-group-list></my-group-list>
		<!-- 最新列表 -->
		<my-new-list :newList="newList"></my-new-list>
		<!-- 热门推荐 -->
		<my-hot-list></my-hot-list>
		<!-- //底部图片 -->
		<view class="footerImg"><image :src="indexImg" mode=""></image></view>
	</view>
</template>

<script>
import myHotList from "@/pages/index/components/my-hot-list.vue"
import myNewList from '@/pages/index/components/my-new-list.vue';
import myGroupList from '@/pages/index/components/my-group-list.vue';
import myNavList from '@/pages/index/components/my-nav-list.vue';
import mySwiper from '@/pages/index/components/my-swiper.vue';
import indexApi from '@/api/indexApi.js';
export default {
	components: {
		mySwiper,
		myNavList,
		myGroupList,
		myNewList,
		myHotList
	},
	data() {
		return {
			serchData: {}, // 头部搜索栏
			swpierData: [], //轮播图
			navData: [], //导航栏
			couponList: [], //优惠券列表
			newList: [],
			indexImg:''
		};
	},
	onLoad() {
		//获取总数据
		this.getSwiperList();
		//获取优惠券列表
		this.getCouponList();
	},
	methods: {
		//领取优惠券
		async getCoupon(item) {
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
		//导航栏点击事件
		handlerNavGoto(item) {
			console.log(item);
			if (item.url) return uni.navigateTo({ url: '/pages/common/webview?url=' + item.url });
			switch (item.module) {
				case 'test':
					uni.navigateTo({ url: '/pages/index/test-list' });
					break;
				case 'flashsale':
					uni.navigateTo({ url: '/pages/index/list?module=flashsale' });
					break;
				case 'group':
					uni.navigateTo({ url: '/pages/index/list?module=group' });
					break;
				case 'live':
					uni.navigateTo({ url: '/pages/index/list?module=live' });
					break;
				case 'column':
					uni.navigateTo({ url: '/pages/index/list?module=column' });
					break;
				case 'book':
					uni.navigateTo({ url: '/pages/index/book-list' });
					break;
				case 'bbs':
					uni.navigateTo({ url: '/pages/index/bbs' });
					break;
				default:
					break;
			}
			// console.log(item);
		},
		//轮播图点击事件
		handlerSwiperGoto(item) {
			if (item.url) return uni.navigateTo({ url: '/pages/common/webview?url=' + item.url });
			console.log(item);
		},
		//获取首页总数据
		async getSwiperList() {
			uni.showLoading({ mask: true });
			try {
				let res = await indexApi.getSwiperListApi();
				console.log(res);
				this.serchData = res.data.data[0];
				this.swpierData = res.data.data[1].data;
				this.navData = res.data.data[2].data;
				this.newList = res.data.data[5].data;
				this.indexImg = res.data.data[6].data;
				uni.hideLoading();
			} catch (e) {
				uni.hideLoading();
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	overflow: hidden;
	padding-bottom: 50rpx;
}
.footerImg{
   	border-top: 15rpx solid #f5f5f3;
	width: 100%;
	height: 350rpx;
	>image{
		width: 100%;
		height: 100%;
	}
}
.scroll-view {
	display: flex;
	.scroll-item {
		margin: 0 30rpx 0 0;
	}
}
</style>
