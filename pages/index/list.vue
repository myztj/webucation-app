<template>
	<view class="list-box">
		<z-goods-item :isColumn="true" v-for="(item,index) in flashsaleList" :key="index" :item="item"></z-goods-item>
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
				flashsaleList:[]
			}
		},
		methods: {
		async getflashsaleList(){
				try{
					let res = await indexApi.GetflashsaleListApi(this.listParams)
					console.log(res);
					this.flashsaleList = res.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		onLoad(item) {
			this.getflashsaleList()
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
</style>
