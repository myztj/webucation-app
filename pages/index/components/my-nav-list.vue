<template>
	<view class="nav-box">
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navData" :key="index" @click="handlerNavGoto(item)">
				<image :src="item.src||'../../../static/logo.png'" mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			navData:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			handlerNavGoto(item){
				this.$emit('handlerNavGoto',item)
			}
		}
	}
</script>

<style lang="scss">
	.nav-list{
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		.nav-item{
			flex: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			color: #6c757d;
			&:nth-child(-n+4){
				margin-bottom: 30rpx;
			}
			>image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-bottom: 10rpx;
			}
		}
	}
</style>