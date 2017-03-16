function Knight(dna) {
  this.x=0;
  this.y=0;
  this.legal=false;
  this.valid=true;
  this.limit=0;
  // this.openset=[];
  // this.openset[0] = createVector(this.x, this.y);
  // this.closedset=[];
  if(dna) {
    this.dna = dna;
  }
  else {
    this.dna = new DNA();
  }
  this.path = [];
  this.path.push();
  this.fitness = 0;
  this.path[0] = createVector(this.x, this.y);

  this.calcFitness = function()  {
    this.legal=true;
    for(var i = 0; i<this.path.length && this.legal; i++) {
        if(this.path[i].x<0 || this.path[i].x>cols-1 || this.path[i].y<0 || this.path[i].y>cols-1)  {
          this.legal=false;
        }
        for(var j=0; j<i; j++)  {
          if(this.path[i].x == this.path[j].x && this.path[i].y == this.path[j].y) {
            this.legal=false;
          }
        }
        if(this.legal)  {
          this.fitness++;
        }
    }
  }

  this.moveForward = function(gene) {
    switch(gene)  {
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

  this.traceBack = function(gene) {
    switch(gene)  {
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

  this.move = function()  {
    this.legal=false;
    while(!this.legal && this.limit++<100)  {
      this.moveForward(this.dna.genes[count]);
      if((this.x>=0 && this.x<cols) && (this.y>=0 && this.y<cols)) {
            this.legal=true;
        for(var i=0; i<this.path.length; i++) {
          if((this.path[i].x==this.x) && (this.path[i].y==this.y)){
            this.legal=false;
          }
        }
      }
      if(!this.legal) {
        this.traceBack(this.dna.genes[count]);
        if(findForward) {
          this.dna.genes[count] = (this.dna.genes[count]%8)+1;
        }
        else {
          this.dna.genes[count] = ((this.dna.genes[count]+6)%8)+1;
        }
      }
    }
    this.path[count+1] = createVector(this.x, this.y);
    this.legal=false;
    this.limit=0;

  }

  this.show = function()  {
    this.legal=true;
    noStroke();
    for(var i=0; i < this.path.length; i++) {
      if(this.path[i].x<0 || this.path[i].x>cols-1 || this.path[i].y<0 || this.path[i].y>cols-1)  {
        this.legal=false;
      }
      for(var j=0; j<i; j++)  {
        if(this.path[i].x == this.path[j].x && this.path[i].y == this.path[j].y) {
          this.legal=false;
        }
      }
      if(this.legal)  {
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
          this.legal=false;
        }
      }
    vertex(this.path[i].x*scl+scl/2,this.path[i].y*scl+scl/2);
    }
    endShape();
    chromosomes.html(this.dna.genes);
  }
}
