function Population() {
  this.knights = [];
  this.popsize = 1000;
  this.matingpool = [];

  for (var i=0; i < this.popsize; i++)  {
    this.knights[i] = new Knight();
  }

  this.evaluate = function()  {
    var maxfit=0;
    var bestKnight;
    for (var i=0; i < this.popsize; i++)  {
      this.knights[i].calcFitness();
      if(this.knights[i].fitness>maxfit)  {
        maxfit=this.knights[i].fitness;
        bestKnight = this.knights[i];
      }
    }
    for (var i = 0; i < this.popsize; i++) {
      this.knights[i].fitness /= maxfit;
    }
    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
          var n = this.knights[i].fitness * 100;
          for (var j = 0; j < n; j++) {
            this.matingpool.push(this.knights[i]);
          }
        }
    bestKnight.show();
    stats.html("GENERATION " + generation + " maximum fitness is " + maxfit);
    if(maxfit==(cols*cols))  {
      noLoop();
      console.log("DONE!");
      var knightlog = {
        knightgen: generation,
        moves: bestKnight.dna.genes
      }
      tourslog.push(knightlog);
    }
    generation++;
  }

  this.selection = function() {
    var newKnights = [];
    for (var i=0; i<this.knights.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newKnights[i] = new Knight(child);
    }
    this.knights = newKnights;
  }

  this.run = function() {
    for (var i=0; i < this.popsize; i++)  {
      this.knights[i].move();
    }
  }
}
