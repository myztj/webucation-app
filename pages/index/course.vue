<template>
	<view class="course-box">
		<view class="course-img">
			<image :src="courseInfo.cover" mode=""></image>
			<text class="imageText">{{imgText}}</text>
			<view class="mask" v-if="courseInfo.type==='live'">
				<text>开始时间：{{start_date}}</text>
				<text>结束时间：{{end_date}}</text>
			</view>
		</view>
		<view class="time" v-if="days && courseInfo.title && courseInfo.type!=='live'">
			<view class="time-left">
				<view class="price">
					<text>￥0.10</text>
					<text class="original-price">￥10.00</text>
				</view>
				<view class="group-num">2人拼团</view>
			</view>
			<view class="time-right">
				<text class="time-text">距结束</text><uni-countdown :font-size="15" :day="days" :hour="hr" :minute="min" :second="sec" color="#FFFFFF" background-color="#c3152e" />
			</view>
		</view>
		<view class="info">
			<view class="info-left">
				<view class="title">{{ courseInfo.title }}</view>
				<view class="number">{{ courseInfo.sub_count }}人学过</view>
				<view class="price-info">
					￥{{ courseInfo.price }}
					<text class="original">￥{{ courseInfo.t_price }}</text>
				</view>
			</view>
			<view class="info-right">
				<uni-icons type="star" size="30" @click="handledrCollect" v-if="!collecClass"></uni-icons>
				<uni-icons color="#5ccc84" type="star-filled" size="30" @click="handledrCollect" v-if="collecClass"></uni-icons>
			</view>
		</view>
		<view class="course">
			<view class="course-title">课程简介</view>
			<view class="" v-if="!courseInfo.content" v-html="courseInfo.try"></view>
			<view class="" v-if="courseInfo.content" v-html="courseInfo.content"></view>
			<view class="logding" v-if="!courseInfo.title">加载中...</view>
		</view>
		<view v-if="courseInfo.title" class="footer-btn"><button class="btn" type="default">立即拼团￥5.00</button></view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex"
import uniCountdown from "@/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue"
import courseApi from '@/api/courseApi.js';
export default {
	data() {
		return {
			courseIds: {
				id: 0,
				group_id: 0,
				column_id:0,
				flashsale_id:0
			},
			courseInfo: {},
			url: 'course',
			start_date:'',
			end_date:'',
			collectUrl:'collect',
			collecClass:false
		};
	},
	computed:{
		...mapGetters(['istoken']),
		imgText(){
			if(this.courseInfo.type=='media') return '图文'
			if(this.courseInfo.type=='video') return '视频'
			if(this.courseInfo.type=='column'||!this.courseInfo.type) return '专栏'
			if(this.courseInfo.type=='audio') return '音频'
		}
	},
	onLoad(option) {
		let data = JSON.parse(decodeURIComponent(option.obj))
		console.log(data);
		this.start_date = new Date(data.start_time).toLocaleString()
		this.end_date = new Date(data.end_time).toLocaleString()
		//处理时间，方法在全局的mixins
         this.formDate(data.end_time)
		if (data.type == 'column' || data.id == 3) {
			this.url = 'column';
		}
		if(!data.type && data.sub_count==0){
			this.url = 'live';
		}
		this.courseIds.id = data.id || data.course_id;
		if(data.group_id) this.courseIds.group_id = data.group_id;
		if(data.column_id) this.courseIds.column_id = data.column_id;
		if(data.flashsale_id) this.courseIds.flashsale_id = data.flashsale_id;
		this.getCourseinfo();
	},
	methods: {
		//收藏
		async handledrCollect(){
			if(!this.istoken){
				uni.showToast({title:'请先的登录',icon:'none'})
				setTimeout(()=>{this.navTo('/pages/login/login')},500)
				return false
			}
			let type = ''
			if(this.courseInfo.type=='video' || this.courseInfo.type=='audio' || this.courseInfo.type=='media'){
				type = 'course'
			}else{
				type = "column"
			}
			if(this.collecClass){
				this.collectUrl = 'uncollect'
			}else{
				this.collectUrl = 'collect'
			}
			try{
				let res = await courseApi.userCollectApi(this.collectUrl,{goods_id:this.courseInfo.id,type})
				if(res.statusCode==200){
					uni.showToast({title:res.data.data=='ok'?'收藏成功' : '已取消',icon:'none'})
					this.collecClass = res.data.data=='ok'? true : false
					this.getCourseinfo()
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		//获取详情页数据
		async getCourseinfo() {
			try {
				let res = await courseApi.getCourseApi(this.url, this.courseIds);
				console.log(res.data)
				if (res.statusCode == 200) {
					//判断后台返回的数据是否已经收藏
					// console.log(res.data.data);
					if(res.data.data.isfava){
						this.collecClass = true
					}else{
						this.collecClass = false
					}
					this.courseInfo = res.data.data;
					//动态修改标题栏标题
					uni.setNavigationBarTitle({ title: this.courseInfo.title });
				} else if (res.statusCode == 404) {
					uni.showToast({
						title: '该记录不存在',
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateBack()
					}, 800);
				}
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="scss">
	::v-deep{
		.uni-countdown__splitor{
			>span{
			   color: #fff !important;
			}
		}
	}
	::v-deep{
		.uni-countdown__number{
			font-size: 24rpx !important;
		}
	}
	.logding{
		font-size: 35rpx;
		border-top: 1rpx solid #f5f5f3;
		border-bottom: 1rpx solid #f5f5f3;
		text-align: center;
		padding: 70rpx 0;
		margin-top: 30rpx;
		margin-bottom: 230rpx;
		color: #666;
	}
page {
	width: 100%;
}
.course-box {
	padding-bottom: 100rpx;
	.course-img {
		width: 100%;
		height: 420rpx;
		position: relative;
		.mask{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-size: 35rpx;
			>text{
				&:nth-child(2){
					margin-top: 10rpx;
				}
			}
		}
		.imageText {
			position: absolute;
			right: 20rpx;
			bottom: 15rpx;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
			padding: 10rpx;
			font-size: 28rpx;
		}
		> image {
			width: 100%;
			height: 100%;
		}
	}
	.time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #dc3545;
		color: #fff;
		padding: 20rpx 30rpx;
		margin-top: 10rpx;
		.time-left {
			display: flex;
			flex-direction: column;
			.price {
				.original-price {
					font-size: 30rpx;
					text-decoration: line-through;
					margin-left: 15rpx;
				}
			}
			.group-num {
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
		.time-right {
			display: flex;
			align-items: center;
			font-size: 25rpx;
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 15rpx solid #f5f5f3;
		.info-left {
			line-height: 65rpx;
			.title {
				font-size: 38rpx;
			}
			.number {
				font-size: 24rpx;
				color: #a9a5a0;
			}
			.price-info {
				font-size: 40rpx;
				color: #dc3545;
				.original {
					font-size: 24rpx;
					color: #a9a5a0;
					text-decoration: line-through;
				}
			}
		}
	}
	.course {
		padding: 20rpx;
		border-bottom: 3rpx solid #f5f5f3;
	}
}

::v-deep img {
	width: 100%;
}
.footer-btn {
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	border-top: 1rpx solid #eee;
	.btn {
		color: #fff;
		background-color: #5ccc84;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
	}
}
</style>
