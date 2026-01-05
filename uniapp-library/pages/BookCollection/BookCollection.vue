<template>
  <view class="collection-page">
    <view class="main-content">
      <view class="header-section">
        <view class="title-row">
          <text class="title">我的收藏</text>
          <text class="count">({{ books.length }})</text>
        </view>
        <view class="divider"></view>
      </view>

      <view class="books-list">
        <view v-if="books.length === 0" class="empty-state">
          <image src="/static/empty.png" mode="aspectFit" class="empty-img" v-if="false"/> <view class="empty-text">暂时没有收藏书籍</view>
          <navigator url="/pages/index/index" open-type="switchTab" class="empty-action">去逛逛</navigator>
        </view>

        <template v-else>
          <view class="card-wrapper" v-for="book in books" :key="book.bookId">
            <Book :book="book">
              
              <template #badge>
                <view 
                  class="stock-badge" 
                  :class="book.stockQuantity > 0 ? 'is-available' : 'is-empty'"
                >
                  {{ book.stockQuantity > 0 ? '可借阅' : '无库存' }}
                </view>
              </template>

              <template #right-content>
                <view class="action-container" @click.stop="handleBookClick(book.bookId)">
                  <view class="action-btn cancel-btn">取消收藏</view>
                </view>
              </template>
              
            </Book>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Book from '@/components/Book/Book.vue'
import { useBookStore } from '@/stores/books'

// 定义Pinia
const bookStore = useBookStore();
// 使用本地副本
const books = ref(Array.isArray(bookStore.books) ? [...bookStore.books] : [])

const handleBookClick = (bookId) => {
  const id = Number(bookId);
  const exists = books.value.some(b => Number(b.bookId) === id);
  if (!exists) {
    uni.showToast({ title: '未找到该书', icon: 'none' });
    return;
  }
  books.value = books.value.filter(b => Number(b.bookId) !== id);
  uni.showToast({ title: '已取消收藏', icon: 'success' });
}
</script>

<style lang="scss" scoped>
/* 页面整体背景 */
.collection-page {
  min-height: 100vh;
  background-color: #f5f7fa; /* 浅灰背景衬托白色卡片 */
  padding-top: 20rpx;
  padding-bottom: 40rpx;
}

/* 核心居中容器：92vw */
.main-content {
  width: 92vw;
  margin: 0 auto;
}

/* --- 顶部装饰样式 --- */
.header-section {
  margin-bottom: 30rpx;
  padding: 10rpx 0;
  
  .title-row {
    display: flex;
    align-items: baseline; /* 文字基线对齐 */
    margin-bottom: 16rpx;
    
    .title {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
    }
    
    .count {
      font-size: 28rpx;
      color: #999;
      margin-left: 10rpx;
      font-weight: normal;
    }
  }

  .divider {
    width: 100%;
    height: 2rpx;
    background-color: #e0e0e0;
    position: relative;
  }
}

/* --- 列表卡片间距 --- */
.card-wrapper {
	line-height: 24px;
  background-color: #fff;
}

/* --- 左侧徽标样式 (保持精致感) --- */
.stock-badge {
  padding: 6rpx 16rpx;
  border-radius: 5rpx 0 10rpx 0; /* 仅右下角圆角，贴合左上角 */
  font-size: 22rpx;
  font-weight: 500;
  letter-spacing: 1rpx;
  
  &.is-available {
    background-color: #e1f3d8; 
    color: #67c23a;
  }

  &.is-empty {
    background-color: #f4f4f5;
    color: #909399;
  }
}

/* --- 右侧按钮区域 --- */
.action-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.action-btn {
  display: inline-block;
  font-size: 24rpx;
  padding: 10rpx 24rpx;
  border-radius: 10rpx;
  transition: all 0.2s;
  
  &.cancel-btn {
    background-color: #fff;
    color: #ff4d4f;
    border: 1rpx solid #ff4d4f;
    
    &:active {
      background-color: #fff1f0;
      opacity: 0.8;
    }
  }
}

/* --- 空状态优化 --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 40rpx;
  }
  
  .empty-action {
    padding: 16rpx 48rpx;
    background-color: #2979ff;
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
    box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.3);
  }
}
</style>