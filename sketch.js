var Play = 0;
var End = 1;
var backgroundIMG , balloonIMG;
var BG, balloon;
var topBoundary , bottomBoundary;
var img, img1, img2, img3;
var obstaclesGroup;
var gameState = Play;



function preload()
{
    backgroundIMG = loadImage("assets/bg.png");
    balloonIMG = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
    img = loadImage("assets/obsBottom1.png");
    img1 = loadImage("assets/obsBottom2.png");
    img2 = loadImage("assets/obsBottom3.png");
    img3 = loadImage("assets/obsTop2.png");

}

function setup()
{
  createCanvas(400,400);

    //background
    BG = createSprite(165,485,1,1);
    BG.addImage(backgroundIMG);
    BG.scale = 1.3;
    BG.velocityX = -1;
    BG.x = BG.width/2;
    
    //balloon
    balloon = createSprite(100,200,20,50);
    balloon.addAnimation("balloon",balloonIMG);
    balloon.scale = 0.2;

    //boundaries
    topBoundary = createSprite(200,10,800,10);
    bottomBoundary = createSprite(200,390,800,10);
    topBoundary.visible = false;
    bottomBoundary.visible = false;

     //groups
    obstaclesGroup = new Group();
    birdGroup = new Group();

}

function draw()
{
   background("black");

   

   if(gameState === Play)
   {
    BG.velocityX = -2;                                   

    //bg infinite
        if(BG.x<0)
    {
        BG.x = BG.width/2;
    }
    
    if(keyDown("space"))
    {
        balloon.velocityY = -8;
    }

    balloon.velocityY = balloon.velocityY+0.8;
    spawnObstacles();
    spawnBirds();

    if(obstaclesGroup.isTouching(balloon))
    {
        gameState = End;
    }
   }

   else if(gameState === End)
   {
       BG.velocityX = 0;
       obstaclesGroup.setVelocityXEach(0);
       birdGroup.setVelocityXEach(0);

   }
   balloon.collide(bottomBoundary);
  drawSprites();        
}

function spawnObstacles(){
    if (frameCount % 250 === 0){
        var obstacle = createSprite(400,300,10,40);
        obstacle.velocityX = -1;
        
         //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: obstacle.addImage(img);
                   break;
           case 2: obstacle.addImage(img1);
                   break;
           case 3: obstacle.addImage(img2);
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         obstacle.scale = 0.1;
         //obstacle.lifetime = 300;
        
        //add each obstacle to the group
         obstaclesGroup.add(obstacle);
      }
     
}

function spawnBirds(){
    if (frameCount % 200 === 0) {
       var bird = createSprite(300,100,40,10);
       bird.y = Math.round(random(10,60));
       bird.addImage(img3);
       bird.scale = 0.1;
       bird.velocityX = -3;
       
        //assign lifetime to the variable
       //bird.lifetime = 134;
       
       //adjust the depth
       img3.depth = balloon.depth;
       img3.depth = balloon.depth + 1;
       birdGroup.add(bird);
      
       }
}
