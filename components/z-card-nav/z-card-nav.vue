<template>
	<view>
		<view class="nav-list">
			<view class="nav-item">
				<text class="iconfont icon-OrderHistory"></text>
				<text class="text">帖子</text>
			</view>
			<view class="nav-item">
				<text class="iconfont icon-pinglun2"></text>
				<text class="text">考试</text>
			</view>
			<view class="nav-item">
				<text class="iconfont icon-shoucang1"></text>
				<text class="text">电子书</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"z-card-nav",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.nav-list{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 30rpx;
	padding: 30rpx 0;
	box-shadow: 0px 0px 2px 2px #eee;
	border-radius: 10rpx;
	.nav-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.iconfont{
			color: rgb(254, 189, 0);
			font-size: 40rpx;
		}
		.text{
			margin-top: 5rpx;
			color: #6c757d;
			font-size: 24rpx;
		}
	}
}
</style>