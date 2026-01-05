package com.cg.mapper;

import com.cg.entity.Notification;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface NotificationMapper {    int insert(Notification notification);

    List<Notification> selectByUserId(@Param("userId") Integer userId);

    int countUnread(@Param("userId") Integer userId);

    int updateReadStatus(@Param("id") Integer id, @Param("status") Boolean status);

    int updateAllReadByUserId(@Param("userId") Integer userId);
}