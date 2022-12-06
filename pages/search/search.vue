<template>
	<view>
		<view class="history" v-if="keywordlist.length">
			<view class="title">
				<text class=""><h3>历史记录</h3></text>
				<text @click="clearHistory">清除历史</text>
			</view>
			<view class="history-word">
				<text @click="clickHistory(item)" v-for="(item,index) in keywordlist" :key="index">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {HISTORYKEYWORD} from "@/common/storageName.js"
	export default {
		data() {
			return {
				keyword:'',
				keywordlist:uni.getStorageSync(HISTORYKEYWORD) || []
			}
		},
	    //监听原生小程序标题栏搜索框输入事件
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		//监听原生小程序标题栏搜索按钮
		onNavigationBarButtonTap() {
			if(!this.keyword) return uni.showToast({title:'请输入关键字',icon:'none'})
			let isExit = this.keywordlist.some(item=>item==this.keyword)
			this.navTo('/pages/search/search-result?keyword='+this.keyword)
			if(isExit) return
			this.keywordlist.push(this.keyword)
			uni.setStorageSync(HISTORYKEYWORD,this.keywordlist)
		},
		methods: {
			//点击历史记录
			clickHistory(item){
			  this.navTo('/pages/search/search-result?keyword='+item)
			},
			//清除历史记录
			clearHistory(){
				uni.showModal({
					content:'确定要清除历史记录吗',
					success:(res)=> {
						if(res.confirm){
							uni.removeStorageSync(HISTORYKEYWORD)
							this.keywordlist = []
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.history{
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx 20rpx 10rpx;
			>text{
				&:nth-child(1){
					font-weight: bold;
					h3{
						font-size: 34rpx;
					}
				}
				&:nth-child(2){
					font-size: 24rpx;
					color: #666;
				}
			}
		}
		.history-word{
			display: flex;
			flex-wrap: wrap;
			>text{
				padding:5rpx 15rpx;
				border-radius: 20rpx;
				background-color: #dae0e5;
				font-size: 28rpx;
				margin: 20rpx;
			}
		}
	}

</style>
