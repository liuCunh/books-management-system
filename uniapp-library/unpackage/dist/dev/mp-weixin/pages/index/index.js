"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_books = require("../../stores/books.js");
if (!Math) {
  Book();
}
const Book = () => "../../components/Book/Book.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bookStore = stores_books.useBookStore();
    const books = common_vendor.ref(bookStore.books);
    const bookCategories = common_vendor.reactive([
      {
        id: "null",
        name: "图书类别"
      },
      {
        id: "fiction",
        name: "小说"
      },
      {
        id: "science",
        name: "科技"
      },
      {
        id: "history",
        name: "历史"
      },
      {
        id: "philosophy",
        name: "哲学"
      },
      {
        id: "economy",
        name: "经济"
      },
      {
        id: "literature",
        name: "文学"
      },
      {
        id: "art",
        name: "艺术"
      },
      {
        id: "education",
        name: "教育"
      },
      {
        id: "medical",
        name: "医学"
      },
      {
        id: "military",
        name: "军事"
      }
    ]);
    const currentCategoryIndex = common_vendor.ref(0);
    const changeCurrentCategoriesIndex = (e) => {
      currentCategoryIndex.value = e.detail.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_vendor.t(bookCategories[currentCategoryIndex.value].name),
        f: common_assets._imports_4,
        g: currentCategoryIndex.value,
        h: bookCategories,
        i: common_vendor.o(changeCurrentCategoriesIndex),
        j: common_vendor.f(books.value, (book, k0, i0) => {
          return {
            a: book.bookId,
            b: "1cf27b2a-0-" + i0,
            c: common_vendor.p({
              book
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
