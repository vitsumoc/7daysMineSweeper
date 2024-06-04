// 格子逻辑类
class Cell {
    constructor(app, x, y) {
        this.app = app;
        this.status = CS_IDLE;
        this.x = x;
        this.y = y;
        this.isBomb = false;
        this.isOpened = false;
    }

    onLClick() {
        this.open();
    }

    onRClick() {
        if (this.isOpened) {
            return;
        }
        if (this.status == CS_IDLE) {
            this.status = CS_FLAG;
            return;
        }
        if (this.status == CS_FLAG) {
            this.status = CS_IDLE;
            return;
        }
    }

    open() {
        if (this.isOpened) {
            return;
        }
        this.isOpened = true;
        // 点雷输
        if (this.isBomb) {
            this.status = CS_BOMB;
            this.app.setGameStatus(GS_FAIL);
            return;
        }
        // 获得周围格子列表
        var aroundCells = []
        for (var x = this.x - 1; x < this.x + 2; x++) {
            // 获得行
            var cellsRow = this.app.cells[x]
            // 没有行
            if (!cellsRow) {
                continue;
            }
            // 获得格子
            for (var y = this.y - 1; y < this.y + 2; y++) {
                var cell = cellsRow[y]
                // 没有格子
                if (!cell) {
                    continue;
                }
                // 本格子
                if (x == this.x && y == this.y) {
                    continue;
                }
                // 添加格子
                aroundCells.push(cell);
            }
        }
        // 获得周围的雷数
        var aroundBombCount = 0;
        for (x in aroundCells) {
            if (aroundCells[x].isBomb) {
                aroundBombCount++;
            }
        }
        // 修改此格子的显示
        this.status = eval("CS_" + aroundBombCount);
        // 打开周围的格子
        if (aroundBombCount == 0) {
            for (x in aroundCells) {
                if (!aroundCells[x].isBomb) {
                    aroundCells[x].open();
                }
            }
        }
        // 记录打开格子数
        this.app.board.openOne();
    }
}