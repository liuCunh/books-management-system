"use strict";
const common_vendor = require("../common/vendor.js");
const useBookStore = common_vendor.defineStore("book", {
  state: () => ({
    books: [
      {
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
      },
      {
        "bookId": 2,
        "title": "喜棺开，百鬼散，王妃她从地狱来",
        "author": "一碗佛跳墙",
        "publishDate": "2024-09-26",
        "stockQuantity": 0,
        "description": "喜棺开，百鬼散，地府判官青妩一睁眼，重回人间！\n上辈子历劫早早夭折，父母兄长战死沙场，忠骨被冤，魂魄无踪。她借尸还魂回来，棺盖掀开，嫁的竟是上辈子的青梅竹马。\n萧沉砚发现，自家王妃表面娇花一朵，实则心狠手辣，每每抢在他前面送人投胎。\n青妩判官笔一动，判因果，审善恶，上辈子的仇人，杀！背叛者，杀！\n满京城上下提起厌王府无不色变，直到某一日，她身份曝光，满朝哗然，所有人都知道镇国侯府那位小小姐竟是从地狱爬出来了！\n青妩祸祸完人间，红裙一甩，准备回地府继续当自己的判官。\n却被人锁住腰，大雍最惊才绝艳的厌王殿下将她抵在墙上，红了双眼：“阿妩骗了我许久，现在又准备抛夫弃子吗？”\n青妩：”抛夫我承认，弃子怎么说！咱们还没孩子呢！”\n萧沉砚：“马上就有！”",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/3d149670e1b54c113f5540070cd2f664_360x480.jpg",
        "popularityScore": 12,
        "wordCount": 137.12,
        "categoryId": 12,
        "categoryName": "古代情缘"
      },
      {
        "bookId": 3,
        "title": "电诈风云，我被骗到缅北的日子",
        "author": "江湖老六",
        "publishDate": "2024-05-24",
        "stockQuantity": 0,
        "description": "我曾经被骗去缅北，在那见识到了人性最阴暗的一面。我想用我的真实经历，告诉所有人，缅北远比你想象的还要恐怖！多一人看书，少一人受骗！",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/fdd98c957a4583e9e6de4f1d306abf8a_360x480.jpg",
        "popularityScore": 46,
        "wordCount": 181.52,
        "categoryId": 46,
        "categoryName": "都市生活"
      },
      {
        "bookId": 4,
        "title": "我和软萌女友的恋爱日常",
        "author": "佛系和尚",
        "publishDate": "2023-02-18",
        "stockQuantity": 4,
        "description": "甜甜的治愈文，带你重回校园时代！",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/59d23a46d53be056e9344570849d3ef9_360x480.jpg",
        "popularityScore": 45,
        "wordCount": 300.08,
        "categoryId": 45,
        "categoryName": "热血校园"
      },
      {
        "bookId": 5,
        "title": "第一瞳术师",
        "author": "喵喵大人",
        "publishDate": "2024-04-17",
        "stockQuantity": 0,
        "description": "《王牌对王牌》推荐！\n云筝，是华国隐世族地的天才瞳术师以及玄术师！\n一朝穿越，成了世人唾弃的废材！\n废材？翻手覆云间算尽天下事，一双妖异赤红色异瞳驭万兽！\n可偏偏算不了，看不穿那个尊贵雅致，风光月霁般的帝尊。\n云筝不解地问：“你图什么？”\n傲娇帝尊别扭地转过头，喃喃自语道：“不过是只图你一个罢了……”\n-\n推荐我的新书《第一召唤师》",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/77ba85d51e46eee063523c62c3902dce_360x480.jpg",
        "popularityScore": 17,
        "wordCount": 396.4,
        "categoryId": 17,
        "categoryName": "玄幻仙侠"
      },
      {
        "bookId": 6,
        "title": "和腹黑三叔闪婚后真香了",
        "author": "非池",
        "publishDate": "2024-04-15",
        "stockQuantity": 7,
        "description": "林清榆被准婆婆设计，嫁给未婚夫病弱坐轮椅的三叔。\n原以为婚后一定过得水深火热，谁知道对方又送房子又送地皮，还把她宠上天。\n唯一不好的是，这老公动不动就咳得一副要归西的模样。\n直到某天，林清榆发现了这位觊觎自己已久病弱老公的秘密。\n林清榆冷笑：“不是命不久矣？”\n陆勋谦虚：“都是夫人养得好。”\n林清榆咬牙：“腿不是瘸的吗？”\n陆勋冒冷汗：“为了咱孩子不被嘲笑，我请名医医治好了。”\n林清榆气炸：“陆勋，你到底还有哪句是真话！”\n噗通一声，陆勋熟练跪在键盘上：“老婆，别气，打我就是了。千错万错都是我的错，别伤了胎气。”\n曾经被陆三爷虐到怀疑人生的人：您要是被绑架了，就眨眨眼！",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/340e54fa80b657776a970144ecd21363_360x480.jpg",
        "popularityScore": 1,
        "wordCount": 231.6,
        "categoryId": 1,
        "categoryName": "总裁豪门"
      },
      {
        "bookId": 7,
        "title": "他的瘾",
        "author": "雪迦",
        "publishDate": "2024-10-18",
        "stockQuantity": 12,
        "description": "【美强惨.腹黑偏执私生子x富家乖乖女】\n直到未婚夫梁牧之在订婚当天同人私奔，被抛下的许栀才幡然醒悟，真心未必能换得真心。\n她看向那个一直默默在她身后的男人。\n梁锦墨觉得自己已经习惯了黑暗，但许栀给了他一束光。\n“我这个人有些老派，从订婚到结婚，到死，不换人。”他问她，“这是一辈子的事，你想清楚了吗？”\n后来坊间传闻，梁家两位少爷为争夺一个女人大打出手，意外的是私生子梁锦墨成为赢家。\n世人都说他冷漠寡情，不近女色，许栀深以为然。\n直至春夜月下，男人骨节分明的大手控着她纤细腰肢，菲薄的唇轻触她白皙脖颈，火热的指尖寸寸逡巡，搅乱了一池春水。",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/0743d286107a093ad1d7b872cbdda358_360x480.jpg",
        "popularityScore": 1,
        "wordCount": 79.64,
        "categoryId": 1,
        "categoryName": "总裁豪门"
      },
      {
        "bookId": 8,
        "title": "强嫁的权臣捂不热，重生后我不追了",
        "author": "三眠酱",
        "publishDate": "2024-08-31",
        "stockQuantity": 7,
        "description": "京里人人都羡慕温念兮命好。\n嫁的夫君英俊又上进，十年间便做到宰辅。\n且又是难得的忠贞，即便美人在怀，裴俭照旧不假辞色。\n可只有念兮知道，夫君的心从来不在她身上。\n从十五岁到二十八岁，念兮不想再忍下去，想要给夫君的小白花腾位置。\n谁知一朝重生，回到了十五岁。\n尚未婚配，年华正好。\n念兮决定，这一世，她要换个男人谈谈感情，圆了她的鸳鸯梦。\n她给自己物色了一个风姿俊美，体贴蓬勃的少年将军。\n可当少年将军兴冲冲带她去见自幼一起长大的兄弟时，裴俭正目光阴沉沉盯着他们牵在一起的手！\n一起重生回来的裴俭：？\n想改嫁？\n除非我死了！",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/2a90a558cb292c5294df086ff417677e_360x480.jpg",
        "popularityScore": 12,
        "wordCount": 50.74,
        "categoryId": 12,
        "categoryName": "古代情缘"
      },
      {
        "bookId": 9,
        "title": "逆天弃女，神医兽妃倾天下",
        "author": "猫小妖",
        "publishDate": "2024-07-28",
        "stockQuantity": 15,
        "description": "她是22世纪隐世家族异能门主、风水大师，却穿越到帝国家喻户晓的废物丑女身上。任人欺凌？还要看家族人的脸色？不好意思，她五系全开，碾压一切天才！\n各路渣渣找上门？来一个虐一个，来两个虐一双！\n强者为尊，她誓与天齐，搅乱一池风云。\n捡了个便宜师父，天天徒弟乖，徒弟好，徒弟是个软娇娇。\n一不小心混成了各大宗门势力的团宠，更有七个天才师兄护她如宝，“动我小师妹者，虽远必诛！”\n他是大陆至高王者，一怒天下变。\n当两人强强相遇——\n他站在万人之巅，拥她入怀，“小黎儿，不如我们打一架，胜者为王，败者暖床？！”\n各路大佬纷纷站出来：“想追她，先过我们这关再说！”",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/c4baead172e66a7be71eb90d3431eb90_360x480.jpg",
        "popularityScore": 17,
        "wordCount": 88.4,
        "categoryId": 17,
        "categoryName": "玄幻仙侠"
      },
      {
        "bookId": 10,
        "title": "全师门就我一个废柴",
        "author": "白木木",
        "publishDate": "2024-03-08",
        "stockQuantity": 15,
        "description": "全师门就她一个废柴，她有六个天才师兄宠她护她，世人皆羡慕嫉妒她。\n天才师兄们待她如珠似宝，御敌之时永远争先拔剑挡在她前面。她只想说，师兄们我真的可以自己来！我可以一个打十个！\n说她弱鸡她觉得挺冤枉的，要怎么解释别人才信她不是废柴，她真的很强的！\n修真界第一大佬柔声哄：我信，我永远信你。\n（爽文，女主强，飒，美！）",
        "coverImage": "https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/2e9ed49838694f4b04d4fcb9cde1f3aa_360x480.jpg",
        "popularityScore": 17,
        "wordCount": 440.83,
        "categoryId": 17,
        "categoryName": "玄幻仙侠"
      }
    ],
    // 初始为空数组
    loading: false,
    // 可选：加载状态
    error: null
    // 可选：错误信息
  }),
  getters: {
    findBookById: (state) => (id) => {
      return state.books.find((book) => book.bookId === id);
    }
  },
  actions: {
    // 异步 action：从后端获取书籍列表
    async fetchBooks() {
      var _a;
      this.loading = true;
      this.error = null;
      try {
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: "http://127.0.0.1:8080/api/books",
            method: "GET",
            success: resolve,
            fail: reject
          });
        });
        if (res.statusCode === 200 && ((_a = res.data) == null ? void 0 : _a.statusCode) === 200) {
          this.books = res.data.books || [];
        } else {
          throw new Error(`请求失败: ${res.statusCode}`);
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at stores/books.js:172", "【图书数据获取失败】", err);
        this.error = err.message || "网络错误";
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    }
  }
});
exports.useBookStore = useBookStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/books.js.map
