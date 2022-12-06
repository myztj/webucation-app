<template>
	<view class="">
		<my-list-box title="热门推荐" :Allinfo="true">
			<view class="hot-item">
				<z-goods-item :recommend="true" :isColumn="true" v-for="(item,index) in newListData" :key="index" :item="item"></z-goods-item>
			</view>
		</my-list-box>
	</view>
</template>

<script>
	import newListData from "@/mock/newListData.js"
	import myListBox from "@/pages/index/components/my-list-box.vue"
	export default{
		props:{
			newListData:{
				type:Array,
				default:()=>{
					return newListData
				}
			}
		},
		components:{
			myListBox
		}
	}
</script>

<style lang="scss">
	.hot-item{
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx 20rpx;
	}
</style>