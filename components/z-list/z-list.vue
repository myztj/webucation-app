<template>
	<view>
		<view class="info"  @click="item.option" :class="{'activeBb':isBb}">
			<view class="info-left">
				<text>{{item.text}}</text>
			</view>
			<view class="info-right">
				<image v-if="item.src" :src="imgUrl || userInfo.avatar" mode=""></image>
				<text v-if="item.name && isPlsh" class="plh">未填写</text>
				<input v-if="item.name" v-model="content" @keyup="handelInput" type="text"/>
			    <text v-if="item.sex && userInfo.sex!=='未知'">{{$store.state.userInfo.sex}}</text>
			    <text v-if="item.sex && userInfo.sex=='未知'">未知</text>
			    <text v-if="item.mobile">{{userInfo.phone}}</text>
				<text v-if="item.word" :class="{'activeColor':item.isColor,'activeText':item.isText}">{{item.word}}</text>
				<text v-if="item.icon" :class="{'activeIcon':item.isIconColor}" class="iconfont icon-jinru"></text>
				<input v-if="item.input" type="text" :placeholder="item.placeholder" v-model="value[item.property]" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isclick:{
				type:Boolean,
				default:true
			},
			value:{
				type:Object,
				default:()=>{}
			},
			imgUrl:{
				type:String,
				default:'../../static/logo.png'
			},
			item:{
				type:Object,
				default:()=>{}
			},
			isBb:{
				type:false,
				default:false
			}
		},
		name:"z-list",
		data() {
			return {
				content:'',
				isPlsh:true
			};
		},
		computed:{
			userInfo(){
				return uni.getStorageSync('userInfo')
			}
		},
		created() {
			this.content = this.userInfo.nickname
			if(!this.content){
				this.isPlsh=true
			}else{
				this.isPlsh=false
			}
		},
		methods:{
			handelInput(e){
				if(e.detail.value){
					this.isPlsh=false
				}else if(e.detail.value==''){
					this.isPlsh=true
				}
				if(!this.content){
					this.isPlsh=true
				}else{
					this.isPlsh=false
				}
				this.$emit('handelInput',this.content)
			}
		}
	}
</script>

<style lang="scss">
.info{
	display: flex;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	.info-left{
		font-size: 28rpx;
		color: #3b4144;
	}
	.info-right{
		position: relative;
		display: flex;
		align-items: center;
		>image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.iconfont{
			margin-left: 20rpx;
		}
		.plh{
			position: absolute;
			top: 0rpx;
			right: 0rpx;
			color: grey;
		}
		>input{
			text-align: right;
		}
	}
}
.activeColor{
	color: #5ccc84 !important;
}
.activeText{
	font-size: 24rpx !important;
}
.activeIcon{
	color: rgb(187, 187, 187) !important;
}
.activeBb{
	border-bottom: 1rpx solid #f5f5f3 !important;
}
</style>