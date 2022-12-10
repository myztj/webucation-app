<template>
	<view class="discuss-box">
		<view class="discuss">
			<view class="head">
				<image :src="item.user.avatar" mode=""></image>
			</view>
			<view class="info">
				<view class="discuss-name" v-if="!item.reply_user">{{item.user.name}}</view>
				<view class="discuss-name" v-if="item.reply_user">{{item.user.name}}@{{item.reply_user.name}}</view>
				<view class="discuss-content">{{item.content}}</view>
				<view class="discuss-time">{{item.created_time}}</view>
			</view>
		</view>
		<my-reply-box v-if="item.post_comments && item.post_comments.length">
			<z-reply-item v-for="(ele,inx) in item.post_comments" :key="inx" :item="ele"></z-reply-item>
		</my-reply-box>
	</view>
</template>
	
<script>
	import myReplyBox from "@/pages/post-detail/components/my-reply-box.vue"
	import zReplyItem from "./z-reply-item.vue"
	export default{
		name:'zReplyItem',
		components:{
			zReplyItem,
			myReplyBox
		},
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		}
	}
</script>

<style lang="scss">
	.discuss-box{
		padding: 20rpx;
		.discuss{
			display: flex;
			.head{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: #ccc;
				margin-right: 20rpx;
				>image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.info{
				line-height: 40rpx;
				.discuss-name{
					color: #007bff;
					font-size: 28rpx;
				}
				.discuss-time{
					color: #666;
					font-size: 26rpx;
				}
			}
		}
	}
</style>