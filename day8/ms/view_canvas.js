// canvas实现的显示层
class View {
    constructor(app, dom) {
        this.app = app;

        // 容器 container
        this._dom = dom;
        // 自己的canvas元素
        this._canvas = null;
        // 自己的画笔
        this._painter = null;
        // 图形加载器
        this._imgLoader = null;
        
        // 初始化
        this._init();
    }

    // 全量渲染
    render() {
        // 因为有异步加载问题,所以并不能随意render
        if (!this._imgLoader) {
            return;
        }
        if (this._imgLoader.imgCount != this._imgLoader.loadCount) {
            return;
        }

        var row = app.board.row;
        var column = app.board.column;
        var cellWidth = this._dom.clientWidth / row;
        var cellHeight = this._dom.clientHeight / column;

        for (var x = 0; x < row; x++) {
            for (var y = 0; y < column; y++) {
                var cell = this.app.cells[x][y];
                this._painter.drawImage(this._imgLoader[cell.status], x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }
    }

    // 区域重绘
    renderCell(x, y) {
        // 据说canvas不能局部刷新?
        this.render();
    }

    // 初始化
    _init() {
        var _view = this;

        // 初始化图形加载器
        if (!this._imgLoader) {
            this._imgLoader = {
                [CS_IDLE]: new Image(),
                [CS_FLAG]: new Image(),
                [CS_BOMB]: new Image(),
                [CS_0]: new Image(),
                [CS_1]: new Image(),
                [CS_2]: new Image(),
                [CS_3]: new Image(),
                [CS_4]: new Image(),
                [CS_5]: new Image(),
                [CS_6]: new Image(),
                [CS_7]: new Image(),
                [CS_8]: new Image(),
                imgCount: 12,
                loadCount: 0,
                _init: function() {
                    var _self = this;
                    _self[CS_IDLE].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_FLAG].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_BOMB].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_0].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_1].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_2].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_3].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_4].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_5].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_6].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_7].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_8].onload = function() {
                        _self.loadCount++;
                        if (_self.imgCount == _self.loadCount) {
                            _view._init();
                        }
                    }
                    _self[CS_IDLE].src = "asset/" + CS_IDLE + ".png";
                    _self[CS_FLAG].src = "asset/" + CS_FLAG + ".png";
                    _self[CS_BOMB].src = "asset/" + CS_BOMB + ".png";
                    _self[CS_0].src = "asset/" + CS_0 + ".png";
                    _self[CS_1].src = "asset/" + CS_1 + ".png";
                    _self[CS_2].src = "asset/" + CS_2 + ".png";
                    _self[CS_3].src = "asset/" + CS_3 + ".png";
                    _self[CS_4].src = "asset/" + CS_4 + ".png";
                    _self[CS_5].src = "asset/" + CS_5 + ".png";
                    _self[CS_6].src = "asset/" + CS_6 + ".png";
                    _self[CS_7].src = "asset/" + CS_7 + ".png";
                    _self[CS_8].src = "asset/" + CS_8 + ".png";
                }
            }

            this._imgLoader._init();
            return;
        }

        // 清空原有的view
        this._dom.innerHTML = "";

        // 创建画布
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = this._dom.clientWidth + "px";
        this._canvas.style.height = this._dom.clientHeight + "px";
        this._canvas.width = this._dom.clientWidth;
        this._canvas.height = this._dom.clientHeight;
        this._dom.appendChild(this._canvas);

        // 创建画笔
        this._painter = this._canvas.getContext("2d");

        // 多画一次(此时可确认图片已经完全加载)
        this.render();
    }
}