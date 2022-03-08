var myPlayer;
var myPlayerFeet;

var arm;
//var boomerangs = [];
var boomerang;
var drawingboomerang;


var bullets      = [];
var otherBullets = [];
var bullet;
var maxBulletDistance = 1500;

var drawingbullet;
var bulletCount = 0;
var bulletAmmo = 250;
var clipReloadSize = 250;
var autoFireSpeedDelay = 90;


var playerRedDotColor = [0,0,255,0];

var myPlayers = [];
var zoom = 1; 
var bgColor = (200,200,200);
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;
var autofireDelay = false;
var instancedBlobs = 600;
var ghost;
var playerMoveSpeedLimit= 6;
var maxSpeed = 6;
var gunFireSound;
var reloadSound;

var wallSprite_bottom;
var wallSprite_top;
var wallSprite_left;
var wallSprite_right;

var yOffset = 0;
window.bulletSpeed = 60;
var sprinting = false;
var defaultZoom = 1;
var zoom = 1;
var sprintingEnabled = true;
var inBetween;
var counter5;
var tinyZoom = 1;
var zoomy = 1;
var zoomAdjust;
var zoomToggleInOut = "idle";  // default for 1.0 zoom
var bulletSpreadValue = 8; // default when not zoomed
let distances = [];
let maxDistance;
let spacer;

var targetDummies = [];
var playerDotx2 = 700;
var playerDoty2 = 500;
var playerDotx1 = 200;		// default values...not drawing it anyway...
var playerDoty1 = 400;

var wallSprite_Left;
var wallSprite_Right;
var canvasWidth = 1200;
var canvasHeight = 720;
var gameBorderWidth = canvasWidth*4;
var gameBorderHeight = canvasHeight*4;
var socket = io.connect('http://10.0.0.161:18001');
// var socket = io.connect('http://71.34.14.90:18001');
socket.open();

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create(),
	world = engine.world,
	Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
	Events = Matter.Events,
	Composite = Matter.Composite,
	Query = Matter.Query,
    Bodies = Matter.Bodies;

// create a renderer
// var render = Render.create({
    // element: document.body,
    // engine: engine
// });
// render.options.wireframes = false;







// var xCoord;
// var yCoord;
var otherPlayers = {};
// var rotation;
// var playerID;
	

function setup() {
	
	createCanvas(canvasWidth, canvasHeight);
	engine = Engine.create();
	world = engine.world;
	
	

	wallSprite_top    = Bodies.rectangle(0, 0, gameBorderWidth, 40, {
		isStatic: true,
		fillStyle: '#66ee66',
		});
	wallSprite_bottom = Bodies.rectangle(0, gameBorderHeight, gameBorderWidth, 40, {
		isStatic: true,
		fillStyle: '#66ee66',
		});
	wallSprite_left   = Bodies.rectangle(0, 0, 40, gameBorderHeight, {
		isStatic: true,
		fillStyle: '#66ee66',
		});
	wallSprite_right  = Bodies.rectangle(gameBorderWidth, 0, 40, gameBorderHeight, {
		isStatic: true,
		fillStyle: '#66ee66',
		});
	camera.on();
	Engine.run(engine);
	World.add(world, [wallSprite_top, wallSprite_bottom, wallSprite_left, wallSprite_right]);
	
	
	
	
	
	
	myPlayerFeet = createSprite(50, 50, 50, 500); // (height, width, X-coord, Y-coord)
	myPlayerFeet.scale = 0.4;
	myPlayerFeet.addAnimation('feet_running', '/images/soldier/feet/run/survivor-run_1.png', '/images/soldier/feet/run/survivor-run_3.png');
	myPlayerFeet.addAnimation('feet_still', '/images/soldier/feet/run/survivor-run_1.png');	
	// myPlayerFeet.limitSpeed = maxSpeed;
	wallHitSound = loadSound('/sounds/wall_hit3.wav');
	gunFireSound = loadSound('/sounds/gunshot.mp3');
	reloadSound  = loadSound('/sounds/reload.mp3');
	gunFireSound.amp(.2); 
	
	
	myPlayer = createSprite(canvasWidth/2, canvasHeight/2, 50, 100); // (height, width, X-coord, Y-coord)
	myPlayer.scale = 0.5;
	myPlayer.setCollider('circle',0,0, 200, 200);
	// myPlayer.addAnimation('soldier_still', '/images/soldier.png');
	myPlayer.addAnimation('soldier_running', '/images/soldier/shotgun/move/survivor-move_shotgun_1.png', '/images/soldier/shotgun/move/survivor-move_shotgun_19.png');
	myPlayer.limitSpeed = 5;

	
	// arm = new Arm(myPlayer.newPosition.x, myPlayer.newPosition.y); 
	// for (var i = 0; i < instancedBlobs; i++){
		// var x = random(-width, width);
		// var y = random(-height, height);
		// myPlayers[i] = new Blob(x, y, 16);
	// }
		
//////////////////////////////
// WALL BORDERS FOR TESTING
//////////////////////////////
borderTop 		=	createSprite(20, 20, gameBorderWidth, 40);				//top
borderBottom 	=	createSprite(20, gameBorderHeight-20, gameBorderWidth, 40); //bottom
borderRight 	=	createSprite(20, 20, 40, gameBorderWidth);  //left
borderLeft		=	createSprite(gameBorderWidth-20, 20, 40, gameBorderHeight);

borderTop.shapeColor = color(150, 150, 150);
borderBottom.shapeColor = color(150, 150, 150);
borderRight.shapeColor = color(150, 150, 150);
borderLeft.shapeColor = color(150, 150, 150);
//////////////////////////////
//////////////////////////////

// for (var bb = 0; bb < targetDummies.length; bb++){
	// console.log(bb, targetDummies[bb].X, targetDummies[bb].Y, targetDummies[bb].R);
	// circle(targetDummies[bb].X, targetDummies[bb].Y, targetDummies[bb].R);
	// targetDummies[bb] = createSprite(20, 20, gameBorderWidth, 40);	
// }



}

function draw() {
	background(90);	
	
	
	// console.log(wallSprite_top.position.x);
	
	// for (let x = 0; x < width; x += spacer) {
		// for (let y = 0; y < height; y += spacer) {
			// stroke(distances[x][y]);
			// point(x + spacer / 2, y + spacer / 2);
			// console.log(x, y);
		// }
	// }	


	
	if (sprinting == true){
		myPlayer.limitSpeed = 15;
	}
	else if (sprinting == false){
		myPlayer.limitSpeed = 6;
	}
	
	
	// console.log(myPlayerFeet);
	myPlayerFeet.position.x = myPlayer.position.x;
	myPlayerFeet.position.y = myPlayer.position.y;
	
	translate(width/2-myPlayer.position.x, height/2-myPlayer.position.y);
	// push();
	stroke('#66ee66');
	fill('#66ee66');
	
	strokeWeight(2);
						
	// exampleObject = circle(1000, 800, 55);


	if(mouseIsPressed == true){		// creates "auto-fire" if mouse button is held down
		
		if (autofireDelay == false){
			myMousePressed();
			autofireDelay = true;			
			setTimeout(function(){
				autofireDelay = false;
			}, autoFireSpeedDelay); //autofire speed 
		}	
	}

	

	dx = mouseX - width/2;
	dy = mouseY - height/2;
	angle = atan2(dy, dx)* 180 / Math.PI;
	// console.log(mouseX, mouseY, dx, dy, angle);
	myPlayer.rotation = angle;
	if ((moveUp == false) && (moveRight == false) && (moveLeft == false) && (moveDown == false)){
		myPlayerFeet.rotation = angle+180;
	}
	// console.log("ZOOMY: "+zoomy+ "  "+zoomToggleInOut);
	
	if (zoomy <= 0.4){
		// console.log("---> "+ zoomy);
		
		zoomy = 0.45;
		camera.zoom = zoomy;
		clearInterval(zoomAdjust);


	}
	else if (zoomy > 1.05){
		// console.log("xxxxxx> "+ zoomy);
		zoomy = 1;
		camera.zoom = zoomy;
		clearInterval(zoomAdjust);

	}	
	
	// if (myPlayer.position.x > gameBorderWidth+90){
		// console.log("moving X: "+myPlayer.position.x);
		// myPlayer.position.x = gameBorderWidth/2;
	// }
	// else if (myPlayer.position.x < -90){
		// console.log("moving X: "+myPlayer.position.x);
		// myPlayer.position.x = gameBorderWidth/2;
	// }
	
	// if (myPlayer.position.y > gameBorderHeight+90){
		// console.log("moving Y: "+myPlayer.position.y);
		// myPlayer.position.y = gameBorderHeight/2;
	// }
	// else if (myPlayer.position.y < -90){
		// console.log("moving Y: "+myPlayer.position.y);
		// myPlayer.position.y = gameBorderHeight/2;
	// }
	// distancefromPlayer = Math.hypot(window.bullets[x].position.x - myPlayer.position.x, window.bullets[x].position.y - myPlayer.position.y);
		// console.log(distancefromPlayer);
		// if (distancefromPlayer > 1500){
			// console.log('removing bullet: '+x);
			// window.bullets[x].remove();
			// bullets.splice(x, 1);
			// bulletCount -= 1;
			// return;
		// }
		
	myPlayer.collide(borderTop);	
	myPlayer.collide(borderBottom);	
	myPlayer.collide(borderLeft);	
	myPlayer.collide(borderRight);	
		
	strokeWeight(5);
	stroke(playerRedDotColor);	
	// playerRedDot = line(myPlayer.position.x, myPlayer.position.y, playerDotx2, playerDoty2); 
	
	// playerDotx1 = Math.round( Math.cos(angle*Math.PI/180) * 200 + myPlayer.position.x );
	// playerDoty1 = Math.round( Math.sin(angle*Math.PI/180) * 200 + myPlayer.position.y );
	playerRedDot = line(playerDotx1, playerDoty1, playerDotx2, playerDoty2); 
	
	checkReload();
	determineDirection();
	moveBullets();
	drawSprites();
	drawHUD();

}



//////////////////////////	//////////////////////////
//////////////////////////	//////////////////////////
//////////////////////////	//////////////////////////
	
	
	
	
	// socket.on('new player', function(playerID, xCoord, yCoord){
		// console.log("new player ID: "+playerID+"   socket.id: "+socket.id);
		// if ((playerID) && (playerID != socket.id)){
		// try{
			// otherPlayers[playerID] = createSprite(canvasWidth/2, canvasHeight/2, 50, 100); // (height, width, X-coord, Y-coord)
			// otherPlayers[playerID].scale = 0.5;
			// otherPlayers[playerID].setCollider('circle',0,0, 200, 200);
			// otherPlayers[playerID].addAnimation('soldier_running', '/images/soldier/shotgun/move/survivor-move_shotgun_1.png');
			// console.log('spawned new player!');
		// }catch(err){}
		// }
	// });
	
	socket.on('server bullet update', function(playerID, bulletID, xCoord, yCoord, rotation){		//bulletID is playerID+number
	if ((playerID) && (playerID != socket.id)){
		console.log('got a bullet:  '+playerID, bulletID,xCoord,yCoord,rotation);
		bulletID = ''+bulletID;
		otherBullets[bulletID] = createSprite(xCoord, yCoord);	
		otherBullets[bulletID].rotation = rotation;
		otherBullets[bulletID].rotateToDirection = true;
		otherBullets[bulletID].draw = function() { fill(0,0,0); ellipse(0,0,45,3); } ;
		otherBullets[bulletID].setSpeed(window.bulletSpeed, rotation);
	}
	});
	
	
	
	
	
	
	socket.on('server player move update', function(playerID, xCoord, yCoord, rotation){
	try {

		// console.log(playerID);
		
		if (otherPlayers[playerID] == null){		// if this is a new socket.id add a new sprite for it
			console.log("GOT A NEW PLAYER!");
			otherPlayers[playerID] = createSprite(xCoord, yCoord, 50, 100);
			otherPlayers[playerID].scale = 0.5;
			otherPlayers[playerID].setCollider('circle',0,0, 200, 200);
			otherPlayers[playerID].addAnimation('soldier_running', '/images/soldier/shotgun/move/survivor-move_shotgun_1.png');
		}

		else if ((playerID) && (playerID != socket.id)){	//if we got a playerID AND it isn't us...
		// try{
			// console.log(playerID, xCoord, yCoord, rotation);
			// console.log("socket: "+socket.id+ " playerID: "+playerID+"  x: "+xCoord+" y: "+yCoord+ "rotation: "+rotation);
			// console.log('got playerID and ISNT us...');
			otherPlayers[playerID].rotation = rotation;
			otherPlayers[playerID].position.x = xCoord;
			otherPlayers[playerID].position.y = yCoord;
		// }catch(err){}
		}
		else if (playerID == socket.id){
			// console.log('IGNORING MY OWN UPDATE');
		}

		else{
			// console.log(playerID+ ' -- awkward...we should never see this error...')
			//do nothing as this is clearly an update for our own player...safely ignored
		}
		
	} catch(baderror){}
	});
	
	
	
	
	
	
	socket.on('draw dummy squares', function (counter, targetDummyX, targetDummyY, targetDummyWidth){ // width will be equal to height, set on server side.
	// console.log('loading squares');
	try {
	// console.log(counter, targetDummyX, targetDummyY, targetDummyRadius);
	targetDummyHeight = targetDummyWidth;
	// targetDummies[counter] = {};
	// targetDummies[counter].X = targetDummyX;
	// targetDummies[counter].Y = targetDummyY;
	// targetDummies[counter].R = targetDummyRadius;

	// circle(targetDummies[bb].X, targetDummies[bb].Y, targetDummies[bb].R);
	console.log(counter, targetDummyX, targetDummyY, targetDummyWidth, targetDummyHeight);
	targetDummies[counter] = createSprite(targetDummyX, targetDummyY, targetDummyWidth, targetDummyHeight);	
	targetDummies[counter].addAnimation('soldier_running', '/images/soldier_2.png');
	targetDummies[counter].scale = 1.45;
	}catch(errrr){console.log('drawing dummies FAILED');}
	
	});
	
	socket.on('player disconnected', function(playerID){
		otherPlayers[playerID].remove();
		console.log('removed disconnected player');
	});
	
	
	socket.on('update collision', function(x2, y2){
		// console.log("COLLISION!");
		// console.log("yoooo: "+ x2+"  "+y2+ "player("+myPlayer.position.x+", "+myPlayer.position.y+")");
		// gunFireSound.play();
		playerDotx2 = x2;
		playerDoty2 = y2;
		stroke('red');
		strokeWeight(10);
		playerRedDotColor = [0, 0, 255];
		//playerRedDot = line(window.bullets[x].position.x, window.bullets[x].position.y, x2, y2); 
		
		playwallHitSound()
		setTimeout(function(){clearRedDot()}, 500);
	});
	
	
	
	function updatePlayerMovement (){
		// console.log(myPlayer.position.x, myPlayer.position.y, myPlayer.rotation);
		try{
			socket.emit('player move update', myPlayer.position.x, myPlayer.position.y, myPlayer.rotation);
		}catch(errrr){console.log('player move update failed...');}
	}
	setInterval(updatePlayerMovement, 10); //15 fps
  	
	// });


function clearRedDot() {
	playerRedDotColor = [0,0,255,0]; // set to blue with zero opacity (remove the line...find better way to do this)
}


function mouseReleased() {
	autofireDelay = false;
	// console.log('........release');
	// if (mouseButton == "right"){
		// camera.zoom = defaultZoom;
	// }
}
	

function myMousePressed() {
//	boomerangCount -= 1;
//	console.log(mouseButton);
	// if (mouseButton == "right"){
		// if (drawingboomerang != true){
			// boomerang = new Boomerang(myPlayer.newPosition.x, myPlayer.newPosition.y);
			// drawingboomerang = true;
		// }
		// boomerang.show(150,150,150);
		
	// }

	if (mouseButton == "left"){	
		
		if (bulletAmmo > 0){
			clearRedDot();
			gunFireSound.play();
			bulletAmmo -= 1;
//			console.log('bullets left: '+bulletAmmo);
			
			dx = mouseX - width/2;
			dy = mouseY - height/2;
			window.angle = atan2(dy, dx)* 180 / Math.PI;
			// console.log(window.angle);
			window.angle += 24;
			bulletX = Math.round( Math.cos(angle*Math.PI/180) * 60 + myPlayer.newPosition.x );
			bulletY = Math.round( Math.sin(angle*Math.PI/180) * 60 + myPlayer.newPosition.y );
			// console.log("CREATING BULLET: "+bulletCount);
			window.bullets[bulletCount] = createSprite(bulletX, bulletY);
			playerDotx1 = bulletX;
			playerDoty1 = bulletY+6;
			window.bullets[bulletCount].rotation = angle-24;
			window.bullets[bulletCount].rotateToDirection = true;
			window.bullets[bulletCount].draw = function() { fill(0,0,0); ellipse(0,0,45,3); } ;
			
			// setTimeout(function(){
				// window.bullets[bulletCount-1].remove();
				// console.log("REMOVED BULLET=="+bulletCount);
				// bulletCount -= 1;
			// }, 500); // delete bullet 

			window.bullets[bulletCount].shootAngle = angle-24;
			bulletCount += 1;
			// gunFireSound.play();

		}
		else console.log('no bullets left!');
	}
	
	if (mouseButton == "right"){
		oldZoom = defaultZoom;
		if (defaultZoom == 1){
			defaultZoom = 0.4;

		}
		else{
			defaultZoom = 1;
			sprintingEnabled = true;
			playerMoveSpeedLimit = 6;
		}
		// console.log("old: "+oldZoom+"  new: "+defaultZoom);

		// inBetween = lerp(oldZoom, defaultZoom, 0.01);
		// scale(inBetween);
		if (zoomy == 1){ // starts this way by default
			clearInterval(zoomAdjust);
			
			// sprintingEnabled = false;
			playerMoveSpeedLimit = 2;
			bulletSpreadValue = 1;	// if zoomed, accuracy should be way better
			zoomAdjust = setInterval(function(){
				camera.zoom = zoomy;
				zoomy -= 0.01;
			}, 5);
		}
		else if (zoomy == 0.45){ //zoom out, then prepare it for next time we toggle
			clearInterval(zoomAdjust);
			sprintingEnabled = true;
			playerMoveSpeedLimit = 6;
			bulletSpreadValue = 20;
			zoomAdjust = setInterval(function(){
				camera.zoom = zoomy;
				zoomy += 0.01;
			}, 5);
		}
	}
	
	
	window.oncontextmenu = function () // DISABLED RIGHT-CLICK MENU
	{
		return false;     // cancel default menu
	}
	// console.log(mouseButton);


}


function keyPressed(){
	if (keyCode == 87) { // W
		moveUp = true;
	}
	if (keyCode == 65) { // A
		moveLeft = true;
	}
	if (keyCode == 83) { // S
		moveDown = true;
	}
	if (keyCode == 68) { // D
		moveRight = true;
	}
	if (keyCode == 16) { // SHIFT
		if (sprintingEnabled == true){
			sprinting = true;
		}
	}
}

function keyReleased(){
	if (keyCode == 87) { // W
		moveUp = false;
	}
	if (keyCode == 65) { // A
		moveLeft = false;
	}
	if (keyCode == 83) { // S
		moveDown = false;
	}
	if (keyCode == 68) { // D
		moveRight = false;
	}
	if (keyCode == 16) { // SHIFT
		sprinting = false;
	}
	
}

function moveBullets(){
	for (var x = 0; x < window.bullets.length; x++){
		if (!window.bullets[x]){return}
		// console.log(window.bullets[x].velocity);
		// console.log(x);
		distancefromPlayer = Math.hypot(window.bullets[x].position.x - myPlayer.position.x, window.bullets[x].position.y - myPlayer.position.y);
		// console.log(distancefromPlayer);
		if (distancefromPlayer > maxBulletDistance){
			// console.log('removing bullet: '+x);
			window.bullets[x].remove();
			bullets.splice(x, 1);
			bulletCount -= 1;
			return;
		}
		
		
		else if (window.bullets[x].velocity.x == 0){
			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			shootAngleSpread = generateRandomNumber(0, bulletSpreadValue)*plusOrMinus;  // bulletSpreadValue degrees PLUS or MINUS for spread
			// console.log(shootAngleSpread);
			window.bullets[x].setSpeed(window.bulletSpeed, window.bullets[x].shootAngle+shootAngleSpread);


			console.log('sending bullet update: '+bullets.length);
			socket.emit('bullet update', window.bullets[x].position.x, window.bullets[x].position.y, (window.angle+shootAngleSpread));
		}
	}
}


function generateRandomNumber(min, max) {
    yourNumber = Math.random() * (max - min) + min;
    return(yourNumber);
};


function determineDirection(){

	// answer = myPlayer.getDirection;
	// console.log(answer);	
		if ((moveUp == false) && (moveRight == false) && (moveLeft == false) && (moveDown == false)){
			// myPlayer.addSpeed(0, 0);
			// myPlayerFeet.addSpeed(0,0);
			// myPlayerFeet.rotation = 270;
			myPlayerFeet.changeAnimation('feet_still');
			// console.log(myPlayer.getSpeed);

			// if (maxSpeed > 0){
				// maxSpeed -= 1;
				myPlayer.velocity.x = 0;
				myPlayer.velocity.y = 0;
			// }
		}
		else{
		myPlayerFeet.changeAnimation('feet_running');
		maxSpeed = playerMoveSpeedLimit;
		// myPlayerFeet.setSpeed(maxSpeed);
		if (sprinting == true){
			maxSpeed = playerMoveSpeedLimit + 10;
			// console.log("sprinting!");
		}
		else if (sprinting == false){
			maxSpeed = playerMoveSpeedLimit;
			// console.log("........normal running");
		}
		if (moveUp == true){
			if (moveLeft == true){
				// maxSpeed = 10;
//				console.log("---> diagonal up / left");
				myPlayer.setSpeed(maxSpeed, 225); // ??
				// myPlayerFeet.addSpeed(2,225);
				myPlayerFeet.rotation = 225;
			}
			else if (moveRight == true){
				// maxSpeed = 10;
//				console.log("---> diagonal up / right");
				myPlayer.setSpeed(maxSpeed, 315);
				// myPlayerFeet.addSpeed(2,315);
				myPlayerFeet.rotation = 315;
			}
			else{
				// maxSpeed = 10;
//				console.log("---> straight up");
				myPlayer.setSpeed(maxSpeed, 270);
				// myPlayerFeet.addSpeed(2,270);
				myPlayerFeet.rotation = 270;
			}
		}
		else if (moveDown == true){
			if (moveLeft == true){
				// maxSpeed = 10;
//				console.log("---> diagonal down / left");
				myPlayer.setSpeed(maxSpeed, 135);
				// myPlayerFeet.addSpeed(2,135);
				myPlayerFeet.rotation = 135;
			}
			else if (moveRight == true){
				// maxSpeed = 10;
//				console.log("---> diagonal down / right");
				myPlayer.setSpeed(maxSpeed, 45);
				// myPlayerFeet.addSpeed(2,45);
				myPlayerFeet.rotation = 45;
			}
			else{
				// maxSpeed = 10;
//				console.log("---> straight down");
				myPlayer.setSpeed(maxSpeed, 90);
				// myPlayerFeet.addSpeed(2,90);
				myPlayerFeet.rotation = 90;
			}
		}
		
		else if (moveLeft == true){
			// maxSpeed = 10;
//			console.log('----> want to move left');
			myPlayer.setSpeed(maxSpeed, 180);
			// myPlayerFeet.addSpeed(2,180);
			myPlayerFeet.rotation = 180;
		}
		
		
		else if (moveRight == true){
			// maxSpeed = 10;
//			console.log('----> want to move right');
			myPlayer.setSpeed(maxSpeed, 0);
			// myPlayerFeet.addSpeed(2,0);
			myPlayerFeet.rotation = 0;
		}	
		}
}


function playwallHitSound() {
		// console.log("HIT!!!!");
		wallHitSound.play();
	}

function setCameraZoom(zoomLevel){
	console.log(zoomLevel);
	camera.zoom = zoomLevel;
}
	
function checkReload(){
	if (bulletAmmo == 0){
		 bulletAmmo = -1;
		reloadSound.play();
		setTimeout(function(){
			console.log('playing sound..');
			bulletAmmo = clipReloadSize;
		}, 1000);
	}
	
}


function drawHUD(){

	camera.off();
	textSize(20);
	noStroke();
	// noFill();
	fill(255);
	text('ammo:',  20, 30);
	if (bulletAmmo == -1){
		text("RELOADING",  110, 30);
	}
	else {
		text(bulletAmmo, 110, 30);
	}
	camera.on();
}



	
	
