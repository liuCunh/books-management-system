<template>
  <view class="notification-page">
    <!-- 头部 -->
    <view class="header">
      <text class="title">未读({{ unreadCount }})</text>
      <text class="mark-all" @click="handleMarkAllRead">全部已读</text>
    </view>

    <!-- 通知列表 -->
    <view class="notification-list">
      <view 
        v-for="item in notificationsStore.notifications" 
        :key="item.id"
        class="notification-item"
        :class="{ 'is-read': item.isRead }"
        @click="handleNotificationClick(item)">
        
        <view class="item-header">
          <view class="item-title">
            <text class="icon">{{ getIcon(item.type) }}</text>
            <text class="title-text">{{ item.title }}</text>
          </view>
          <text class="time">{{ item.createTime }}</text>
        </view>
        
        <view class="item-content">{{ item.content }}</view>
        
        <view v-if="!item.isRead" class="unread-dot"></view>
      </view>

      <!-- 空状态 -->
      <view v-if="!notificationsStore.loading && notificationsStore.notifications.length === 0" class="empty">
        <text class="empty-icon">📭</text>
        <text class="empty-text">暂无通知</text>
      </view>

      <!-- 加载中 -->
      <view v-if="notificationsStore.loading" class="loading">
        <text>加载中...</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()
const userId = ref(1) // 从登录信息获取

const unreadCount = computed(() => notificationsStore.unreadCount)

// WebSocket连接
const WS_URL = 'ws://127.0.0.1:8080/webSocket'
let socketTask = null

const initWebSocket = () => {
  socketTask = uni.connectSocket({ 
    url: WS_URL,
    complete: () => {},
  })
  
  socketTask.onOpen((res) => {
    console.log('WebSocket连接已打开！', res)
  })
  
  socketTask.onClose((res) => {
    console.log('WebSocket连接已关闭！', res)
  })
  
  socketTask.onMessage((res) => {
    console.log('收到WebSocket消息：', res.data)
    // 收到新通知时刷新列表
    notificationsStore.fetchNotifications(userId.value)
    notificationsStore.fetchUnreadCount(userId.value)
  })
  
  socketTask.onError((err) => {
    console.error('WebSocket连接发生错误：', err)
  })
}

// 获取图标
const getIcon = (type) => {
  const icons = {
    'COMMENT_REPLY': '💬',
    'BORROW_SUCCESS': '✅',
    'OVERDUE': '⏰',
    'STOCK_ARRIVAL': '📚'
  }
  return icons[type] || '📢'
}

// 点击通知
const handleNotificationClick = async (item) => {
  await notificationsStore.markAsRead(item.id, userId.value)
  
  switch(item.type) {
    case 'COMMENT_REPLY': // 跳评论页面
      uni.navigateTo({ url: `/pages/Comment/Comment?bookId=${item.relatedId}` })
      break
    case 'BORROW_SUCCESS': // 跳借阅页面
			uni.navigateTo({ url: `/pages/BookBorrowInfo/BookBorrowInfo` })
			break
    case 'OVERDUE': // 跳借阅页面
      uni.navigateTo({ url: `/pages/BookBorrowInfo/BookBorrowInfo` })
      break
    case 'STOCK_ARRIVAL': //跳收藏页面
      uni.navigateTo({ url: `/pages/BookCollection/BookCollection` })
      break
  }
}

// 全部已读
const handleMarkAllRead = () => {
  notificationsStore.markAllAsRead(userId.value)
}

onMounted(() => {
  notificationsStore.fetchNotifications(userId.value)
  notificationsStore.fetchUnreadCount(userId.value)
  initWebSocket()
})

onUnload(() => {
  if (socketTask) {
    socketTask.close()
  }
})
</script>

<style lang="scss" scoped>
.notification-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header .title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.mark-all {
  font-size: 28rpx;
  color: #007aff;
  padding: 8rpx 16rpx;
}

.notification-list {
  padding: 20rpx 0;
}

.notification-item {
  position: relative;
  background: #fff;
  margin: 0 24rpx 20rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
  transition: all 0.3s;
}

.notification-item.is-read {
  opacity: 0.6;
}

.notification-item:active {
  transform: scale(0.98);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.item-title {
  display: flex;
  align-items: center;
  flex: 1;
}

.icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 24rpx;
  color: #999;
  white-space: nowrap;
  margin-left: 16rpx;
}

.item-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.unread-dot {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  width: 16rpx;
  height: 16rpx;
  background: #ff3b30;
  border-radius: 50%;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.loading {
  text-align: center;
  padding: 40rpx;
  color: #999;
  font-size: 28rpx;
}
</style>