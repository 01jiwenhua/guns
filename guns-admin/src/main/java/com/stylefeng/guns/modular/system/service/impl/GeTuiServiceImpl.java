package com.stylefeng.guns.modular.system.service.impl;

import com.gexin.rp.sdk.base.IPushResult;
import com.gexin.rp.sdk.base.impl.SingleMessage;
import com.gexin.rp.sdk.base.impl.Target;
import com.gexin.rp.sdk.http.IGtPush;
import com.gexin.rp.sdk.template.TransmissionTemplate;
import com.stylefeng.guns.modular.system.service.GeTuiService;
import org.springframework.stereotype.Service;

/**
 * 类说明
 * 
 * @author zmh
 * @version V1.0 创建时间：2016年8月17日 上午11:47:21
 */
@Service
public class GeTuiServiceImpl implements GeTuiService {

	public static final String GT_URL = "http://sdk.open.api.igexin.com/serviceex";
	public static final String GT_MASTERSECRET = "uKFmkbd72f7nSY4J52UhR1";
	public static final String GT_APPKEY = "ufTzEBvART7iHwXl0pyZl8";
	public static final String GT_APPID = "s5WroWDwRcASoCz2FFpfA4";

	@Override
	public boolean push(String data, String clientId) {
		IGtPush push = new IGtPush(GT_URL, GT_APPKEY, GT_MASTERSECRET);
		TransmissionTemplate template = this.createTransmissionTemplate(data);
		SingleMessage message = new SingleMessage();
		message.setOffline(true);
		// 离线有效时间，单位为毫秒，可选
		message.setOfflineExpireTime(1000*10);
		message.setData(template);
		message.setPushNetWorkType(0); // 可选。判断是否客户端是否wifi环境下推送，1为在WIFI环境下，0为不限制网络环境。
		
		Target target = new Target();
		target.setAppId(GT_APPID);
		target.setClientId(clientId);
		
		IPushResult ret = null;
		ret = push.pushMessageToSingle(message, target);
		return true;
	}
	
	private TransmissionTemplate createTransmissionTemplate(String data) {
		TransmissionTemplate template = new TransmissionTemplate();
		template.setAppId(GT_APPID);
		template.setAppkey(GT_APPKEY);

		// 透传消息设置，1为强制启动应用，客户端接收到消息后就会立即启动应用；2为等待应用启动
		template.setTransmissionType(2);
		template.setTransmissionContent(data);
		// 设置定时展示时间
		// template.setDuration("2015-01-16 11:40:00", "2015-01-16 12:24:00");
		return template;
	}

}
