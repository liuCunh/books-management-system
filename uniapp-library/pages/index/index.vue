<template>
	<view class="container">
		<navigator url="/pages/demo/demo"><view><h1>跳转Demo页面</h1></view></navigator>
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" interval="2000"
				circular autoplay>
				<swiper-item>
					<navigator url="/pages/swiper/swiper1">
						<view>
							<image src="/static/index/1.jpg" class="picture" mode="widthFix"></image>
						</view>
						<view class="swiper-detail">入馆须知</view>
					</navigator>
				</swiper-item>
				<swiper-item>
					<navigator url="/pages/swiper/swiper2">
						<view>
							<image src="/static/index/2.jpg" class="picture"></image>
						</view>
						<view class="swiper-detail">违规处理办法</view>
					</navigator>
				</swiper-item>
				<swiper-item>
					<navigator url="/pages/swiper/swiper3">
						<view>
							<image src="/static/index/3.jpg" class="picture"></image>
						</view>
						<view class="swiper-detail">自习管理规则</view>
					</navigator>
				</swiper-item>
				<swiper-item>
					<navigator url="/pages/swiper/swiper4">
						<view>
							<image src="/static/index/4.jpg" class="picture"></image>
						</view>
						<view class="swiper-detail">读者教育与培训制度</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 用户搜索 -->
		<view class="search-section">
			<!-- 搜索框 -->
			<view class="search-box">
				<input type="text" placeholder="搜索图书、作者" class="search-input" />
				<button class="search-btn">搜索</button>
			</view>

			<!-- 图书类别选择器 -->
			<picker class="category-picker" mode="selector" :value="currentCategoryIndex" :range="bookCategories"
				range-key="name" @change="changeCurrentCategoriesIndex">
				<view class="picker-content">
					<text>{{ bookCategories[currentCategoryIndex].name }}</text>
					<image src="/static/index/arrow-down.png" class="dropdown-icon" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		
		<!-- 图书展示 -->
		<view class="book-items">
			<Book v-for="book in books" :key="book.bookId" :book="book" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue'
	import { 
		onLoad,
	} from "@dcloudio/uni-app"
	import Book from '@/components/Book/Book.vue'
	import { useBookStore } from '@/stores/books'
	
	// 定义Pinia
	const bookStore = useBookStore();
	const books = ref(bookStore.books)
	
	// 向后端请求books数据
	// onLoad(() => {
	// 	bookStore.fetchBooks();
	// });

	// 图书类别数据 - 使用 reactive 创建响应式对象
	const bookCategories = reactive([{
			id: 'null',
			name: '图书类别'
		},
		{
			id: 'fiction',
			name: '小说'
		},
		{
			id: 'science',
			name: '科技'
		},
		{
			id: 'history',
			name: '历史'
		},
		{
			id: 'philosophy',
			name: '哲学'
		},
		{
			id: 'economy',
			name: '经济'
		},
		{
			id: 'literature',
			name: '文学'
		},
		{
			id: 'art',
			name: '艺术'
		},
		{
			id: 'education',
			name: '教育'
		},
		{
			id: 'medical',
			name: '医学'
		},
		{
			id: 'military',
			name: '军事'
		}
	])

	// 响应式索引
	const currentCategoryIndex = ref(0)

	// 图书类别，切换选项方法
	const changeCurrentCategoriesIndex = (e) => {
		currentCategoryIndex.value = e.detail.value
	}

</script>

<style scoped lang="scss">
	.container {
		font-size: 14px;
		line-height: 24px;
		background-color: #f5f7fa;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 20rpx;
	}
	.swiper {
		swiper {
			width: 92vw;
			height: 200px;
		}

		.picture {
			width: 100%;
		}

		.swiper-detail {
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			position: fixed;
			top: 0px;
			left: 0px;
		}
	}

	.search-section {
		display: flex;
		width: 92vw;
		gap: 16rpx;
		align-items: center;

		/* 搜索框样式 */
		.search-box {
			flex: 1;
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 0 24rpx;
			height: 88rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
			transition: all 0.3s ease;
		}

		.search-box:active {
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.12);
		}

		.search-input {
			flex: 1;
			height: 100%;
			font-size: 28rpx;
			color: #333;
			placeholder-color: #c0c0c0;
		}

		.search-btn {
			background-color: #4285f4;
			color: #fff;
			border-radius: 10rpx;
			height: 68rpx;
			min-width: 140rpx;
			font-size: 28rpx;
			line-height: 68rpx;
			padding: 0 20rpx;
			box-shadow: 0 2rpx 4rpx rgba(66, 133, 244, 0.3);
			transition: all 0.2s ease;
		}

		.search-btn:active {
			background-color: #3367d6;
			transform: scale(0.98);
		}

		/* 图书类别选择器样式（已固定宽度并文字居中） */
		.category-picker {
			background-color: #fff;
			border-radius: 10rpx;
			height: 88rpx;
			width: 150rpx;
			/* 固定下拉框宽度 */
			padding: 0 24rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
			transition: all 0.3s ease;
		}

		.category-picker:active {
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.12);
		}

		.picker-content {
			display: flex;
			align-items: center;
			justify-content: center;
			/* 文字居中 */

			height: 100%;
			width: 100%;
			/* 确保内容区域占满整个下拉框 */
		}

		.picker-content text {
			font-size: 28rpx;
			color: #333;
			margin-right: 12rpx;
			line-height: 88rpx;
		}

		/* 下拉图标样式 */
		.dropdown-icon {
			width: 24rpx;
			height: 24rpx;
			opacity: 0.6;
		}
	}
</style>