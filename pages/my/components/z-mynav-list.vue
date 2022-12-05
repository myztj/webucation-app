<template>
	    <view class="nav-list">
	    	<view @click="handelNavItem(item)" class="nav-item" v-for="item in navList" :key="item.id">
				<text :class="item.icon"></text>
				<text class="class-text">{{item.text}}</text>
	    	</view>
	    </view>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		props:{
			navList:{
				type:Array,
				default:()=>([
					{id:1,text:'订单',icon:'iconfont icon-OrderHistory',isLogin:true,path:'/pages/my/order-list'},
					{id:2,text:'消息',icon:'iconfont icon-pinglun2',isLogin:true,path:'/pages/my/msg-list'},
					{id:3,text:'收藏',icon:'iconfont icon-shoucang1',isLogin:true,path:'/pages/my/fava-list'},
					{id:4,text:'在学',icon:'iconfont icon-e-learning-monitor',isLogin:false,path:'/pages/study/study'}
				])
			}
		},
		data:{
			orderParams:{
				page:1,
				limit:5
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			handelNavItem(item){
				console.log(item);
				if(!this.$store.getters.istoken && item.isLogin){
					uni.showModal({content:"你还没有登录，是否前往登录？", cancelText:"再看看",
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url:"/pages/login/login",
								})
							}else{
								uni.showToast({title:"已取消",icon:'none'})
							}
						}
					})
				}else{
					if(!this.userInfo.phone && item.text!=='在学') return uni.navigateTo({url:"/pages/bind-phone/bind-phone"})
					if(item.text=='在学'){
						uni.switchTab({url:item.path})
					}else{
					uni.navigateTo({url:item.path})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.nav-list{
		position: absolute;
		bottom: -15rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 690rpx;
		height: 155rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 10rpx;
		box-shadow: 0rpx 7rpx #eee;
		.nav-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 40rpx;
			>text:nth-child(2){
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #6c757d;
			}
		}
		.iconfont{
			font-size: 45rpx;
			color: #fbc316;
		}
	}
</style>