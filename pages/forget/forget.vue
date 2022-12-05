<template>
	<view>
		<z-login-head></z-login-head>
		<z-login-box :isLogin="false">
			<z-form-lsit :formList="formList" v-model="formData" subTitle="立即找回" :show="false" @submitParams="submitParams"></z-form-lsit>
		</z-login-box>
	</view>
</template>

<script>
	import ioginApi from "@/api/loginApi.js"
import zLoginHead from '@/pages/login/components/z-login-head.vue';
import zFormLsit from '@/pages/login/components/z-form-list.vue';
import zLoginBox from '@/pages/login/components/z-login-box.vue';
export default {
	components: {
		zLoginBox,
		zFormLsit,
		zLoginHead
	},
	data() {
		return {
			formList: [
				{ id: 1, placeholder: '请输入手机号', type: 'input',isReg:false, property: 'phone', icon: 'person', size: '20' },
				{ id: 2, placeholder: '验证码', type: 'code',isReg:false, property: 'code', icon: 'locked', size: '20', option: this.sendCode },
				{ id: 3, placeholder: '请输入密码', type: 'input',isReg:false, property: 'password', icon: 'locked', size: '20' },
				{ id: 4, placeholder: '请输入确认密码', type: 'input',isReg:false, property: 'repassword', icon: 'locked', size: '20' }
			],
			formData: {
				phone: '',
				code: '',
				password: '',
				repassword: ''
			}
		};
	},
	mounted() {
		var a = document.getElementsByClassName('uni-page-head-hd')[0];
		a.style.opacity = 0;
	},
	methods: {
		sendCode() {
			console.log('发送验证码');
		},
		//找回密码提交
	    async submitParams(){
			try{
				let res = await ioginApi.mobileForgetApi(this.formData)
				console.log(res);
				if(res.statusCode!==200){
					uni.showToast({
						title:res.data.data,
						icon:"none"
					})
				}else{
					uni.showToast({
						title:'密码修改成功,正在跳转到登录...',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({url:'/pages/login/login'})
					},500)
				}
			}catch(e){
				console.log(e);
				//TODO handle the exception
			}
		}
	}
};
</script>

<style></style>
