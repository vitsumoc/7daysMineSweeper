// 游戏控制对象
var app = {
    board: null,
    cells: null,
    view: null,
    // 开始或重启
    init: function(dom, row, column, bomb) {
        console.log("app init");
    },
    // 设置游戏状态
    setGameStatus: function(status) {
        console.log(status);
    }
}