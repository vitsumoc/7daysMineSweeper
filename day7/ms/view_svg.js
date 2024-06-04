// svg实现的显示层
class View {
    constructor(app) {
        this.app = app;
    }

    // 全量渲染
    render() {
        console.log("render");
    }

    // 区域重绘
    renderCell(x, y) {
        console.log(x, y)
    }
}