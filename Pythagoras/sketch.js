var v,v1,v2,dv;
var pickup = 50;
var maxSide = 160;
var anchorPoint;

//Interactive proof of pythagoras theorem c^2  = a^2 + b^2
//The two squares at the bottom have the same area becuase they both have sides a+b.
//The one on the left is the c square plus four triangles.
//The one on the right is the a square plus the b square plus four triangles.
//Both squares have 4 equal trinagles and the same area, so whats left over must also be equal.

function setup() {
   
  createCanvas(400,1200); 
 
  background(255);
    colorMode(HSB,360,100,100);

  
  	v = createVector(100,250);
   // v2 = createVector(v.x+150,v.y-75)
    tx = 107;
    ty=0;
    strokeWeight(2.0);
    v2 = createVector(v.x+170,v.y-75);
  	anchorPoint = v2.copy();
} 

function draw() {
  	
   	background(0,0,100);
  	fill(220,10,100);
  
  	if(mouseIsPressed){
        if( dist(v2.x,v2.y ,mouseX,mouseY)< pickup && mouseX>v.x && mouseX<v.x + maxSide && mouseY < v.y && mouseY > v.y-maxSide){
            v2 = createVector(mouseX,mouseY);
            //anchorPoint = createVector(v.x+a,v.y-b);
            anchorPoint = createVector(mouseX,mouseY);
            pickedUp = true;
        }
        else if(pickedUp){
            var m = createVector(mouseX,mouseY);
            //average down anchorpoint
            anchorPoint = p5.Vector.add(v2,m).mult(0.5);

        }
  }
  else{
      //average down anchorpoint
      anchorPoint = p5.Vector.add(v2,anchorPoint).mult(0.5);
      pickedUp = false;
  }
  v1 = createVector(v2.x,v.y);
  dv = p5.Vector.sub(v,v2);
  
  var a = abs(dv.x);
  var b = abs(dv.y);
  //Pythagoras! c^2 = a^2 + b^2
  var c = dv.mag();
	
  var side = a+b;
  var ds = 0.5*(a+b);
	
 
  


  fill(220,70,100);
 //;
triangle(v.x,v.y,v1.x,v1.y,v2.x,v2.y);
  //squares a and b
  fill(30,70,100);
  rect(v.x,v.y,a,a);
  fill(50,70,100);
  rect(v.x+a,v.y-b,b,b);

  //rotate square c
  theta =  atan(b/a);
  push();
      translate(v.x,v.y);
      rotate(-theta);
      fill(0,70,100);
      rect(0,-c,c,c);
  pop();
 
  //draw an anchor on the triangle 
  fill(0,0,100);
  ellipse(anchorPoint.x,anchorPoint.y,10,10)
  
  
  //draw an anchor on the triangle 
  fill(0,0,00);
  ellipse(v.x,v.y,5,5);
  //4 triangles + square c
  push();
     
      //to line up the corner with the v 
      translate(b , 0);
  
      //to center 
      translate(-v.x + 0.5*width- 0.5*side, -v.y +0.5* width +  0.5*side);
  
      //to shift down the page
      translate(0,width);
  
      fill(220,70,100);
      triangle(v.x,v.y,v.x+a, v.y-b ,v.x+a,v.y);
      triangle(v.x,v.y,v.x-b, v.y ,v.x-b,v.y-a);
      triangle(v.x+a-b,v.y-a-b,v.x-b, v.y-a-b ,v.x-b,v.y-a);
      triangle(v.x+a-b,v.y-a-b,v.x+a, v.y-a-b ,v.x+a,v.y-b);

      push();
          translate(v.x,v.y);
          rotate(-theta);
          fill(0,70,100);
          rect(0,-c,c,c);
      pop();
  pop();	
  
  //4 triangles + square a + square b
  push();
    
  //to line up the corner with the v 
      translate(0 , -a);
  
      //to center 
      translate(-v.x + 0.5*width- 0.5*side, -v.y +0.5* width +  0.5*side);
  
  	//down the page
    translate(0,2*width);
    fill(220,70,100);
    triangle(v.x,v.y,v.x+a, v.y-b ,v.x+a,v.y);
    triangle(v.x,v.y,v.x+a, v.y-b ,v.x,v.y-b);
    triangle(v.x+a,v.y,v.x+a+b, v.y ,v.x+a,v.y+a);
    triangle(v.x+a,v.y+a,v.x+a+b, v.y+a ,v.x+a+b,v.y);

    fill(30,70,100);
    rect(v.x,v.y,a,a);
    fill(50,70,100);
    rect(v.x+a,v.y-b,b,b);
  pop();	
}