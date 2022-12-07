<template>
	<view>
		<me-tbas :tabs="tabs" v-model="tabIndex" :height="90"></me-tbas>
		
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item v-for="(tab,i) in tabs" :key="i">
					<mescroll-item ref="mescrollItem" :pageUrl="pageUrl" :swiperParams="swiperParams" :i="i" :index="tabIndex" :tabs="tabs" :height="height"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import MescrollItem from "../study/mescroll-swiper-item.vue";
	import meTbas from "@/uni_modules/me-tabs/me-tabs.vue"
	export default {
		components:{
			meTbas,
			MescrollItem
		},
		data() {
			return {
				height:"",
				tabIndex:0,
				tabs:['课程','专栏'],
				swiperParams:{
					keyword:'',
					type:'course',
					page:1
				},
				//搜索和学习共用一个MescrollItem组件，请求数据封装在组件里面，通过传递的url地址两发送不同的请求
				pageUrl:'/mobile/search'
			}
		},
		//监听原生自定义输入框点击事件
		onNavigationBarSearchInputClicked() {
			this.navTo('/pages/search/search')
		},
		onLoad(options) {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
			this.swiperParams.keyword=options.keyword
			// this.getSearchList()
		},
		methods: {
			//swiper发生变动时触发
			swiperChange(e){
				console.log(e.detail.current);
				this.tabIndex = e.detail.current
				e.detail.current == 1? this.swiperParams.type ='column' :this.swiperParams.type ='course'
			}
		}
	}
</script>

<style>

</style>
