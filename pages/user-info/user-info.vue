<template>
	<view>
		<z-list :imgUrl="imgUrl" v-for="(item,index) in userParams" :key="item.id" :item="item" @handelInput="handelInput"></z-list>
		<button class="btn" @click="onsubmitUserIfo" type="default">提交</button>
	</view>
</template>

<script>
	import userInfoApi from "@/api/userInfoApi.js"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				userParams:[
					{id:1,text:'头像',src:'../../static/logo.png',option:this.setUserHead},
					{id:2,text:'昵称',name:'未',option:this.handelInputChange},
					{id:3,text:'性别',sex:'未知',option:this.setUserSex},
					{id:4,text:'手机',mobile:'186******252',option:this.setUserMobile}
				],
				imgUrl:'',
				submitUserIfo:{
					nickname:'',
					sex:'',
					avatar:''
				}
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			this.submitUserIfo.nickname=this.userInfo.nickname
			this.submitUserIfo.sex = this.userInfo.sex
		},
		methods: {
			async onsubmitUserIfo(){
				try{
					let res = await userInfoApi.subUserInfoApi(this.submitUserIfo)
					console.log('res=>',res);
					if(res.statusCode===200){
						uni.showToast({
						   title:"保存成功",
						   icon:"none"
						})
						this.userInfo.nickname = this.submitUserIfo.nickname
						this.userInfo.sex = this.submitUserIfo.sex
						this.userInfo.avatar = this.submitUserIfo.avatar
						this.$store.commit('GETUSERLOGIN',this.userInfo)
					}else{
						uni.showToast({
						   title:res.data.data,
						   icon:"none"
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//更换用户头像
			setUserHead(){
				uni.chooseImage({
					count:1,
					success: async (res) => {
						const file = res.tempFilePaths[0]
						uni.showLoading({
							title:"头像上传中",
							mask:true
						})
						try{
							let res = await userInfoApi.editUserImgApi(file)
							console.log('res.data=>',res.data);
							this.submitUserIfo.avatar = res.data
							this.imgUrl = res.data
							uni.hideLoading()
						}catch(e){
							uni.hideLoading()
							//TODO handle the exception
						}
					}
				})
			},
			//点击输入框
			handelInputChange(){
				console.log('2');
			},
			//更改用户性别
			setUserSex(){
				console.log('3');
				const item = ['男','女']
				uni.showActionSheet({
					itemList:item,
					success: (res) => {
						const index = res.tapIndex
						this.userInfo.sex = item[index]
						// this.userParams[2].sex = item[index]
						this.submitUserIfo.sex = item[index]
						this.$store.commit('GETUSERLOGIN',this.userInfo)
					}
				})
			},
			//更换手机号
			setUserMobile(){
				uni.navigateTo({
					url:"/pages/bind-phone/bind-phone"
				})
			},
			handelInput(val){
				console.log(val);
				this.submitUserIfo.nickname = val
			}
		}
	}
</script>

<style lang="scss">
.btn{
	background-color: #5ccc84;
	color: #fff;
	margin: 40rpx 30rpx 0;
}
</style>
