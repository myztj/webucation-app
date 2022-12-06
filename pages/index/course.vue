<template>
	<view class="course-box">
		<view class="course-img">
			<image :src="courseInfo.cover" mode=""></image>
			<text class="imageText">音频</text>
		</view>
		<view class="time">
			<view class="time-left">
				<view class="price">
					<text>￥0.10</text>
					<text class="original-price">￥10.00</text>
					</view>
				<view class="group-num">2人拼团</view>
			</view>
			<view class="time-right">
				距结束<text>571</text> 天 <text>04</text> : <text>24</text> : <text>07</text>
			</view>
		</view>
		<view class="info">
			<view class="info-left">
				<view class="title">{{courseInfo.title}}</view>
				<view class="number">{{courseInfo.sub_count}}人学过</view>
				<view class="price-info">￥{{courseInfo.price}} <text class="original">￥{{courseInfo.t_price}}</text></view>
			</view>
			<view class="info-right">
				<uni-icons type="star" size="30"></uni-icons>
			</view>
		</view>
		<view class="course">
			<view class="course-title">
				课程简介
			</view>
			<view class="" v-html="courseInfo.try">
				
			</view>
		</view>
		<view class="footer-btn">
			<button class="btn" type="default">立即拼团￥5.00</button>
		</view>
	</view>
</template>

<script>
	import courseApi from "@/api/courseApi.js"
	export default {
		data() {
			return {
				courseIds:{
					id:'',
					group_id:''
				},
				courseInfo:{},
			}
		},
		onLoad(option) {
			this.courseIds.id=option.id
			this.courseIds.group_id = option.group_id
			this.getCourseinfo()
		},
		methods: {
			async getCourseinfo(){
				try{
					let res = await courseApi.getCourseApi(this.courseIds,this.url)
					console.log(res);
					if(res.statusCode==200){
					   this.courseInfo = res.data.data
					}else if(res.statusCode==404){
						uni.showToast({
							title:'该记录不存在',
							icon:'none'
						})
						setTimeout(()=>{
							this.navTo('/pages/index/index',true)
						},800)
					}
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			}
		},
		
	}
</script>

<style lang="scss">
	page{
			width: 100%;
	}
.course-box{
	padding-bottom: 100rpx;
	.course-img{
		width: 100%;
		height: 420rpx;
		position: relative;
		.imageText{
			position: absolute;
			right: 20rpx;
			bottom: 15rpx;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
			padding: 10rpx;
			font-size: 28rpx
		}
		>image{
			width: 100%;
			height: 100%;
		}
	}
	.time{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #dc3545;
		color: #fff;
		padding: 20rpx 30rpx;
		margin-top: 10rpx;
		.time-left{
			display: flex;
			flex-direction: column;
			.price{
				.original-price{
					font-size: 30rpx;
					text-decoration: line-through;
					margin-left: 15rpx;
				}
			}
			.group-num{
				padding: 10rpx;
				background-color: #fff;
			    border-radius: 10rpx;
				color: #dc3545;
				width: 100rpx;
				font-size: 25rpx;
				text-align: center;
				margin-top: 10rpx;
			}
		}
		.time-right{
			font-size: 25rpx;
			>text{
				width: 52rpx;
				height: 48rpx;
				text-align: center;
				line-height: 48rpx;
				background-color: #c3152e;
				padding: 10rpx;
				margin: 0 5rpx;
			}
		}
	}
	.info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 15rpx solid #f5f5f3;
		.info-left{
			line-height: 65rpx;
			.title{
				font-size: 38rpx;
			}
			.number{
				font-size: 24rpx;
				color: #a9a5a0;
			}
			.price-info{
				font-size: 40rpx;
				color: #dc3545;
				.original{
					font-size: 24rpx;
					color: #a9a5a0;
					text-decoration: line-through;
				}
			}
		}
	}
	.course{
		padding: 20rpx;
		border-bottom: 3rpx solid #f5f5f3;
	}
}

	::v-deep  img{
		width: 100%;
	}
.footer-btn{
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	border-top: 1rpx solid #eee;
	.btn{
		color: #fff;
		background-color: #5ccc84;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
	}
}
</style>
