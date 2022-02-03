const JUMP_FORCE = 260;
const MOVE_SPEED = 120;
const FALL_DEATH = 640;

layers([
	"game",
	"ui",
], "game");

camIgnore([ "ui", ]);

addLevel([
	"        $  ^^   ^^              =                                       ",
	"      ============              =                                       ",
	"                                =                                       ",
	"     ^^                         =                                       ",
	"===========  =^^=^=====   =     =                                       ",
	"=            ==========       $ =                                       ",
	"=$                    =       = =                                       ",
	"==                 =  =         =                                       ",
	"=^^^^=^^^^====^^== = ==^^^^^^^^^=                                       ",
	"=================  =  ===========                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =  $      =                                       ",
	"                =  =  =  =      =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =         =                                       ",
	"                =  =  =      =  =                                       ",
	"                =  =  =    ^^^^^=                                       ",
	"                =  == =    ======             =^^====                   ",
	"                =  =  =  =           ^  ^^    =======                   ",
	"                =  = ==            =======^=^^======     =          ?   ",
	"                =  =  ==          =================          =   ====== ",
	"                =^^=             ===========                     ====== ",
	"                =========^=^^=^^===========    $                 ====== ",
	"                ==========================     ==^==    ===      ====== ",
	"                                               =====                    "
], {
	width: 11,
	height: 11,
	"=": [
		sprite("steel"),
		solid(),
	],
	"$": [
		sprite("coin"),
		"coin",
	],
	"^": [
		sprite("spike"),
		area(vec2(0, 6), vec2(11, 11)),
		"dangerous",
	],
	"?": [
		sprite("goal"),
		area(vec2(0, 6), vec2(11, 11)),
		"goal"
	]
});

const score = add([
	text("0"),
	pos(6, 6),
	layer("ui"),
	{
		value: 0,
	},
]);

const player = add([
	sprite("guy"),
	pos(0, 0),
	body(),
]);

function gameOver() {
	play("hit");
	go("lose", { score: score.value, });
}

function win() {
	play("win");
	go("win", { score: score.value, });
}

player.action(() => {
	camPos(player.pos);
	if (player.pos.y >= FALL_DEATH) {
		gameOver();
	}
});

player.collides("dangerous", () => {
	gameOver();
});

player.collides("goal", () => {
	win();
});

player.collides("coin", (c) => {
	play("coin");
	destroy(c);
	score.value++;
	score.text = score.value;
});

keyPress("space", () => {
	if (player.grounded()) {
		player.jump(JUMP_FORCE);
	}
});

keyDown("a", () => {
	player.move(-MOVE_SPEED, 0);
});

keyDown("d", () => {
	player.move(MOVE_SPEED, 0);
});