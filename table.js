// Table function holds the table entity
function Table()  {
  // show function draws the table on canvas
  this.show = function()  {
    noStroke();
    textAlign(CENTER);
    let x=0
    let y=0
    // loop through each squares and apply a checkerboard pattern
    // while also numbering each square
    for(var i=0;i<cols;i++)  {
      for(var j=0; j<cols; j++)  {
        if((i+j)%2===0) fill(255);
        else fill(0);
        rect((j*scl)+x,y, scl, scl);
        if((i+j)%2===0) fill(0);
        else fill(255);
        textSize(scl/3);
        text(i*cols+j, (j*scl)+x+(scl/2), y+scl-(scl/2));
        textSize(scl/6);
        text("x : "+j +"  "+ "y : "+i, (j*scl)+x+(scl/2), y+scl-10);
      }
      y+=scl;
    }
  }
}
