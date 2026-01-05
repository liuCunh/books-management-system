// stores/notifications.js
import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  }),

  actions: {
    async fetchNotifications(userId, page = 1, pageSize = 10) {
      this.loading = true;
      this.error = null;

      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: `http://127.0.0.1:8080/notification/list?userId=${userId}&page=${page}&pageSize=${pageSize}`,
            method: 'GET',
            success: resolve,
            fail: reject
          });
        });

        if (res.statusCode === 200 && res.data?.statusCode === 200) {
          this.notifications = res.data.data || [];
        } else {
          throw new Error(res.data?.message || `请求失败: ${res.statusCode}`);
        }
      } catch (err) {
        this.error = err.message || '网络请求失败';
        console.error('【通知数据获取失败】', err);
        uni.showToast({
          title: '通知加载失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
      }
    },

    async fetchUnreadCount(userId) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: `http://127.0.0.1:8080/notification/unreadCount?userId=${userId}`,
            method: 'GET',
            success: resolve,
            fail: reject
          });
        });

        if (res.statusCode === 200 && res.data?.statusCode === 200) {
          this.unreadCount = res.data.data[0]?.count || 0;
        }
      } catch (err) {
        console.error('【未读数量获取失败】', err);
      }
    },

    async markAsRead(notificationId, userId) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: `http://127.0.0.1:8080/notification/read/${notificationId}`,
            method: 'PUT',
            success: resolve,
            fail: reject
          });
        });

        if (res.statusCode === 200 && res.data?.statusCode === 200) {
          // 更新本地状态
          const notification = this.notifications.find(n => n.id === notificationId);
          if (notification) {
            notification.isRead = true;
          }
          // 刷新未读数量
          await this.fetchUnreadCount(userId);
        }
      } catch (err) {
        console.error('【标记已读失败】', err);
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    },

    async markAllAsRead(userId) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: `http://127.0.0.1:8080/notification/readAll?userId=${userId}`,
            method: 'PUT',
            success: resolve,
            fail: reject
          });
        });

        if (res.statusCode === 200 && res.data?.statusCode === 200) {
          // 更新本地所有通知为已读
          this.notifications.forEach(n => n.isRead = true);
          this.unreadCount = 0;
          uni.showToast({
            title: '全部已读',
            icon: 'success'
          });
        }
      } catch (err) {
        console.error('【全部标记已读失败】', err);
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    }
  }
});

export default useNotificationsStore;