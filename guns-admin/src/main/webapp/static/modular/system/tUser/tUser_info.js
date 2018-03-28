/**
 * 初始化客户端用户管理详情对话框
 */
var TUserInfoDlg = {
    tUserInfoData : {}
};

/**
 * 清除数据
 */
TUserInfoDlg.clearData = function() {
    this.tUserInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TUserInfoDlg.set = function(key, val) {
    this.tUserInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TUserInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TUserInfoDlg.close = function() {
    parent.layer.close(window.parent.TUser.layerIndex);
}

/**
 * 收集数据
 */
TUserInfoDlg.collectData = function() {
    this
    .set('id')
    .set('loginName')
    .set('loginPassword')
    .set('nickName')
    .set('realName')
    .set('headIcon')
    .set('departmentId')
    .set('regionId')
    .set('createTime')
    .set('updateTime')
    .set('createUser')
    .set('updateUser')
    .set('status')
    .set('email')
    .set('idNo')
    .set('jobId')
    .set('phone')
    .set('licenseType')
    .set('sex')
    .set('userType')
    .set('salt')
    .set('encryQty');
}

/**
 * 提交添加
 */
TUserInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tUser/add", function(data){
        Feng.success("添加成功!");
        window.parent.TUser.table.refresh();
        TUserInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tUserInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TUserInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tUser/update", function(data){
        Feng.success("修改成功!");
        window.parent.TUser.table.refresh();
        TUserInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
/*

    console.log(this.tUserInfoData);
    //时间转化
    this.tUserInfoData.createTime = Date.parse(new Date(this.tUserInfoData.createTime));
    this.tUserInfoData.updateTime = Date.parse(new Date(this.tUserInfoData.updateTime));
    console.log(this.tUserInfoData);
*/

    ajax.set(this.tUserInfoData);
    ajax.start();
}

$(function() {
    //初始化性别选项
    $("#sex").val($("#sexName").val());
    $("#departmentId").val($("#departmentName").val());
    $("#status").val($("#statusName").val());
    $("#jobId").val($("#jobName").val());
});
