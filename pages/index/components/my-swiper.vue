<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(item,index) in swpierData" :key="index" @click="handlerSwiperGoto(item)">
			<image :src="item.src" mode=""></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default{
		props:{
			swpierData:{
				type:Array,
				default:()=>[]
			}
		},
		onLoad() {
			console.log(this.swpierData);
		},
		methods:{
			handlerSwiperGoto(item){
				console.log(item);
				if(!item.url) return this.navTo(`/pages/index/course?obj=${encodeURIComponent(JSON.stringify(item))}`)
				this.$emit('handlerSwiperGoto',item)
			}
		}
	}
</script>

<style lang="scss">
swiper-item {
	> image {
		width: 96%;
		height: 100%;
		margin: 0 15rpx;
		border-radius: 10rpx;
	}
}
</style>
