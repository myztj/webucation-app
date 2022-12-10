<template>
	<view>
		<view class="add p-1">
			<picker
			 @change="colorChange" 
			 :value="colorIndex" 
			 :range="bbsNavList" 
			 range-key="title"
			 class="btns">{{btnsText?btnsText:'选者社区'}}</picker>
			</view>
			<view v-for="(item,index) in textareaNum" :key="index" @click="hendertextarea(index)">
				<view class="content"><textarea class="textarea p-2" @input="handelchange($event,index)" placeholder="请填写帖子内容" /></view>
				<view class="uplodImg">
					<view class="example-body"><uni-file-picker @select="handelselect" limit="9" title="最多选择9张图片"></uni-file-picker></view>
				</view>
			</view>
			<view class="btn-box p-2" @click="textareaNumAdd"><button class="btn" type="default">添加内容</button></view>
	</view>
</template>
<script>
	import bbsApi from "@/api/bbsApi.js"
	import userInfoApi from "@/api/userInfoApi.js"
export default {
	data() {
		return {
			bbsParams:{
				page:1,
				limit:100
			},
			bbsNavList:[],
			colorIndex:0,
			textareaNum:1,
			btnsText:'',
			checkedData:{
				bbs_id:'',
				content:[
					{
						text:'',
						images:[]
					}
				]

			},
			dataIndex:0
		};
	},
	onLoad() {
		this.getBbsNavList()
	},
	//监听原生导航栏Bnt点击事件
	async onNavigationBarButtonTap() {
		console.log('this.checkedData.imgs');
		if(!this.checkedData.bbs_id || !this.checkedData.content[0].text) return uni.showToast({title:'社区不能为空或第一个输入框不能为空',icon:"none"})
		try{
			let res = await bbsApi.addInvitationApi(this.checkedData)
			console.log(res);
			if(res.statusCode==200){
				uni.showToast({
					title:'发布成功',
					icon:'none'
				})
				setTimeout(()=>{
					this.navBack()
				},500)
			}
		}catch(e){
			//TODO handle the exception
		}
	},
	methods: {
		//点击添加内容 增加输入框
		textareaNumAdd(){
			this.textareaNum ++
			//同时增加数据
			this.checkedData.content.push({text:'',images:[]})
		},
		//监听每一个输入框的内容变化
		handelchange(e,index){
			//赋值给对应的数据
			this.checkedData.content[index].text = e.detail.value
		},
		//每次点击输入框的大盒子获取下标，这步可以和输入框Input事件合并（有点多余，但是起到保险作用）
		hendertextarea(index){
			this.dataIndex = index
		},
		//图片上传
		async handelselect(e){
			console.log(e);
			let file = e.tempFilePaths[0]
			let res = await userInfoApi.editUserImgApi(file)
			console.log('res.data=>',res.data);
			this.checkedData.content[this.dataIndex].images.push(res.data)
		},
		//顶部选者社区 获取ID和title
		colorChange(e){
			console.log(e);
			this.checkedData.bbs_id=this.bbsNavList[e.detail.value].id
			this.btnsText = this.bbsNavList[e.detail.value].title
		},
		//获取社区总数据
		async getBbsNavList(){
			let res = await bbsApi.getBbsNavListApi(this.bbsParams)
			this.bbsNavList = res.data.data.rows
		}
	},
};
</script>


<style lang="scss">
	.add{
		.btns{
			height: 60rpx;
			background-color: #f8f8f8;
			text-align: center;
			font-size: 28rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}
	}
.content {
	border-top: 1rpx solid #eee;
	padding: 20rpx 20rpx 0;
	margin-top: 20rpx;
	.textarea {
		width: 670rpx;
		background-color: #f8f9fa;
		border-radius: 10rpx;
	}
}

.btn-box{
	background-color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	.btn{
		background-color: #5ccc84;
		color: #fff;
	}
}
.uplodImg {
		padding: 0 20rpx;
	::v-deep .icon-add:before{
		content:'' !important;
	}
	::v-deep .icon-add{
		height:5rpx !important;
	}
}
</style>
