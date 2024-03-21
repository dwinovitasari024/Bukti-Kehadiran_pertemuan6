let judul;
let tombol;
let objek;
let jalan = false;
let gravForce;
let windForce;

//Bukti kehadiran : buat program seperti ini dengan informasi nama dan nim diantara judul simulasi dan tombol

function setup() {
  createCanvas(windowWidth, windowHeight);
  tombol = createButton('Jalankan/Hentikan');
  tombol.position(50,130)
  objekPos = createVector(width/10,height/2);
  objekVel = createVector(10,5);
  objekAcc = createVector(0.1,0);
  objekMass = 10;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  gravForce = createVector(0, objek.mass*0.01);
  windForce = createVector(0.001,0);
}

function draw() {
  background(255,255,224);
  judul = createElement('h1', ' Percobaan Simulasi Hukum Newton')
  judul.position(50, 15)
  judul = createElement('h3', 'Nama :Dwi Novitasari')
  judul.position(50, 60)
  judul = createElement('h3', 'NIM : 122160024')
  judul.position(50, 85)
  objek.display();
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  tombol.mousePressed(run);

  if (jalan){
    objek.update();
  } 
}

function run(){
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    strokeWeight(2);
    fill(255,255,0);
    ellipse(this.location.x, this.location.y, 8*this.mass, 8*this.mass);
    ellipse(this.location.x,this.location.y)

    fill('black')
    ellipse(this.location.x-11, this.location.y-10.5, -1*this.mass, 1.5*this.mass);
      ellipse(this.location.x+11, this.location.y-10.5, -1*this.mass, 1.5*this.mass);
    fill(255,140,0)
    ellipse(this.location.x-0.5,this.location.y+11,3*this.mass, 1*this.mass);
    
    
 }
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }
}