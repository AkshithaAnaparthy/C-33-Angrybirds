const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score;
var birds = []
var sound;

var gameState = "onSling";
var bg = "sprites/bg.png"
function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    gettime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    sound = loadSound("Sounds/rock_flying.mp3")

    score = 0;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird1 = new Bird(150,170);
    bird2 = new Bird(100,170);
    bird3 = new Bird(50,170);

    birds.push(bird)
    birds.push(bird1)
    birds.push(bird2)
    birds.push(bird3)



    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    
    pig1.score();
    pig3.score();

    textSize(30)
   fill("white")

   text(score, 1000, 100);
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.appyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5 , y:-5});
        return false
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    sound.play();
    birds.pop();
    return false
}

function keyPressed(){
    if((keyCode === 32 )&& gameState === "launched"){
        if(birds.length >= 0){
           
        
        slingshot.attach(birds[birds.length -1].body);
        bird.trajectory = []
         Matter.Body.setPosition(bird[birds.length -1 ], {x: 200 , y: 50});
         gameState = "onSling";
    }
}
  }


async function gettime (){
    var data = await fetch("http://worldclockapi.com/api/json/pst/now")
    var response = await data.json();
    console.log(response);
    var day = response.currentDateTime
    console.log(day);
    var time = day.slice(11,13);
    console.log(time);

    if(time > 08 && time < 19 ){
           bg = "sprites/bg.png";

    }
    else{
        bg = "sprites/bg2.jpg"
    }
    backgroundImg = loadImage(bg)
} 