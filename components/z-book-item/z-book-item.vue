<template>
	<view>
		<view class="book-item">
			<view class="book-left">
				<image :src="item.cover" mode=""></image>
			</view>
			<view class="book-right">
				<view class="top">
					<text>{{item.title}}</text>
				</view>
				<view class="down">
					<view class="price">
						<text class="current-price">￥{{item.price}}</text>
						<text class="original-price">￥{{item.t_price}}</text>
					</view>
					<view class="subscription">
						<text>{{item.sub_count}}人订阅</text>
						<text class="iconfont icon-xiayibu ml-1"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"z-book-item",
		props:{
			item:{
				type:Object,
				default:()=>({
					cover:"http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/387c259afba59e38cf4b.jpeg",
					desc:'',
					id:91,
					price: "1.00",
					sub_count:9,
					t_price:'3.00',
					title:"demo11"
				})
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.book-item{
	display: flex;
	.book-left{
		padding-right: 20rpx;
		>image{
			width: 200rpx;
			height: 234rpx;
		}
	}
	.book-right{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.price{
			.current-price{
				color: red;
			}
			.original-price{
				font-size: 20rpx;
				color: #6d769a;
			}
		}
		.down{
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.subscription{
				border: 1rpx solid #6d769a;
				color: #6d769a;
				border-radius: 30rpx;
				padding: 10rpx;
			}
		}
	}
}
</style>