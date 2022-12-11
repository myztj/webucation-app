<template>
	<view>
		<view class="hint-box">
			<image src="../../static/info.webp" mode=""></image>
			<view class="">{{title}}<text @click="handelGoto">{{goTo}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'暂无信息'
			},
			goTo:{
				type:String,
				default:''
			}
		},
		name:"z-hint-common",
		data() {
			return {
				
			};
		},
		methods:{
			handelGoto(){
				this.$emit('handelGoto')
			}
		}
	}
</script>

<style lang="scss">
.hint-box{
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	>image{
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
	}
	>view{
		color: #666;
		>text{
			color: #0383fe;
		}
	}
}
</style>