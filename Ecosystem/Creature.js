class Creature{
    constructor(location, world, velcoityLimit = 5){
        this.location = location;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.velcoityLimit = velcoityLimit;
        this.world = world;
    }

    animate(){
        this.acceleration = createVector(0.05, 0);
    }

    update() {
        this.animate();
    
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.velocity.limit(this.velcoityLimit);
      }

    display() {
        stroke(0);
        fill(175);
        ellipse(this.location.x,this.location.y,16,16);
      }

    checkEdges() {
        if (this.location.x > width) {
          this.location.x = 0;
        } else if (this.location.x < 0) {
          this.location.x = width;
        }
     
        if (this.location.y > height) {
          this.location.y = 0;
        } else if (this.location.y < 0) {
          this.location.y = height;
        }
      }
}

class Fly extends Creature{
    constructor(location, world, velcoityLimit = 5){
      super(location, world, velcoityLimit);
      this.TIMER_LAND = 1000;
      this.timer= {land: this.TIMER_LAND};
      this.stop = false;
    }
    animate(){
      if(!this.stop){
        this.acceleration = p5.Vector.random2D();
        this.acceleration.setMag(0.5);
      }
      else
        this.acceleration = createVector(0, 0);
        
    }

    checkEdges() {
        if (this.location.x > width || this.location.x < 0) {
          this.velocity.x *= -1;
        }
     
        if(this.location.y == this.world.land && this.timer.land > 0){
          this.stop = true;
          this.timer.land--;
          if(this.timer.land <= 0){
            this.timer = this.TIMER_LAND;
          }
        }
        else if (this.location.y > this.world.land.y|| this.location.y < 0) {
          this.velocity.y *= -1;
        }
      }
}