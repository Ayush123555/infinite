var bg, bg_display;
var Earth, Earth_display;
var Rocket, rocket_display;
var Stars, stars_display, StarGroup;
var meteoroid, meteoroid_display, MeteorG;
var mars, mars_display,marsG;
var jupiter, jupiter_display,jupiterG;
var saturn, saturn_display,saturnG;
var uranus, uranus_display,uranusG;
var gameover, gameover_display;
var success, success_display;
var PLAY=1;
var END=0;
var STORY=2;
var gameState=STORY;
var scorehit=0;
var sprite;
var flame, flame_display;

function preload(){
  bg_display=loadImage("pexels-philippe-donn-1257860.jpg");
  Earth_display=loadImage("Earth-removebg-preview.png");
  rocket_display=loadImage("Rocket-removebg-preview.png");
  stars_display=loadImage("Stars-removebg-preview.png");
  meteoroid_display=loadImage("Meteoroids-removebg-preview.png");
  mars_display=loadImage("Mars-removebg-preview.png");
  jupiter_display=loadImage("Jupiter-removebg-preview.png");
  uranus_display=loadImage("Uranus_final-removebg-preview.png");
  gameover_display=loadImage("Game_over-removebg-preview.png");
  success_display=loadImage("Success-removebg-preview.png");
  flame_display=loadImage("Rocket_Flame_11-removebg-preview.png");
  saturn_display=loadImage("Saturn-removebg-preview.png");
}

function setup() {
  createCanvas(1200,1000);
  
  bg=createSprite(1200,1000,1200,1000);
  bg.addImage(bg_display);
  bg.scale=1;
  bg.velocityY=-5;
  
  Earth=createSprite(600,880,10,10);
  Earth.addImage(Earth_display);
  Earth.scale=0.6;
  
  Rocket=createSprite(600,700,10,20);
  Rocket.addImage(rocket_display);
  Rocket.scale=0.5;
  
  scorehit=0;
  scorehit.shapeColor="yellow";

  
  flame=createSprite(Rocket.x,Rocket.y+230,5,5);
  flame.addImage(flame_display);
  flame.visible=false;
  flame.scale=0.4 
  Rocket.depth=Rocket.depth+1
  
  gameover=createSprite(600,500,20,20);
  gameover.addImage(gameover_display);
  gameover.visible=false;
  gameover.scale=2
 
  StarGroup=new Group();
  MeteorG=new Group();
  uranusG= new Group();
  jupiterG=new Group();
  marsG=new Group();
  saturnG= new Group();
  
  success=createSprite(600,200,10,10);
  success.addImage(success_display);
  success.visible=false
  
}

function draw() {
  
  if(bg.y<500){
     bg.y=bg.height/2;
     }
  console.log(bg.y)
  
  
  
  if(keyDown("space") && gameState===STORY){
      gameState=PLAY;
    }
     
     
   if(gameState===PLAY){
      spawnMars();
     spawnJupiter();
     spawnSaturn();
     spawnUranus();
      spawnMeteors();
      Rocket.x=World.mouseX;
      flame.x=Rocket.x;
      Earth.visible=false;
      flame.visible=true;
      bg.velocityY=-5;
      spawnStars();
      scorehit.visible=true;

    
    if(StarGroup.isTouching(Rocket)|| marsG.isTouching(Rocket)){
      scorehit = scorehit+1;
      StarGroup.destroyEach();
      
    }
    
    if(jupiterG.isTouching(Rocket)){
       gameState=END;
       }
     
      if(saturnG.isTouching(Rocket)){
       gameState=END;
       }
     
      if(uranusG.isTouching(Rocket)){
       success.visible=true;
        success.scale=4;
        gameover.visible=false
        gameState=END;
        
        bg.velocity=0;
        
        
       }
     
      }
  
  else if(gameState===END){
     gameover.visible=true;
     MeteorG.destroyEach();
     StarGroup.destroyEach();
     scorehit=0;
     bg.velocityY=0;
     marsG.destroyEach();
   // marsG.visible=false;
    mars.velocityY=0;
  jupiter.velocityY=0;
  saturn.velocityY=0;
  uranus.velocityY=0;
  
  }
  drawSprites()
    textSize(45);
    fill("white");
    
    text("Score: "+scorehit,40,80); 
  
  if(gameState===STORY){
    push();
    textSize(50);
    fill("black");
    stroke("white")
    strokeWeight(5);
    text("ISRO is all set to launch its 4th space mission",140,160 );
    text("this time on Uranus called ARUNYAAN",202,250);
    text("Fly in the rocket to the journey to Uranus",110,340);
    text("collect stars for score, stay away from other",182,430);
    text("planets and meteors and bring glory to India.",110,520);
    text("Press space to continue",245,630);
    Rocket.x=590;
    Rocket.y=850;
    pop();
    }
  }
  
  
  
  function spawnStars(){
  if(frameCount%250===0){
  Stars=createSprite(Math.round(random(200,700)),0,10,10);
  Stars.addImage(stars_display);
  Stars.velocityY=7;
  Stars.scale=0.5;
  Stars.lifetime=1000;
  StarGroup.add(Stars);  
  StarGroup.depth=Rocket.depth;
  Rocket.depth=Rocket.depth+1;
  }
}

function spawnMeteors(){
  if(frameCount%500===0){
    meteroid=createSprite(Math.round(random(175,750)),0,10,10);
    meteroid.addImage(meteoroid_display);
    meteroid.velocityY=5;
    meteroid.scale=0.9;
    meteroid.lifetime=1000;
    MeteorG.add(meteroid);  
    MeteorG.depth=Rocket.depth;
    Rocket.depth=Rocket.depth+1;
    }
  } 


function spawnMars(){
  if(frameCount%1750===0){
    mars=createSprite(Math.round(random(100,1000)),0,10,10);
    mars.addImage(mars_display);    
    mars.velocityY=4
    mars.lifetime=1000;
    mars.scale=1
    marsG.add(mars);
  }
}

function spawnJupiter(){
  if(frameCount%2350===0){
    jupiter=createSprite(Math.round(random(100,1000)),300,10,10);
    jupiter.addImage(jupiter_display);    
    jupiter.velocityY=4
    jupiter.lifetime=1000;
    jupiter.scale=1.3
    jupiterG.add(jupiter);
  }
}

function spawnSaturn(){
  if(frameCount%2750===0){
    saturn=createSprite(Math.round(random(100,1000)),300,10,10);
    saturn.addImage(saturn_display);    
    saturn.velocityY=4
    saturn.lifetime=1000; 
    saturn.scale=1.5
    saturnG.add(saturn);
  }
}


function spawnUranus(){
  if(frameCount%3250===0){
    uranus=createSprite(Math.round(random(100,1000)),300,10,10);
    uranus.addImage(uranus_display);    
    uranus.velocityY=4
    uranus.lifetime=1000;
    uranus.scale=0.8
    uranusG.add(uranus);
  }
}

