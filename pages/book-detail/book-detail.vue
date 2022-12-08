<template>
	<view class="box">
		<!-- //头部介绍 -->
		<view class="book-box">
			<view class="box-left"><image :src="detailData.cover" mode=""></image></view>
			<view class="box-right">
				<view class="right-top">{{detailData.title}}</view>
				<view class="right-down">
					<text class="price">￥{{detailData.price}}</text>
					<text class="end-price">￥{{detailData.t_price}}</text>
					<text class="number-num">{{detailData.sub_count}}人</text>
				</view>
			</view>
		</view>
		<!-- //导航 -->
		<me-tabs :tabs="tabs" v-model="tabIndex" :height="90"></me-tabs>
		<view class="intro" v-if="tabIndex==0">
			<!-- //详细内容 -->
			<view class="intro-catalog">
				<view class="intro-title">{{detailData.title}}</view>
				<view class="intro-number">{{detailData.sub_count}}人学过</view>
				<view class="price">
					<text>￥{{detailData.price}}</text>
					<text>￥{{detailData.sub_count}}</text>
				</view>
			</view>
			<view class="book-info">电子书介绍</view>
			<view class="num-book" v-html="detailData.try"></view>
		</view>
		<view class="catalog" v-if="tabIndex==1">
			<view class="total">共{{detailData.book_details.length}}节</view>
	        <my-book-list :acIndex="acIndex" :detailData="detailData.book_details" @handlerBookCatalog="handlerBookCatalog"></my-book-list>
		</view>
	<view v-if="detailData.price!=='0.00'" class="btn-box"><button class="btn" type="default">立即订购￥{{detailData.price}}</button></view>
	<view v-else class="btn-box"><button class="btn" type="default">立即学习</button></view>
	</view>
</template>

<script>
import myBookList from "@/pages/book-detail/components/my-book-list.vue"
import bookApi from "@/api/bookApi.js"
import meTabs from '@/uni_modules/me-tabs/me-tabs.vue';
export default {
	components: {
		meTabs,
		myBookList
	},
	data() {
		return {
			tabs: ['简介', '目录'],
			tabIndex: 0,
			detailData:{},
			bookIb:91,
			acIndex:0
		};
	},
	onLoad(options) {
		console.log(options.id);
		if(options.id) this.bookIb=options.id
		this.getBookDetail()
	},
	methods: {
		handlerBookCatalog(item,index){
			// console.log(item);
			if(!item.isfree) return uni.showToast({title:'请先购买该电子书',icon:'none'})
			   this.acIndex = index
			this.navTo(`/pages/book/book?id=${item.id}&book_id=${this.bookIb}`)
			
		},
		//获取书籍详情
		async getBookDetail(){
			uni.showLoading({mask:true})
			try{
				let res = await bookApi.getBookDetailApi(this.bookIb)
				console.log(res);
				uni.hideLoading()
				this.detailData = res.data.data
				uni.setNavigationBarTitle({title:this.detailData.title})
			}catch(e){
				uni.hideLoading()
				console.log(e);
				//TODO handle the exception
			}
		}
		
	}
};
</script>

<style lang="scss">
	.box{
		padding-bottom: 150rpx;
	}
.book-box {
	display: flex;
	border-bottom: 15rpx solid #f5f5f3;
	padding: 20rpx;
	.box-left {
		width: 254rpx;
		height: 380rpx;
		padding-right: 20rpx;
		> image {
			width: 100%;
			height: 100%;
		}
	}
	.box-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.right-top {
			font-size: 40rpx;
		}
		.right-down {
			border: 1rpx solid #ffebda;
			background-color: #fff7f0;
			padding: 20rpx;
			border-radius: 10rpx;
			.price {
				font-size: 40rpx;
				color: #dc617b;
			}
			.end-price {
				color: #a9a5a0;
				font-size: 30rpx;
			}
			.number-num {
				margin-left: 20rpx;
				color: #dc617b;
				border-left: 4rpx solid #dc617b;
				padding-left: 20rpx;
				font-size: 30rpx;
			}
		}
	}
}
.intro-catalog {
	padding: 20rpx;
	line-height: 60rpx;
	border-bottom: 15rpx solid #f5f5f3;
	.intro-title {
		font-size: 38rpx;
	}
	.intro-number {
		font-size: 24rpx;
		color: #a9a5a0;
	}
	.price {
		> text {
			&:nth-child(1) {
				font-size: 40rpx;
				color: #dc617b;
			}
			&:nth-child(2) {
				font-size: 24rpx;
				text-decoration: line-through;
				color: #a9a5a0;
				margin-left: 10rpx;
			}
		}
	}
}
.book-info,
.num-book {
	padding: 20rpx;
	border-bottom: 1rpx solid #f5f5f3;
}
.btn-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	border-top: 1rpx solid #f5f5f3;
	border-bottom: 1rpx solid #f5f5f3;
	background-color: #fff;
	.btn {
		padding: 8rpx;
		font-size: 32rpx;
		background-color: #5ccc84;
		color: #fff;
	}
}
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
</style>
