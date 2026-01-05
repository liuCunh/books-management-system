package com.cg.mapper;

import com.cg.entity.Comment;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommentMapper {
    /**
     * delete by primary key
     * @param commentId primaryKey
     * @return deleteCount
     */
    int deleteByPrimaryKey(Integer commentId);

    /**
     * insert record to table
     * @param record the record
     * @return insert count
     */
    int insert(Comment record);

    /**
     * insert record to table selective
     * @param record the record
     * @return insert count
     */
    int insertSelective(Comment record);

    /**
     * select by primary key
     * @param commentId primary key
     * @return object by primary key
     */
    Comment selectByPrimaryKey(Integer commentId);

    /**
     * update record selective
     * @param record the updated record
     * @return update count
     */
    int updateByPrimaryKeySelective(Comment record);

    /**
     * update record
     * @param record the updated record
     * @return update count
     */
    int updateByPrimaryKey(Comment record);

    List<Comment> queryByBookId(@Param("bookId") Integer bookId);
}