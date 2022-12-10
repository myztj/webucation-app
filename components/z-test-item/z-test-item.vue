<template>
	<view>
		<view class="text-item">
			<view class="item-up">
				<view class="title">
					<text>{{item.title}}</text>
					<text>时长：{{item.expire}}分钟</text>
				</view>
				<view class="info">
					<text>题目总数：{{item.question_count}}</text>
					<text>总分数：{{item.total_score}}</text>
					<text>及格分数：{{item.pass_score}}</text>
				</view>
			</view>
			<view class="item-down">
				<view class="btn" :class="{'active':item.is_test}" @click="goToexam(item)">
					{{item.is_test?'考试完毕':'参加考试'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:()=>({})
			}
		},
		name:"z-test-item",
		data() {
			return {
				
			};
		},
		methods:{
			//参加考试
			goToexam(item){
				if(item.is_test) return
				this.$emit('goToexam',item)
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color:#f5f5f3;
	}
.text-item{
	background-color: #fff;
	display: flex;
	flex-direction: column;
	margin-bottom: 16rpx;
	.item-up{
		padding: 0 30rpx;
		line-height: 90rpx;
		border-top:1rpx solid #eee;
		border-bottom:1rpx solid #eee;
		.title{
			display: flex;
			justify-content: space-between;
			>text{
				
				&:nth-child(1){
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
				}
				&:nth-child(2){
					font-size: 24rpx;
					color: orangered;
				}
			}
		}
		.info{
			margin-bottom: 30rpx;
			>text{
				font-size: 32rpx;
				color: #333;
				&:nth-child(2){
					margin: 0 30rpx;
				}
			}
		}
	}
	.item-down{
		padding: 20rpx;
		.btn{
			float: right;
			width: 168rpx;
			height: 80rpx;
			background-color: #5ccc84;
			color: #fff;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
}
.active{
	background-color: #ccc !important;
}
</style>