// Chromosome function holds the chromosome entity
function Chromosome(genes)  {
  // initialize variables
  // genes will hold the unique traits of the chromosome
  this.genes = [];
  // apply an existing set of genes if given one
  if(genes) {
    this.genes = genes;
  }
  else {
    // generate random genes
    for (var i=0; i<cols*cols-1; i++)  {
        this.genes[i] = int(random(1, 9));
    }
  }

  // crossover attempts to mix the genes between 2 chromosomes
  this.crossover = function(partner) {
    var newgenes = [];
    // pick a mid divider that will determine which gene to take for the current index
    var mid = floor(random(cols*cols-1));
    for (var i=0; i<cols*cols-1; i++)  {
      if(i > mid) {
        newgenes[i] = this.genes[i];
      }
      else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new Chromosome(newgenes);
  }

  // mutation will attempt to randomly alter the genes
  this.mutation = function()  {
    for (var i=0; i<this.genes.length; i++) {
      if(random(1)<0.01)  {
        this.genes[i] = int(random(1,9));
      }
    }
  }
}
