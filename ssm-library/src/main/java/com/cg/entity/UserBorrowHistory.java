package com.cg.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

/**
 * 用户借阅历史表
 */
@Data
@ToString
public class UserBorrowHistory {
    /**
    * 借阅历史ID
    */
    private Long borrowHistoryId;

    /**
    * 用户ID
    */
    private Integer userId;

    /**
    * 图书ID
    */
    private Integer bookId;

    /**
    * 借阅日期
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date borrowDate;

    /**
    * 归还日期
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date returnDate;

    /**
    * 逾期时长(单位-小时)
    */
    private Long overdueDateHour;

    /**
    * 订单状态。BORROWING(借阅中)、RETURNED(已归还)、OVERDUE(已逾期)
    */
    private String status;

    /**
    * 审核日期
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date reviewDate;

    /**
    * 审核管理员ID
    */
    private Integer adminId;

    /**
    * 管理员备注
    */
    private String comments;

    /**
    * 应还日期
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date dueDate;

    /**
     * 图书信息
     */
    private transient Book bookInfo;
}