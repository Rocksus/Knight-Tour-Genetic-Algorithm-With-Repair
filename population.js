// Population function holds the population entity
function Population(popsize) {
  // initialize variables
  this.generation = 1
  this.knights = [];
  this.popsize = popsize;
  this.matingpool = [];

  // fill the population with knight entities
  for (var i=0; i < this.popsize; i++)  {
    this.knights[i] = new Knight();
  }

  // evaluate function will calculate the fitness function for every knights
  // evaluation results will determine the mating pool
  this.evaluate = function()  {
    // initialize variables
    var maxfit=0;
    var bestKnight;

    // iterate through all of the knights in the population
    for (var i=0; i < this.popsize; i++)  {
      this.knights[i].calcFitness();
      
      // choose the knight with the highest fitness
      if(this.knights[i].fitness>maxfit)  {
        maxfit=this.knights[i].fitness;
        bestKnight = this.knights[i];
      }
    }

    // normalize fitness values
    for (var i = 0; i < this.popsize; i++) {
      this.knights[i].fitness /= maxfit;
    }

    // create a mating pool
    this.matingpool = [];

    // loop through every knight in the population
    for (var i = 0; i < this.popsize; i++) {
          // insert the knight's chromosome to the mating pool
          // n times according to how good its fitness value is
          var n = this.knights[i].fitness * 100;
          for (var j = 0; j < n; j++) {
            this.matingpool.push(this.knights[i]);
          }
        }

    // display the best knight's movements on the board
    bestKnight.show();

    // print the maximum fitness of the current generation
    stats.html("Generation " + this.generation + " maximum fitness is " + maxfit);

    // if we have found maximum fitness (all squares successfully visited)
    if(maxfit==(cols*cols))  {
      // stop the loop
      noLoop();

      // inform that we are done
    stats.html("Done with " + this.generation + " Generations");
      if(enableDatabase) {
      // push the new found tour into the database
        var knightlog = {
          knightgen: this.generation,
          moves: bestKnight.chromosome.genes
        }
        tourslog.push(knightlog);
      }
    }

    // add the generation count
    this.generation++;
  }

  // selection function selects a random parent A and parent B
  // from the mating pool and cross over their chromosomes together
  // this action is done for the number of population
  this.selection = function() {
    var newKnights = [];
    for (var i=0; i<this.popsize; i++) {
      // picks random parent candidates from the mating pool
      var parentA = random(this.matingpool).chromosome;
      var parentB = random(this.matingpool).chromosome;
      // crossover the chromosomes
      var child = parentA.crossover(parentB);
      // gives a mutation chance to the newly created knight
      child.mutation();
      // add the new knight to the array
      newKnights[i] = new Knight(child);
    }
    // replace the old population with the new one
    this.knights = newKnights;
  }

  // run function tells all of the knights to generate their moves
  this.run = function() {
    // loop for number of moves
    for(var i=0; i< cols*cols-1; i++) {
      // loop through each of the knights
      for (var j=0; j < this.popsize; j++)  {
        // tell the knight to generate a single move
        this.knights[j].move();
      }
    }
  }
}
