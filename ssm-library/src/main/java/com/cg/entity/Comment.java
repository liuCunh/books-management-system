package com.cg.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import lombok.Setter;
import lombok.AccessLevel;

import java.util.Date;
import java.util.List;

/**
 * 评论表
 */
@Data
@ToString
public class Comment {
    /**
    * 评论唯一ID
    */
    private Integer commentId;

    /**
    * 评论内容
    */
    private String content;

    /**
    * 评论创建时间
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date createdAt;

    /**
    * 父评论ID
    */
    private Integer parentId;

    /**
    * 评论人ID
    */
    private Integer userId;

    /**
    * 被评论人ID
    */
    private Integer targetUserId;

    /**
     * 关联图书ID
     */
    private Integer bookId;

    private transient List<Comment> children;
}