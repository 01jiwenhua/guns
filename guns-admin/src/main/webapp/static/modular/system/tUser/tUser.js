/**
 * 客户端用户管理管理初始化
 */
var TUser = {
    id: "TUserTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

TUser.initColumn = function () {
    return [
            {field: 'selectItem', radio: true},
            {title: '用户id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '登录名称', field: 'phone', visible: true, align: 'center', valign: 'middle'},
            {title: '真实姓名', field: 'realName', visible: true, align: 'center', valign: 'middle'},
            {title: '部门', field: 'departmentName', visible: true, align: 'center', valign: 'middle'},
            {title: '所在地区', field: 'regionName', visible: true, align: 'center', valign: 'middle'},
            {title: '状态', field: 'statusName', visible: true, align: 'center', valign: 'middle'},
            {title: '邮箱', field: 'email', visible: true, align: 'center', valign: 'middle'},
            {title: '证件类型', field: 'licenseTypeName', visible: true, align: 'center', valign: 'middle'},
            {title: '证件号码', field: 'idNo', visible: true, align: 'center', valign: 'middle'},
            {title: '职务', field: 'jobName', visible: true, align: 'center', valign: 'middle'},
            {title: '联系方式', field: 'phone', visible: true, align: 'center', valign: 'middle'},
            {title: '性别', field: 'sexName', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'},

    ];
};

/**
 * 检查是否选中
 */
TUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        TUser.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加客户端用户管理
 */
TUser.openAddTUser = function () {
    var index = layer.open({
        type: 2,
        title: '添加客户端用户管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/tUser/tUser_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看客户端用户管理详情
 */
TUser.openTUserDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '用户信息修改',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tUser/tUser_update/' + TUser.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开查看客户端用户管理详情
 */
TUser.openCheck = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '客户端用户管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tUser/tUser_check/' + TUser.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除客户端用户管理
 */
TUser.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tUser/delete", function (data) {
            Feng.success("删除成功!");
            TUser.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tUserId",this.seItem.id);
        ajax.start();
    }
};
/**
 * 审核用户
 */
TUser.audit = function (status) {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tUser/audit", function (data) {
            Feng.success("操作成功!");
            TUser.table.refresh();
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tUserId",this.seItem.id);
        ajax.set("status", status);
        ajax.start();
    }
};

/**
 * 查询客户端用户管理列表
 */
TUser.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    TUser.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TUser.initColumn();
    var table = new BSTable(TUser.id, "/tUser/list", defaultColunms);
    table.setPaginationType("client");
    TUser.table = table.init();
});
