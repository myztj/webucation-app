<template>
	<view>
		<view class="book-box" v-for="(item,index) in bookList" :key="index">
		   <z-book-item :item="item"></z-book-item>
		</view>
		<view class="info" v-if="isshowInfo">
			---我也是有底线的---
		</view>
	</view>
</template>

<script>
	import bookApi from "@/api/bookApi.js"
	export default {
		data() {
			return {
				bookParams:{
					page:1,
					limit:10
				},
				bookList:[],
				pageSize:0,
				isshowInfo:false
			}
		},
		async onLoad() {
			let res = await this.getBooklist()
			this.bookList = res.data.data.rows
		},
		//监听下拉加载
		async onPullDownRefresh() {
			this.isshowInfo = false
			this.bookList=[]
			this.bookParams.page = 1
			let res = await this.getBooklist()
			this.bookList = res.data.data.rows
		},
		//监听滚动条触底
		async onReachBottom() {
			console.log('到底了');
			if(this.pageSize!==this.bookParams.page){
				this.bookParams.page+=1
				try{
					let res = await this.getBooklist()
					console.log(res);
					this.pageSize = Math.ceil(res.data.data.count/this.bookParams.limit)
					console.log(this.pageSize);
					this.bookList = this.bookList.concat(res.data.data.rows)
					this.isshowInfo = false
				}catch(e){
					//TODO handle the exception
				}
			}else{
				this.isshowInfo = true
			}
		},
		methods: {
			async getBooklist(){
				try{
					let res = await bookApi.getBookLIstApi(this.bookParams)
					console.log(res);
					//关闭下拉加载
					uni.stopPullDownRefresh()
					return res
				}catch(e){
					//关闭下拉加载
					uni.stopPullDownRefresh()
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.book-box{
	padding: 20rpx;
}
	.info{
		text-align: center;
		padding: 20rpx;
	}
</style>
