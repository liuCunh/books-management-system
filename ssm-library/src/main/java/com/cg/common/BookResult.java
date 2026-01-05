package com.cg.common;

import com.cg.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor  // 全参构造方法
public class BookResult {
    // 响应码（1表示成功，0表示失败）
    private int statusCode;
    // 响应消息
    private String message;
    // 响应数据内容
    private List<Book> books;
}