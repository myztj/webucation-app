<template>
	<view>
		<view class="count-down">
			考试时间
			<text class="time">{{ isEndTime }}</text>
		</view>
		<block v-for="(item,index) in questionBank" :key="index">
			<view class="test-content" v-if="index==tIndex">
				<view class="content-type">
					<text>问答题</text>
					<text>第{{tIndex+1}}题</text>
				</view>
				<view class="content-title p-2" v-html="item.title"></view>
				<view class="choice-question p-2">
					<view class="A-question p-2" v-if="item.type=='radio'||item.type=='trueOrfalse'" :class="{'active':inx==checkedIndex}" @click="handelOnClick(inx,item)" v-for="(ele,inx) in item.options" :key="inx"><text>{{letters[inx]}}</text><text v-html="ele"></text></view>
					<view class="A-question p-2" v-if="item.type=='checkbox'" :class="{'active':multipleFlag[inx]==inx}" @click="handelOnClick(inx,item)" v-for="(ele,inx) in item.options" :key="inx"><text>{{letters[inx]}}</text><text v-html="ele"></text></view>
				</view>
				<block v-if="item.type=='completion' || item.type=='answer'"><textarea v-for="(num,i) in gapIndex" :key="i" class="textarea p-1" v-model="tesData"  placeholder="请输入答案..." /></block>
				<button type="default" class="btn" v-if="item.type=='completion'" @click="gapIndex++">添加填空</button>
			</view>
		</block>
		<view class="">
			<!-- 底部导航 -->
			<view class="footer">
				<text v-if="tIndex" class="iconfont icon-shangyibu" @click="handerPrevious"></text>
				<text v-if="!tIndex" style="color: #aeaba6;" class="iconfont icon-shangyibu"></text>
				<view class="icon-num">
					<text class="iconfont icon-leimupinleifenleileibie"></text>
					<text>
						<text style="color: #5ccc84;">{{ tIndex+1 }}</text>
						/{{questionBank.length}}
					</text>
				</view>
				<view class="icon-num" @click="submitTest">
					<text class="iconfont icon-tijiao"></text>
					<text>交卷</text>
				</view>
				<text v-if="questionBank.length-1!=tIndex" class="iconfont icon-xiayibu" @click="handerNext"></text>
				<text v-if="questionBank.length-1==tIndex" style="color: #aeaba6;" class="iconfont icon-xiayibu"></text>
			</view>
		</view>
	</view>
</template>

<script>
import testApi from '@/api/testApi.js';
export default {
	data() {
		return {
			userTestId: 0,
			questionBank:uni.getStorageSync('test') || [],
			tIndex:0,
			letters:['A','B','C','D','E','F'],
			tesData:'',
			gapIndex:1,
			checkedIndex:null,
			multipleFlag:[],
			testParams:{
				Testvalue:[],
				user_test_id:'' //提交试卷需要的Id
			},
			testId:[]
		};
	},
	onLoad(options) {
		console.log(options);
		this.userTestId = options.id;
		// this.getTestTopic();
	},	
	onHide() {
		clearInterval(this.timer);
	},
	methods: {
		//答题
		handelOnClick(inx,item){
			console.log(item);	
			if(item.type=='checkbox'){
				let id = item.id
				// this.multipleFlag=Array(item.options.length).fill('')
				this.multipleFlag[inx]=inx
				console.log(this.multipleFlag);
				this.testParams.Testvalue.push(this.multipleFlag)
				console.log(this.testParams);
			}else{
				console.log(inx);
				this.checkedIndex = inx
				this.testParams.Testvalue.push(this.checkedIndex)
				if(this.tesData) this.testParams.Testvalue.push(this.tesData)
				console.log(this.testParams);
			}
		},
		//交卷
		async submitTest(){
			try{
				let res = await testApi.submitTestApi(this.testParams)
				console.log(res);
			}catch(e){
				//TODO handle the exception
			}
		},
		//上一题
		handerPrevious(){
			if(!this.tIndex) return
			this.tIndex -- 
			this.gapIndex=1
		},
		//下一题
		handerNext(){
			if(this.questionBank.length-1==this.tIndex) return
			this.tIndex ++
			this.gapIndex=1
			this.checkedIndex=null
		},
		// async getTestTopic() {
		// 	try {
		// 		let res = await testApi.getTestTopicApi({ id: this.userTestId });
		// 		console.log(res);
		// 		this.questionBank = res.data.data.testpaper_questions
		// 		this.testParams.user_test_id = res.data.data.user_test_id
		// 		console.log(this.questionBank);
		// 		uni.setStorageSync('test',this.questionBank)
		// 		if (res.statusCode == 400) {
		// 			uni.showToast({
		// 				title: res.data.data,
		// 				icon: 'none'
		// 			});
		// 			setTimeout(()=>{
		// 				this.navTo('/pages/index/test-list')
		// 			},500)
		// 		}
		// 	} catch (e) {
		// 		//TODO handle the exception
		// 	}
		// }
	}
};
</script>

<style lang="scss">
.count-down {
	padding: 25rpx 0;
	text-align: center;
	color: red;
	border-bottom: 1rpx solid red;
	border-top: 1rpx solid red;
	.time {
		padding-left: 20rpx;
	}
}
.test-content {
	.content-type {
		padding: 20rpx;
		border-bottom: 1rpx solid #f7f7f7;
		display: flex;
		justify-content: space-between;
		> text {
			&:nth-child(2) {
				color: #666;
				font-size: 28rpx;
			}
		}
	}
	.choice-question{
		>view{
			border: 1rpx solid #f7f7f7;
			margin: 20rpx 0;
			border-radius: 10rpx;
			display: flex;
			>text{
				&:nth-child(1){
					font-size: 38rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
	.textarea {
		width: 92%;
		border: 1rpx solid #ccc;
		margin: 0 20rpx;
	}
	.btn{
		width: 95%;
		margin: 20rpx auto;
		background-color: #5ccc84;
		color: #fff;
	}
}
.footer {
	padding: 10rpx 0;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.icon-num {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
	}
	.iconfont {
		font-size: 40rpx;
	}
}
.active{
	border: 1rpx solid #5ccc84 !important;
}
</style>
