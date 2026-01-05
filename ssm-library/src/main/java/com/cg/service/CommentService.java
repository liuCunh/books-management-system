package com.cg.service;

import com.cg.entity.Comment;
import com.cg.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    /**
     * 从数据库查询所有评论，并将子数据挂到对应的父数据上，方法返回值仅包含父数据列表。
     * 说明：为符合常见约定（以及后续条件 parentId 与父 commentId 匹配），这里假设 parentId == null 表示父数据，parentId != null 表示子数据。
     * 如果你的原始定义相反，请告诉我，我会按你的定义调整实现。
     *
     * @return 仅包含父数据的列表（每个父数据的 children 包含其子数据，可能为空列表）
     */
    public List<Comment> fetchAllComments(Integer bookId) {
        try {
            List<Comment> list = commentMapper.queryByBookId(bookId);
            if (list == null || list.isEmpty()) {
                System.out.println("No comments found");
                return Collections.emptyList();
            }

            // 收集父节点（parentId == null）
            List<Comment> parents = new ArrayList<>();
            Map<Integer, Comment> parentById = new HashMap<>();
            for (Comment c : list) {
                if (c == null) continue;
                if (c.getParentId() == null) {
                    if (c.getChildren() == null) {
                        c.setChildren(new ArrayList<>());
                    }
                    parents.add(c);
                    if (c.getCommentId() != null) {
                        parentById.put(c.getCommentId(), c);
                    }
                }
            }

            // 将子节点（parentId != null）挂载到对应父节点的 children 中
            for (Comment c : list) {
                if (c == null) continue;
                Integer pid = c.getParentId();
                if (pid != null) {
                    Comment parent = parentById.get(pid);
                    if (parent != null) {
                        if (parent.getChildren() == null) parent.setChildren(new ArrayList<>());
                        parent.getChildren().add(c);
                    } else {
                        // 未找到父节点：忽略或记录（这里输出提示，便于调试）
                        System.err.println("Orphan child comment (no parent found) parentId=" + pid + " commentId=" + c.getCommentId());
                    }
                }
            }

            return parents;
        } catch (Exception e) {
            // 简单处理：打印异常到控制台，实际项目可改为使用统一日志框架
            System.err.println("Error while fetching comments: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
