package com.stylefeng.guns.modular.system.service.impl;

import com.stylefeng.guns.modular.system.model.TUser;
import com.stylefeng.guns.modular.system.dao.TUserMapper;
import com.stylefeng.guns.modular.system.service.ITUserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author stylefeng123
 * @since 2018-03-18
 */
@Service
public class TUserServiceImpl extends ServiceImpl<TUserMapper, TUser> implements ITUserService {
    @Autowired
    TUserMapper tUserMapper;

    @Override
    public List<Map<String, Object>> getUserList(String phone) {
        return tUserMapper.selectAllUser(phone);
    }
}
