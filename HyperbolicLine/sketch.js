var p,q,m,n,P,Q;

var u1,u2,v1,v2;
//var center
var a;
var c;
var r;

var theta1, theta2;
var thetaP, thetaQ;
function setup() {
  
    createCanvas(800, 800);
    background(100);
	
    c = new Circle(createVector(width*0.5,height*0.5),200);
  
    p = new Node("p");

    q = new Node("q");
  
  	P = new Node("P");
    Q = new Node("Q");
  
 	 m = new Node("m");
  
    n = new Node("n");
    m.weight = 6;
    n.weight = 6;
    a = new Node("a");
  
  
    p.position = p5.Vector.add(c.center, createVector(100,100));
    q.position = p5.Vector.add(c.center, createVector(130,10));
  	update();
}

function draw() {
  
    background(255);
   
    stroke(0,125);
  strokeWeight(1);
    noFill();
    line(P.position.x,P.position.y,p.position.x,p.position.y);
    line(Q.position.x,Q.position.y,q.position.x,q.position.y);

    stroke(0,255);
    noFill();
    c.draw();
  
    stroke(0);
  
    fill(0);
    p.draw();
 	q.draw();
    m.draw();
    n.draw();
  	a.draw();
    stroke(0);
    fill(255);
    P.draw();
  	Q.draw();
  noFill();
    stroke(0,75);
    line(v1.x,v1.y,u1.x,u1.y);
    line(v2.x,v2.y,u2.x,u2.y);
  
  	ellipse(a.position.x,a.position.y,2*r,2*r);
  
   strokeWeight(2);
  stroke(0,255);
 
   arc(a.position.x,a.position.y,2*r,2*r,theta1,theta2);

}


function mousePressed() {
  var mouse = createVector(mouseX,mouseY);
   if(c.containsPoint(mouse)){
     update(mouse);
  }
}

function mouseDragged() {
  var mouse = createVector(mouseX,mouseY);
  
  if(c.containsPoint(mouse)){
     update(mouse);
  }
}

function update(x) {
  
  if(!( x === undefined )){
  
    if( x.dist(p.position)< x.dist(q.position)){
      p.position = x;
    }
    else {
      q.position = x;
    }
  } 
  
  
  	P.position = c.invert(p.position);
    Q.position = c.invert(q.position);
  
  
  //midpoints
  m.position = p5.Vector.lerp(p.position,P.position,0.5);
  n.position = p5.Vector.lerp(q.position,Q.position,0.5);
  
  
  var pP = p5.Vector.sub(p.position,P.position);
  var qQ = p5.Vector.sub(q.position,Q.position);
  pP.normalize();
  qQ.normalize();
  
  pP.rotate(PI/2);
  qQ.rotate(PI/2);
  
  var l = width;
  u1 = linePoint(m.position,pP,l);
  u2 = linePoint(n.position,qQ,l);
  v1 = linePoint(m.position,pP,-l);
  v2 = linePoint(n.position,qQ,-l);
 
  
  a.position = intersectLines(m.position,pP,n.position,qQ);
  r = a.position.dist(p.position);
 
  thetaP = (p5.Vector.sub(p.position,a.position).heading() + TWO_PI)%TWO_PI;
  thetaQ = (p5.Vector.sub(q.position,a.position).heading() + TWO_PI)%TWO_PI;
  
  console.log(thetaP + "," + thetaQ);
  console.log(thetaQ - thetaP);
  
  if(thetaP < thetaQ) {
    theta1 = thetaP
    theta2 = thetaQ
  }
  else {
    theta1 = thetaQ
    theta2 = thetaP
  }
  
  if((theta2 - theta1)>PI) {
   var temp = theta1
    theta1 = theta2;
    theta2 = temp;
  }
  
  
 

}



function Node(name){
  
    this.position = createVector(0,0);
    this.name = name;
	this.weight = 10;
    this.draw = function() {
      	fill(0);
        ellipse(this.position.x,this.position.y,this.weight,this.weight);
      	
      	fill(50,50,255)
      	textSize(16);
		text(this.name, this.position.x - this.weight,this.position.y - this.weight);
    }
  
}

function linePoint(p,n,s){
   return p5.Vector.add(p ,p5.Vector.mult(n,s));
}

/*
intersection of lines
  p1 + s*n1 = p2 + t*n2
*/
function intersectLines(p1,n1,p2,n2){
 
  //solve with cramers rule:
  var detA = det( n1.x, -n2.x, n1.y, -n2.y );
  var detA0 = det( p2.x - p1.x , -n2.x, p2.y - p1.y  ,-n2.y );
  
  var s = detA0/detA; 
  
  return linePoint(p1,n1,s);
 //  p5.Vector.add(p1 , p5.Vector.mult(n1,s));
}

/*
  determinant of
  |a b|
  |c d|
*/
function det(a,b,c,d) {
  return a*d - c*b;
}

function Circle(center,r) {
  this.r = r;
  this.center = center;

  this.containsPoint = function(p){
    
    return this.center.dist(p) < this.r;
    
  };

  this.invert = function(p){ 
    
      var op = this.center.dist(p);

      var oq = this.r*this.r/op;

      var dq = p5.Vector.sub(p,this.center).normalize().mult(oq);
      var newP = p5.Vector.add(this.center,dq)
     
      return newP;
    
  };

  this.draw = function() {
    
    ellipse(this.center.x,this.center.y, 2*this.r,2*this.r)
    
  }
  
  	
}