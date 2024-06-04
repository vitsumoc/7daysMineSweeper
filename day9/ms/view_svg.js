// svg实现的显示层
class View {
    constructor(app, dom) {
        this.app = app;

        // 容器 container
        this._dom = dom;
        // 创建svg元素
        this._svg = null;
        // 创建图片数组
        this._imgs = null;
        // 初始化
        this._init();
    }

    // 全量渲染
    render() {
        for (var x = 0; x < this.app.cells.length; x++) {
            var cellRow = this.app.cells[x];
            for (var y = 0; y < cellRow.length; y++) {
                var cell = cellRow[y];
                this._imgs[x][y].setAttributeNS('http://www.w3.org/1999/xlink', 'href', "asset/" + cell.status + ".png");
            }
        }
    }

    // 区域重绘
    renderCell(x, y) {
        this._imgs[x][y].setAttributeNS('http://www.w3.org/1999/xlink', 'href', "asset/" + this.app.cells[x][y].status + ".png");
    }

    _init() {
        this._dom.innerHTML = "";

        // 初始化svg元素
        this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this._svg.setAttribute("width", this._dom.clientWidth);
        this._svg.setAttribute("height", this._dom.clientHeight);
        this._svg.setAttribute("viewBox", "0 0 " + this._dom.clientWidth + " " + this._dom.clientHeight);
        this._dom.appendChild(this._svg);

        // 创建svg中的img
        var row = app.board.row;
        var column = app.board.column;
        var cellWidth = this._dom.clientWidth / row;
        var cellHeight = this._dom.clientHeight / column;

        // 清空之前的元素
        this._imgs = [];
        for (var x = 0; x < row; x++) {
            var _imgsRow = [];
            for (var y = 0; y < column; y++) {
                var _img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                _img.setAttribute('x', x * cellWidth);
                _img.setAttribute('y', y * cellHeight);
                _img.setAttribute('width', cellWidth);
                _img.setAttribute('height', cellHeight);
                this._svg.appendChild(_img);

                _imgsRow.push(_img);
            }
            this._imgs.push(_imgsRow);
        }
    }
}