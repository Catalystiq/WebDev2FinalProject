let size = 100
let bubbles = new Array(size)
let player
let width = window.innerWidth
let height = window.innerHeight
let upperRadius = 1
let lowerRadius = 20
let move = 1

function setup() {
  createCanvas(width, height)
  bubbles = bubbles.fill().map(() => new Bubble(random(width), random(height), random(lowerRadius, upperRadius), width, height, '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), move, 4))
  player = new Player(width/2, height/2, 10, '#ffffff', 5)
}

function draw() {
  background(0)
  for (let bubble = 0; bubble < bubbles.length; bubble++) {
    bubbles[bubble].move()
    bubbles[bubble].show()
    bubbles[bubble].checkCollision()
  }
  player.show()
  if(mouseIsPressed == true){
    player.mousePressed();
  }
}

class Player{
  constructor(x, y, r, c, m){
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.m = m
  }

  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(4)
    ellipse(this.x, this.y, this.r * 2)
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
    ellipse(playerLocation.x, playerLocation.y, this.r)
  }
}

class Bubble {
  constructor(x, y, r, w, h, c, m, s) {
    this.x = x
    this.y = y
    this.r = r
    this.w = w
    this.h = h
    this.c = c
    this.m = m
    this.s = s
    this.dx = x
    this.dy = y
  }

  move() {
    // if(this.r >= player.r){
    //   if (this.x <= this.w && this.y <= this.h && this.x >= 0 && this.y >= 0) {
    //     this.x += this.m
    //     this.y += this.m
    //   } else {
    //     this.x = random(0, this.w)
    //     this.y = random(0, this.h)
    //   }
    // }

    if (this.x <= this.w && this.y <= this.h && this.x >= 0 && this.y >= 0) {
      if(this.r >= player.r){
        this.x += this.m
        this.y += this.m
      }else{
        this.x -= this.m
        this.y -= this.m
      }
    } else {
      this.x = random(0, this.w)
      this.y = random(0, this.h)
    }
  }

  checkCollision(){
    if(Math.floor(this.x + this.r) >= Math.floor(player.x - player.r) && Math.floor(this.y + this.r) >= Math.floor(player.y - player.r) && Math.floor(this.x - this.r) <= Math.floor(player.x + player.r) && Math.floor(this.y - this.r) <= Math.floor(player.y + player.r)){
      player.r += this.r/4
      this.r = 0
      this.s = 0
    }
  }

  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(this.s)
    ellipse(this.x, this.y, this.r * 2)
  }
}