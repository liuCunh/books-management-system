"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_comments = require("../../stores/comments.js");
const _sfc_main = {
  __name: "Comment",
  setup(__props) {
    const currentUser = { userId: 1, name: "我" };
    const commentsData = common_vendor.ref([]);
    const commentsStore = stores_comments.useCommentsStore();
    let bookId = null;
    common_vendor.onLoad((query) => {
      bookId = parseInt(query.bookId);
    });
    common_vendor.onMounted(async () => {
      if (bookId) {
        await commentsStore.fetchComments(bookId);
        commentsData.value = commentsStore.comments;
      }
    });
    const newCommentContent = common_vendor.ref("");
    const isNewestSort = common_vendor.ref(false);
    const inputFocus = common_vendor.ref(false);
    const replyingTo = common_vendor.ref(null);
    const inputPlaceholder = common_vendor.computed(() => {
      if (replyingTo.value) {
        return `回复 @${replyingTo.value.targetUser}`;
      }
      return "说点什么...";
    });
    const sortedComments = common_vendor.computed(() => {
      let list = [...commentsData.value];
      const parseDate = (str) => !str ? 0 : new Date(str.replace(/-/g, "/")).getTime();
      list.sort((a, b) => {
        const timeA = parseDate(a.createdAt);
        const timeB = parseDate(b.createdAt);
        return isNewestSort.value ? timeB - timeA : timeA - timeB;
      });
      return list;
    });
    const totalCount = common_vendor.computed(() => {
      let count = commentsData.value.length;
      commentsData.value.forEach((item) => {
        if (item.children)
          count += item.children.length;
      });
      return count;
    });
    const getUserName = (uid) => {
      const map = { 1: "我", 2: "李四" };
      return map[uid] || `用户${uid}`;
    };
    const getUserAvatar = (uid) => {
      return uid === 1 ? "/static/logo.png" : "/static/default-avatar.png";
    };
    const toggleSort = () => {
      isNewestSort.value = !isNewestSort.value;
    };
    const handleReply = (item, rootId = null) => {
      const finalParentId = rootId || item.commentId;
      replyingTo.value = {
        parentId: finalParentId,
        // 无论回复谁，数据都要加到这个 parentId 的 children 下
        targetUserId: item.userId,
        // 被回复的人
        targetUser: getUserName(item.userId)
        // 用于显示 placeholder
      };
      inputFocus.value = false;
      setTimeout(() => {
        inputFocus.value = true;
      }, 100);
    };
    const onInputBlur = () => {
      inputFocus.value = false;
    };
    const submitComment = () => {
      if (!newCommentContent.value.trim())
        return;
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const nowStr = `${year}-${month}-${day} ${hours}:${minutes}`;
      if (replyingTo.value) {
        const parentComment = commentsData.value.find((c) => c.commentId === replyingTo.value.parentId);
        if (parentComment) {
          const newChild = {
            commentId: Date.now(),
            content: newCommentContent.value,
            createdAt: nowStr,
            userId: currentUser.userId,
            parentId: parentComment.commentId,
            // 父ID永远指向一级评论
            targetUserId: replyingTo.value.targetUserId,
            // 指向被回复的人
            children: null
          };
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(newChild);
        }
      } else {
        const newRoot = {
          commentId: Date.now(),
          content: newCommentContent.value,
          createdAt: nowStr,
          userId: currentUser.userId,
          parentId: null,
          targetUserId: null,
          children: []
        };
        if (isNewestSort.value) {
          commentsData.value.unshift(newRoot);
        } else {
          commentsData.value.push(newRoot);
        }
      }
      newCommentContent.value = "";
      replyingTo.value = null;
      common_vendor.index.showToast({ title: "发送成功", icon: "success" });
    };
    const handleDelete = (id, parentId = null) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除？",
        success: (res) => {
          if (res.confirm) {
            if (parentId) {
              const parent = commentsData.value.find((p) => p.commentId === parentId);
              if (parent && parent.children) {
                parent.children = parent.children.filter((c) => c.commentId !== id);
              }
            } else {
              commentsData.value = commentsData.value.filter((c) => c.commentId !== id);
            }
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: commentsData.value
      }, commentsData.value ? common_vendor.e({
        b: common_vendor.t(totalCount.value),
        c: common_vendor.n(isNewestSort.value ? "active" : ""),
        d: common_vendor.t(isNewestSort.value ? "↓" : "↑"),
        e: common_vendor.o(toggleSort),
        f: common_vendor.f(sortedComments.value, (item, k0, i0) => {
          return common_vendor.e({
            a: getUserAvatar(item.userId),
            b: common_vendor.t(getUserName(item.userId)),
            c: item.userId === currentUser.userId
          }, item.userId === currentUser.userId ? {
            d: common_vendor.o(($event) => handleDelete(item.commentId), item.commentId)
          } : {}, {
            e: common_vendor.t(item.content),
            f: common_vendor.t(item.createdAt),
            g: common_vendor.o(($event) => handleReply(item), item.commentId),
            h: item.children && item.children.length > 0
          }, item.children && item.children.length > 0 ? {
            i: common_vendor.f(item.children, (subItem, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(getUserName(subItem.userId)),
                b: subItem.targetUserId
              }, subItem.targetUserId ? {
                c: common_vendor.t(getUserName(subItem.targetUserId))
              } : {}, {
                d: common_vendor.t(subItem.content),
                e: common_vendor.t(subItem.createdAt),
                f: common_vendor.o(($event) => handleReply(subItem, item.commentId), subItem.commentId),
                g: subItem.userId === currentUser.userId
              }, subItem.userId === currentUser.userId ? {
                h: common_vendor.o(($event) => handleDelete(subItem.commentId, item.commentId), subItem.commentId)
              } : {}, {
                i: subItem.commentId
              });
            })
          } : {}, {
            j: item.commentId
          });
        }),
        g: sortedComments.value.length === 0
      }, sortedComments.value.length === 0 ? {} : {}, {
        h: inputPlaceholder.value,
        i: inputFocus.value,
        j: common_vendor.o(submitComment),
        k: common_vendor.o(onInputBlur),
        l: newCommentContent.value,
        m: common_vendor.o(($event) => newCommentContent.value = $event.detail.value),
        n: !newCommentContent.value.trim(),
        o: common_vendor.o(submitComment)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50293edb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Comment/Comment.js.map
