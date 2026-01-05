package com.cg.controller;

import com.cg.common.BookResult;
import com.cg.entity.Book;
import com.cg.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BooksController {
    @Autowired
    private BookMapper bookMapper;

    @RequestMapping("/api/books")
    public BookResult getAllBooks() {
        List<Book> books = bookMapper.queryAll(); // 查询所有图书
        return new BookResult(200, "图书数据获取成功！", books);
    }
}
