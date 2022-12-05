<template>
	<view>
		<z-test-item v-for="(item,index) in testList" :key="index" :item="item"></z-test-item>
		<view class="down" v-if="downShow">----我是有底线的----</view>
		<view class="down" v-if="!downShow">上拉加载数据</view>
	</view>
</template>

<script>
	import indexApi from "@/api/indexApi.js"
	export default {
		data() {
			return {
				testParams:{
					page:1,
					limit:5
				},
				testList:[],
				downShow:false,
				listSize:0
			}
		},
		async onLoad() {
			let res= await this.getTestList()
			this.testList = res.data.data.rows
		},
		//监听下拉刷新
	async onPullDownRefresh(){
		this.testParams.page=1
		try{
			let res = await	this.getTestList()
			this.testList = res.data.data.rows
			uni.stopPullDownRefresh()
			uni.showToast({title:res.data.data,icon:"none"})
		}catch(e){
			//TODO handle the exception
			uni.stopPullDownRefresh()
			console.log(e);
		}
		
		},
		//页面滚动到底部事件
		async onReachBottom(){
			try{
				if(this.testParams.page!=this.listSize){
				   this.testParams.page+=1
				   let res = await this.getTestList(this.testParams)
				   this.listSize = Math.ceil(res.data.data.count/this.testParams.limit)
				   let list = res.data.data.rows
				   this.testList= this.testList.concat(list)
				   console.log(this.testList);
				}else{
					this.downShow = true
				}
			}catch(e){
				//TODO handle the exception
			}
			
		},
		methods: {
			//获取开始列表
			async getTestList(){
				try{
					let res = await indexApi.getTestListApi(this.testParams)
					console.log(res);
					if(res.statusCode==200){
					   return res
						// this.testList = res.data.data.rows
					}else{
						uni.showToast({title:res.data.data,icon:'none'})
					}
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.down{
	background-color: #fff;
	width: 100%;
	text-align: center;
	color: #666;
	padding: 20rpx 0;
}
</style>
