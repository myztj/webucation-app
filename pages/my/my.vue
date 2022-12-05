<template>
	<view class="my-box animated fadeInDown">
		<view class="my-head bg-main">
			<i-user-info></i-user-info>
			<z-mynav-list></z-mynav-list>
		</view>
		<view class="list-box">
			<z-row-list></z-row-list>
		</view>
	</view>
</template>

<script>
	import iUserInfo from "@/pages/my/components/i-user-info.vue"
	import zMynavList from "@/pages/my/components/z-mynav-list.vue"
	import zRowList from "@/pages/my/components/z-row-list.vue"
	export default {
		components:{
			iUserInfo,
			zMynavList,
			zRowList
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page,.my-box{
	height: 100%;
}
.my-box{
	.my-head{
		height: 350rpx;
		border-radius: 0 0 100rpx 100rpx;
		position: relative;
	}
}
.list-box{
	padding:40rpx 30rpx 30rpx 30rpx;
}
</style>
