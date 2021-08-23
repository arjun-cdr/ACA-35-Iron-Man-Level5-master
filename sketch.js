var bg, backgroundImg;
var ironMan, ironManImg;
var stoneImg;
var ground1,ground2;
var diamondGroup,diamondImg;
var spikeGroup,spikeImg;
var score=0;

function preload()
//this function is used to load images
{
  backgroundImg = loadImage("images/bg.jpg");
  ironManImg = loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diamondImg=loadImage("images/diamond.png");
  spikeImg=loadImage("images/spikes.png");
}
function setup()
{
  createCanvas(1000, 600);    //this is us4d to create canvas on the browser 

  //creating background 
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  bg.velocityY=3;

  //creating Ironman
  ironMan=createSprite(200,350,20,50);
  ironMan.scale=0.3;
  ironMan.addImage(ironManImg);
  
  //creating grounds(both at top and bottm)
  ground1=createSprite(500,600,1000,10);
  ground1.visible=false;
  ground2=createSprite(500,0,1000,10);
  ground2.visible=false;

  //creating groups
  stoneGroup=new Group();
  diamondGroup=new Group();
  spikeGroup=new Group();
}
function draw() 
{
  //this will make the background scroll
  if (bg.y>550){
    bg.y=bg.width/4;
  }

  //colliding Ironman with grounds
  ironMan.collide(ground1);
  ironMan.collide(ground2);
  
  //to move Ironman up
  if(keyDown("up")){
    ironMan.velocityY=-10;
  }

  //to move Ironman down
  if(keyDown("down")){
    ironMan.velocityY=+10;
  }

  //to move Ironman left
  if(keyDown("left")){
    ironMan.x=ironMan.x-5;
  }

  //to move Ironman right
  if(keyDown("right")){
    ironMan.x=ironMan.x+5;
  }
  generateSones();    //calling the function to generate stones

    //make Ironman collide with stones
    for(var i=0;i<(stoneGroup).length;i++){
      var temp=(stoneGroup).get(i);
      if(temp.isTouching(ironMan)){
        ironMan.collide(temp);
      }
    }
  generateDiamonds()    //calling the function to generate diamonds

    //Ironman catches the diamonds
    for(var i=0;i<(diamondGroup).length;i++){
      var temp=(diamondGroup).get(i);
      if(temp.isTouching(ironMan)){
        score++;             //increasing the score when Ironman touches the diamonds
        temp.destroy();      //destroying the diamonds when Ironman touches them 
        temp=null;
      }
    }
  generateSpikes()    //calling the function to generate spikes

    //Ironman is colliding with the spikes
    for(var i=0;i<(spikeGroup).length;i++){
      var temp=(spikeGroup).get(i);
      if(temp.isTouching(ironMan)){
        score=score-5;           //decreasing the score by 5 when Ironman touches the spikes
        temp.destroy();          //destroying the spikes when Ironman touches them
        temp=null;
      }
    }
  drawSprites();
  text("Total Score : "+score, 600,70);      //displaying the score
}
function generateSones()
{
  if(frameCount%70===0){
    console.log(frameCount);
    var stone=createSprite(random(0,1000),0,random(40,100),20);
    stone.addImage(stoneImg);
    stone.scale=random(1.0,1.2);
    stone.velocityY=random(2,4);
    stone.lifetime=350;
    stoneGroup.add(stone);
  }
}
function generateDiamonds()
{
  if(frameCount%70===0){
    console.log(frameCount);
    var diamond=createSprite(random(0,1000),0,random(40,100),20);
    diamond.addImage(diamondImg);
    diamond.scale=0.5;
    diamond.velocityY=random(2,4);
    diamond.lifetime=350;
    diamondGroup.add(diamond);
  }
}

function generateSpikes()
{
  if(frameCount%70===0){
    console.log(frameCount);
    var spike=createSprite(random(0,1000),0,random(40,100),20);
    spike.addImage(spikeImg);
    spike.scale=0.5;
    spike.velocityY=random(2,4);
    spike.lifetime=350;
    spikeGroup.add(spike);
  }
}