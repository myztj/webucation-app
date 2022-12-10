<template>
	<view class="footer-input">
		<input class="p-1" type="text" value="" placeholder="说一句吧" />
		<text class="iconfont icon-dianzan2"></text>
		<text>12</text>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.footer-input{
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		>input{
			width: 82%;
			border: 1rpx solid #dee2e6;
			border-radius: 10rpx;
			background-color: #f8f9fa;
		}
		.iconfont{
		    font-size: 40rpx;
		}
		>text{	
			font-size: 35rpx;
			margin: 0 10rpx;
		}
	}
</style>