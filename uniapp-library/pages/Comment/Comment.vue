<template>
  <view class="comment-container" v-if="commentsData">
    
    <view class="header-section">
      <view class="title">
        评论 <text class="count">({{ totalCount }})</text>
      </view>
      <view class="sort-control" @click="toggleSort">
        <text :class="['sort-text', isNewestSort ? 'active' : '']">最新</text>
        <text class="sort-icon">{{ isNewestSort ? '↓' : '↑' }}</text>
      </view>
    </view>

    <scroll-view scroll-y class="comment-list">
      <view class="comment-item" v-for="item in sortedComments" :key="item.commentId">
        
        <image class="avatar" :src="getUserAvatar(item.userId)" mode="aspectFill"></image>
        <view class="content-body">
          <view class="user-line">
            <text class="nickname">{{ getUserName(item.userId) }}</text>
            <view class="op-right">
              <text 
                class="del-btn" 
                v-if="item.userId === currentUser.userId"
                @click="handleDelete(item.commentId)"
              >删除</text>
            </view>
          </view>
          
          <text class="text-content">{{ item.content }}</text>
          
          <view class="info-bar">
            <text class="time">{{ item.createdAt }}</text>
            <text class="reply-btn" @click="handleReply(item)">回复</text>
          </view>

          <view class="sub-comments" v-if="item.children && item.children.length > 0">
            <view 
              class="sub-item" 
              v-for="subItem in item.children" 
              :key="subItem.commentId"
            >
              <view class="sub-line">
                <text class="sub-user">{{ getUserName(subItem.userId) }}</text>
                
                <block v-if="subItem.targetUserId">
                  <text class="reply-indicator">回复</text>
                  <text class="sub-user">{{ getUserName(subItem.targetUserId) }}</text>
                </block>
                
                <text class="sub-content">：{{ subItem.content }}</text>
              </view>
              
              <view class="sub-footer">
                <text class="time">{{ subItem.createdAt }}</text>
                <view class="sub-actions">
                    <text class="reply-btn-small" @click="handleReply(subItem, item.commentId)">回复</text>
                    <text 
                      class="del-btn-small" 
                      v-if="subItem.userId === currentUser.userId"
                      @click="handleDelete(subItem.commentId, item.commentId)"
                    >删除</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view v-if="sortedComments.length === 0" class="empty-state">
        <text>暂无评论</text>
      </view>
    </scroll-view>

    <view class="bottom-input-area">
      <input 
        class="input-box" 
        type="text" 
        v-model="newCommentContent" 
        :placeholder="inputPlaceholder" 
        confirm-type="send"
        :focus="inputFocus"
        @confirm="submitComment"
        @blur="onInputBlur"
      />
      <button 
        class="send-btn" 
        :disabled="!newCommentContent.trim()" 
        @click="submitComment"
      >发送</button>
    </view>

  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useCommentsStore } from "@/stores/comments"
import { onLoad } from '@dcloudio/uni-app';

// --- 1. 用户配置 ---
const currentUser = { userId: 1, name: '我' }; 

// --- 2. 数据源 ---
const commentsData = ref([]);
const commentsStore = useCommentsStore();

let bookId = null;

onLoad((query) => {
  bookId = parseInt(query.bookId);
});

onMounted(async () => {
  if (bookId) {
    await commentsStore.fetchComments(bookId);
    commentsData.value = commentsStore.comments;
  }
});

// --- 3. 状态管理 ---
const newCommentContent = ref('');
const isNewestSort = ref(false); 
const inputFocus = ref(false); // 控制键盘拉起

// 新增：记录当前正在回复的对象
// 结构: { parentId: Number (一级评论ID), targetUser: String (显示名), targetUserId: Number (被回复人ID) }
const replyingTo = ref(null);

// --- 4. 计算属性 ---

// 动态显示输入框 placeholder
const inputPlaceholder = computed(() => {
  if (replyingTo.value) {
    return `回复 @${replyingTo.value.targetUser}`;
  }
  return "说点什么...";
});

const sortedComments = computed(() => {
  let list = [...commentsData.value];
  const parseDate = (str) => (!str ? 0 : new Date(str.replace(/-/g, '/')).getTime());
  
  list.sort((a, b) => {
    const timeA = parseDate(a.createdAt);
    const timeB = parseDate(b.createdAt);
    return isNewestSort.value ? timeB - timeA : timeA - timeB;
  });
  return list;
});

const totalCount = computed(() => {
  let count = commentsData.value.length;
  commentsData.value.forEach(item => {
    if (item.children) count += item.children.length;
  });
  return count;
});

// --- 5. 核心逻辑方法 ---

const getUserName = (uid) => {
  const map = { 1: '我', 2: '李四' };
  return map[uid] || `用户${uid}`;
};

const getUserAvatar = (uid) => {
  return uid === 1 ? '/static/logo.png' : '/static/default-avatar.png'; 
};

// 切换排序
const toggleSort = () => {
  isNewestSort.value = !isNewestSort.value;
};

// 【核心修改】点击回复按钮
// rootId: 如果回复的是二级/三级评论，需要传入它所属的那个一级评论ID
const handleReply = (item, rootId = null) => {
  // 如果 rootId 存在，说明是在回复子评论；如果不存在，说明是在回复一级评论
  const finalParentId = rootId || item.commentId;
  
  replyingTo.value = {
    parentId: finalParentId,      // 无论回复谁，数据都要加到这个 parentId 的 children 下
    targetUserId: item.userId,    // 被回复的人
    targetUser: getUserName(item.userId) // 用于显示 placeholder
  };
  
  inputFocus.value = false;
  // 简单的延时确保 focus 能触发 (uniapp常见hack)
  setTimeout(() => {
    inputFocus.value = true;
  }, 100);
};

// 输入框失去焦点时（可选：是否要清除回复状态？通常建议保留直到发送或手动取消，这里简化处理不自动清除）
const onInputBlur = () => {
  inputFocus.value = false;
};

// 【核心修改】提交评论
const submitComment = () => {
  if (!newCommentContent.value.trim()) return;
  
	// 模拟时间
  // const nowStr = "2025-01-01 12:35"; 
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const nowStr = `${year}-${month}-${day} ${hours}:${minutes}`;

  // 判断是 新发布 还是 回复
  if (replyingTo.value) {
    // === 回复逻辑 ===
    // 1. 找到该评论所属的一级父评论
    const parentComment = commentsData.value.find(c => c.commentId === replyingTo.value.parentId);
    
    if (parentComment) {
      const newChild = {
        commentId: Date.now(),
        content: newCommentContent.value,
        createdAt: nowStr,
        userId: currentUser.userId,
        parentId: parentComment.commentId, // 父ID永远指向一级评论
        targetUserId: replyingTo.value.targetUserId, // 指向被回复的人
        children: null
      };
      
      // 2. 添加到父评论的 children 中
      if (!parentComment.children) {
        parentComment.children = [];
      }
      parentComment.children.push(newChild);
    }
  } else {
    // === 普通一级评论逻辑 ===
    const newRoot = {
      commentId: Date.now(),
      content: newCommentContent.value,
      createdAt: nowStr,
      userId: currentUser.userId,
      parentId: null,
      targetUserId: null,
      children: []
    };
    
    // 根据排序插入
    if (isNewestSort.value) {
      commentsData.value.unshift(newRoot);
    } else {
      commentsData.value.push(newRoot);
    }
  }
  
  // 重置状态
  newCommentContent.value = '';
  replyingTo.value = null; // 发送完重置回复对象，变回普通输入模式
  uni.showToast({ title: '发送成功', icon: 'success' });
};

// 删除逻辑 (保持不变)
const handleDelete = (id, parentId = null) => {
  uni.showModal({
    title: '提示',
    content: '确定删除？',
    success: (res) => {
      if (res.confirm) {
        if (parentId) {
          const parent = commentsData.value.find(p => p.commentId === parentId);
          if (parent && parent.children) {
            parent.children = parent.children.filter(c => c.commentId !== id);
          }
        } else {
          commentsData.value = commentsData.value.filter(c => c.commentId !== id);
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped>
/* 样式保持原样，只微调了子评论的操作栏样式以适应回复按钮 */
.comment-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  background-color: #fff;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 4vw;
  border-bottom: 1rpx solid #f0f0f0;
  background-color: #fff;
  
  .title {
    font-size: 32rpx;
    font-weight: 600;
    .count { color: #999; font-weight: normal; font-size: 28rpx; margin-left: 8rpx; }
  }
  
  .sort-control {
    display: flex;
    align-items: center;
    padding: 10rpx;
    .sort-text { font-size: 28rpx; color: #999; &.active { color: #333; font-weight: bold; } }
    .sort-icon { font-size: 24rpx; color: #ccc; margin-left: 6rpx; }
  }
}

.comment-list {
  flex: 1; 
  overflow-y: scroll;
  padding-bottom: 20rpx;

  .comment-item {
    display: flex;
    padding: 30rpx 4vw;
    border-bottom: 1rpx solid #f9f9f9;
    
    .avatar { width: 72rpx; height: 72rpx; border-radius: 50%; margin-right: 24rpx; background-color: #eee; flex-shrink: 0; }
    
    .content-body {
      flex: 1;
      
      .user-line {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 8rpx;
        .nickname { font-size: 28rpx; color: #666; font-weight: 600; }
        .op-right {
             .del-btn { font-size: 24rpx; color: #ff4d4f; }
        }
      }
      
      .text-content { font-size: 30rpx; color: #333; line-height: 1.6; margin-bottom: 16rpx; display: block; }
      
      .info-bar {
        display: flex; align-items: center; margin-bottom: 20rpx;
        .time { font-size: 24rpx; color: #ccc; margin-right: 30rpx; }
        .reply-btn { font-size: 24rpx; color: #555; font-weight: 500; }
      }
      
      .sub-comments {
        background-color: #f7f8fa; border-radius: 8rpx; padding: 20rpx;
        
        .sub-item {
          margin-bottom: 16rpx;
          &:last-child { margin-bottom: 0; }
          
          .sub-line {
            font-size: 28rpx; line-height: 1.5;
            .sub-user { color: #409eff; font-weight: 500; }
            .reply-indicator { color: #999; font-size: 24rpx; margin: 0 6rpx; }
            .sub-content { color: #555; }
          }
          
          .sub-footer {
            display: flex; justify-content: space-between; margin-top: 6rpx;
            .time { font-size: 22rpx; color: #ccc; }
            .sub-actions {
                display: flex; gap: 20rpx;
                .reply-btn-small { font-size: 22rpx; color: #555; }
                .del-btn-small { font-size: 22rpx; color: #ff4d4f; }
            }
          }
        }
      }
    }
  }
}

.bottom-input-area {
  padding: 20rpx 4vw;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  display: flex;
  align-items: center;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  
  .input-box {
    flex: 1; height: 72rpx; background-color: #f2f3f5; border-radius: 36rpx; padding: 0 30rpx; font-size: 28rpx; margin-right: 20rpx;
  }
  
  .send-btn {
    height: 72rpx; line-height: 72rpx; padding: 0 32rpx; background-color: #2979ff; color: #fff; font-size: 28rpx; border-radius: 36rpx;
    &[disabled] { background-color: #a0cfff; }
    &::after { border: none; }
  }
}

.empty-state { text-align: center; color: #ccc; padding-top: 100rpx; font-size: 28rpx; }
</style>