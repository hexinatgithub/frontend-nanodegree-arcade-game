# frontend-nanodegree-arcade-game
### 创建对象`Enemy`和`Player`
```
let enemy1 = new Enemy(0, level_pos[0]);
...
let player = new Player();
```
### 将`Enemy`添加到`allEnemies`
```
allEnemies.add(enemy1);
...
```
### 通过回调，保证实时绘制图像：
```
function main() {
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    win.requestAnimationFrame(main);
}
```
### 监听鼠标键盘行为，更改`Enemy`和`Player`坐标
* 随机从提供的集合中选择一个速度或行数
```
//let level_pos = [45, 135, 225];
//let speed_level = [100, 150, 200, 300];
getroworspeed(arrayobj) {
    let level_num = arrayobj.length;
    let index = parseInt(Math.random() * 10 / level_num);
    return arrayobj[index]
}
```
* 根据提供的速度更新`Enemy`的位置，如果超过边界则重新回到最左侧随机分配位置和速度；
```
update(dt) {
    if (this.x > 101 * 5) {
        this.x = 0;
        this.y = this.getroworspeed(level_pos);
        this.speed = this.getroworspeed(speed_level);
    } else {
        this.x = (this.x + dt * this.speed);
    }
}
```
* 碰撞判断:根据`Enemy`和`Player`的坐标差判断是否碰撞，同时判断是否胜利
```
collipse(base) {
    const dx = Math.abs(this.x - base.x);
    const dy = this.y - base.y;
    //进入水中
    if (base.y < 0) {
        base.init();//重置player位置
        setTimeout(() => window.alert('win!!!'), 100);//延时弹出胜利信息
    }
    if (dx < 60 && ((dy < 60 && dy > 0) || (dy > -90 && dy < 0))) {
        base.init();
    }
}
```