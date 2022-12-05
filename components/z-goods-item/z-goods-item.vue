<template>
	<view>
		<view class="goods-list">
			<view class="goods-item" :class="{'column':isColumn}">
				<view class="goods-left" :class="{'columnImgWigth':isColumn}" >
					<image :src="item.cover || '../../static/banner/banner2.png'" mode=""></image>
					<text class="ico">图文</text>
				</view>
				<view class="goods-right">
					<view class="right-up">
						<view class="title">{{item.title}}</view>
						<view class="info" v-if="item.try">{{item.try}}</view>
						<view class="info" v-if="isprogress">学习进度</view>
						<view class="" v-if="item.price">
							<text class="price" style="color: red;" v-if="item.price!='0.00'&&item.t_price!='0.00'">秒杀价：<text style="font-size: 35rpx;">￥{{item.price}}</text></text>
							<text class="price" style="color: red;" v-if="item.price=='0.00'">免费<text style="font-size: 35rpx;">￥{{item.t_price}}</text></text>
							<text class="t-price" style="font-size: 24rpx; color: #a9a5a0;">￥{{item.t_price}}</text>
						</view>
					</view>
					<view class="right-down">
						<text v-if="isprogress">最近学习 </text>
						<text v-if="isprogress">已学习 {{item.progress}}%</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"z-goods-item",
		props:{
			item:{
				type:Object,
				default:()=>({
					cover:'../../static/banner/banner2.png',
					id:905,
					title:'uni-app实战商城类app和小程序',
					try:'\n适用人群\n具备Html+Css+Javascript基础知识和Vuejs基础知识。\n\n\n课程概述\n本季度为uni-app实战项目第2季度，将实战商城类app和小程序',
					type:'media'
				})
			},
			isColumn:{
				type:Boolean,
				default:false
				
			}
		},
		computed:{
			isprogress(){
				return typeof(this.item.progress)=="number"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.goods-list{
	.goods-item{
		display: flex;
		justify-content: space-between;
		.goods-left{
			padding-right: 20rpx;
			width: 300rpx;
			flex-shrink: 0;
			position: relative;
			>image{
				width: 100%;
				height: 170rpx;
			}
			.ico{
				position: absolute;
				right: 25rpx;
				bottom: 15rpx;
				background:rgba(0, 0, 0, 0.5);
				color: #fff;
				border-radius: 5rpx;
				padding: 3rpx 8rpx;
				font-size: 24rpx;
			}
		}
		.goods-right{
			flex: 1;	
			width: 330rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.right-up{
				.title,.info{
					text-overflow: ellipsis; //显示省略号
					-webkit-line-clamp: 1; //最多1行
					display: -webkit-box;
					-webkit-box-orient: vertical;
					white-space: normal;
				}
				>view{
				overflow: hidden;
				}
				.info{
					font-size: 24rpx;
					color: #6c757d;
					margin-top: 5rpx;
				}
			}
			.right-down{
				>text{
					&:nth-child(1){
						font-size: 24rpx;
						color: red;
						margin-right: 10rpx;
					}
					&:nth-child(2){
						font-size: 24rpx;
						color: #6c757d;
					}
				}
			}
		}
	}
}
.column{
	display: flex;
	justify-content: space-between !important;
	flex-direction: column !important;
	// padding: 30rpx 0 !important;
}
.columnImgWigth{
	width: 340rpx !important;
	height: 180rpx !important;
}
</style>