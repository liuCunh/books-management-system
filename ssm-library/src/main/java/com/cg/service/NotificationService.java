package com.cg.service;

import com.cg.entity.Notification;
import com.cg.mapper.NotificationMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationMapper notificationMapper;

    public void createNotification(Integer userId, String type, String title, String content, Integer relatedId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setTitle(title);
        notification.setContent(content);
        notification.setRelatedId(relatedId);
        notification.setIsRead(false);
        notificationMapper.insert(notification);
    }

    public PageInfo<Notification> getList(Integer userId, Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Notification> list = notificationMapper.selectByUserId(userId);
        return new PageInfo<>(list);
    }

    public int getUnreadCount(Integer userId) {
        return notificationMapper.countUnread(userId);
    }

    public void markAsRead(Integer id) {
        notificationMapper.updateReadStatus(id, true);
    }

    public void markAllAsRead(Integer userId) {
        notificationMapper.updateAllReadByUserId(userId);
    }
}