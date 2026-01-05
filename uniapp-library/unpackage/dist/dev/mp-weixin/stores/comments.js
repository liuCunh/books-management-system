"use strict";
const common_vendor = require("../common/vendor.js");
const useCommentsStore = common_vendor.defineStore("comments", {
  state: () => ({
    comments: [
      {
        "commentId": 1,
        "content": "这个功能太棒了！",
        "createdAt": "2025-01-01 12:00",
        "parentId": null,
        "userId": 1,
        "targetUserId": null,
        "bookId": 1,
        "children": [
          {
            "commentId": 2,
            "content": "支持开发者继续优化",
            "createdAt": "2025-01-01 12:05",
            "parentId": 1,
            "userId": 2,
            "targetUserId": 1,
            "bookId": 1,
            "children": null
          },
          {
            "commentId": 11,
            "content": "我们要一起加油！",
            "createdAt": "2025-12-30 20:32",
            "parentId": 1,
            "userId": 2,
            "targetUserId": null,
            "bookId": 1,
            "children": null
          }
        ]
      },
      {
        "commentId": 10,
        "content": "建议增加分享功能",
        "createdAt": "2025-01-01 12:45",
        "parentId": null,
        "userId": 2,
        "targetUserId": null,
        "bookId": 1,
        "children": []
      }
    ],
    loading: false,
    error: null
  }),
  actions: {
    async fetchComments(bookId) {
      var _a, _b;
      this.loading = true;
      this.error = null;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://127.0.0.1:8080/api/comments?bookId=${bookId}`,
            method: "GET",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          this.comments = res.data.data || [];
        } else {
          throw new Error(((_b = res.data) == null ? void 0 : _b.message) || `请求失败: ${res.statusCode}`);
        }
      } catch (err) {
        this.error = err.message || "网络请求失败";
        common_vendor.index.__f__("error", "at stores/comments.js:75", "【评论数据获取失败】", err);
        common_vendor.index.showToast({
          title: "评论加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    }
  }
});
exports.useCommentsStore = useCommentsStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/comments.js.map
