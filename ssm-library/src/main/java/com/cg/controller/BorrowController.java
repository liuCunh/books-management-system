package com.cg.controller;

import com.cg.common.Result;
import com.cg.entity.UserBorrowHistory;
import com.cg.mapper.UserBorrowHistoryMapper;
import com.cg.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BorrowController {
    @Autowired
    private BorrowService borrowService;

    @RequestMapping("/api/borrows")
    public Result<UserBorrowHistory> getBorrowHistory(@RequestParam("userId") Integer userId) {
        List<UserBorrowHistory> borrowHistory = borrowService.addBookInfo(userId);
        return new Result<>(200, "借阅历史获取成功！", borrowHistory);
    }

}
