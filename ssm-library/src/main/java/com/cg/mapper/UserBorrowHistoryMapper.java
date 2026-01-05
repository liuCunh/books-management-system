package com.cg.mapper;

import com.cg.entity.UserBorrowHistory;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserBorrowHistoryMapper {
    /**
     * delete by primary key
     * @param borrowHistoryId primaryKey
     * @return deleteCount
     */
    int deleteByPrimaryKey(Long borrowHistoryId);

    /**
     * insert record to table
     * @param record the record
     * @return insert count
     */
    int insert(UserBorrowHistory record);

    /**
     * insert record to table selective
     * @param record the record
     * @return insert count
     */
    int insertSelective(UserBorrowHistory record);

    /**
     * select by primary key
     * @param borrowHistoryId primary key
     * @return object by primary key
     */
    UserBorrowHistory selectByPrimaryKey(Long borrowHistoryId);

    /**
     * update record selective
     * @param record the updated record
     * @return update count
     */
    int updateByPrimaryKeySelective(UserBorrowHistory record);

    /**
     * update record
     * @param record the updated record
     * @return update count
     */
    int updateByPrimaryKey(UserBorrowHistory record);

    List<UserBorrowHistory> queryAllByUserId(@Param("userId") Integer userId);
}