package com.stylefeng.guns.modular.system.service;

import com.stylefeng.guns.modular.system.model.TUser;
import com.baomidou.mybatisplus.service.IService;
import com.sun.xml.internal.ws.util.Pool;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户表 服务类
 * </p>
 *
 * @author stylefeng123
 * @since 2018-03-18
 */
public interface ITUserService extends IService<TUser> {
    List<Map<String, Object>> getUserList();

}
