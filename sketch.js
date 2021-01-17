var bird
var pipe1
var pipe2
var pipes
var edges
var yPipe
var PLAY=1
var BUTTON =2
var END =0
var gameState = BUTTON
var score
var highscore =0
var points 
var i = 0
var sensor
var j = 1
var birdimg
var bg
var bgimg
var pipeimg
var blocker1
var blocker2
var speed = 5
var gameover
var gameimg

var ground
var groundimg
function preload(){
  gameimg =loadImage("sign.png")
  birdimg = loadImage("bird.png")
  bgimg = loadImage("flappybg.png")
  pipeimg = loadImage("pipe.png")
  
  groundimg = loadImage("groundimg.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight-150);//600,600
  camera.on()
  camera.x =displayWidth/2
  camera.y =displayHeight/2
  camera.y =camera.y-100
  camera.zoom = 1.1
  
  bg =createSprite(camera.x, camera.y-47)
  bg.addImage(bgimg)
  bg.scale =1.75

  ground =createSprite(camera.x, displayHeight-70)
  ground.addImage(groundimg)
  ground.scale =1

  gameover=createSprite(camera.x, camera.y/4)
  gameover.addImage(gameimg)
  gameover.scale =0.1
  
  pipes = createGroup();

  bird =createSprite(displayWidth/2.5,300,30,30)
  bird.shapeColor="lightGreen";
  bird.rotation = -40;
  bird.addImage(birdimg)
  bird.scale =0.1

  yPipe =300
  score = 0
  points = 0
  sensor =createSprite(bird.x,800,30,30)
  sensor.visible =false

  blocker1 =createSprite(0,displayHeight/2,displayWidth/2,displayHeight)
  blocker2 =createSprite(displayWidth,displayHeight/2,displayWidth/2,displayHeight)
  blocker1.shapeColor="white"
  blocker2.shapeColor="white"

  gameover.visible =false
  
  console.log(displayWidth)
  gameover.depth =100
  pipes.destroyEach()
}

function draw() {
  background("cyan")
  textSize(20)
  
  //edges
  edges = createEdgeSprites();
  
  //
  //gamestate
  
  if (gameState===PLAY){
    gameover.depth =10
  
    gameover.visible =false
  
    if (ground.x <750){
      ground.x = displayWidth/2;
    }
    
    ground.velocityX= speed*-1

    score = score+1
    if (sensor.isTouching(pipes)&&j ==1){
      points = points +1
      j=0
      if(points%10===0){
        speed =speed+1
      }
    }
    if(!sensor.isTouching(pipes)){
      j=1
    }
    if (keyWentDown("space")){
      bird.velocityY =-10
    }
    createPipes();
    if(bird.velocityY < 0){
       bird.rotation =-40
    }else if(bird.velocityY < 5){
      bird.rotation=0
    }else{
      bird.rotation=50
    }
    gameover.visible =false
  
    if(bird.isTouching(edges)||bird.isTouching(ground)){
       gameState = END
    }
    bird.velocityY =bird.velocityY +1
  }else if(gameState ===END){
    pipes.setLifetimeEach (65)
    bird.rotation=50
    bird.velocityY =bird.velocityY +2
    pipes.setVelocityXEach(0)
  }else if(gameState ===BUTTON){
    bird.velocityY=0
  }
  bird.collide(edges)
  bird.collide(ground)
  //
  

  
  if(bird.isTouching(pipes)){
   gameState =END
   gameover.visible =true
   
  }
  
  if(gameState===1){
    gameover.visible =false
    

  }else if(gameState ===0||gameState ===2){
    gameover.visible =true
    text("Press space to play",displayWidth/2.2,200)
    gameover.depth =1
  }
  drawSprites()
  fill("black")
  
  if(gameState ===END){
    ground.velocityX= 0
    bg.velocityX= 0
    gameover.visible =true
  
    if (keyWentDown("space")){
      bird.destroy()
      pipes.destroyEach()
      gameover.depth =0
  
      setup();
      gameState = PLAY
      
    }
  }else if(gameState ===BUTTON){
    ground.velocityX= 0
    if (keyWentDown("space")){//-------------------------------------------------------------------------------------------------------------------------
      bird.destroy()
      pipes.destroyEach()
      gameover.destroy()
      blocker1.destroy()
      blocker2.destroy()
      bg.destroy()
      ground.destroy()
      sensor.destroy()
      setup();
      gameState = PLAY
    }
    
  }
  text("Points: "+points,500,50)
  //text("score: "+score,500,70)
  text("Highscore: "+highscore,500,75)
  if(points> highscore){
    highscore = points
  }
  gameover.visible =false
  
  //text(gameState,100,100)
  if(gameState===1){
    gameover.visible =false
    

  }else if(gameState ===0||gameState ===2){
    gameover.visible =true
    text("Press space to play",displayWidth/2.2,200)
    gameover.depth =1
  }
  background.depth =100
}
function createPipes(){
  i =score -10
  if (i % 60 ===0&&i>25){
    yPipe =Math.round(random(240,600))
    pipe1=createSprite(displayWidth,yPipe-400,50,600)
    pipe2=createSprite(displayWidth,yPipe+400,50,600)
    pipe1.addImage(pipeimg)
    pipe2.addImage(pipeimg)
    
    pipe1.depth =1
    pipe2.depth =1
    bg.depth =1
    gameover.depth =0
  
    pipe1.rotation =-180
    pipes.add(pipe1)
    pipes.add(pipe2)
    pipes.setLifetimeEach (75)
    pipes.setColorEach("green")
    pipes.setVelocityXEach(speed*-1)
  }
}
