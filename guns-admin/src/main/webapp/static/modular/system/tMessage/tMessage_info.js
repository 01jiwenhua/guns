/**
 * 初始化客户端消息管理详情对话框
 */
var TMessageInfoDlg = {
    tMessageInfoData : {},
    editor: null,
    validateFields: {
        title: {
            validators: {
                notEmpty: {
                    message: '标题不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
TMessageInfoDlg.clearData = function() {
    this.tMessageInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TMessageInfoDlg.set = function(key, val) {
    this.tMessageInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TMessageInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TMessageInfoDlg.close = function() {
    parent.layer.close(window.parent.TMessage.layerIndex);
}

/**
 * 收集数据
 */
TMessageInfoDlg.collectData = function() {
    this.tMessageInfoData['content'] = TMessageInfoDlg.editor.txt.text();
    this
    .set('id')
    .set('title')
    // .set('content')
    .set('type')
    .set('url')
    .set('publishTime')
    .set('publishOrg')
    .set('publishDepartment')
    .set('status');
}

/**
 * 提交添加
 */
TMessageInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tMessage/add", function(data){
        Feng.success("添加成功!");
        window.parent.TMessage.table.refresh();
        TMessageInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tMessageInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TMessageInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tMessage/update", function(data){
        Feng.success("修改成功!");
        window.parent.TMessage.table.refresh();
        TMessageInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tMessageInfoData);
    ajax.start();
}

$(function () {
    Feng.initValidator("messageInfoForm", TMessageInfoDlg.validateFields);

    //初始化编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.customConfig.menus = [

    ]
    editor.create();
    editor.txt.html($("#contentVal").val());
    TMessageInfoDlg.editor = editor;
});
