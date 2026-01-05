"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_books = require("../../stores/books.js");
if (!Math) {
  Book();
}
const Book = () => "../../components/Book/Book.js";
const _sfc_main = {
  __name: "BookCollection",
  setup(__props) {
    const bookStore = stores_books.useBookStore();
    const books = common_vendor.ref(Array.isArray(bookStore.books) ? [...bookStore.books] : []);
    const handleBookClick = (bookId) => {
      const id = Number(bookId);
      const exists = books.value.some((b) => Number(b.bookId) === id);
      if (!exists) {
        common_vendor.index.showToast({ title: "未找到该书", icon: "none" });
        return;
      }
      books.value = books.value.filter((b) => Number(b.bookId) !== id);
      common_vendor.index.showToast({ title: "已取消收藏", icon: "success" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(books.value.length),
        b: books.value.length === 0
      }, books.value.length === 0 ? {} : {
        d: common_vendor.f(books.value, (book, k0, i0) => {
          return {
            a: common_vendor.t(book.stockQuantity > 0 ? "可借阅" : "无库存"),
            b: common_vendor.n(book.stockQuantity > 0 ? "is-available" : "is-empty"),
            c: common_vendor.o(($event) => handleBookClick(book.bookId), book.bookId),
            d: "7f7803b7-0-" + i0,
            e: common_vendor.p({
              book
            }),
            f: book.bookId
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f7803b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/BookCollection/BookCollection.js.map
