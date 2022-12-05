<template>
	<view class="user-box flex align-center pt-2" @click="editUserParams">
		<view class="user-info">
			<view class="user-left">
				<view class="head">
				<image :src="userInfo.avatar || '../../../static/logo.png'" mode=""></image>
				</view>
				<view class="info">
					<text v-if="!$store.getters.istoken">立即登录</text>
					<text v-if="$store.getters.istoken">{{userName}}</text>
					<text>{{$store.getters.istoken?'暂无描述':'登录解锁更多功能'}}</text>
				</view>
			</view>
			<view class="user-right" v-if="$store.getters.istoken">
				<text class="iconfont icon-leimupinleifenleileibie"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
export default {
	data(){
		return{
			
		}
	},
	computed:{
		userName(){
			return this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.username
		},
		...mapState(['userInfo'])
	},
	methods:{
		editUserParams(){
			if(!this.$store.state.token){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}else{
				uni.navigateTo({
					url:"/pages/user-info/user-info"
				})
			}
		}
	}
};
</script>

<style lang="scss">
	.user-box{
		// padding: 30rpx;
		.user-info{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			.user-left{
				display: flex;
				align-items: center;
				.head{
					>image{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						background-color: #fff;
					}
				}
				.info{
					display: flex;
					flex-direction: column;
					color: #fff;
					margin-left: 30rpx;
					>text{
						&:nth-child(2){
							font-size: 25rpx;
							margin-top: 20rpx;
						}
					}
				}
			}
			.user-right{
				color: #fff;
				.iconfont{
					font-size: 36rpx;
					
				}
			}
		}
	}
</style>
