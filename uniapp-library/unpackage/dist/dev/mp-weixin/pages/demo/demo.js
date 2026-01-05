"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_borrows = require("../../stores/borrows.js");
if (!Array) {
  const _easycom_Book2 = common_vendor.resolveComponent("Book");
  _easycom_Book2();
}
const _easycom_Book = () => "../../components/Book/Book.js";
if (!Math) {
  _easycom_Book();
}
const _sfc_main = {
  __name: "demo",
  setup(__props) {
    const borrowStore = stores_borrows.useBorrowStore();
    const borrows = common_vendor.ref(Array.isArray(borrowStore.borrows) ? [...borrowStore.borrows] : []);
    const currentFilter = common_vendor.ref("ALL");
    const filterOptions = [
      { label: "全部", value: "ALL" },
      { label: "借阅中", value: "BORROWING" },
      { label: "已逾期", value: "OVERDUE" },
      { label: "已归还", value: "RETURNED" }
    ];
    const calcDuration = (startStr, endStr) => {
      if (!startStr || !endStr)
        return "0天0小时";
      const start = new Date(startStr.replace(/-/g, "/")).getTime();
      const end = new Date(endStr.replace(/-/g, "/")).getTime();
      const diffMs = end - start;
      if (diffMs <= 0)
        return "0天0小时";
      const days = Math.floor(diffMs / (24 * 3600 * 1e3));
      const leave1 = diffMs % (24 * 3600 * 1e3);
      const hours = Math.floor(leave1 / (3600 * 1e3));
      return `${days}天${hours}时`;
    };
    const formatOverdue = (hours) => {
      if (!hours || hours <= 0)
        return "0天0小时";
      const d = Math.floor(hours / 24);
      const h = Math.floor(hours % 24);
      return `${d}天${h}时`;
    };
    const filteredBorrows = common_vendor.computed(() => {
      if (currentFilter.value === "ALL") {
        return borrows.value;
      }
      return borrows.value.filter((item) => item.status === currentFilter.value);
    });
    const setFilter = (status) => {
      currentFilter.value = status;
    };
    const getStatusClass = (status) => {
      const map = {
        "BORROWING": "status-borrowing",
        "OVERDUE": "status-overdue",
        "RETURNED": "status-returned"
      };
      return map[status] || "";
    };
    const handleRenew = (id) => {
      common_vendor.index.__f__("log", "at pages/demo/demo.vue:135", "点击续借:", id);
      common_vendor.index.showToast({ title: "续借申请已提交", icon: "success" });
    };
    common_vendor.onLoad(async () => {
      try {
        const data = await borrowStore.fetchBorrows(6);
        borrows.value = data;
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/demo/demo.vue:144", "fetchBorrows failed:", err);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(filteredBorrows.value.length),
        b: common_vendor.f(filterOptions, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.label),
            b: currentFilter.value === tab.value
          }, currentFilter.value === tab.value ? {} : {}, {
            c: index,
            d: currentFilter.value === tab.value ? 1 : "",
            e: common_vendor.o(($event) => setFilter(tab.value), index)
          });
        }),
        c: filteredBorrows.value.length === 0
      }, filteredBorrows.value.length === 0 ? common_vendor.e({
        d: common_vendor.t(currentFilter.value === "ALL" ? "暂时没有借阅记录" : "没有该状态的借阅记录"),
        e: currentFilter.value === "ALL"
      }, currentFilter.value === "ALL" ? {} : {}) : {
        f: common_vendor.f(filteredBorrows.value, (borrow, k0, i0) => {
          return common_vendor.e({
            a: borrow.status === "BORROWING"
          }, borrow.status === "BORROWING" ? {
            b: common_vendor.t(calcDuration(borrow.borrowDate, borrow.dueDate))
          } : borrow.status === "OVERDUE" ? {
            d: common_vendor.t(formatOverdue(borrow.overdueDateHour))
          } : {}, {
            c: borrow.status === "OVERDUE",
            e: common_vendor.n(getStatusClass(borrow.status)),
            f: borrow.status === "BORROWING"
          }, borrow.status === "BORROWING" ? {
            g: common_vendor.o(($event) => handleRenew(borrow.borrowHistoryId), borrow.borrowHistoryId)
          } : {}, {
            h: common_vendor.o(() => {
            }, borrow.borrowHistoryId),
            i: "d10efb47-0-" + i0,
            j: common_vendor.p({
              book: borrow.bookInfo
            }),
            k: borrow.borrowHistoryId
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d10efb47"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/demo/demo.js.map
