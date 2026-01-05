<template>
  <view class="borrow-page">
    <!-- 头部 -->
    <view class="header">
      <view class="title-row">
        <text class="title">我的借阅</text>
        <text class="count">({{ filteredBorrows.length }})</text>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-tabs">
      <view 
        v-for="(tab, index) in filterOptions" 
        :key="index"
        class="tab-item"
        :class="{ active: currentFilter === tab.value }"
        @click="setFilter(tab.value)">
        {{ tab.label }}
        <view class="active-line" v-if="currentFilter === tab.value"></view>
      </view>
    </view>

    <!-- 借阅列表 -->
    <view class="books-list">
      <!-- 空状态 -->
      <view v-if="filteredBorrows.length === 0" class="empty-state">
        <text class="empty-icon">📚</text>
        <text class="empty-text">
          {{ currentFilter === 'ALL' ? '暂时没有借阅记录' : '没有该状态的借阅记录' }}
        </text>
        <navigator 
          v-if="currentFilter === 'ALL'" 
          url="/pages/index/index" 
          open-type="switchTab" 
          class="empty-btn">
          去逛逛
        </navigator>
      </view>

      <!-- 借阅卡片 -->
      <view 
        v-else
        v-for="borrow in filteredBorrows" 
        :key="borrow.borrowHistoryId"
        class="borrow-card">
        <Book :book="borrow.bookInfo">
          <template #badge>
            <view class="status-badge" :class="getStatusClass(borrow.status)">
              <text v-if="borrow.status === 'BORROWING'">
                剩余{{ calcDuration(borrow.borrowDate, borrow.dueDate) }}
              </text>
              <text v-else-if="borrow.status === 'OVERDUE'">
                逾期{{ formatOverdue(borrow.overdueDateHour) }}
              </text>
              <text v-else>已归还</text>
            </view>	
          </template>

          <template #right-content>
            <view class="action-container" @click.stop>
              <view 
                v-if="borrow.status === 'BORROWING'"
                class="action-btn"
                @click="handleRenew(borrow.borrowHistoryId)">
                续借
              </view>
            </view>
          </template>
        </Book>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useBorrowStore } from '@/stores/borrows'

const borrowStore = useBorrowStore()
const borrows = ref(Array.isArray(borrowStore.borrows) ? [...borrowStore.borrows] : []) 
const currentFilter = ref('ALL') 

const filterOptions = [
  { label: '全部', value: 'ALL' },
  { label: '借阅中', value: 'BORROWING' },
  { label: '已逾期', value: 'OVERDUE' },
  { label: '已归还', value: 'RETURNED' }
]

const calcDuration = (startStr, endStr) => {
  if (!startStr || !endStr) return '0天0小时';
  const start = new Date(startStr.replace(/-/g, '/')).getTime();
  const end = new Date(endStr.replace(/-/g, '/')).getTime();
  
  const diffMs = end - start;
  if (diffMs <= 0) return '0天0小时';

  const days = Math.floor(diffMs / (24 * 3600 * 1000));
  const leave1 = diffMs % (24 * 3600 * 1000);
  const hours = Math.floor(leave1 / (3600 * 1000));
  
  return `${days}天${hours}时`;
}

const formatOverdue = (hours) => {
  if (!hours || hours <= 0) return '0天0小时';
  const d = Math.floor(hours / 24);
  const h = Math.floor(hours % 24);
  return `${d}天${h}时`;
}

const filteredBorrows = computed(() => {
  if (currentFilter.value === 'ALL') {
    return borrows.value;
  }
  return borrows.value.filter(item => item.status === currentFilter.value);
});

const setFilter = (status) => {
  currentFilter.value = status;
}

const getStatusClass = (status) => {
  const map = {
    'BORROWING': 'status-borrowing',
    'OVERDUE': 'status-overdue',
    'RETURNED': 'status-returned'
  };
  return map[status] || '';
}

const handleRenew = (id) => {
  console.log('点击续借:', id);
  uni.showToast({ title: '续借申请已提交', icon: 'success' });
}

onLoad(async () => {
  try {
    const data = await borrowStore.fetchBorrows(6)
    borrows.value = data
  } catch (err) {
    console.error('fetchBorrows failed:', err)
  }
})
</script>

<style lang="scss" scoped>
/* 页面基础样式 */
.borrow-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f9fbfd 0%, #f5f7fa 100%);
  padding: 30rpx 0 60rpx;
}
.main-content {
  width: 92vw;
  margin: 0 auto;
}

/* Header */
.header-section {
  margin-bottom: 30rpx;
  .title-row {
    display: flex; align-items: baseline; margin-bottom: 20rpx;
    .title { font-size: 36rpx; font-weight: 700; color: #222; }
    .count { font-size: 28rpx; color: #888; margin-left: 12rpx; }
  }
  .divider {
    width: 100%; height: 3rpx; background: linear-gradient(90deg, #2979ff, #70a1ff);
    border-radius: 2rpx;
  }
}

/* Tabs */
.filter-tabs {
  display: flex; justify-content: space-around; background-color: #fff;
  padding: 10rpx 0; border-radius: 16rpx; margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}
.tab-item {
  position: relative; padding: 20rpx 0; font-size: 28rpx; color: #666;
  font-weight: 500; transition: all 0.3s ease;
  cursor: pointer;
  &:hover { color: #2979ff; }
  &.active { color: #2979ff; font-weight: 700; transform: scale(1.08); }
  .active-line {
    position: absolute; bottom: -6rpx; left: 50%; transform: translateX(-50%);
    width: 50rpx; height: 6rpx; background: #2979ff; border-radius: 6rpx;
  }
}

/* 列表卡片 */
.card-wrapper {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* 状态徽章 */
.status-badge {
  padding: 0 20rpx;
  height: 46rpx;
  line-height: 46rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 600;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.08);
  
  &.status-borrowing {
    background: #e6f3ff; color: #1a73e8;
  }
  &.status-overdue {
    background: #ffeaea; color: #d93025;
  }
  &.status-returned {
    background: #f0f0f0; color: #777;
  }
}

/* 按钮样式 */
.action-container {
  display: flex; align-items: center; justify-content: center; height: 100%;
}
.action-btn {
  display: inline-block; font-size: 26rpx; padding: 14rpx 32rpx;
  border-radius: 12rpx; transition: all 0.25s ease;
  
  &.renew-btn {
    background: linear-gradient(135deg, #2979ff, #5393ff);
    color: #fff; font-weight: 600;
    box-shadow: 0 4rpx 12rpx rgba(41,121,255,0.3);
    &:active { transform: scale(0.95); background: #1e64db; }
  }
}

/* 空状态 */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding-top: 120rpx;
  .empty-text { font-size: 30rpx; color: #999; margin-bottom: 50rpx; }
  .empty-action {
    padding: 18rpx 56rpx;
    background: linear-gradient(135deg, #2979ff, #5393ff);
    color: #fff; border-radius: 50rpx; font-size: 30rpx; font-weight: 600;
    box-shadow: 0 6rpx 16rpx rgba(41,121,255,0.25);
    transition: all 0.3s ease;
    &:active { transform: scale(0.95); }
  }
}
</style>