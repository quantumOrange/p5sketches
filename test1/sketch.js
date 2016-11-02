function setup() {
  createCanvas(windowWidth, windowHeight); 
}

function draw() {
  noFill();
  ellipse(0.5*width,0.5*height,0.35*width,0.35*height);
  ellipse(0.5*width,0.5*height,0.5*width,0.5*height);
  ellipse(0.5*width,0.5*height,0.75*width,0.75*height);
  ellipse(0.5*width,0.5*height,0.75*width,1.0*height);
  ellipse(0.5*width,0.5*height,1.0*width,0.75*height);
}