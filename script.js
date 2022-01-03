//document.body.style.margin = "0";
//document.body.style.padding = "0";
let size = 1000
let bubbles = new Array(size)
let width = window.innerWidth
let height = window.innerHeight
let upperRadius = 0.1
let lowerRadius = 0.1
let move = 1

function setup() {
  createCanvas(width, height)
  bubbles = bubbles.fill().map(() => new Bubble(random(width), random(height), random(lowerRadius, upperRadius), width, height, '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), move))
}

function draw() {
  
  background(0)
  for (let bubble = 0; bubble < bubbles.length; bubble++) {
    bubbles[bubble].move()
    bubbles[bubble].show()
  }
}

class Bubble {
  constructor(x, y, r, l, w, c, m) {
    this.x = x
    this.y = y
    this.r = r
    this.l = l
    this.w = w
    this.c = c
    this.m = m
    this.dx = x
    this.dy = y
  }

  move() {
    if (this.x <= this.l && this.y <= this.w && this.x >= 0 && this.y >= 0) {
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