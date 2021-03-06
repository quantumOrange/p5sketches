function setup() {
  createCanvas(500,500);
  noFill()
  stroke(0)
}

function draw() {
  var startpoint = createVector(width/2.0,height/2.0)
  startpoint.add(p5.Vector.random2D().mult(100))
  
  //alternate black and white
  if(frameCount%2 == 0){
    stroke(0,0,0,255)
  }
  else {
    stroke(255,255,255,255)
  }
  
  //draw a tree
  tree(startpoint,50)
}

function tree(startPoint,scale) {
  var move = p5.Vector.random2D().mult(scale+ random(scale))
  var endPoint = p5.Vector.add(startPoint,move)
  strokeWeight(scale*0.05)
  scale *= 0.8;
  line(startPoint.x,startPoint.y,endPoint.x,endPoint.y)
  if(scale>3.0){
    tree(endPoint,scale)
    tree(endPoint,scale)
  }
}