function Table()  {
  this.x=0;
  this.y=0;
  this.num=1;
  noStroke();
  textAlign(CENTER);
  this.show = function()  {
    for(var i=0;i<cols;i++)  {
      for(var j=0; j<cols; j++)  {
        if((i+j)%2===0) fill(255);
        else fill(0);
        rect((j*scl)+this.x,this.y, scl, scl);
        if((i+j)%2===0) fill(0);
        else fill(255);
        textSize(scl/3);
        text(this.num, (j*scl)+this.x+(scl/2), this.y+scl-(scl/2));
        textSize(scl/6);
        text("x : "+j +"  "+ "y : "+i, (j*scl)+this.x+(scl/2), this.y+scl-10);
        this.num++;
      }
      this.y+=scl;
    }
  }
}
