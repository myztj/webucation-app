<template>
	<view>
		<view class="nav-box" @click="navTo('/pages/search/search')">
			<uni-icons type="search" color="#9b9793" size="22"></uni-icons>
			<input class="myinput" disabled="true" type="text" :placeholder="serchData.placeholder"/>
		</view>
	</view>
</template>

<script>
	export default {
		name:"z-nav-search",
		props:{
			serchData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.nav-box{
		position: relative;
		width: 710rpx;
		height: 90rpx;
		background-color: #f5f5f1;
		margin: 20rpx;
		border-radius: 10rpx;
		.uni-icons{
			position: absolute;
			top: 25rpx;
			left: 170rpx;
		}
		.myinput{
			text-align: center;
			width: 100%;
			height: 100%;
		}
	}
</style>