
// 游戏状态 GameStatus
const GS_RUNNING = 1;           // 游戏中
const GS_WIN = 2;               // 游戏胜利
const GS_FAIL = 3;              // 游戏失败

// 字符串预定义
const MSG_WIN = "恭喜获胜";
const MSG_FAIL = "您已失败";

// 格子状态 CellStatus
const CS_IDLE = "facingDown";   // 反面
const CS_FLAG = "flagged";      // 插旗
const CS_BOMB = "bomb";         // 有雷
const CS_0 = "0";               // 0
const CS_1 = "1";               // 1
const CS_2 = "2";               // 2
const CS_3 = "3";               // 3
const CS_4 = "4";               // 4
const CS_5 = "5";               // 5
const CS_6 = "6";               // 6
const CS_7 = "7";               // 7
const CS_8 = "8";               // 8

// 预加载图片资源 (用于生成缓存)
var img1 = new Image();
img1.src = "asset/" + CS_IDLE + ".png";
var img2 = new Image();
img2.src = "asset/" + CS_FLAG + ".png";
var img3 = new Image();
img3.src = "asset/" + CS_BOMB + ".png";
var img4 = new Image();
img4.src = "asset/" + CS_0 + ".png";
var img5 = new Image();
img5.src = "asset/" + CS_1 + ".png";
var img6 = new Image();
img6.src = "asset/" + CS_2 + ".png";
var img7 = new Image();
img7.src = "asset/" + CS_3 + ".png";
var img8 = new Image();
img8.src = "asset/" + CS_4 + ".png";
var img9 = new Image();
img9.src = "asset/" + CS_5 + ".png";
var img10 = new Image();
img10.src = "asset/" + CS_6 + ".png";
var img11 = new Image();
img11.src = "asset/" + CS_7 + ".png";
var img12 = new Image();
img12.src = "asset/" + CS_8 + ".png";