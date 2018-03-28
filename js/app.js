class Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    collipse(base) {
        const dx = Math.abs(this.x - base.x);
        const dy = this.y - base.y;
        if (base.y < 0) {
            base.init();
            setTimeout(() => window.alert('win!!!'), 100);
        }
        if (dx < 60 && ((dy < 60 && dy > 0) || (dy > -90 && dy < 0))) {
            base.init();
        }
    }
}

// Enemies our player must avoid
class Enemy extends Base {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x = 0, y = 0) {
        super(x, y)
        // this.speed = 0;
        this.speed = this.getroworspeed(speed_level);
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > 101 * 5) {
            this.x = 0;
            this.y = this.getroworspeed(level_pos);
            this.speed = this.getroworspeed(speed_level);
        } else {
            this.x = (this.x + dt * this.speed);
        }
        this.collipse(player);
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //get speed or row by param
    //param:speed or row array
    getroworspeed(arrayobj) {
        let level_num = arrayobj.length;
        let index = parseInt(Math.random() * 10 / level_num);
        return arrayobj[index]
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Base {
    constructor(x = 101 * 2, y = 90 * 4 + 45) {
        super(x, y);
        this.sprite = 'images/char-boy.png';
    }
    init() {
        this.x = 101 * 2;
        this.y = 90 * 4 + 45;
    }
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //update x and y by action 
    handleInput(action) {
        if (action === 'left') {
            if (this.x > 0) {
                this.x -= 101;
            }
        } else if (action === 'up') {
            if (this.y > 0) {
                this.y -= 83;
            }
        } else if (action === 'right') {
            if (this.x < 101 * 4) {
                this.x += 101;
            }
        } else if (action === 'down') {
            if (this.y <= 83 * 4) {
                this.y += 83;
            }
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = new Set();
let level_pos = [45, 135, 225];
let speed_level = [100, 150, 200, , 250, 300];

let enemy1 = new Enemy(0, level_pos[0]);
let enemy2 = new Enemy(0, level_pos[1]);
let enemy3 = new Enemy(0, level_pos[2]);
let player = new Player();
allEnemies.add(enemy1);
allEnemies.add(enemy2);
allEnemies.add(enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});