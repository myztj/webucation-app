<template>
	<view>
		<z-post-item @handeldelPost="handeldelPost" :isShowDel="true" v-for="(item,index) in MyPostList" :key="index" :item="item"></z-post-item>
		<z-hint-common v-if="!MyPostList.length" title="你还没有帖子" goTo="去发帖子" @handelGoto="handelGoto"></z-hint-common>
	</view>
</template>

<script>
	import studyApi from "@/api/studyApi.js"
	export default {
		data() {
			return {
				MyPostParams:{
					page:1,
					limit:5
				},
				MyPostList:[]
			}
		},
		onLoad() {
			this.getMyPostList()
		},
		methods: {
			//去发帖子
			handelGoto(){
				this.navTo('/pages/add-post/add-post')
			},
			//删除帖子
			async handeldelPost(item){
				console.log(item);
				try{
					let res = await studyApi.delMyPostApi({id:item.id})
					console.log(res);
					if(res.data.code==20000) uni.showToast({title:'删除成功',icon:"none"})
					this.getMyPostList()
				}catch(e){
					//TODO handle the exception
				}
				
			},
			//获取我的帖子列表
			async getMyPostList(){
				try{
					let res = await studyApi.getMyPostListApi(this.MyPostParams)
					console.log(res);
					this.MyPostList = res.data.data.rows
					
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
