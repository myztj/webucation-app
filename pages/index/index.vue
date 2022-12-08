<template>
	<view class="content">
		<!-- //头部搜索框 -->
		<z-nav-search :serchData="serchData"></z-nav-search>
		<!-- //轮播图 -->
		<my-swiper :swpierData="swpierData" @handlerSwiperGoto="handlerSwiperGoto"></my-swiper>
		<!-- 导航栏 -->
		<my-nav-list :navData="navData"></my-nav-list>
		<!-- 滑动优惠券-->
	    <my-scroll-coupon></my-scroll-coupon>
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
import myScrollCoupon from "@/pages/index/components/my-scroll-coupon.vue"
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
		myHotList,
		myScrollCoupon
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
	},
	methods: {
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
	padding-bottom: 10rpx;
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

</style>
