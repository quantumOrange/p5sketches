var opacity = 20.0;
function setup() {
  createCanvas(800,800)
  background(0);
}

function draw() {

  stroke(255,opacity);
 opacity *= 0.99;
  translate(400,height);
  //print(opacity);
  var angle = random(0,6.14);
  
  branch(281,angle);
}


function branch(len,theta) {
  line(0,0,0,-len);
  translate(0,-len);
  
  var a = random(1.0);
  
  if(len>2){
    push();
      rotate(theta);
      branch(0.618*len,theta);
    pop();
    push();
      rotate(-theta);
      branch(0.618*len,theta);
    pop();
     
  }
 
  
}