"use strict";
const common_vendor = require("../common/vendor.js");
const useBorrowStore = common_vendor.defineStore("borrow", {
  state: () => ({
    borrows: [
      {
        "borrowHistoryId": 3,
        "userId": 6,
        "bookId": 3,
        "borrowDate": "2025-01-05 17:05:05",
        "returnDate": null,
        "overdueDateHour": null,
        "status": "BORROWING",
        "reviewDate": null,
        "adminId": 1,
        "comments": null,
        "dueDate": "2025-02-04 00:00:00",
        "bookInfo": {
          "bookId": 3,
          "title": "电诈风云，我被骗到缅北的日子",
          "author": "江湖老六",
          "publishDate": "2024-05-24",
          "stockQuantity": 10,
          "description": "我曾经被骗去缅北，在那见识到了人性最阴暗的一面。我想用我的真实经历，告诉所有人，缅北远比你想象的还要恐怖！多一人看书，少一人受骗！",
          "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/fdd98c957a4583e9e6de4f1d306abf8a_360x480.jpg",
          "popularityScore": 46,
          "wordCount": 181.52,
          "categoryId": 46,
          "categoryName": "都市生活"
        }
      },
      {
        "borrowHistoryId": 2,
        "userId": 6,
        "bookId": 2,
        "borrowDate": "2024-12-31 21:22:50",
        "returnDate": null,
        "overdueDateHour": 48,
        "status": "OVERDUE",
        "reviewDate": "2024-12-31 21:22:58",
        "adminId": 1,
        "comments": null,
        "dueDate": "2024-12-31 21:23:05",
        "bookInfo": {
          "bookId": 2,
          "title": "喜棺开，百鬼散，王妃她从地狱来",
          "author": "一碗佛跳墙",
          "publishDate": "2024-09-26",
          "stockQuantity": 7,
          "description": "喜棺开，百鬼散，地府判官青妩一睁眼，重回人间！\n上辈子历劫早早夭折，父母兄长战死沙场，忠骨被冤，魂魄无踪。她借尸还魂回来，棺盖掀开，嫁的竟是上辈子的青梅竹马。\n萧沉砚发现，自家王妃表面娇花一朵，实则心狠手辣，每每抢在他前面送人投胎。\n青妩判官笔一动，判因果，审善恶，上辈子的仇人，杀！背叛者，杀！\n满京城上下提起厌王府无不色变，直到某一日，她身份曝光，满朝哗然，所有人都知道镇国侯府那位小小姐竟是从地狱爬出来了！\n青妩祸祸完人间，红裙一甩，准备回地府继续当自己的判官。\n却被人锁住腰，大雍最惊才绝艳的厌王殿下将她抵在墙上，红了双眼：“阿妩骗了我许久，现在又准备抛夫弃子吗？”\n青妩：”抛夫我承认，弃子怎么说！咱们还没孩子呢！”\n萧沉砚：“马上就有！”",
          "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/3d149670e1b54c113f5540070cd2f664_360x480.jpg",
          "popularityScore": 12,
          "wordCount": 137.12,
          "categoryId": 12,
          "categoryName": "古代情缘"
        }
      },
      {
        "borrowHistoryId": 1,
        "userId": 6,
        "bookId": 1,
        "borrowDate": "2024-12-26 22:30:14",
        "returnDate": "2025-01-23 17:03:18",
        "overdueDateHour": null,
        "status": "RETURNED",
        "reviewDate": "2024-12-25 21:54:21",
        "adminId": 1,
        "comments": "图书不全",
        "dueDate": "2025-01-24 00:00:00",
        "bookInfo": {
          "bookId": 1,
          "title": "霍先生乖乖宠我",
          "author": "风羽轻轻",
          "publishDate": "2024-04-17",
          "stockQuantity": 5,
          "description": "一场酒醉，她招惹上大人物，\n她有求于他，他贪图她年轻身材好。\n时间久了，她才知道他心里有人，\n当他的白月光归来，他渐渐不再回家，\n温蔓守着空房，度过无数个没有他的夜晚，后来，她等到一张支票和他的一声再见。\n本以为她会哭闹，她却拿着支票利落走人：“霍先生，我们后会无期！”\n……\n再次重逢，她身边有了旁人，\n他红着眼睛说：“温蔓，明明是我先跟你好的。”\n温蔓笑颜淡淡：“霍律师，先说分开的也是你！如果你想跟我约会，可能要排队……”\n次日，她收到千亿存款附加一枚钻戒。\n霍律师单膝下跪：“温小姐，我想插队。”",
          "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/c4a32f274e0cd508cff669fba839ef6b_360x480.jpg",
          "popularityScore": 1.1,
          "wordCount": 255.28,
          "categoryId": 1,
          "categoryName": "总裁豪门"
        }
      }
    ],
    loading: false,
    error: null
  }),
  actions: {
    /**
     * 按 userId 获取借阅历史
     * @param {number|string} userId
     * @returns {Promise<Array>} 返回接口中的 data 数组
     */
    async fetchBorrows(userId) {
      this.loading = true;
      this.error = null;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `http://localhost:8080/api/borrows?userId=${userId}`,
            method: "GET",
            success: (r) => resolve(r),
            fail: (err) => reject(err)
          });
        });
        if (res && res.statusCode === 200) {
          const payload = res.data || {};
          this.borrows = Array.isArray(payload.data) ? payload.data : [];
          return payload.data;
        }
        throw new Error(`请求失败，statusCode=${res && res.statusCode}`);
      } catch (err) {
        common_vendor.index.__f__("error", "at stores/borrows.js:123", "fetchBorrows error:", err);
        this.error = err && err.message ? err.message : err;
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});
exports.useBorrowStore = useBorrowStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/borrows.js.map
