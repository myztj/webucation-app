<template>
	<view class="bbs-box">
		<scroll-view style="width: 100%;" scroll-x="true" @scrolltolower="handelScrollLoad">
			<view class="scrollView p-3">
				<view class="scroll-item px-3 py-1 mr-1" :class="{'active':index==activeIndex}" v-for="(item,index) in bbsNavList" :key="item.id" @click="handelNavItem(index,item)">{{item.title}}</view>
			</view>
		</scroll-view>
		<!-- 导航栏 -->
		<view class="nav-box">
			<view class="nav-left">
				<h3>总帖子</h3>
				<text>257</text>
			</view>
			<view class="nav-right">
				<h3>总用户</h3>
				<text>2209</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="list-box">
			<view class="list-item" v-for="(item,index) in bbsList" :key="index">
				<view class="item-up">
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
						<image :src="ele" mode="" v-for="(ele,index) in item.desc.images"></image>
					</view>
				</view>
				<view class="item-down">
					<view class="icon">
						<text class="iconfont icon-pinglun2"></text>
						<text class="text">{{item.comment_count}}</text>
						<text class="iconfont icon-dianzan2"></text>
						<text class="text">{{item.support_count}}</text>
					</view>
					<view class="time">
						{{item.created_time}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bbsApi from "@/api/bbsApi.js"
export default {
	data() {
		return {
			bbsNavList:[],
			bbsList:[],
			bbsParams:{
				page:1,
			    bbs_id:0,
			},
			navListPage:0,
			activeIndex:0
		};
	},
	async onLoad() {
		try{
			let res = await this.getBbsNavList()
			this.bbsNavList = res.data.data.rows
			this.bbsNavList.unshift({id:'881',title:'全部'})
			this.getBbsList()
		}catch(e){
			//TODO handle the exception
		}
	},
	methods: {
		//点击每个Nav按钮
		handelNavItem(index,item){
			this.activeIndex = index
			console.log(item,index);
		},
		//顶部滑动加载
		async handelScrollLoad(){
			try{
				if(this.navListPage!==this.bbsParams.page){
					this.bbsParams.page+=1
					let res = await this.getBbsNavList()
					this.navListPage = Math.ceil(res.data.data.count/10)
					this.bbsNavList = this.bbsNavList.concat(res.data.data.rows)
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		async getBbsNavList(){
			try{
				let res = await bbsApi.getBbsNavListApi(this.bbsParams.page)
				console.log(res);
				return res
			}catch(e){
				//TODO handle the exception
			}
		},
		async getBbsList(){
			try{
				let res = await bbsApi.getBbsListApi(this.bbsParams)
				console.log(res);
				this.bbsList = res.data.data.rows
			}catch(e){
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="scss">
.scrollView {
	white-space: nowrap;
	.scroll-item {
		display: inline-block;
		background-color: #f8f9fa;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		color: #6c757d;
	}
}
.active {
	background-color: #5ccc84 !important;
	color: #fff !important;
}
.nav-box {
	display: flex;
	justify-content: space-around;
	border-top: 15rpx solid #f5f5f3;
	border-bottom: 15rpx solid #f5f5f3;
	.nav-left,
	.nav-right {
		display: flex;
		align-items: center;
		> h3 {
			font-size: 35rpx;
			color: #6c757d;
			padding: 20rpx 0;
		}
		> text {
			font-size: 34rpx;
			margin-left: 20rpx;
			color: #6c757d;
		}
	}
}
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
				>image{
					width: 220rpx;
					height: 220rpx;
					border-radius: 15rpx;
				}
			}
		}
		.item-down{
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
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
	}
}
</style>
