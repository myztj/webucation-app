<template>
	<view>
		<z-form-head></z-form-head>
		<z-form-box :isLogin="false" title="绑定手机号">
			<z-form-list :show="false" :formList="formList" v-model.sync="formData" @submitParams="submitParams"></z-form-list>
		</z-form-box>
	</view>
</template>

<script>
	import zFormHead from "@/pages/login/components/z-login-head.vue"
	import zFormBox from "@/pages/login/components/z-login-box.vue"
	import zFormList from "@/pages/login/components/z-form-list.vue"
	import userInfoApi from"@/api/userInfoApi.js"
	import {mapState} from "vuex"
	export default {
		components:{
			zFormHead,
			zFormBox,
			zFormList
		},
		computed:{
			...mapState(['userInfo'])
		},
		data() {
			return {
				formList: [
					{ id: 1, placeholder: '请输入手机号码', type: 'input',isReg:false, property: 'phone', icon: 'person', size: '20' },
					{ id: 2, placeholder: '验证码', type: 'code',isReg:false, property: 'code', icon: 'locked', size: '20'},
				],
				formData:{
					phone:"",
					code:''
				}
			}
		},
		mounted() {
			var a = document.getElementsByClassName('uni-page-head')[0]
				a.remove()
		},
		methods: {
			async submitParams(){
				try{
					let res = await userInfoApi.bindingMobileApi(this.formData)
					if(res.statusCode===200){
						uni.showToast({title:"修改成功",icon:'none'})
						setTimeout(()=>{uni.switchTab({url:'/pages/my/my'})},500)
						this.userInfo.phone = this.formData.phone
						this.$store.commit('GETUSERLOGIN',this.userInfo)
					}else{
						uni.showToast({title:res.data.data,icon:'none'})
					}
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
