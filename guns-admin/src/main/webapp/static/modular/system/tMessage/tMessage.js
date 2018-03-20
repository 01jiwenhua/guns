/**
 * 客户端消息管理管理初始化
 */
var TMessage = {
    id: "TMessageTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TMessage.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '消息标题', field: 'title', visible: true, align: 'center', valign: 'middle'},
            {title: '消息内容', field: 'content', visible: true, align: 'center', valign: 'middle'},
            {title: '消息类型', field: 'type', visible: true, align: 'center', valign: 'middle', formatter : function (value, row, index) {
                    if (row['type'] === 1) {
                        return '系统消息';
                    }
                    if (row['type'] === 2) {
                        return '工作通知';
                    }
                    return value;
                }},
            {title: '发布时间', field: 'publishTime', visible: true, align: 'center', valign: 'middle'},
            {title: '发布机构', field: 'publishOrg', visible: true, align: 'center', valign: 'middle'},
            {title: '发布部门', field: 'publishDepartment', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 检查是否选中
 */
TMessage.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        TMessage.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加客户端消息管理
 */
TMessage.openAddTMessage = function () {
    var index = layer.open({
        type: 2,
        title: '添加客户端消息管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/tMessage/tMessage_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看客户端消息管理详情
 */
TMessage.openTMessageDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '客户端消息管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tMessage/tMessage_update/' + TMessage.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除客户端消息管理
 */
TMessage.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tMessage/delete", function (data) {
            Feng.success("删除成功!");
            TMessage.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tMessageId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询客户端消息管理列表
 */
TMessage.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    TMessage.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TMessage.initColumn();
    var table = new BSTable(TMessage.id, "/tMessage/list", defaultColunms);
    table.setPaginationType("client");
    TMessage.table = table.init();
});
