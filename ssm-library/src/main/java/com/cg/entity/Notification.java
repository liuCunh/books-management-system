package com.cg.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

/**
 * 通知表
 */
@Data
@ToString
public class Notification {
    /**
     * 通知ID
     */
    private Integer id;

    /**
     * 接收通知的用户ID
     */
    private Integer userId;

    /**
     * 通知类型：COMMENT_REPLY/OVERDUE/BORROW_SUCCESS/STOCK_ARRIVAL
     */
    private String type;

    /**
     * 通知标题
     */
    private String title;

    /**
     * 通知内容
     */
    private String content;

    /**
     * 关联ID（评论ID或借阅ID或图书ID）
     */
    private Integer relatedId;

    /**
     * 是否已读 0-未读 1-已读
     */
    private Boolean isRead;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date createTime;
}