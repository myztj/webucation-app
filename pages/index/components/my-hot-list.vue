<template>
	<view class="">
		<my-list-box title="热门推荐" :Allinfo="true">
			<view class="hot-item">
				<view class="hot-i" v-for="(item,index) in newListData" :key="index">
				<z-goods-item :recommend="true" :isColumn="true" :item="item"></z-goods-item>
				</view>
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
		padding-left:23rpx;
		.hot-i{
			padding: 15rpx 0;
		}
	}
</style>