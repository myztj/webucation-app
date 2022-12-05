<template>
	<view class="login-box">
		<z-login-head></z-login-head>
		<z-login-box :isReg="isReg" @handelReg="handelReg" :checked.sync="isUserDeal" @checkboxChange="checkboxChange">
			<z-form-lsit :isReg="isReg" v-model="loginParams" :formList="formList" @submitParams="submitParams"></z-form-lsit>
		</z-login-box>
	</view>
</template>

<script>
	import zLoginHead from "@/pages/login/components/z-login-head.vue"
	import zFormLsit from "@/pages/login/components/z-form-list.vue"
	import zLoginBox from "@/pages/login/components/z-login-box.vue"
	import ioginApi from "@/api/loginApi.js"
	export default {
		components:{
			zLoginBox,
			zFormLsit,
			zLoginHead
		},
		data() {
			return {
				isUserDeal:false,
				isReg:false,
				loginParams:{
					username:'',
					password:'',
					repassword:''
				},
				formList: [
					{ id: 1,placeholder: '请输入用户名',type: 'input',isReg:false, property: 'username', icon: 'person', size: '20' },
					{ id: 2,placeholder: '请输入密码',type: 'input',isReg:false, property: 'password', icon: 'locked', size: '20' },
					{ id: 3,placeholder: '请输入确认密码',isReg:true, type: 'input', property: 'repassword', icon: 'locked', size: '20' }
				]
			}
		},
		methods: {
			//vue存储数据
			async userLogin(){	
				if(!this.isReg){
					if(!this.loginParams.username) return uni.showToast({title:"用户名/密码不能为空",icon:"none"})
					if(!this.loginParams.password) return uni.showToast({title:"密码不能为空",icon:"none"})
					if(!this.isUserDeal) return uni.showToast({title:"请先同意用户协议&隐私声明",icon:"none"})
				   let res = await this.$store.dispatch('getUserLogin',this.loginParams)
				   console.log(res);
				   if(res.statusCode==200){
					   if(!res.data.data.phone) return uni.navigateTo({url:"/pages/bind-phone/bind-phone"})
					   uni.showToast({title:"登录成功",icon:"none"})
					   setTimeout(()=>{uni.switchTab({url:"/pages/my/my"})},300)
				   }else{
					 uni.showToast({title:res.data.data,icon:"none"})  
				   }
				}else{
				let res = await ioginApi.userRegApi(this.loginParams)
				if(res.statusCode!==200){
					uni.showToast({title:res.data.data,icon:"none"})
				}else{
					uni.showToast({
						title:'注册成功,正在跳转登录...',
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/login/login'
						})
					},500)
				}
				}
			},
			//登录注册切换
			handelReg(){
				this.formList[2].isReg = !this.formList[2].isReg
				this.isReg = !this.isReg
			},
			submitParams(){
			  this.userLogin()
			},
			checkboxChange(){
				this.isUserDeal = !this.isUserDeal
			}
		},
		mounted() {
			var a = document.getElementsByClassName('uni-page-head-hd')[0]
				a.style.opacity = 0;
		},
		onLoad() {
	
		}
	}
</script>

<style lang="scss">

</style>
