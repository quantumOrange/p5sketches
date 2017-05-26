function setup() {
  createCanvas(800, 800); 
  background(0);  
} 

function draw() {
  var p = createVector(width/2,height)
  var v = createVector(0,-random(3))
  tendril(p,v,random(5,13),1.0)
}

function tendril(p,v,thickness, alpha){
  var newP = p5.Vector.add(p,v);
  var newV = v.rotate(random(-0.1,0.1));
  var newThickness = thickness*0.995;
  var newAlpha = alpha*0.95;
  
  strokeWeight(thickness)
  noFill();
  stroke(255,5);
  line(p.x,p.y,newP.x,newP.y);
  
  if(thickness>1.0){
    tendril(newP,newV,newThickness,newAlpha)
  }
}