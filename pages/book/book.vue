<template>
	<view>
		<view class="title-info" v-html="bookDetailDate.content">
			
		</view>
		<view class="mask-list" v-if="isMask">
			<view class="list animated fadeInLeftBig">
				<my-book-list :acIndex="acIndex" @handlerBookCatalog="handlerBookCatalog" :detailData="bookDetailDate.menus"></my-book-list>
			</view>
			<view class="mask animated fadeIn" @click="isMask=false">
				
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="footer">
			<text v-if="acIndex" class="iconfont icon-shangyibu" @click="handerPrevious"></text>
			<text v-if="!acIndex" style="color: #aeaba6;" class="iconfont icon-shangyibu"></text>
			<view class="icon-num" @click="isMask=true">
				<text class="iconfont icon-leimupinleifenleileibie"></text>
				<text><text style="color: #5ccc84;">{{acIndex+1}}</text>/11</text>
			</view>
			<text v-if="menusLlength-1!=acIndex" class="iconfont icon-xiayibu" @click="handerNext"></text>
			<text v-if="menusLlength-1==acIndex" style="color: #aeaba6;" class="iconfont icon-xiayibu"></text>
		</view>
	</view>
</template>

<script>
	import bookApi from "@/api/bookApi.js"
	import myBookList from "@/pages/book-detail/components/my-book-list.vue"
	export default {
		components:{
			myBookList
		},
		data() {
			return {
				bookDetailDate:{},
				isMask:false,
				acIndex:0,
				acId:0,
				goodsId:0,
				menusLlength:0
			}
		},
		onLoad(options) {
			console.log(options);
			this.acId = options.id
			this.goodsId = options.book_id
			this.getBookSectionDetail()
		},
		methods: {
			//上一章节
			handerPrevious(){
				this.acId--
				this.acIndex--
				this.getBookSectionDetail()
			},
			//下一章节
			handerNext(){
				this.acId++
				this.acIndex++
				this.getBookSectionDetail()
			},
			//获取点击的Id和index
			handlerBookCatalog(item,index){
				this.acId = item.id
				this.acIndex = index
				this.isMask = false
				this.getBookSectionDetail()
			},
			//获取章节详情
			async getBookSectionDetail(){
				try{
					let res = await bookApi.getBookSectionDetailApi(this.goodsId,this.acId)
					console.log(res);
					if(!res.data.data.isfree){
					   uni.showToast({title:'请先购买书籍',icon:'none'})
					   setTimeout(()=>{this.navTo('/pages/book-detail/book-detail')},500)
					}
					// 动态设置导航标题
					uni.setNavigationBarTitle({
						title:res.data.data.title
					})
					this.bookDetailDate = res.data.data
					this.menusLlength = this.bookDetailDate.menus.length
					this.acIndex = this.bookDetailDate.menus.findIndex(item=>item.id==id)
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.title-info{
	padding: 20rpx;
	border-top: 1rpx solid #f2f2f2;
	border-bottom: 1rpx solid #f2f2f2;
}
.iconfont{
	font-size: 40rpx;
}
.mask-list{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	z-index: 9999;
	.list{
		width: 60%;
		background-color: #fff;
		z-index: 9999;
	}
	.mask{
		flex: 1;
		background: rgba(0, 0, 0, 0.5);
	}
}
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.icon-num{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
	}
}
</style>
