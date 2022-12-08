<template>
	<view class="list-box">
		<z-goods-item @goToCourse="goToCourse(item)" :isColumn="isColumn" :newLitStyle="newLitStyle" v-for="(item,index) in flashsaleList" :key="index" :item="item"></z-goods-item>
		<view class="footerInfo" v-if="isshow">---我也是有底线的---</view>
	</view>
</template>

<script>
	import indexApi from "@/api/indexApi.js"
	export default {
		data() {
			return {
				listParams:{
					page:1,
					limit:10,
					usable:1
				},
				isColumn:true,
				flashsaleList:[],
				newLitStyle:false,
				urls:'',
				// 保存数据总页数
				listPages:0,
				isshow:false
			}
		},
		methods: {
			//跳转详情页
			goToCourse(item){
				// this.navTo(`/pages/index/course?id=${item.id}`)
				this.navTo(`/pages/index/course?obj=${encodeURIComponent(JSON.stringify(item))}`)
			},
		async getflashsaleList(urls){
				try{
					let res = await indexApi.GetflashsaleListApi(urls,this.listParams)
					console.log(res);
					return res
					// this.flashsaleList = res.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		//监听下拉刷新事件
		async onPullDownRefresh() {
			try{
				this.listParams.page = 1
				this.flashsaleList = []
				let res = await  this.getflashsaleList(this.urls)
				this.flashsaleList = res.data.data.rows
				uni.stopPullDownRefresh()
			}catch(e){
				uni.stopPullDownRefresh()
				//TODO handle the exception
			}
		},
		async onReachBottom() {
			try{
				if(this.listPages!==this.listParams.page){
					this.listParams.page+=1
					let res = await this.getflashsaleList(this.urls)
					//计算数据的总页数
					this.listPages = Math.ceil(res.data.data.count/this.listParams.limit)
					this.flashsaleList = this.flashsaleList.concat(res.data.data.rows)
				}else{
					this.isshow = true
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		async onLoad(item) {
			try{
				if(item.module=='live' || item.module=='column' || item.module=='course'){
					if(item.module=='column' || item.module=='course') this.isColumn = false,this.newLitStyle = true
					 this.urls = item.module+'/list'
				}else{
					 this.urls = item.module
				}
				let res = await this.getflashsaleList(this.urls)
				this.flashsaleList = res.data.data.rows
			}catch(e){
				console.log(e);
				//TODO handle the exception
			}
			console.log(item);
			if(item.module==="flashsale")return uni.setNavigationBarTitle({title:'秒杀列表'})
			if(item.module==="group")return uni.setNavigationBarTitle({title:'拼团列表'})
			if(item.module==="live")return uni.setNavigationBarTitle({title:'直播列表'})
			if(item.module==="column")return uni.setNavigationBarTitle({title:'专栏列表'})
		}
	}
</script>

<style lang="scss">
.list-box{
	padding: 15rpx;
	display: flex;
	flex-wrap: wrap;
}
.footerInfo{
	width: 100%;
	height: 100rpx;
	padding: 20rpx 0;
	text-align: center;
}
</style>
