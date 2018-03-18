package com.stylefeng.guns.modular.system.service;

/**
 * 个推
 * 
 * @author zmh
 * @version V1.0 创建时间：2016年8月17日 上午11:42:06
 */
public interface GeTuiService {

	/**
	 * 推送
	 * 
	 * @param data
	 * @param clientId
	 * @return
	 */
	boolean push(String data, String clientId);
}
