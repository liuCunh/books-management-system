"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_books = require("../../stores/books.js");
if (!Array) {
  const _easycom_BottomTabBar2 = common_vendor.resolveComponent("BottomTabBar");
  _easycom_BottomTabBar2();
}
const _easycom_BottomTabBar = () => "../../components/BottomTabBar/BottomTabBar.js";
if (!Math) {
  _easycom_BottomTabBar();
}
const _sfc_main = {
  __name: "bookDetail",
  setup(__props) {
    const bookStore = stores_books.useBookStore();
    const book = common_vendor.ref(null);
    common_vendor.onLoad((query) => {
      const bookId = parseInt(query.bookId);
      const found = bookStore.findBookById(bookId);
      if (found) {
        book.value = found;
      } else {
        common_vendor.index.showToast({ title: "图书未找到", icon: "none" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: book.value
      }, book.value ? {
        b: book.value.coverImage,
        c: common_vendor.t(book.value.title),
        d: common_vendor.t(book.value.author),
        e: common_vendor.t(book.value.bookId),
        f: common_vendor.t(book.value.publishDate),
        g: common_vendor.t(book.value.categoryName),
        h: common_vendor.t(book.value.wordCount),
        i: common_vendor.t(book.value.stockQuantity),
        j: common_vendor.t(book.value.description),
        k: common_vendor.o(goBack),
        l: common_vendor.p({
          book: book.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a353f0b6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/bookDetail/bookDetail.js.map
