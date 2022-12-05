<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(item) {
			console.log(item.url);
			this.url = item.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
