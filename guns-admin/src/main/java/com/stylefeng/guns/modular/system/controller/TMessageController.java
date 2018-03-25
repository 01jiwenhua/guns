package com.stylefeng.guns.modular.system.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.modular.system.model.TUser;
import com.stylefeng.guns.modular.system.service.GeTuiService;
import com.stylefeng.guns.modular.system.service.ITUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.TMessage;
import com.stylefeng.guns.modular.system.service.ITMessageService;

import java.util.Date;
import java.util.List;

/**
 * 客户端消息管理控制器
 *
 * @author fengshuonan
 * @Date 2018-03-18 13:38:56
 */
@Controller
@RequestMapping("/tMessage")
public class TMessageController extends BaseController {

    private String PREFIX = "/system/tMessage/";

    @Autowired
    private ITMessageService tMessageService;
    @Autowired
    private GeTuiService geTuiService;
    @Autowired
    private ITUserService tUserService;

    /**
     * 跳转到客户端消息管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "tMessage.html";
    }

    /**
     * 跳转到添加客户端消息管理
     */
    @RequestMapping("/tMessage_add")
    public String tMessageAdd() {
        return PREFIX + "tMessage_add.html";
    }

    /**
     * 跳转到修改客户端消息管理
     */
    @RequestMapping("/tMessage_update/{tMessageId}")
    public String tMessageUpdate(@PathVariable Integer tMessageId, Model model) {
        TMessage tMessage = tMessageService.selectById(tMessageId);
        model.addAttribute("item", tMessage);
        LogObjectHolder.me().set(tMessage);
        return PREFIX + "tMessage_edit.html";
    }

    /**
     * 获取客户端消息管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        if(ToolUtil.isEmpty(condition)){
            return tMessageService.selectList(null);
        }else{
            EntityWrapper<TMessage> entityWrapper=new EntityWrapper<>();
            Wrapper<TMessage> wrapper=entityWrapper.like("content",condition);
            return tMessageService.selectList(wrapper);
        }

    }

    /**
     * 新增客户端消息管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(TMessage tMessage) {
        tMessage.setPublishTime(new Date());
        String publishDepartment=tMessage.getPublishDepartment()
                .replace("& #40;","(")
                .replace("& #41;",")");
        tMessage.setPublishDepartment(publishDepartment);
        tMessageService.insert(tMessage);
        String message = JSON.toJSONString(tMessage);
        EntityWrapper<TUser> tUserEntityWrapper = new EntityWrapper<>();
        tUserEntityWrapper.isNotNull("app_id");
        List<TUser> users = tUserService.selectList(tUserEntityWrapper);
        for (TUser user : users) {
            geTuiService.push(message, user.getAppId());
        }
        return SUCCESS_TIP;
    }

    /**
     * 删除客户端消息管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer tMessageId) {
        tMessageService.deleteById(tMessageId);
        return SUCCESS_TIP;
    }

    /**
     * 修改客户端消息管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(TMessage tMessage) {
        String publishDepartment=tMessage.getPublishDepartment()
                .replace("& #40;","(")
                .replace("& #41;",")");
        tMessage.setPublishDepartment(publishDepartment);
        tMessageService.updateById(tMessage);
        return SUCCESS_TIP;
    }

    /**
     * 客户端消息管理详情
     */
    @RequestMapping(value = "/detail/{tMessageId}")
    @ResponseBody
    public Object detail(@PathVariable("tMessageId") Integer tMessageId) {
        return tMessageService.selectById(tMessageId);
    }
}
