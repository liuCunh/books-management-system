"use strict";
const common_vendor = require("../common/vendor.js");
const useNotificationsStore = common_vendor.defineStore("notifications", {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  }),
  actions: {
    async fetchNotifications(userId, page = 1, pageSize = 10) {
      var _a, _b;
      this.loading = true;
      this.error = null;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://127.0.0.1:8080/notification/list?userId=${userId}&page=${page}&pageSize=${pageSize}`,
            method: "GET",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          this.notifications = res.data.data || [];
        } else {
          throw new Error(((_b = res.data) == null ? void 0 : _b.message) || `请求失败: ${res.statusCode}`);
        }
      } catch (err) {
        this.error = err.message || "网络请求失败";
        common_vendor.index.__f__("error", "at stores/notifications.js:34", "【通知数据获取失败】", err);
        common_vendor.index.showToast({
          title: "通知加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchUnreadCount(userId) {
      var _a, _b;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://127.0.0.1:8080/notification/unreadCount?userId=${userId}`,
            method: "GET",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          this.unreadCount = ((_b = res.data.data[0]) == null ? void 0 : _b.count) || 0;
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at stores/notifications.js:59", "【未读数量获取失败】", err);
      }
    },
    async markAsRead(notificationId, userId) {
      var _a;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://127.0.0.1:8080/notification/read/${notificationId}`,
            method: "PUT",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          const notification = this.notifications.find((n) => n.id === notificationId);
          if (notification) {
            notification.isRead = true;
          }
          await this.fetchUnreadCount(userId);
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at stores/notifications.js:84", "【标记已读失败】", err);
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "none"
        });
      }
    },
    async markAllAsRead(userId) {
      var _a;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://127.0.0.1:8080/notification/readAll?userId=${userId}`,
            method: "PUT",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          this.notifications.forEach((n) => n.isRead = true);
          this.unreadCount = 0;
          common_vendor.index.showToast({
            title: "全部已读",
            icon: "success"
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at stores/notifications.js:113", "【全部标记已读失败】", err);
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "none"
        });
      }
    }
  }
});
exports.useNotificationsStore = useNotificationsStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/notifications.js.map
