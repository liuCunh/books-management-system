"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Book",
  props: {
    book: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const handleBookClick = (bookId) => {
      common_vendor.index.navigateTo({
        url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: props.book.coverImage,
        b: common_vendor.o(($event) => handleBookClick(props.book.bookId)),
        c: common_vendor.t(props.book.title),
        d: common_vendor.t(props.book.author),
        e: common_vendor.t(props.book.publishDate),
        f: common_vendor.t(props.book.description),
        g: common_vendor.o(($event) => handleBookClick(props.book.bookId))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7079c1d2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Book/Book.js.map
