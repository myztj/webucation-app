<template>
	<view>
		<view class="book-item p-2">
			<z-book-item @handerOnclick="handerOnclick" describe="立即学习" v-for="(item,index) in myBookList" :key="index" :item="item"></z-book-item>
		</view>
		<z-hint-common @handelGoto="handelGoto" title="没有书籍哦" goTo="去挑选吧" v-if="!myBookList.length"></z-hint-common>
	</view>
</template>

<script>
	import bookApi from "@/api/bookApi.js"
	export default {
		data() {
			return {
				myBookParams:{
					page:1,
					limit:5
				},
				myBookList:[]
			}
		},
		onLoad() {
			this.getMyBookList()
		},
		methods: {
			//跳转书籍列表
			handelGoto(){
				this.navTo('/pages/index/book-list')
			},
			//立即学习
			handerOnclick(item){
				console.log(item);
				this.navTo(`/pages/book-detail/book-detail?id=${item.id}`)
			},
			//获取我的学习列表
			async getMyBookList(){
				try{
					let res = await bookApi.getMyBookListApi(this.myBookParams)
					console.log(res);
					if(res.data.code===20000) this.myBookList = res.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
