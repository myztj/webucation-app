<template>
	<view>
		<z-list v-for="(item, index) in userParams" :key="item.id" :item="item"></z-list>
		<button v-if="token" class="btn" @click="onsubmitUserIfo" type="default">退出登录</button>
	</view>
</template>

<script>
import userInfoApi from '@/api/userInfoApi.js';
import { unlinkSync } from 'fs';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			userParams: [
				{ id: 1, text: '账户安全', icon: 'iconfont icon-jinru', option: this.handelUserPass },
				{ id: 2, text: '清除缓存', word: '2.00 KB', option: this.clarCache },
				{ id: 3, text: '检查更新', icon: 'iconfont icon-jinru', option: this.checkUpdeta },
				{ id: 4, text: '当前版本', word: '1.0.0', option: this.currentEdition }
			]
		};
	},
	computed: {
		...mapState(['token',"userInfo"])
	},
	methods: {
		//账户安全
		handelUserPass() {
			if (this.token) {
				if(!this.userInfo.phone) return uni.navigateTo({url:"/pages/bind-phone/bind-phone"})
				uni.navigateTo({url: '/pages/user-safe/user-safe'});
			} else {
				uni.showToast({title: '请先登录',icon: 'none'});
				setTimeout(() => {uni.navigateTo({url: '/pages/login/login'});}, 500);
			}
		},
		//清除缓存
		clarCache() {
			uni.showModal({
				content: '是否要清除缓存',
				success: res => {
					if (res.confirm) {
						this.userParams[1].word = '0 KB';
					}
				}
			});
		},
		//检车更新
		checkUpdeta() {
			uni.showToast({title: '已是最新，正在努力研发中......',icon: 'none'});
		},
		//当前版本
		currentEdition() {
			uni.showToast({title: '现在版本是1.0.0',icon: 'none'});
			},
		//退出登录
		onsubmitUserIfo() {
			uni.showModal({title: '提示',content: '你确定要退出吗？',
				success:async res => {
					if (res.confirm) {
						try {
							let res = await userInfoApi.userOutApi();
							console.log(res);
							if(res.statusCode==200){
								uni.showToast({title:'退出成功',icon:'none'})
								this.$store.commit('OUTLOGIN')
							setTimeout(()=>{uni.navigateTo({url:'/pages/login/login'})},300)
							}else{
								uni.showToast({title:res.data.data,icon:'none'})
								setTimeout(()=>{uni.navigateTo({url:'/pages/login/login'})},300)
							}
						} catch (e) {
							//TODO handle the exception
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.btn {
	background-color: #5ccc84;
	color: #fff;
	margin: 40rpx 30rpx 0;
}
</style>
