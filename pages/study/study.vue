<template>
	<view class="study-box">
		<view class="boops" v-if="istoken">
			<!-- //导航 -->
			<z-card-nav></z-card-nav>
			<!-- 导航 -->
			<meTbs :tabs="tabs" v-model="tabIndex" :height="90"></meTbs>
			
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item v-for="(tab,i) in tabs" :key="i">
					<mescroll-item ref="mescrollItem" :i="i" :swiperParams="swiperParams" :index="tabIndex" :tabs="tabs" :height="height"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
		<view class="hintInfo" v-if="!istoken">
			<image src="../../static/noLogin.png" mode=""></image>
			<text>登录后可以查看我的学习哦</text>
			<view class="btn" @click="goToLogin">立即登录</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex"
	import MescrollItem from "./mescroll-swiper-item.vue";
	import meTbs from "@/uni_modules/me-tabs/me-tabs.vue"
	export default {
		components:{
			meTbs,
			MescrollItem
		},
		data() {
			return {
				tabs:['课程','专栏'],
				tabIndex:0,
				height:"",
				swiperParams:{
					page:0,
					type:'course'
				}
			}
		},
		computed:{
			...mapGetters(['istoken'])
		},
		onLoad() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
		},
		methods: {
			//去登录
			goToLogin(){
				uni.navigateTo({url:"/pages/login/login"})
			},
			swiperChange(e){
				console.log(e);
				let index = e.detail.current
				index===0? this.swiperParams.type = 'course' : this.swiperParams.type = 'column'
				this.tabIndex = e.detail.current
			},
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.boops{
	height: 100%;
	overflow: hidden;
	position: relative;
}
.hintInfo{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	>image{
		width: 350rpx;
		height: 350rpx;
	}
	>text{
		padding: 20rpx 0;
		font-size: 30rpx;
		color: #6c757d;
	}
	>view{
		width: 170rpx;
		height: 60rpx;
		border: 1rpx solid #666;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #333;
	}
}
</style>
