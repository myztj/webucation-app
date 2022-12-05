<template>
	<view class="group-box">
<!-- 		<view class="group-title"><h3>拼团</h3></view> -->
        <my-list-box title="拼团">
			<scroll-view scroll-x="true" >
				<view class="scroll-item">
					<z-goods-item :isColumn="true" v-for="(item,index) in groupList" :item="item"></z-goods-item>
				</view>
			</scroll-view>
		</my-list-box>
	</view>
</template>

<script>
	import myListBox from "@/pages/index/components/my-list-box.vue"
	import indexApi from "@/api/indexApi.js"
	export default {
		components:{
			myListBox
		},
		data(){
			return{
				 groupList:[]//拼团列表
			}
		},
		created() {
				this.getGroupList()
			},
		methods:{
			//获取拼团数据
			async getGroupList(){
				try{
					let res = await indexApi.getGroupListApi({page:1,usable:1})
					console.log(res);
					if(res.statusCode==200){
						this.groupList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	.group-box{
		border-top: 15rpx solid #f5f5f3;
		.scroll-item{
			padding-bottom: 20rpx;
			padding-left: 20rpx;
			display: flex;
			flex-wrap: nowrap;
		}
	}
</style>