// dom元素实现的显示层
class View {
    constructor(app, dom) {
        this.app = app;

        // 创建dom元素
        this._dom = dom;
        this._doms = [];
        this._init();        
    }

    // 全量渲染
    render() {
        for (var x = 0; x < this.app.cells.length; x++) {
            var cellRow = this.app.cells[x];
            for (var y = 0; y < cellRow.length; y++) {
                var cell = cellRow[y];
                this._doms[x][y].style.backgroundImage = "url(asset/" + cell.status + ".png)"
            }
        }
    }

    // 区域重绘
    renderCell(x, y) {
        this.createElementNS.href.baseVal = "url(asset/" + this.app.cells[x][y].status + ".png)"
    }

    // 初始化
    _init() {
        this._dom.innerHTML = "";

        var row = app.board.row;
        var column = app.board.column;
        var cellWidth = this._dom.clientWidth / row;
        var cellHeight = this._dom.clientHeight / column;

        for (var x = 0; x < row; x++) {
            var domRow = [];
            for (var y = 0; y < column; y++) {
                var div = document.createElement('div');
                // 位置
                div.style.position = "absolute";
                div.style.left = (this._dom.offsetLeft + x * cellWidth) + "px";
                div.style.top = (this._dom.offsetTop + y * cellHeight) + "px";
                div.style.width = cellWidth + "px";
                div.style.height = cellHeight + "px";

                // 图片样式
                div.style.backgroundRepeat = "no-repeat";
                div.style.backgroundSize = "contain";
                domRow.push(div);
                this._dom.appendChild(div);

                // 事件由容器统一处理,格子不响应
                div.style.pointerEvents = "none";
            }
            this._doms.push(domRow)
        }
    }
}