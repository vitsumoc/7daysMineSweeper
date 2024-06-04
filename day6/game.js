// 游戏控制类

// 禁止右键菜单
document.oncontextmenu = function() {return false}

// 游戏控制对象
var app = {
    board: null,
    cells: null,
    view: null,
    gameStatus: null,
    msgCallBack: null,
    // 开始或重启
    init: function(dom, row, column, bomb, msgFn) {
        // 变量初始化
        // 棋盘初始化
        this.board = new Board(row, column, bomb)
        // 格子初始化
        this.cells = []
        for (var x = 0; x < row; x++) {
            var rowArray = []
            for (var y = 0; y < column; y++) {
                rowArray.push(new Cell(this, x, y));
            }
            this.cells.push(rowArray);
        }
        // 视图初始化
        this.view = new View(this, dom);
        this.view.render();
        // 信息回调函数初始化
        this.msgCallBack = msgFn;

        // 重新绑定点击事件
        dom.removeEventListener('click', onClick);
        dom.addEventListener('click', onClick);
        dom.removeEventListener('contextmenu', onClick);
        dom.addEventListener('contextmenu', onClick);

        // 状态重置
        this.gameStatus = GS_RUNNING;

        // 埋雷
        if ((row * column) < bomb) {
            throw "初始化错误";
        }
        var currentBomb = 0;
        var index = 0;
        while (currentBomb < bomb) {
            index = index % (row * column)
            var x = parseInt(index / column)
            var y = index % column

            var cell = this.cells[x][y]
            //随机生成雷 2%概率
            if (!cell.isBomb) {
                if (Math.random() < 0.02) {
                    cell.isBomb = true;
                    currentBomb++;
                }
            }
            //进入下一个点
            index++;
        }
    },
    // 设置游戏结果
    setGameStatus: function(status) {
        this.gameStatus = status;
    },
    // 校验游戏结果
    checkGameStatus: function() {
        // 校验是否胜利
        if ((this.board.openCell() + this.board.bomb) == (this.board.row * this.board.column)) {
            this.gameStatus = GS_WIN;
        }
        // 显示结果
        if (this.gameStatus == GS_WIN) {
            this.msgCallBack(MSG_WIN);
        }
        if (this.gameStatus == GS_FAIL) {
            this.msgCallBack(MSG_FAIL);
        }
    }
}

// 鼠标点击
function onClick(e) {
    if (app.gameStatus == GS_WIN) {
        app.msgCallBack(MSG_WIN);
        return;
    }
    if (app.gameStatus == GS_FAIL) {
        app.msgCallBack(MSG_FAIL);
        return;
    }


    // 格子尺寸
    var cellWidth = this.clientWidth / app.board.row;
    var cellHeight = this.clientHeight / app.board.column;
    // 通过点击位置获得序列号
    var x = Math.floor(e.offsetX / cellWidth);
    var y = Math.floor(e.offsetY / cellHeight);

    // 操作的格子
    var cell = app.cells[x][y]
    // 左键
    if (e.button == 0) {
        cell.onLClick();
        app.view.render();
        app.checkGameStatus();
    }
    // 右键
    if (e.button == 2) {
        cell.onRClick();
        app.view.renderCell(x, y);
    }
}