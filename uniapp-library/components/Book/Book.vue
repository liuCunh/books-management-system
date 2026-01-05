<template>
		<!-- 单本图书展示 -->
		<view class="book-items">
			<view class="books-list">
				<view class="book-item">
					<!-- 左边图片 -->
					<view class="book-left" @click="handleBookClick(props.book.bookId)">
						<view class="book-cover-container">
							<image :src="props.book.coverImage" mode="aspectFill" class="book-cover" />
							<!-- 左上角插槽 -->
							<view class="book-badge">
								<slot name="badge"></slot>
							</view>
						</view>
					</view>
					
					<!-- 右边内容 -->
					<view class="book-right">
						<view class="book-info" @click="handleBookClick(props.book.bookId)">
							<text class="book-title text-ellipsis">{{ props.book.title }}</text>
							<view class="book-author text-ellipsis">作者：{{ props.book.author }}</view>
							<text class="book-call-number">出版日期：{{ props.book.publishDate }}</text>
							<view class="book-description text-ellipsis">{{ props.book.description }}</view>
						</view>
						<!-- 右侧内容插槽 -->
						<view class="book-right-extra">
							<slot name="right-content"></slot>
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script setup>
// 定义 props 接收父组件传递的单个 book 对象
const props = defineProps({
  book: {
    type: Object,
    default: () => ({})
  }
})

const handleBookClick = (bookId) => {
  uni.navigateTo({
    url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
  })
}

</script>

<style lang="scss" scoped>
	.book-items {
		width: 92vw;
		.books-list {
			margin-bottom: 20rpx;
		}

		.book-item {
			display: flex;
			background: #ffffff;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
			overflow: hidden;
			transition: all 0.3s ease;
			align-items: center;
		}

		.book-left {
			width: 200rpx;
			position: relative;
			padding-left: 24rpx;

			.book-cover-container {
				position: relative;
				width: 100%;
				height: 230rpx;
				overflow: hidden; // 防止图片溢出

				.book-cover {
					width: 100%;
					height: 100%;
					border-radius: 5rpx;
				}

				.book-badge {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
				}
			}
		}

		.book-right {
			flex: 1;
			padding: 24rpx;
			display: flex;
			position: relative;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.book-info {
				flex: 1;
				margin-right: 20rpx;
				overflow: hidden;
				font-size: 26rpx;

				.book-title {
					display: block;
					font-size: 32rpx;
					font-weight: 600;
					color: #1f2937;
					margin-bottom: 16rpx;
					line-height: 1.4;
				}

				.book-author {
					max-width: 70%;
					color: #6b7280;
					margin-bottom: 12rpx;
				}

				.book-call-number {
					display: block;
					color: #9ca3af;
					margin-bottom: 16rpx;
				}

				.book-meta {
					display: flex;
					justify-content: space-between;
				}
				
				.book-description {
					color: #9ca3af;
				}
			}

			.book-right-extra {
				position: absolute;
				right: 0rpx;
				width: 200rpx;
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
			}

		}

	}

</style>