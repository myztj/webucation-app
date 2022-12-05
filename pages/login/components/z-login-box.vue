<template>
	<view class="login-case">
		<view class="login-title" v-if="isLogin">{{ isReg ? '注册' : '登录' }}</view>
		<view class="login-title" v-if="!isLogin">{{title}}</view>
		<!-- //插槽 -->
		<slot></slot>
		<view class="uaer-operate" v-if="isLogin">
			<text @click="handelReg">{{ isReg ? '去登录' : '注册账号' }}</text>
			<text @click="handelPass">忘记密码？</text>
		</view>
		<view class="third-party-login" v-if="isLogin">
			<view class="login-wx"><image src="../../../static/share/weixin.png" mode=""></image></view>
			<view class="user-agreement" v-if="!isReg">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd">
						<view><checkbox style="transform: scale(0.8);" color="#007aff" :checked="checked" /></view>
					</label>
				</checkbox-group>
				<text>已阅读并同意用户协议&隐私声明</text>
			</view>
		</view>
	</view>
</template>

<script>
import zFormLsit from '@/pages/login/components/z-form-list.vue';
export default {
	props: {
		title: {
			type: String,
			default: '找回密码'
		},
		isReg: {
			type: Boolean,
			default: false
		},
		isLogin: {
			type: Boolean,
			default: true
		},
		checked: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handelReg() {
			this.$emit('handelReg');
		},
		handelPass() {
			uni.navigateTo({url: '/pages/forget/forget'});
		},
		checkboxChange(){
			this.$emit('checkboxChange')
		}
	}
};
</script>

<style lang="scss">
.login-case {
	background-color: #fff;
	padding: 0 65rpx;
	border-radius: 30rpx 30rpx 0 0;
	overflow: hidden;
	margin-top: -20rpx;
	.login-title {
		font-size: 44rpx;
		color: #35404b;
		margin: 55rpx 0;
	}
	.uaer-operate {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		> text {
			&:nth-child(1) {
				color: #5ccc84;
			}
			&:nth-child(2) {
				color: #a9a5a0;
			}
		}
	}
	.third-party-login {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.login-wx {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 1rpx solid #5ccc84;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60rpx 0 40rpx 0;
			> image {
				width: 56rpx;
				height: 54rpx;
			}
		}
	}
	.user-agreement {
		display: flex;
		align-items: center;
		> text {
			font-size: 30rpx;
			color: #a9a5a0;
		}
	}
}
.uni-checkbox-input {
	width: 22px !important;
	height: 22px !important;
}
</style>
