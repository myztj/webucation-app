<template>
	<view class="msg">
		<view class="msg-item">
			<view class="content">{{item.content}}</view>
			<view class="time">{{item.created_time}}</view>
		</view>
		<view class="hint">没有更多数据了</view>
	</view>
</template>

<script>
	export default {
		name:"z-msg-item",
		props:{
			item:{
				type:Object,
				default:()=>({
					content:'好啊好啊',
					created_time:'2021-08-06 19:51:57',
					id:1,
					school_id:1,
					updated_time:'2021-08-06T11:52:01.000Z'
				})
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang='scss'>
.msg-item{
	padding:20rpx;
	border-radius: 10rpx;
	background-color: #fff;
	.content{
		margin-bottom: 10rpx;
	}
	.time{
		font-size: 24rpx;
		color: #6c757d;
	}
}
	.hint{
		text-align: center;
		margin-top: 20rpx;
		color: #6c757d;
		font-size: 30rpx;
	}
</style>