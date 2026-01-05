package com.cg.controller;

import com.cg.common.Result;
import com.cg.entity.Notification;
import com.cg.service.NotificationService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/list")
    public Result<Notification> getNotificationList(
            @RequestParam(name = "userId") Integer userId,
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize) {
        try {
            PageInfo<Notification> pageInfo = notificationService.getList(userId, page, pageSize);
            return new Result<>(200, "通知列表获取成功!", pageInfo.getList());
        } catch (Exception e) {
            e.printStackTrace();
            return new Result<>(500, "获取通知列表失败!", new ArrayList<>());
        }
    }

    @GetMapping("/unreadCount")
    public Result<Map<String, Integer>> getUnreadCount(@RequestParam(name = "userId") Integer userId) {
        try {
            int count = notificationService.getUnreadCount(userId);
            Map<String, Integer> countMap = new HashMap<>();
            countMap.put("count", count);
            List<Map<String, Integer>> dataList = new ArrayList<>();
            dataList.add(countMap);
            return new Result<>(200, "未读数量获取成功!", dataList);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result<>(500, "获取未读数量失败!", new ArrayList<>());
        }
    }

    @PutMapping("/read/{id}")
    public Result<String> markAsRead(@PathVariable(name = "id") Integer id) {
        try {
            notificationService.markAsRead(id);
            return new Result<>(200, "标记成功!", new ArrayList<>());
        } catch (Exception e) {
            e.printStackTrace();
            return new Result<>(500, "标记失败!", new ArrayList<>());
        }
    }

    @PutMapping("/readAll")
    public Result<String> markAllAsRead(@RequestParam(name = "userId") Integer userId) {
        try {
            notificationService.markAllAsRead(userId);
            return new Result<>(200, "全部标记成功!", new ArrayList<>());
        } catch (Exception e) {
            e.printStackTrace();
            return new Result<>(500, "标记失败!", new ArrayList<>());
        }
    }
}