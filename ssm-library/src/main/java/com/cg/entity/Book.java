package com.cg.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Book {
    /**
     * 图书ID
     */
    private Integer bookId;

    /**
     * 书名
     */
    private String title;

    /**
     * 作者
     */
    private String author;

    /**
     * 完结日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date publishDate;

    /**
     * 库存数量
     */
    private Integer stockQuantity;

    /**
     * 简介
     */
    private String description;

    /**
     * 封面图片路径
     */
    private String coverImage;

    /**
     * 热度分数
     */
    private Double popularityScore;

    /**
     * 字数（万字）
     */
    private BigDecimal wordCount;

    /**
     * 分类ID
     */
    private Integer categoryId;

    /**
     * 分类名称
     */
    private String categoryName;
}