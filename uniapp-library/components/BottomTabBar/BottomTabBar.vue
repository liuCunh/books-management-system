<template>
  <!-- 底部菜单 -->
  <view class="bottom-menu" v-if="book">
    <!-- 库存显示（不可点击） -->
    <view class="menu-item stock">
      库存：{{ book.stockQuantity }}
    </view>

    <!-- 收藏按钮 -->
    <view 
      class="menu-item"
      :class="{ 'collected': isCollected }"
      @click="toggleCollect"
    >
      {{ isCollected ? '已收藏' : '点击收藏' }}
    </view>

    <!-- 查看评论 -->
    <view 
      class="menu-item" 
      @click="navigateToComments(book.bookId)"
    >
      查看评论
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义props接收父组件传递的数据
const props = defineProps({
  book: {
    type: Object,
    default: () => ({})
  }
})

// 图书数据
const book = ref(props.book)

// 收藏状态
const isCollected = ref(false);

watch(() => book?.bookId, () => {
  isCollected.value = false;
});

// 收藏提示卡片
const toggleCollect = () => {
  const newState = !isCollected.value;
  isCollected.value = newState;
  
  // 仅在收藏时（从false变为true）弹出提示
  if (newState) {
    uni.showModal({
      title: '收藏成功',
      content: '是否跳转到收藏页面？',
      showCancel: true,
      cancelText: '继续浏览',
      confirmText: '查看收藏',
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/BookCollection/BookCollection'
          });
        }
      },
      fail: (err) => {
        console.error('提示框操作失败', err);
      }
    });
  }
};

const navigateToComments = (bookId) => {
  uni.navigateTo({
    url: '/pages/Comment/Comment?bookId=' + bookId
  });
};
</script>

<style lang="scss" scoped>
/* 底部菜单 */
.bottom-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  position: fixed;
  bottom: 0rpx;
  left: 0;
  right: 0;
  z-index: 999;
  padding-top: 15rpx;
  padding-bottom: 60rpx;
  box-sizing: border-box;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180rpx;
  height: 60rpx;
  border-radius: 10rpx;
  background-color: #f5f5f5;
  color: #333;
  font-size: 28rpx;
  line-height: 60rpx;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 库存项：不可点击，无指针样式 */
.menu-item.stock {
  cursor: default;
  background-color: #f0f0f0;
  color: #666;
  opacity: 0.8;
}

/* 收藏后变黄 */
.menu-item.collected {
  background-color: #fff9c4;
  color: #e65100;
  box-shadow: 0 2rpx 8rpx rgba(230, 81, 0, 0.2);
}

/* 按钮悬停效果 */
.menu-item:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>