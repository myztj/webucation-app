<template>
	<view class="form-box">
	<block v-for="(item,index) in formList" :key="index">
		<view class="username" v-if="item.type!=='code' && !item.isReg">
			    <uni-icons :type="item.icon" :size="item.size"></uni-icons>
				<input class="uni-input" v-model="value[item.property]" :placeholder="item.placeholder" />
		</view>
		<view class="code" v-if="item.type=='code' && !item.isReg">
			    <uni-icons :type="item.icon" :size="item.size"></uni-icons>
					<input class="uni-input" v-model="value[item.property]" :placeholder="item.placeholder"/>
					<view class="send" @click="sendCode">{{isStatus?subtext + 's': '发送'}}</view>
		</view>
	</block>
		<button @click="submitParams" class="btn" type="default" v-if="show">{{isReg?'注 册':'登 录'}}</button>
		<button @click="submitParams" class="btn" type="default" v-if="!show">{{subTitle}}</button>
	</view>
</template>

<script>
	import userInfoApi from "@/api/userInfoApi.js"
	export default{
		props:{
			subTitle:{
				type:String,
				default:'绑定'
			},
			show:{
				type:Boolean,
				default:true
			},
			value:{
			  type:Object,
			  default:()=>{}
			},
			isReg:{
				type:Boolean,
				default:false
			},
			formList:{
				type:Array,
				default:()=>([
					{id:1,placeholder:'请输入用户名',type:"input",icon:'person',size:'20',isReg:false},
					{id:1,placeholder:'请输入密码',type:"input",icon:'locked',size:'20'}
				])
			}
		},
		data(){
			return{
				subtext:'发送',
				isStatus:false,
				codeParams:{
					phone:""
				}
			}
		},
		methods:{
			submitParams(){
				this.$emit('submitParams')
			},
			async sendCode(){
				this.codeParams.phone = this.value.phone
				if(this.isStatus) return uni.showToast({
					title:this.subtext+'秒后重新发送',
					icon:"none"
				})
				this.subtext= 60
				this.isStatus = true
			  let time = setInterval(()=>{
					--this.subtext
					if(this.subtext<=0){
						this.subtext='重新发送'
						clearInterval(time)
						this.isStatus = false
					}
				},1000)
				try{
					let res = await userInfoApi.sendCodeApi(this.codeParams)
					console.log(res.data.data);
						if(res.statusCode===200){
							uni.showToast({
								title:'验证码：'+res.data.data,
								icon:"none"
							})
						}else if(res.statusCode!==200){
							clearInterval(time)
							this.isStatus = false
							uni.showToast({
								title:res.data.data,
								icon:"none"
							})
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
	.form-box{
		>view{
			display: flex;
			padding: 0 20rpx;
			align-items: center;
			background-color: #f5f5f5;
			border-radius: 8rpx;
			margin-bottom: 50rpx;
			>input{
				height: 100rpx;
				margin-left: 20rpx;
			}
		}
		.code{
			display: flex !important;
			justify-content: space-between !important;
			padding-right: 0rpx !important;
				.send{
					height: 100rpx;
                    width: 200rpx;
					border-radius:0 8rpx 8rpx 0;
					background-color: #5ccc84;
					color: #f5f5f5;
					line-height: 100rpx;
					text-align: center;
			}
		}
		.btn{
			height: 100rpx;
			font-size: 30rpx;
			line-height: 100rpx;
			margin-bottom: 50rpx;
			background-color: #5ccc84;
			color: #f5f5f5;
		}
	}
</style>