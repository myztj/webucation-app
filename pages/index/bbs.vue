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
		<z-post-item v-for="(item,index) in bbsList" :key="index" :item="item" @userLike="userLike" @clickViewDetails="clickViewDetails"></z-post-item>
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
			activeIndex:0,
			//用于判断数据的总页数
			bbsPageSize:0,
			post_id:'' //点赞所需Id
		};
	},
	onNavigationBarButtonTap() {
		this.navTo('/pages/add-post/add-post')
	},
	async onLoad() {
		try{
			let res = await this.getBbsNavList()
			this.bbsNavList = res.data.data.rows
			this.bbsNavList.unshift({id:0,title:'全部'})
			let response = await this.getBbsList()
			this.bbsList = response.data.data.rows
		}catch(e){
			//TODO handle the exception
		}
	},
	//监听页面下拉触底
	async onReachBottom(){
		if(this.bbsPageSize!=this.bbsParams.page){
			try{
				this.bbsParams.page+=1
				let response = await this.getBbsList()
				this.bbsPageSize = Math.ceil(response.data.data.count/10)
				this.bbsList = this.bbsList.concat(response.data.data.rows)
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	methods: {
	     //点击查看详情
		 clickViewDetails(item){
			 console.log(item);
			 this.navTo(`/pages/post-detail/post-detail?id=${item.id}`)
		 },
		//点赞
		async userLike(item){
			this.post_id = item.id
			try{
				if(item.issupport){
				let res = await bbsApi.userUnLikeApi({post_id:this.post_id})
				if(res.statusCode==200){
					uni.showToast({title:'取消点赞',icon:"none"})
				}
				}else{
			     let res = await bbsApi.userLikeApi({post_id:this.post_id})
				 if(res.statusCode==200){
				 	uni.showToast({title:'点赞成功',icon:"none"})
				 }
				}
				let res = await this.getBbsList()
				this.bbsList = res.data.data.rows
			}catch(e){
				//TODO handle the exception
			}
		},
		//点击每个Nav按钮
		async handelNavItem(index,item){
			this.activeIndex = index
			this.bbsParams.bbs_id=item.id
			try{
				let res = await this.getBbsList()
				this.bbsList = res.data.data.rows
			}catch(e){
				console.log(e);
				//TODO handle the exception
			}
			console.log(item);
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
				let res = await bbsApi.getBbsNavListApi({page:this.bbsParams.page})
				return res
			}catch(e){
				//TODO handle the exception
			}
		},
		async getBbsList(){
			try{
				let res = await bbsApi.getBbsListApi(this.bbsParams)
				console.log(res);
				return res
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
</style>
