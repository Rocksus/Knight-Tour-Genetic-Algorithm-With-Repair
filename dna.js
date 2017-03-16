function DNA(genes)  {
  this.genes = [];
  if(genes) {
    this.genes = genes;
  }
  else {
    for (var i=0; i<cols*cols-1; i++)  {
        this.genes[i] = int(random(1, 9));
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(cols*cols-1));
    for (var i=0; i<cols*cols-1; i++)  {
      if(i > mid) {
        newgenes[i] = this.genes[i];
      }
      else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function()  {
    for (var i=0; i<this.genes.length; i++) {
      if(random(1)<0.01)  {
        this.genes[i] = int(random(1,9));
      }
    }
  }
}
