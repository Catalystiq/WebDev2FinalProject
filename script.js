let size = 100
let bubbles = new Array(size)
let player
let width = window.innerWidth
let height = window.innerHeight
let upperRadius = 1
let lowerRadius = 25
let move = 1
let win = false
let lose = false

function setup() {
  createCanvas(width, height)
  bubbles = bubbles.fill().map(() => new Bubble(random(width), random(height), random(lowerRadius, upperRadius), width, height, '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), move, 4))
  player = new Player(width/2, height/2, 8, '#ffffff', 5, 4)
}

function draw() {
  background(0)
  for (let bubble = 0; bubble < bubbles.length; bubble++) {
    bubbles[bubble].move()
    bubbles[bubble].show()
    bubbles[bubble].checkCollision()
    
    for(let i = 0; i < bubbles.length; i++){
      if(bubbles[i].r == 0 ){
        if(i == bubbles.length-1){
          win == true
          document.getElementById("win").style.display = "flex"
        }
      }
    }
  }
  player.show()
  if(mouseIsPressed == true){
    player.mousePressed();
  }

  if(win == true){
    document.getElementById("win").style.display = "flex"
  }
}

class Player{
  constructor(x, y, r, c, m, s){
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.m = m
    this.s = s
  }

  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(this.s)
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

    if (this.x <= this.w && this.y <= this.h && this.x >= 0 && this.y >= 0) {
      if(lose == false){
        if(this.r >= player.r){
          if(player.x >= width/2){
            this.x += this.m
          }else if(player.x < width/2){
            this.x -= this.m
          }if(player.y >= height/2){
            this.y += this.m
          }else if(player.y < height/2){
            this.y -=this.m;
          }
        }else{
          if(player.x >= width/2){
            this.x -= this.m
          }else if(player.x < width/2){
            this.x += this.m
          }if(player.y >= height/2){
            this.y -= this.m
          }else if(player.y < height/2){
            this.y +=this.m;
          }
        }
      }

    } else {
      this.x = random(0, this.w)
      this.y = random(0, this.h)
    }
  }

  checkCollision(){
    if(this.r < player.r){
      if(Math.floor(this.x + this.r) >= Math.floor(player.x - player.r) && Math.floor(this.y + this.r) >= Math.floor(player.y - player.r) && Math.floor(this.x - this.r) <= Math.floor(player.x + player.r) && Math.floor(this.y - this.r) <= Math.floor(player.y + player.r)){
        player.r += this.r/8
        this.r = 0
        this.s = 0
      }
    }else{
      if(Math.floor(this.x + this.r) >= Math.floor(player.x - player.r) && Math.floor(this.y + this.r) >= Math.floor(player.y - player.r) && Math.floor(this.x - this.r) <= Math.floor(player.x + player.r) && Math.floor(this.y - this.r) <= Math.floor(player.y + player.r)){
        this.r += player.r/8
        player.r = 0
        player.s = 0
        lose = true;
        document.getElementById("lose").style.display = "flex"
        document.get
      }
    }
    
  }

  show() {
    stroke(this.c)
    fill(this.c)
    strokeWeight(this.s)
    ellipse(this.x, this.y, this.r * 2)
  }
}