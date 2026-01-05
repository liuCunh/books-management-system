package com.cg.service;

import com.cg.entity.UserBorrowHistory;
import com.cg.mapper.BookMapper;
import com.cg.mapper.UserBorrowHistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowService {
    @Autowired
    private UserBorrowHistoryMapper userBorrowHistoryMapper;
    @Autowired
    private BookMapper bookMapper;

    // 向UserBorrowHistory实体中添加图书信息
    public List<UserBorrowHistory> addBookInfo(Integer userId) {
        List<UserBorrowHistory> borrowHistory = userBorrowHistoryMapper.queryAllByUserId(userId);
        // 遍历借阅历史记录，添加图书信息
        if (borrowHistory == null || borrowHistory.isEmpty()) {
            return borrowHistory;
        }
        for (UserBorrowHistory history : borrowHistory) {
            if (history == null) {
                continue;
            }
            Integer bookId = history.getBookId();
            if (bookId == null) {
                // 没有 bookId，跳过
                continue;
            }
            try {
                // 从数据库查询图书信息并设置到 history 中
                history.setBookInfo(bookMapper.selectByPrimaryKey(bookId));
            } catch (Exception e) {
                // 查询时如果出现异常，打印错误并继续处理下一条记录
                System.err.println("Failed to load Book for bookId=" + bookId + ": " + e.getMessage());
            }
        }
        return borrowHistory;
    }
}
