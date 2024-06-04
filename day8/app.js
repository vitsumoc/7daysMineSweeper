const LEVEL_EASY = "MS_GAME_EASY";
const LEVEL_NORMAL = "MS_GAME_NORMAL";
const LEVEL_HARD = "MS_GAME_HARD";

// 游戏容器
var container = document.getElementById("container");

// 当前选中的难度
var level = LEVEL_NORMAL;
// 游戏计时
var time = 0;
// 定时器序号
var timer;

// 难度选择和游戏开始
var btnEasy = document.getElementById('easy');
var btnNormal = document.getElementById('normal');
var btnHard = document.getElementById('hard');
var btnStart = document.getElementById('start-btn');
var levelBtns = [btnEasy, btnNormal, btnHard];
btnEasy.addEventListener('click', function() {
    level = LEVEL_EASY;
    for (var x in levelBtns) {
        levelBtns[x].classList.remove('my-radio-selected');
    }
    this.classList.add('my-radio-selected');
    refreshRank();
})
btnNormal.addEventListener('click', function() {
    level = LEVEL_NORMAL;
    for (var x in levelBtns) {
        levelBtns[x].classList.remove('my-radio-selected');
    }
    this.classList.add('my-radio-selected');
    refreshRank();
})
btnHard.addEventListener('click', function() {
    level = LEVEL_HARD;
    for (var x in levelBtns) {
        levelBtns[x].classList.remove('my-radio-selected');
    }
    this.classList.add('my-radio-selected');
    refreshRank();
})
btnStart.addEventListener('click', start);

// 定时执行
function addTime() {
    time++;
    document.getElementById('time').innerHTML = time;
}

// 游戏结束的回调函数
function gameoverCallback(status) {
    // 结束计时器
    clearInterval(timer);
    if (status == GS_WIN) {
        // 小黄人得意脸
        document.getElementById('sun').style.backgroundPosition = '-160px';
        // 记录排行榜
        layer.prompt({title: '尊姓大名？', formType: 0}, function(name, index){
            layer.close(index);
            // 取得排行榜
            var rankStr = localStorage.getItem(level);
            var rank = JSON.parse(rankStr);
            if (!rank) {
                rank = []
            }
            if (rank.length == 0) {
                rank.push({name: name, time: time});
            } else {
                for (var x in rank) {
                    if (rank[x].time >= time) {
                        rank.splice(x, 0, {name: name, time: time});
                        break;
                    }
                }
                if (rank.length > 10) {
                    rank = rank.splice(0, 10);
                }
            }
            localStorage.setItem(level, JSON.stringify(rank));
            refreshRank()
        });
    }
    if (status == GS_FAIL) {
        // 小黄人哭脸
        document.getElementById('sun').style.backgroundPosition = '-240px';
    }
}

// 刷新排行榜显示
function refreshRank() {
    var rankStr = localStorage.getItem(level);
    var rank = JSON.parse(rankStr);

    var nameBoxs = document.getElementsByClassName("table-name");
    var timeBoxs = document.getElementsByClassName("table-time");

    // 清理
    for (var x in nameBoxs) {
        nameBoxs[x].innerHTML = ''
    }
    for (var x in timeBoxs) {
        timeBoxs[x].innerHTML = ''
    }
    // 重绘
    for (var x in rank) {
        nameBoxs[x].innerHTML = rank[x].name;
        timeBoxs[x].innerHTML = rank[x].time;
    }
}

// 开始游戏逻辑
function start() {
    // ui显示
    document.getElementById("uiBox").style.visibility = 'visible';
    // 结束计时器
    clearInterval(timer);
    // 开始计时
    time = 0;
    timer = setInterval(addTime, 1000);
    // 黄豆人笑脸
    document.getElementById('sun').style.backgroundPosition = '0px';
    // 按难度开始游戏
    if (level == LEVEL_EASY) {
        container.style.width = '540px';
        container.style.height = '540px';
        app.init(container, 9, 9, 10, layer.msg, gameoverCallback);
    }
    if (level == LEVEL_NORMAL) {
        container.style.width = '640px';
        container.style.height = '640px';
        app.init(container, 16, 16, 40, layer.msg, gameoverCallback);
    }
    if (level == LEVEL_HARD) {
        container.style.width = '1140px';
        container.style.height = '640px';
        app.init(container, 30, 16, 99, layer.msg, gameoverCallback);
    }
}

// 进入时自动获得排行榜
refreshRank();