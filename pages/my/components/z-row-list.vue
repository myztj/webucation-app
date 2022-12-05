<template>
	<view class="boos">
		<view class="row-box" v-for="item in rowList" :key="item.id" @click="handelOnclick(item)" hover-class="active">
			<view class="row-left">
				<text :class="item.icon"></text>
				<text>{{item.content}}</text>
			</view>
			<view class="row-right">
				<text class="iconfont icon-jinru">
					
				</text></view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
export default {
	props: {
		rowList: {
			type: Array,
			default: () => [
				{id:1,content:'我的优惠券',icon:'iconfont icon-9 mr-2',isLogin:true,path:'/pages/my/my-coupon'},
				{id:2,content:'常见问题',icon:'iconfont icon-help mr-2',isLogin:true,path:''},
				{id:3,content:'设置',icon:'iconfont icon-leimupinleifenleileibie mr-2',isLogin:false,path:'/pages/setting/setting'},
				]
		}
	},
	computed:{
		...mapState(['userInfo'])
	},
	methods:{
		handelOnclick(item){
			if(!this.$store.getters.istoken && item.isLogin){
				uni.showModal({
					content:"你还没有登录，是否前往登录？",
					cancelText:"再看看",
					success: (res) => {
						if(res.confirm){
							uni.navigateTo({
								url:"/pages/login/login",
							})
						}else{
							uni.showToast({
								title:"已取消",
								icon:'none'
							})
						}
					}
				})
			}else{
				if(!this.userInfo.phone && item.content!=='设置') return uni.navigateTo({url:"/pages/bind-phone/bind-phone"})
				uni.navigateTo({
					url:item.path
				})
			}
		}
	}
};
</script>

<style lang="scss">
	.boos{
		>view{
			&:nth-child(-n+2){
					border-bottom: 1rpx solid #eee;
			}
		}
	}
.row-box {
	padding: 25rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.row-left {
		display: flex;
		align-items: center;
		> text {
			font-size: 28rpx;
			color: #3b4144;
			&:nth-child(1) {
				font-size: 45rpx;
				margin-right: 15rpx;
				color: #00a2ff;
			}
		}
	}
	.row-right {
		> text {
			font-size: 35rpx;
			color: #ccc;
		}
	}
}
	.active{
		background-color: #eee;
	}
</style>
