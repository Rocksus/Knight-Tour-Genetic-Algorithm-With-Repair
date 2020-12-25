// Knight function holds all the data for a knight entity
function Knight(chromosome) {
  // initialize the knight entity
  // x, y holds the current knight position (currently pre-set to 0,0)
  this.x=0;
  this.y=0;
  this.steps=0;

  // use existing cross over parent chromosome if it does exist
  if(chromosome) {
    this.chromosome = chromosome;
  }
  else {
    // initialize a new random chromosome
    this.chromosome = new Chromosome();
  }

  // initialize variables
  this.path = [];
  this.fitness = 0;
  // the first path will start on (0, 0)
  this.path.push(createVector(this.x, this.y));
  // findForward will determine how the knight cycles possible steps to fix illegal moves
  this.findForward = boolean(Math.round(random(1)));

  // calcFitness goes through the paths and adds the fitness value until it reaches an invalid move
  this.calcFitness = function()  {
    // default state for legal is true
    legal=true;
    this.fitness = 0;
    
    // loops through paths taken by the knight
    for(var i = 0; i<this.path.length; i++) {
        // check whether the knight is outside of the board
        if(this.path[i].x<0 || this.path[i].x>cols-1 || this.path[i].y<0 || this.path[i].y>cols-1)  {
          legal=false;
        }
        // check whether the current square has been visited before
        for(var j=0; j<i; j++)  {
          if(this.path[i].x == this.path[j].x && this.path[i].y == this.path[j].y) {
            legal=false;
          }
        }
        // return when we have found an illegal move
        if(!legal)  {
          return
        }
        // increment fitness value
        this.fitness++;
    }
  }

  // move forward holds the possible moves of a knight in all direction
  this.moveForward = function(direction) {
    switch(direction)  {
      case 1: this.x+=1; this.y-=2; break;
      case 2: this.x+=2; this.y-=1; break;
      case 3: this.x+=2; this.y+=1; break;
      case 4: this.x+=1; this.y+=2; break;
      case 5: this.x-=1; this.y+=2; break;
      case 6: this.x-=2; this.y+=1; break;
      case 7: this.x-=2; this.y-=1; break;
      case 8: this.x-=1; this.y-=2; break;
    }
  }

  // trace back a move
  this.traceBack = function(direction) {
    switch(direction)  {
      case 1: this.x-=1; this.y+=2; break;
      case 2: this.x-=2; this.y+=1; break;
      case 3: this.x-=2; this.y-=1; break;
      case 4: this.x-=1; this.y-=2; break;
      case 5: this.x+=1; this.y-=2; break;
      case 6: this.x+=2; this.y-=1; break;
      case 7: this.x+=2; this.y+=1; break;
      case 8: this.x+=1; this.y+=2; break;
    }
  }

  // move the knight given its current turn
  this.move = function()  {
    // set default variables
    legal=false;
    limit = 0
    // we check if the move is either illegal or havent cycled through all of the possible moves
    // if we can't find a legal move, we continue
    while(!legal && limit++<8)  {
      this.moveForward(this.chromosome.genes[this.steps]);
      if((this.x>=0 && this.x<cols) && (this.y>=0 && this.y<cols)) {
            legal=true;
        for(var i=0; i<this.path.length; i++) {
          if((this.path[i].x==this.x) && (this.path[i].y==this.y)){
            legal=false;
          }
        }
      }
      // if the last move was illegal, attempt to trace back
      if(!legal) {
        this.traceBack(this.chromosome.genes[this.steps]);
        if(this.findForward) {
          this.chromosome.genes[this.steps] = (this.chromosome.genes[this.steps]%8)+1;
        }
        else {
          this.chromosome.genes[this.steps] = ((this.chromosome.genes[this.steps]+6)%8)+1;
        }
      }
    }
    // add the last move's coordinates to the knight's path array
    this.path[this.steps+1] = createVector(this.x, this.y);
    // increment the number of steps taken by the knight
    this.steps++;
  }

  // show function is used to display the knight's moves on the board
  // the moves will be displayed until an illegal move is encountered.
  this.show = function()  {
    legal=true;
    noStroke();
    for(var i=0; i < this.path.length; i++) {
      if(this.path[i].x<0 || this.path[i].x>cols-1 || this.path[i].y<0 || this.path[i].y>cols-1)  {
        legal=false;
      }
      for(var j=0; j<i; j++)  {
        if(this.path[i].x == this.path[j].x && this.path[i].y == this.path[j].y) {
          legal=false;
        }
      }
      if(legal)  {
        fill(0,255,0,150);
      }
      else {
        fill(255,0,0,150);
      }
      rect(this.path[i].x*scl,this.path[i].y*scl, scl, scl);
      fill(0,255,0);
      ellipse(this.path[i].x*scl+scl/2, this.path[i].y*scl+scl/2, scl/6, scl/6);
      fill(255);
      text(i+1, this.path[i].x*scl,this.path[i].y*scl, scl, scl);
    }
    strokeWeight(scl/20);
    stroke(0,255,0);
    noFill();
    beginShape();
    for(var i = 0; i < this.path.length; i++) {
      for(var j=0; j < i; j++) {
        if((this.path[i].x === this.path[j].x) && (this.path[i].y === this.path[j].y))  {
          legal=false;
        }
      }
    vertex(this.path[i].x*scl+scl/2,this.path[i].y*scl+scl/2);
    }
    endShape();
    chromosomes.html(this.chromosome.genes);
  }
}
