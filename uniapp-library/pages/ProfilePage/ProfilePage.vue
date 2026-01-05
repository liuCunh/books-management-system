<template>
  <view class="container">
    <view class="user-header section-gap">
      <view class="avatar-box">
        <image class="avatar" src="/static/logo.png" mode="aspectFill" @click="handleNavigate('editInfo')"></image>
      </view>
      <text class="username" @click="handleNavigate('editInfo')">微信用户</text>
    </view>

    <view class="menu-card">
      <view class="menu-item" hover-class="hover-class" @click="handleNavigate('editInfo')">
        <text class="item-title">修改信息</text>
        <text class="item-arrow">{{ '>' }}</text>
      </view>
      
      <view class="menu-item" hover-class="hover-class" @click="handleNavigate('favorites')">
        <text class="item-title">我的收藏</text>
        <text class="item-arrow">{{ '>' }}</text>
      </view>
      
      <view class="menu-item" hover-class="hover-class" @click="handleNavigate('borrowed')">
        <text class="item-title">我的借阅</text>
        <text class="item-arrow">{{ '>' }}</text>
      </view>
    </view>

    <view class="footer-info">
      <text>图书管理系统 v1.0.0</text>
    </view>
  </view>
</template>

<script setup>
const handleNavigate = (type) => {
	// 这里后续实现具体的跳转逻辑
	if (type === 'editInfo') {
	   uni.navigateTo({ url: '/pages/UserProfile/UserProfile' })
	}
	if (type === 'favorites') {
	   uni.navigateTo({ url: '/pages/BookCollection/BookCollection' })
	}
	if (type === 'borrowed') {
	   uni.navigateTo({ url: '/pages/BookBorrowInfo/BookBorrowInfo' })
	}
  
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20rpx; /* 顶层初始间距 */
}

/* 统一设置容器宽度 92vw 且居中 */
.user-header, .menu-card {
  width: 92vw;
  background-color: #ffffff;
  border-radius: 16rpx;
}

/* 容器间距精准控制为 20rpx */
.section-gap {
  margin-bottom: 20rpx;
}

/* 用户头部样式 */
.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
  
  .avatar-box {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
    overflow: hidden;
    margin-bottom: 20rpx;
    
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  
  .username {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
}

/* 菜单卡片样式 */
.menu-card {
  /* 这里的 margin-bottom 也是 20rpx */
  margin-bottom: 20rpx; 
  overflow: hidden;

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 30rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #f2f2f2;

    &:last-child {
      border-bottom: none;
    }
    
    .item-title {
      font-size: 30rpx;
      color: #333;
    }

    .item-arrow {
      font-size: 28rpx;
      color: #ccc;
      /* 强制不换行，确保符号显示正常 */
      white-space: nowrap; 
    }
  }
}

.hover-class {
  background-color: #f9f9f9 !important;
}

.footer-info {
  margin-top: 20rpx;
  text {
    font-size: 22rpx;
    color: #bbb;
  }
}
</style>