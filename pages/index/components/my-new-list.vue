<template>
	<view class="list-box">
		<my-list-box title="最新列表" :Allinfo="true">
			<view class="list-item" v-for="(item,index) in newList" :key="index">
				<z-goods-item @goToCourse="goToCourse(item)" :item="item" :newLitStyle="true"></z-goods-item>
			</view>
		</my-list-box>
	</view>
</template>

<script>
	import myListBox from "@/pages/index/components/my-list-box.vue"
	export default{
		components:{
			myListBox
		},
		props:{
          newList:{
			  type:Array,
			  default:()=>[]
		  }
		},
		methods:{
			goToCourse(item){
				// this.navTo(`/pages/index/course?id=${item.id}`)
				this.navTo(`/pages/index/course?obj=${encodeURIComponent(JSON.stringify(item))}`)
			}
		}
	}
</script>

<style lang="scss">
	.list-box{
		.list-title{
			padding: 30rpx 20rpx;
		}
		.list-item{
			padding: 15rpx 20rpx;
			
		}
	}
</style>