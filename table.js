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
        // set the background color
        if((i+j)%2===0) fill(255);
        else fill(0);

        // draw the square
        rect((j*scl)+x,y, scl, scl);

        // set the text color & size
        if((i+j)%2===0) fill(0);
        else fill(255);
        textSize(scl/3);

        // draw the index of the square
        text(i*cols+j, (j*scl)+x+(scl/2), y+scl-(scl/2));

        // draw the x and y coordinates of the square
        textSize(scl/6);
        text("x : "+j +"  "+ "y : "+i, (j*scl)+x+(scl/2), y+scl-10);
      }
      // move to the next row
      y+=scl;
    }
  }
}