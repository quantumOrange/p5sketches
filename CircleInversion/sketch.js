var p;
var q;

var a
var c;
var cnode;

function setup() {
  
    createCanvas(800, 800);
    background(100);

    c = new Circle(createVector(width*0.5,height*0.5),100);
  	cnode = new Node("C");
  	cnode.weight = 5;
  	cnode.position = c.center;
  
    p = new Node("P");

    q = new Node("Q");
    a = new Node("A");
  	a.weight = 7;
  	update(700,400);
}

function draw() {
  
    background(255);
    noStroke();
	fill(0,0,255,30);
  	triangle(a.position.x,a.position.y, c.center.x,c.center.y  ,  p.position.x,p.position.y)
    triangle(a.position.x,a.position.y, c.center.x,c.center.y  ,  q.position.x,q.position.y)
    stroke(0,125);
    noFill();
    line(c.center.x,c.center.y,p.position.x,p.position.y);
    line(c.center.x,c.center.y,q.position.x,q.position.y);

    stroke(0,255);
    noFill();
    c.draw();
  
	fill(0);
 	cnode.draw();
  
    stroke(0);
    fill(0);
    p.draw();

    stroke(0);
    fill(255);
    q.draw();

    stroke(0);
    fill(0,0,255);
    a.draw();

}

function mousePressed() {
    update(mouseX,mouseY);
}

function mouseDragged() {
    update(mouseX,mouseY);
}

function update(x,y) {
  
    p.position = createVector(x,y);
    q.position = c.invert(p.position);
 
  var phi
  var d
  if(p.position.dist(c.center) > c.r) {
  
  	phi  = p5.Vector.sub(p.position,c.center).heading();
  	d = c.center.dist(q.position);
  }
  else {
    phi  = p5.Vector.sub(q.position,c.center).heading();
  	d = c.center.dist(p.position);
    
  }
  
  	var alpha = acos(d/c.r);

  
    var v = p5.Vector.fromAngle(phi + alpha);
    v.mult(c.r);
    a.position = p5.Vector.add(c.center,v);
}

function Node(name){
  
    this.position = createVector(0,0);
    this.name = name;
	this.weight = 10;
    this.draw = function() {
      	
        ellipse(this.position.x,this.position.y,this.weight,this.weight);
      	
      	fill(50,50,255)
      	textSize(16);
		text(this.name, this.position.x - 10,this.position.y - 10);
    }
  
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