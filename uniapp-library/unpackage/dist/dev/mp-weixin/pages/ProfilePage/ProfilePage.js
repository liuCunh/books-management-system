"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "ProfilePage",
  setup(__props) {
    const handleNavigate = (type) => {
      if (type === "editInfo") {
        common_vendor.index.navigateTo({ url: "/pages/UserProfile/UserProfile" });
      }
      if (type === "favorites") {
        common_vendor.index.navigateTo({ url: "/pages/BookCollection/BookCollection" });
      }
      if (type === "borrowed") {
        common_vendor.index.navigateTo({ url: "/pages/BookBorrowInfo/BookBorrowInfo" });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => handleNavigate("editInfo")),
        c: common_vendor.o(($event) => handleNavigate("editInfo")),
        d: common_vendor.t(">"),
        e: common_vendor.o(($event) => handleNavigate("editInfo")),
        f: common_vendor.t(">"),
        g: common_vendor.o(($event) => handleNavigate("favorites")),
        h: common_vendor.t(">"),
        i: common_vendor.o(($event) => handleNavigate("borrowed"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7b4c7c70"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ProfilePage/ProfilePage.js.map
