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

  if(keyIsPressed == true){
    player.keyPressed();
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

  keyPressed(){
    if(keyCode == 87){
      this.y -= this.m
    }
    if(keyCode == 83){
      this.y += this.m
    }
    if(keyCode == 65){
      this.x -= this.m
    }
    if(keyCode == 68){
      this.x += this.m
    }
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