<template>
<view class="list-box">
			<view class="list-item" @click="clickViewDetails(item)">
				<view class="item-up" v-if="!item.content">
					<view class="userinfo">
						<view class="userinfo-title">
							<image :src="item.user.avatar" mode=""></image>
							<view class="userinfo-name">
								<text style="color: #007bff; font-size: 33rpx; font-weight: bold;">{{item.user.name}}</text>
								<text>{{item.user.sex}}</text>
							</view>
						</view>
						<view class="tbg" v-if="item.is_top">精华</view>
					</view>
					<view class="content">{{item.desc.text}}</view>
					<view class="img" v-if="item.desc.images.length">
						<image :src="ele" mode="" v-for="(ele,index) in item.desc.images" :key="index"></image>
					</view>
				</view>
				
				<!-- //详情 -->
				<view class="item-up" v-if="item.content">
					<view class="userinfo">
						<view class="userinfo-title">
							<image :src="item.user.avatar" mode=""></image>
							<view class="userinfo-name">
								<text style="color: #007bff; font-size: 33rpx; font-weight: bold;">{{item.user.name}}</text>
								<text>{{item.user.sex}}</text>
							</view>
						</view>
						<view class="tbg" v-if="item.is_top">精华</view>
					</view>
				    <view class="content-box" v-for="(obj,index) in item.content">
				    	<view class="content">{{obj.text}}</view>
				    	<view class="img" v-if="obj.images.length">
				    		<image :src="ele" mode="" v-for="(ele,index) in obj.images" :key="index"></image>
				    	</view>
				    </view>
				</view>
				<!-- 详情 -->
				
				<view class="item-down" v-if="isShowdown">
					<view class="icon">
						<text class="iconfont icon-pinglun2"></text>
						<text class="text">{{item.comment_count}}</text>
						<text class="iconfont icon-dianzan2" :class="[item.issupport?'redColor':'']" @click.stop="userLike(item)"></text>
						<text class="text">{{item.support_count}}</text>
					</view>
					<view class="del" v-if="isShowDel" @click="handeldelPost(item)">删除</view>
					<view class="time">
						{{item.created_time}}
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default{
		name:'zReplyItem',
		props:{
			item:{
				type:Object,
				default:()=>({})
			},
			isShowdown:{
				type:Boolean,
				default:true
			},
			isShowDel:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				post_id:'' //点赞所需Id
			}
		},
		methods:{
			// 点赞
			async userLike(item){
				this.$emit('userLike',item)
			},
			//删除帖子
			handeldelPost(item){
				this.$emit('handeldelPost',item)
			},
			 clickViewDetails(item){
				this.$emit('clickViewDetails',item)
			}
			
		}
	}
</script>

<style lang="scss">
	.list-box{
		.list-item{
	        padding: 30rpx;
			border-bottom: 15rpx solid #f5f5f3;
			.item-up{
				.userinfo{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.tbg{
						background-color: #ffc107;
						height: 60rpx;
						padding: 0 20rpx;
						color: #fff;
						line-height: 60rpx;
						font-size: 28rpx;
					}
					.userinfo-title{
						display: flex;
						flex-shrink: 0;
						>image{
							margin-right: 15rpx;
							width: 74rpx;	
							height: 74rpx;
							border-radius: 50%;
						}
						.userinfo-name{
							display: flex;
							flex-direction: column;
						}
					}
				}
				.content{
					margin-top: 20rpx;
				}
				.img{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					>image{
						width: 220rpx;
						height: 220rpx;
						border-radius: 15rpx;
						margin-top:10rpx;
					}
				}
			}
			.item-down{
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.icon{
					display: flex;
					align-items: center;
					.iconfont{
						font-size: 46rpx;
					}
					.text{
						font-size: 35rpx;
						padding: 0 20rpx;
					}
				}
			}
			.del{
				background-color: red;
				color: #fff;
				padding: 10rpx;
				border-radius: 10rpx;
				height: 50rpx;
				line-height: 50rpx;
			}
		}
	}
	.redColor{
		color: red;
	}
</style>