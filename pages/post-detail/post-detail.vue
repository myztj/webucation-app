<template>
	<view class="post-box">
		<z-post-item :item="bbsDetailData" :isShowdown="false"></z-post-item>
		<z-reply-item v-for="(item,index) in EvaluateReplyList" :key="index" :item="item"></z-reply-item>
		<my-footer-input></my-footer-input>
	</view>
</template>

<script>
	import myFooterInput from "@/pages/post-detail/components/my-footer-input.vue"
	import bbsApi from "@/api/bbsApi.js"
	export default {
		components:{
			myFooterInput
		},
		data() {
			return {
				bbsDetailId:'',
				bbsDetailData:{},
				EvaluateReplyList:[]
			}
		},
		onLoad(options) {
			console.log(options);
			this.bbsDetailId = options.id
			this.getPostRead()
			this.getEvaluateReply()
		},
		methods: {
			//获取帖子评价与回复数据
			async getEvaluateReply(){
				try{
					let res = await bbsApi.getEvaluateReplyApi({pege:1,post_id:this.bbsDetailId})
					console.log(res);
					if(res.data.code=== 20000){
					this.EvaluateReplyList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取帖子数据
			async getPostRead(){
				try{
					let res = await bbsApi.getPostReadApi({id:this.bbsDetailId})
					console.log(res);
					if(res.statusCode==200){
						this.bbsDetailData = res.data.data
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	.post-box{
		padding-bottom: 100rpx;
	}

</style>
