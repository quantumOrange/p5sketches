var loopRadii = [];
var tempArray = [];
var n = 60;//number of radii 
var center;
var standard_deviation_dr = 3.7;
var max_dr = 10.0;

//Draws a loop with varying radii around the loop.
//The radii perform a random walk, but remain close to their nieghbours.

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(255); 
  center = createVector(0.5*width, 0.5*height);
  
  var initialRadius = width < height ? 0.25*width : 0.25*height;
  
  //fill out the array of radii
  for(var i =  0; i < n; i++){
    loopRadii[i] = initialRadius;
  }
  
  
  strokeWeight(1.0);
  noFill;
  stroke(0,4);
} 

function draw() {
  var fr = frameRate();
  var time = frameCount/fr;
  
  
  var mean_dr = -cos(0.3*time);
 // mean_dr =1.0;
  //update radii
  for(var i =  0; i < n; i++){
    var dr = randomGaussian(mean_dr,standard_deviation_dr);
   	var r = loopRadii[i];
    var temp = r + dr;
    
    //radial seperation from nieghtbours
    var r_plus = loopRadii[(i+1)%n];
    var r_minus = loopRadii[abs((i-1)%n)]
    var dr_plus =  abs(r_plus - temp);
    var dr_minus =  abs(r_minus - temp);
  
    if(dr_plus <max_dr && dr_minus<max_dr) {
      //update with new location
      tempArray[i] = temp;
   }
    else {
      //The new (temp) location is too far from it neighbours, so we average it out instead.
      tempArray[i] = 0.3333*(r_plus + r_minus + r);
    }
  } 
  loopRadii = tempArray;
  
  //slowly rotate the loop
  var theta0 = 0.1*time;
  
  //render loop
  for(var i =  0; i < n; i++){
    var theta1 = theta0 +  TWO_PI  * i / n ;
    var theta2 = theta0 + TWO_PI  * ((i+1)%n )/ n ;
    var r1 = loopRadii[i];
    var r2 = loopRadii[(i+1)%n];
    //print(r1 +"," + r2 );
    translate(center.x,center.y);
    line( r1*sin(theta1),r1*cos(theta1),  r2*sin(theta2),r2*cos(theta2));
    translate(-center.x,-center.y);
  }
}