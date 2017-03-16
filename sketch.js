var scl;
var population;
var count=0;
var table;
var generation=1;
var stats;
var chromosomes;
var cols=8;
var tourslog;
var generations = [];
var knightmoves = [];
var toursdata;
var findForward;

function setup() {
  createCanvas(800,800);
  background(0);
  fill(255);
  scl=width/cols;
  table = new Table();
  population = new Population();
  table.show();
  stats = createP("Stats");
  stats.position(850,10);
  stats.class("stats");
  stats.html("GENERATION 0");
  chromosomes = createP("Chromosomes");
  chromosomes.position(850,40);
  chromosomes.class("chromosomes");
  chromosomes.html("Chromosomes");
  toursdata = createP("");
  toursdata.position(850,70);
  toursdata.class("toursdata");
  findForward = boolean(Math.round(random(1)));

  var config = {
    apiKey: "AIzaSyATpSjNGEcz54BltY8BTmJxqQXURYge68c",
    authDomain: "knight-tour-b14ec.firebaseapp.com",
    databaseURL: "https://knight-tour-b14ec.firebaseio.com",
    storageBucket: "knight-tour-b14ec.appspot.com",
    messagingSenderId: "871228350863"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  tourslog = database.ref('tourslog');

  var ref = database.ref('tourslog');
  ref.on('value',gotData,errData);
}

function gotData(data)  {
  generations = [];
  knightmoves = [];
  var average=0;
  var addtoCount;
  var tourscount = 0;
  var tours = data.val();
  var keys = Object.keys(tours);
  for(var i=0; i<keys.length; i++)  {
    var k=keys[i];
    generations.push(tours[k].knightgen);
    knightmoves.push(tours[k].moves);
  }
  for(var i=0; i<knightmoves.length; i++) {
    addtoCount=true;
    for(var j=0; j<i; j++)  {
      if(knightmoves[i]===knightmoves[j]) {
        addtoCount=false;
      }
    }
    if(addtoCount)  {
      tourscount++;
    }
  }
  for(var i=0; i<generations.length; i++) {
    average+=generations[i];
  }
  average/=generations.length;
  toursdata.html("We have found " + tourscount + " different tours with an average of "+ average + " generations.");
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

function draw() {
  population.run();
  count++;
  if(count==(cols*cols)-1) {
    table = new Table();
    table.show();
    population.evaluate();
    population.selection();
    count=0;
  }
}
