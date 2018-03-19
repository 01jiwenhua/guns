package com.stylefeng.guns.modular.system.dao;

import com.stylefeng.guns.modular.system.model.TUser;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户表 Mapper 接口
 * </p>
 *
 * @author stylefeng123
 * @since 2018-03-18
 */
public interface TUserMapper extends BaseMapper<TUser> {
    List<Map<String, Object>> selectAllUser();
}
