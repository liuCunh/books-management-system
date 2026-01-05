<template>
  <view class="borrow-page">
    <view class="main-content">
      
      <view class="header-section">
        <view class="title-row">
          <text class="title">我的借阅</text>
          <text class="count">({{ filteredBorrows.length }})</text>
        </view>
        <view class="divider"></view>
      </view>

      <view class="filter-tabs">
        <view 
          v-for="(tab, index) in filterOptions" 
          :key="index"
          class="tab-item"
          :class="{ active: currentFilter === tab.value }"
          @click="setFilter(tab.value)"
        >
          {{ tab.label }}
          <view class="active-line" v-if="currentFilter === tab.value"></view>
        </view>
      </view>

      <view class="books-list">
        <view v-if="filteredBorrows.length === 0" class="empty-state">
          <view class="empty-text">
            {{ currentFilter === 'ALL' ? '暂时没有借阅记录' : '没有该状态的借阅记录' }}
          </view>
          <navigator url="/pages/index/index" open-type="switchTab" class="empty-action" v-if="currentFilter === 'ALL'">去逛逛</navigator>
        </view>

        <template v-else>
            <view class="card-wrapper" v-for="borrow in filteredBorrows" :key="borrow.borrowHistoryId">
              <Book :book="borrow.bookInfo">
                
                <template #badge>
                  <view class="status-badge" :class="getStatusClass(borrow.status)">
                    
                    <text v-if="borrow.status === 'BORROWING'">
                      剩余{{ calcDuration(borrow.borrowDate, borrow.dueDate) }}
                    </text>
                    
                    <text v-else-if="borrow.status === 'OVERDUE'">
                      逾期{{ formatOverdue(borrow.overdueDateHour) }}
                    </text>
                    
                    <text v-else>
                      已归还
                    </text>

                  </view>	
                </template>
  
                <template #right-content>
                  <view class="action-container" @click.stop>
                    
                    <view 
                      class="action-btn renew-btn" 
                      v-if="borrow.status === 'BORROWING'"
                      @click="handleRenew(borrow.borrowHistoryId)"
                    >
                      点击续借
                    </view>

                    <view v-else-if="borrow.status === 'OVERDUE'"></view>

                    <view v-else-if="borrow.status === 'RETURNED'"></view>

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

// --- 工具函数：计算日期差 (startStr, endStr) ---
// 返回格式：x天x小时
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

// --- 工具函数：格式化逾期小时数 ---
// 输入: hours (数字) -> 返回: x天x小时
const formatOverdue = (hours) => {
  if (!hours || hours <= 0) return '0天0小时'; // 防止 null 或 0
  const d = Math.floor(hours / 24);
  const h = Math.floor(hours % 24); // 取模或者取整
  return `${d}天${h}时`;
}

// 筛选逻辑
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
    'BORROWING': 'status-borrowing', // 蓝色
    'OVERDUE': 'status-overdue',     // 红色
    'RETURNED': 'status-returned'    // 灰色
  };
  return map[status] || '';
}

// 点击事件处理
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
  background-color: #f5f7fa;
  padding-top: 20rpx;
  padding-bottom: 40rpx;
}
.main-content {
  width: 92vw;
  margin: 0 auto;
}

/* Header */
.header-section {
  margin-bottom: 20rpx;
  padding: 10rpx 0;
  .title-row {
    display: flex; align-items: baseline; margin-bottom: 16rpx;
    .title { font-size: 34rpx; font-weight: bold; color: #333; }
    .count { font-size: 28rpx; color: #999; margin-left: 10rpx; }
  }
  .divider {
    width: 100%; height: 2rpx; background-color: #e0e0e0; position: relative;
    // &::after { content: ''; position: absolute; left: 0; top: 0; width: 60rpx; height: 4rpx; background-color: #2979ff; }
  }
}

/* Tabs */
.filter-tabs {
  display: flex; justify-content: space-between; background-color: #fff; padding: 0 20rpx;
  border-radius: 12rpx; margin-bottom: 24rpx; box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);
}
.tab-item {
  position: relative; padding: 24rpx 10rpx; font-size: 28rpx; color: #666; font-weight: 500; transition: all 0.3s;
  &.active { color: #2979ff; font-weight: bold; transform: scale(1.05); }
  .active-line { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40rpx; height: 6rpx; background-color: #2979ff; border-radius: 6rpx 6rpx 0 0; }
}

/* 列表卡片 */
.card-wrapper {
  line-height: 24px; background-color: #fff;
}

/* --- Badge 样式升级 --- */
.status-badge {
  padding: 0rpx 16rpx;
  height: 44rpx; /* 稍微增加高度以容纳文字 */
  line-height: 44rpx;
  border-radius: 5rpx 0 10rpx 0;
  font-size: 22rpx;
  font-weight: 500;
  letter-spacing: 0.5rpx;
  
  &.status-borrowing {
    background-color: #e6f7ff; color: #1890ff; /* 借阅中蓝 */
  }
  &.status-overdue {
    background: linear-gradient(135deg, #fff2f0 0%, #ffccc7 100%); color: #d32f2f; /* 逾期红 */
  }
  &.status-returned {
    background-color: #f5f5f5; color: #999; /* 归还灰 */
  }
}

/* --- Right Content 按钮样式 --- */
.action-container {
  display: flex; align-items: center; justify-content: center; height: 100%;
}
.action-btn {
  display: inline-block; font-size: 24rpx; padding: 12rpx 28rpx; border-radius: 10rpx; transition: all 0.2s;
  
  /* 续借：实心蓝按钮，突出操作 */
  &.renew-btn {
    background-color: #2979ff; color: #fff;
    &:active { background-color: #1e64db; }
  }
}

/* Empty State */
.empty-state {
  display: flex; flex-direction: column; align-items: center; padding-top: 100rpx;
  .empty-text { font-size: 28rpx; color: #999; margin-bottom: 40rpx; }
  .empty-action { padding: 16rpx 48rpx; background-color: #2979ff; color: #fff; border-radius: 40rpx; font-size: 28rpx; }
}
</style>