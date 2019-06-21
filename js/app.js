let score = 0;
var scoreSec = document.getElementById("score");
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + this.speed * dt;
	if (this.x == 0) {
		this.speed = 100 + Math.floor(Math.random() * 100);
	}
	if (this.x > 500) {
		this.x = 0;
		this.speed = 100 + Math.floor(Math.random() * 100);
	}
	if (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
		player.x = 200;
		player.y = 400;
		scoreSec.innerHTML = score;
		// pop up message using sweeyalert2
		Swal.fire({
			title: 'Oops! You are Caught....!',
			html: 'Earned Points : ' + score,
			animation: false,
			confirmButtonText: '<i class="fa fa-thumbs-up"></i> Restart',
			customClass: {
				popup: 'animated tada'
			}
		}).then(() => {
			score = 0;
			document.location.reload(); /* page reload method */
		});
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class hero {
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/char-pink-girl.png';
	}
}
hero.prototype.update = function(dt) {};
hero.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var spritePlace = [60, 143, 226];
spritePlace.map((positionY) => {
	var sprite = new Enemy(0, positionY, 150);
	allEnemies.push(sprite);
});
var player = new hero(200, 400);
// switch case for arrow buttons
hero.prototype.handleInput = function(key) {
	switch (key) {
		case 'left':
			this.x = this.x - 101;
			if (this.x < 0) {
				this.x = 0;
			}
			break;
		case 'right':
			this.x = this.x + 101;
			if (this.x > 404) {
				this.x = 404;
			}
			break;
		case 'up':
			this.y = this.y - 83;
			if (this.y < 0) {
				score = score + 1;
				scoreSec.innerHTML = score;
				if (score % 2 == 1) {
					this.sprite = 'images/char-boy.png';
				} else {
					this.sprite = 'images/char-pink-girl.png';
				}
				setTimeout(() => {
					this.x = this.x;
					this.y = 400;
				}, 50)
			};
			break;
		case 'down':
			this.y = this.y + 83;
			if (this.y > 404) {
				this.y = 404;
			}
	};
}
// This listens for key presses and sends the keys to your.
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
