<template>
	<view v-if="book">
		<view class="book-detail-page" @click="goBack">
			
			<view class="book-content">
				<view class="book-cover">
					<image :src="book.coverImage" mode="aspectFill" class="cover-img" />
				</view>

				<view class="book-info">
					<text class="book-title" user-select="true">{{ book.title }}</text>
					
					<view class="info-item author-row">
						<text class="label">作者：</text>
						<text class="value highlight">{{ book.author }}</text>
					</view>
					
					<view class="meta-data">
						<view class="info-item">
							<text class="label">ISBN：</text>
							<text class="value">{{ book.bookId }}</text>
						</view>
						<view class="info-item">
							<text class="label">出版：</text>
							<text class="value">{{ book.publishDate }}</text>
						</view>
						<view class="info-item">
							<text class="label">分类：</text>
							<text class="value">{{ book.categoryName }}</text>
						</view>
						<view class="info-item">
							<text class="label">字数：</text>
							<text class="value">{{ book.wordCount }}万字</text>
						</view>
						<view class="info-item">
							<text class="label">库存：</text>
							<text class="value">{{ book.stockQuantity }} 本</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-title">内容简介</view>
				<text class="description" user-select="true">{{ book.description }}</text>
			</view>
		</view>
		<BottomTabBar :book="book"></BottomTabBar>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useBookStore } from '@/stores/books'
import { onLoad } from '@dcloudio/uni-app';

const bookStore = useBookStore();
const book = ref(null);

onLoad((query) => {
  const bookId = parseInt(query.bookId);
  const found = bookStore.findBookById(bookId);
  if (found) {
    book.value = found;
  } else {
    uni.showToast({ title: '图书未找到', icon: 'none' });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
});

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
/* 整体容器 */
.book-detail-page {
	padding: 20rpx 0;
	margin: 0 auto;
	color: #333;
	background-color: #f5f7fa;
	min-height: 100vh;
	box-sizing: border-box;
}

/* 主内容区卡片 */
.book-content {
	display: flex;
	/* 改为顶部对齐，适合右侧内容较多的情况 */
	align-items: center; 
	width: 92vw;
	background-color: #fff;
	margin: 0 auto 20rpx;
	padding: 30rpx 20rpx; /* 增加内部留白 */
	border-radius: 16rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
	box-sizing: border-box;
}

/* 左侧封面区域 */
.book-cover {
	flex-shrink: 0; /* 防止图片被挤压 */
	width: 240rpx; /* 稍微调小一点图片宽度，留更多空间给文字 */
	margin-right: 30rpx;
}

.cover-img {
	width: 100%;
	height: 340rpx; /* 保持比例 */
	border-radius: 12rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15); /* 给书本加点立体阴影 */
}

/* 右侧信息区域 */
.book-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

/* 书名样式优化 */
.book-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #1a1a1a;
	line-height: 1.4;
	margin-bottom: 16rpx;
	/* 移除居中，改为左对齐，且允许换行不省略，方便阅读 */
	text-align: left;
}

/* 通用信息行 */
.info-item {
	display: flex;
	align-items: center;
	font-size: 26rpx;
	margin-bottom: 12rpx;
	line-height: 1.5;
}

/* 作者栏特殊处理 */
.author-row {
	margin-bottom: 20rpx;
}

.label {
	color: #999; /* 标签颜色变浅 */
	flex-shrink: 0;
}

.value {
	color: #555;
}

.highlight {
	color: #333;
	font-weight: 500;
}

/* 元数据区域，稍微紧凑一点 */
.meta-data {
	.info-item {
		margin-bottom: 8rpx;
	}
}

/* 简介卡片 */
.section {
	width: 92vw;
	background-color: #fff;
	margin: 0 auto 40rpx;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
	box-sizing: border-box;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 24rpx;
	color: #1a1a1a;
	border-left: 8rpx solid #2979ff; /* 增加一个小蓝条装饰 */
	padding-left: 16rpx;
	line-height: 1;
}

.description {
	font-size: 28rpx;
	line-height: 1.8; /* 增加行距，提升阅读体验 */
	color: #666;
	text-align: justify; /* 两端对齐 */
}
</style>