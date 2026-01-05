package com.cg.controller;

import com.cg.common.Result;
import com.cg.entity.Comment;
import com.cg.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping("/api/comments")
    public Result<Comment> getComments(@RequestParam("bookId") Integer bookId) {
        List<Comment> comments = commentService.fetchAllComments(bookId);
        return new Result<>(200, "评论数据获取成功！", comments);
    }
}
