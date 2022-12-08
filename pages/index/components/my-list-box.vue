<template>
	<view class="listBox">
		<view class="group-title">
			<h3>{{title}}</h3>
			<text class="Allinfo" v-if="Allinfo" @click="gotoList">查看全部</text>
			</view>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'拼团'
			},
			Allinfo:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			gotoList(){
				this.$emit('gotoList')
			}
		}
	}
</script>

<style lang="scss">
	.listBox{
		border-top: 15rpx solid #f5f5f3;
	}
		.group-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:30rpx 20rpx;
			h3{
			    font-size: 34rpx;
			}
			.Allinfo{
				font-size: 24rpx;
				color: #a9a5a0;
			}
		}
</style>