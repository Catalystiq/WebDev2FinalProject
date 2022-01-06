let size = 100
let bubbles = new Array(size)
let player
let width = window.innerWidth
let height = window.innerHeight
let upperRadius = 10
let lowerRadius = 10
let move = 1

function setup() {
  createCanvas(width, height)
  bubbles = bubbles.fill().map(() => new Bubble(random(width), random(height), random(lowerRadius, upperRadius), width, height, '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), move))
  player = new Player(width/2, height/2, 20, 20, '#ffffff', 5)
}

function draw() {
  background(0)
  for (let bubble = 0; bubble < bubbles.length; bubble++) {
    bubbles[bubble].move()
    bubbles[bubble].show()
  }
  player.show()
  if(mouseIsPressed == true){
    player.mousePressed();
  }
}

class Player{
  constructor(x, y, w, h, c, m){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
    this.m = m
  }

  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(4)
    rect(this.x, this.y, this.w, this.h)
  }

  mousePressed(){
    let playerLocation = createVector(this.x, this.y)
    let target = createVector(mouseX,mouseY)
    let distance = target.dist(playerLocation)
    let mappedDistance = map(distance, 100, 0, 1.5, 0.5)
    target.sub(playerLocation)
    target.normalize()
    target.mult(mappedDistance)
    playerLocation.add(target)
    this.x = playerLocation.x
    this.y = playerLocation.y
    rect(playerLocation.x, playerLocation.y, this.w, this.h)
    //line(playerLocation.x, playerLocation.y, mouseX, mouseY)
    // this.y = mouseY
    // this.x = mouseX
  }
}

class Bubble {
  constructor(x, y, r, w, h, c, m) {
    this.x = x
    this.y = y
    this.r = r
    this.w = w
    this.h = h
    this.c = c
    this.m = m
    this.dx = x
    this.dy = y
  }

  move() {
    if (this.x <= this.w && this.y <= this.h && this.x >= 0 && this.y >= 0) {
      this.x += random(-this.m, this.m)
      this.y += random(-this.m, this.m)
    } else {
      this.x = this.dx
      this.y = this.dy
    }
  }


  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(4)
    ellipse(this.x, this.y, this.r * 2)
  }
}