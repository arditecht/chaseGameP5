//setup variables=======================================================//
var maxx = 1200;
var maxy = 600;
var scr_size; // vector pair, initialized in setup() func
var time = 0; // global time
var start = 0;
var has_win = 0;
var in_game = 0;


//character variables===================================================//
//character 1 -- humn  -- name: baby
var baby;
//character 2 -- comp  -- name: yash
var yash;
//character 3 -- comp  -- name: rick
var rick;
//character 4 -- comp  -- name: pash
var pash;


//object variables======================================================//
//envObject 1 -- fixd  -- name: bed
var bed;
//envObject 2 -- comp  -- name: life
var lives = 20.0;
//envObject 3 -- comp  -- name: scor
var score = 0.0;
var final_score;
//envObject 4 -- rand  -- name: choc
var chocolate;


//helper functions======================================================//
function update_baby() {
  var max_speed = 50.0;
  var targetdirx = 4.0 * ((mouseX - baby.posx)); // target direction x
  targetdirx = map(targetdirx, 0, maxx, 0, 100 * maxx / (maxx + maxy));
  var targetdiry = 4.0 * ((mouseY - baby.posy)); // target direction y
  targetdiry = map(targetdiry, 0, maxy, 0, 100 * maxy / (maxx + maxy));

  //var drag = dista(createVector(mouseX, mouseY), createVector(baby.posx, baby.posy));
  var drag = baby.drag;

  baby.velx += baby.accx;
  baby.vely += baby.accy;

  baby.velx = (targetdirx / drag + drag * baby.velx) / (drag + 1);
  baby.vely = (targetdiry / drag + drag * baby.vely) / (drag + 1);


  baby.posx += baby.velx;
  baby.posy += baby.vely;
}

function draw_baby() {
  ellipse(baby.posx, baby.posy, baby.dia, baby.dia);
}

function update_yash() {
  var targetdirx = 1.5 * ((baby.posx - yash.posx) % 200); // target direction x
  var targetdiry = 1.5 * ((baby.posy - yash.posy) % 200); // target direction y

  //var drag = dista(createVector(mouseX, mouseY), createVector(baby.posx, baby.posy));
  var drag = yash.drag;

  yash.velx += yash.accx;
  yash.vely += yash.accy;

  yash.velx = (targetdirx / drag + drag * yash.velx) / (drag + 1);
  yash.vely = (targetdiry / drag + drag * yash.vely) / (drag + 1);


  yash.posx += yash.velx;
  yash.posy += yash.vely;
}

function draw_yash() {
  ellipse(yash.posx, yash.posy, yash.dia, yash.dia);
}



function update_rick() {
  var targetdirx = 1.1 * ((baby.posx - rick.posx) % 400); // target direction x
  var targetdiry = 1.1 * ((baby.posy - rick.posy) % 400); // target direction y

  //var drag = dista(createVector(mouseX, mouseY), createVector(baby.posx, baby.posy));
  var drag = rick.drag;

  rick.velx += rick.accx;
  rick.vely += rick.accy;

  rick.velx = (targetdirx / drag + drag * rick.velx) / (drag + 1);
  rick.vely = (targetdiry / drag + drag * rick.vely) / (drag + 1);


  rick.posx += rick.velx;
  rick.posy += rick.vely;

}

function draw_rick() {
  ellipse(rick.posx, rick.posy, rick.dia, rick.dia);
}





function update_pash() {

}

function draw_pash() {
  ellipse(600, 200, 60, 60);
}


function draw_bed(){
  fill(255, 0, 0, map((2*time)%300, 0, 299, 200, 20)); 
  ellipse(bed.posx/2 + 50, maxy-40, (2*time)%300, (2*time)%300);
  fill(255, 219, 180);
  stroke(0);
  rect(50, bed.posy, bed.posx, maxy-bed.posy-15, 10, 10, 10 , 10);
  fill(100, 0, 255);
  textSize(22);
  text("RestRoom", 55, bed.posy+35);
}



//event handlers=======================================================//
function y_b_collision(){
  
}
function r_b_collision(){
  
}
function win(){
  background(0);
  textSize(72);
  textFont("Verdana");
  text("You win!", 400, 300);
  start = 0;
}
function lose(){
  background(0);
  textSize(72);
  textFont("Verdana");
  text("You lose! Score: "+score, 400, 300);
  start = 0;
}
function update_stats() {
  if (in_game === 0) return null;
  //check proximity in yash and baby, take action
  var yash_baby = dist(baby.posx, baby.posy, yash.posx, yash.posy);
  if (yash_baby < 150) {
    baby.velx /= 1.2;
    baby.vely /= 1.2;
    yash.velx *= 1.05;
    yash.vely *= 1.05;
    score += 0.2;
    if (yash_baby < (yash.dia) / 2 + (baby.dia) / 2) {
      lives -= 0.5;
      score += 0.1;
      y_b_collision();
    }
  }

  //check proximity in rick and baby, take action
  var rick_baby = dist(baby.posx, baby.posy, rick.posx, rick.posy);
  if (rick_baby < 230) {
    baby.velx /= 1.1;
    baby.vely /= 1.1;
    rick.velx *= 1.02;
    rick.vely *= 1.02;
    score += 0.2;
    if (rick_baby < (rick.dia) / 2 + (baby.dia) / 2) {
      lives -= 0.7;
      score += 0.2;
      r_b_collision();
    }
  }

  var bed_baby = dist(baby.posx, baby.posy, bed.posx/2 + 50, maxy-40);
  if(bed_baby < 120){
    lives+=0.2;
    score-=0.4;
  }
  
  textSize(32);
  textFont("Verdana");
  text("Health: "+lives.toFixed(3), 30, 40);
  text("Scores: "+score.toFixed(3), 530, 40);
  
  //end game scenarios
  if (score > 300){
    in_game = 0;
    win();
  }
  if (lives < 0.5) {
    in_game = 0;
    lose();
    //setup();
  }

}


//run time methods======================================================//
function setup() {
  //background(0);
  scr_size = createVector(maxx, maxy);
  noStroke();
  size_factor = 2;
  
  baby = {
    accx: 0.0,
    accy: 0.0,
    velx: 0.0,
    vely: 0.0,
    posx: maxx / 2,
    posy: maxy / 2,
    dia: 30 * size_factor,
    drag: 5
  };
  yash = {
    accx: 0.0,
    accy: 0.0,
    velx: 0.0,
    vely: 0.0,
    posx: 0,
    posy: 0,
    dia: 25 * size_factor,
    drag: 15
  };
  rick = {
    accx: 0.0,
    accy: 0.0,
    velx: 0.0,
    vely: 0.0,
    posx: maxx / 2,
    posy: 0,
    dia: 50 * size_factor,
    drag: 20
  };
  pash = {
    accx: 0.0,
    accy: 0.0,
    velx: 0.0,
    vely: 0.0,
    posx: 0,
    posy: maxy / 2,
    dia: 35 * size_factor,
    drag: 5
  };
  bed = {
    accx: 0.0,
    accy: 0.0,
    velx: 0.0,
    vely: 0.0,
    posx: 120,
    posy: maxy - 70,
    dia: 60 * size_factor,
    drag: 5000
  };
  createCanvas(scr_size.x, scr_size.y);
  
  fill(220, 150, 150);
  textSize(42);
  textFont("Verdana");
  text("Life: " +lives.toFixed(3), 580, maxy/2 - 50);
  text("Score: "+score.toFixed(3), 580, maxy/2 + 50);
    
  lives = 20.0;
  score = 0.0;
  start = 0;
  in_game = 1;
}

function draw() {
  
  if (start) {
    var r = map(mouseX, 0, maxx, 40, 150);
    var g = map(abs(mouseX - mouseY), 0, abs(maxx - maxy), 0, 80);
    var b = map(mouseY, 0, maxy, 150, 40);
    background(r, g, b);
    
    time = (time + 1) % 36001;
    
    draw_bed();
    
    fill(255);
    noStroke();
    update_baby();
    draw_baby();
    update_yash();
    draw_yash();
    update_rick();
    draw_rick();
    update_stats();
  } 
  else {
    if (mouseIsPressed) {
      start = 1;
    }
  }
  //ellipse(mouseX, mouseY, 8, 8);
}