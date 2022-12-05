<template>
	<view>
	    <z-list v-for="(item,index) in passwordlist" :key="item.id" :item="item" v-model="userInfoList"></z-list>
		<button class="btn" @click="onsubmitUserIfo" type="default">保存</button>
	</view>
</template>

<script>
 import userInfonApi from "@/api/userInfoApi.js"
	export default {
		data() {
			return {
				userInfoList:{
					opassword:'',
					password:'',
					repassword:''
				},
			 passwordlist:[
				 {id:1,text:'原密码',input:'text',placeholder:'请输入原密码',property:'opassword',option:this.onNull},
				 {id:2,text:'新密码',input:'text',placeholder:'请输入新密码',property:'password',option:this.onNull},
				 {id:3,text:'确认密码',input:'text',placeholder:'请输入确认密码',property:'repassword',option:this.onNull}
			 ]
			}
		},
		methods: {
			//没有只是为了兼容组件，组件优化
			onNull(){},
			//确认密码提交
		  async	onsubmitUserIfo(){
				try{
				let res = await userInfonApi.alterpassWordApi(this.userInfoList)
				console.log(res);
				if(res.statusCode!==200){
					uni.showToast({
						title:res.data.data,
						icon:'none'
					})
				}else{
					uni.showToast({
						title:'密码修改成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/setting/setting"
						})
					},300)
				}
				
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
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
