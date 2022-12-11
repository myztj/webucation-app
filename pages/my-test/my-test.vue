<template>
	<view>
		
	</view>
</template>

<script>
	import testApi from "@/api/testApi.js"
	export default {
		data() {
			return {
				MyTestList:[]
			}
		},
		onLoad() {
			this.getMyTestList()
		},
		methods: {
			async getMyTestList(){
				try{
					let res = await testApi.getMyTestListApi({page:1})
					if(res.data.code==20000) this.MyTestList = res.data.data.rows
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
