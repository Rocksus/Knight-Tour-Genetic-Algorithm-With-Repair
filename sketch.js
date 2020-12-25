
// populationSize, change this to experiment around
var populationSize = 1000;
// set this to true if you want to implement your own database
var enableDatabase = false;
// number of columns
// this also applies to row
var cols=8;

// variable initialization
var scl;
var population;
var table;
var stats;
var chromosomes;
var tourslog;
var generations = [];
var knightmoves = [];
var toursdata;

// setup is a p5js function that
// will run only once
function setup() {
  // create a 800x800 pixel canvas
  createCanvas(800,800);
  // set the background to black
  background(0);
  // set fill color to white
  fill(255);

  // set scale to be width of canvas divided by number of columns
  scl=width/cols;

  // initialize new table
  table = new Table();

  // initialize new population with the population size
  population = new Population(populationSize);

  // display the table
  table.show();
  
  // create a paragraph element
  stats = createP("Stats");
  // place the paragraph on 850, 10
  stats.position(850,10);
  // add class "stats" to the paragraph
  stats.class("stats");
  // rename paragraph element to say GENERATION 0
  stats.html("GENERATION 0");

  // create a new paragraph element
  chromosomes = createP("Chromosomes");
  chromosomes.position(850,40);
  chromosomes.class("chromosomes");
  chromosomes.html("Chromosomes");

  
  if(enableDatabase) {
    // create a new paragraph element
    toursdata = createP("");
    toursdata.position(850,70);
    toursdata.class("toursdata");
    
    // create config key to connect with the firebase database
    // to store existing tours
    // change the config according to your apiKey (in constants.js)
    // NOTE: DO NOT STORE API KEYS IN YOUR REPOSITORY
    var config = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID
    };
    // initialize firebase
    firebase.initializeApp(config);
  
    var database = firebase.database();
    tourslog = database.ref('tourslog');
  
    var ref = database.ref('tourslog');
    // fetch data from firebase to show how many valid tours that we have covered
    ref.on('value',gotData,errData);
  }
}

// gotData is the function to process the fetched tours from the database
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

// draw function is the p5js function
// that will constantly loop
function draw() {
  // run a generation of the genetic algorithm
  population.run();

  // refresh the table
  table.show();

  // evaluate the GA's generation
  // display the best candidate on the board
  population.evaluate();

  // select the candidates for the next GA generation
  population.selection();
}
