"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_notifications = require("../../stores/notifications.js");
const WS_URL = "ws://127.0.0.1:8080/webSocket";
const _sfc_main = {
  __name: "MessageCenter",
  setup(__props) {
    const notificationsStore = stores_notifications.useNotificationsStore();
    const userId = common_vendor.ref(1);
    const unreadCount = common_vendor.computed(() => notificationsStore.unreadCount);
    let socketTask = null;
    const initWebSocket = () => {
      socketTask = common_vendor.index.connectSocket({
        url: WS_URL,
        complete: () => {
        }
      });
      socketTask.onOpen((res) => {
        common_vendor.index.__f__("log", "at pages/MessageCenter/MessageCenter.vue:66", "WebSocket连接已打开！", res);
      });
      socketTask.onClose((res) => {
        common_vendor.index.__f__("log", "at pages/MessageCenter/MessageCenter.vue:70", "WebSocket连接已关闭！", res);
      });
      socketTask.onMessage((res) => {
        common_vendor.index.__f__("log", "at pages/MessageCenter/MessageCenter.vue:74", "收到WebSocket消息：", res.data);
        notificationsStore.fetchNotifications(userId.value);
        notificationsStore.fetchUnreadCount(userId.value);
      });
      socketTask.onError((err) => {
        common_vendor.index.__f__("error", "at pages/MessageCenter/MessageCenter.vue:81", "WebSocket连接发生错误：", err);
      });
    };
    const getIcon = (type) => {
      const icons = {
        "COMMENT_REPLY": "💬",
        "BORROW_SUCCESS": "✅",
        "OVERDUE": "⏰",
        "STOCK_ARRIVAL": "📚"
      };
      return icons[type] || "📢";
    };
    const handleNotificationClick = async (item) => {
      await notificationsStore.markAsRead(item.id, userId.value);
      switch (item.type) {
        case "COMMENT_REPLY":
          common_vendor.index.navigateTo({ url: `/pages/Comment/Comment?bookId=${item.relatedId}` });
          break;
        case "BORROW_SUCCESS":
          common_vendor.index.navigateTo({ url: `/pages/BookBorrowInfo/BookBorrowInfo` });
          break;
        case "OVERDUE":
          common_vendor.index.navigateTo({ url: `/pages/BookBorrowInfo/BookBorrowInfo` });
          break;
        case "STOCK_ARRIVAL":
          common_vendor.index.navigateTo({ url: `/pages/BookCollection/BookCollection` });
          break;
      }
    };
    const handleMarkAllRead = () => {
      notificationsStore.markAllAsRead(userId.value);
    };
    common_vendor.onMounted(() => {
      notificationsStore.fetchNotifications(userId.value);
      notificationsStore.fetchUnreadCount(userId.value);
      initWebSocket();
    });
    common_vendor.onUnload(() => {
      if (socketTask) {
        socketTask.close();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(unreadCount.value),
        b: common_vendor.o(handleMarkAllRead),
        c: common_vendor.f(common_vendor.unref(notificationsStore).notifications, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getIcon(item.type)),
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.createTime),
            d: common_vendor.t(item.content),
            e: !item.isRead
          }, !item.isRead ? {} : {}, {
            f: item.id,
            g: item.isRead ? 1 : "",
            h: common_vendor.o(($event) => handleNotificationClick(item), item.id)
          });
        }),
        d: !common_vendor.unref(notificationsStore).loading && common_vendor.unref(notificationsStore).notifications.length === 0
      }, !common_vendor.unref(notificationsStore).loading && common_vendor.unref(notificationsStore).notifications.length === 0 ? {} : {}, {
        e: common_vendor.unref(notificationsStore).loading
      }, common_vendor.unref(notificationsStore).loading ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ea3613a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/MessageCenter/MessageCenter.js.map
