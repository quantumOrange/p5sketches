var v = new complex(0.0,0.0);
var theta = 0;
var r = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);  
  
} 

function draw() {
 
  translate(width/2,height/2);
  
  theta += 0.005;
  r += 0.0001
  v = new complex( r*cos(theta),r* sin(theta))
  
  julia(v,v);
}

function julia(z,w) {
  var hit = true;
  for(var i=0;i<50;i++){
    z1 = juliaEq(z,w);
    z.drawLine(z1);
    z = z1;
    
    if(z.modulus()>2.0){
      hit = false;
     // break;
    } 
  }
  return hit;
}

function juliaEq(z,w){
  	return z.sq().add(w);
}
  


function complex(x,y) {
  this.x = x;
  this.y = y;
  
  this.add = function(z){
    return new complex(this.x + z.x,this.y + z.y);
  }
  
  this.minus = function(z){
    return new complex(this.x - z.x,this.y - z.y);
  }
  this.mult = function(z){
    return new complex(this.x * z.x - this.y * z.y ,this.x * z.y + this.y * z.x);
  }
  
  this.sq = function() {
    	return this.mult(this);
  }
  
  this.modulus = function() {
    	return sqrt(this.x * this.x + this.y * this.y);
  }
  
  this.draw = function() {
    noStroke();
    fill(255,10);
    var scale = 400;
    var x = map(this.x, -2.0,2.0, -scale , scale);
    var y = map(this.y, -2.0,2.0, -scale , scale);
    ellipse(x,y,10,10);
  }
  
  this.drawLine = function(z) {
    stroke(255,1);
    noFill();
    var scale = 800;
    var x = map(this.x, -2.0,2.0, -scale , scale);
    var y = map(this.y, -2.0,2.0, -scale , scale);
    var x1 = map(z.x, -2.0,2.0, -scale , scale);
    var y1 = map(z.y, -2.0,2.0, -scale , scale);
    line(x,y,x1,y1);
  }
}