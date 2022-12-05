<template>
	<view class="login-head">
		<text class="iconfont icon-fanhui" @click="handelnavto"></text>
	</view>
</template>

<script>
	import {mapState} from "vuex"
    export default{
		computed:{
			...mapState(['userInfo'])
		},
         methods:{
			handelnavto(){
				if(!this.userInfo.phone) return uni.switchTab({url:'/pages/my/my'})
				uni.navigateBack()
			} 
		 }
	}
</script>

<style lang="scss">
	.login-head{
		height: 220rpx;
		background: linear-gradient(to right,#3cfcb1,#54ebcf,#8dd8eb);
		.iconfont{
			padding: 28rpx 30rpx;
			display: inline-block;
			font-size: 45rpx;
			color: #fff;
		}
	}
</style>