"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "BottomTabBar",
  props: {
    book: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const book = common_vendor.ref(props.book);
    const isCollected = common_vendor.ref(false);
    common_vendor.watch(() => book == null ? void 0 : book.bookId, () => {
      isCollected.value = false;
    });
    const toggleCollect = () => {
      const newState = !isCollected.value;
      isCollected.value = newState;
      if (newState) {
        common_vendor.index.showModal({
          title: "收藏成功",
          content: "是否跳转到收藏页面？",
          showCancel: true,
          cancelText: "继续浏览",
          confirmText: "查看收藏",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pages/BookCollection/BookCollection"
              });
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/BottomTabBar/BottomTabBar.vue:70", "提示框操作失败", err);
          }
        });
      }
    };
    const navigateToComments = (bookId) => {
      common_vendor.index.navigateTo({
        url: "/pages/Comment/Comment?bookId=" + bookId
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: book.value
      }, book.value ? {
        b: common_vendor.t(book.value.stockQuantity),
        c: common_vendor.t(isCollected.value ? "已收藏" : "点击收藏"),
        d: isCollected.value ? 1 : "",
        e: common_vendor.o(toggleCollect),
        f: common_vendor.o(($event) => navigateToComments(book.value.bookId))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98733e2a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/BottomTabBar/BottomTabBar.js.map
