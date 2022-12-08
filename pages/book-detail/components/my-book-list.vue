<template>
	<view class="catalog">
			<view class="catalog-item" @click="handlerBookCatalog(item,index)" v-for="(item,index) in detailData" :key="index">
				<view class="item-left" :class="{'active':index==acIndex}">00{{index+1}}</view>
				<view class="item-left">
					<view class="item-title" :class="{'active':index==acIndex}">{{item.title}}</view>
					<view class="item-free" v-if="item.isfree">免费试看</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			detailData:{
				type:Array,
				default:()=>[]
			},
			acIndex:{
				type:[Number,String],
				default:0
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			handlerBookCatalog(item,index){
				this.$emit('handlerBookCatalog',item,index)
			}
		}
	}
</script>

<style lang="scss">
	.total{
		width: 670rpx;
		height: 86rpx;
		background-color: #f8f9fa;
		border: 1rpx solid #dee2e6;
		margin: 30rpx auto;
		border-radius: 10rpx;
		padding-left: 20rpx;
		line-height: 86rpx;
		color: #6c757d;
	}
	.catalog-item{
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		border-bottom: 1rpx solid #dee2e6;
		.item-left{
			font-size: 32rpx;
			color: #6c757d;
			padding-right:20rpx;
			.item-free{
				width: 120rpx;
				color: red;
				font-size: 25rpx;
				border: 1rpx solid red;
				border-radius: 10rpx;
				text-align: center;
				margin-top: 10rpx;
			}
		}
	}
	.active{
		color: #00cf8a !important;
	}
</style>