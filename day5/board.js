// 棋盘类
class Board {
    // 构造器
    constructor(row, column, bomb) {
        this.reset(row, column, bomb);
    }

    // 棋盘数据重置
    reset(row, column, bomb) {
        this.row = row;             // 行数
        this.column = column;       // 列数
        this.bomb = bomb;           // 雷数
        this._openCell = 0;         // 已经打开的格子数
    }

    // 打开一个格子
    openOne() {
        this._openCell += 1;
    }

    // 获取已打开的格子数
    openCell() {
        return this._openCell;
    }
}