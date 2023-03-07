// import express function and morgan function
const express = require ('express'); 
const morgan = require('morgan');
// create an instance of an express application
const app = express();
// body-parser middleware to parse the request body as JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));


app.use('/style.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  });

// Setup the routes
// Route for the home page '/'
app.get('/', showInstructions);
app.get('/', (req, res) => {
    // Display game instructions and guess form here
    res.sendFile(__dirname + '/index.html');
});

// Route for handling the form submission
// 'guess'
app.post('/guess', handleGuess);
// app.post('/guess', (req,res) => {
//     // Process user guess and generate response here
//     console.log('form submitted');
// });

// Handler function for home page
function showInstructions(req, res) {
    // res.render('home', { message: null }); -> Use if using a view engine
    res.send(`
    <h1>Welcome to the Guessing Game!</h1>
    <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
    <form method="post" action="/guess">
      <label for="guess">Your guess:</label>
      <input type="number" id="guess" name="guess" required>
      <button type="submit">Guess!</button>
    </form>
  `);
  }
  
  // Handler function for guess submission
  function handleGuess(req, res) {
    console.log('handleGuess() called');
    const guess = parseInt(req.body.guess);
    const answer = Math.floor(Math.random() * 100) + 1;
    let message;
  
    if (isNaN(guess)) {
      message = "Please enter a valid number.";
    } else if (guess < answer) {
      message = "You guessed too low. Try again!";
    } else if (guess > answer) {
      message = "You guessed too high. Try again!";
    } else {
      message = "You guessed correctly! Congratulations!";
    }
  
    // res.render('home', { message: message }); -> Use when using a view engine
    res.send(`
    <h1>Welcome to the Guessing Game!</h1>
    <p>${message}</p>
    <form method="post" action="/guess">
      <label for="guess">Your guess:</label>
      <input type="number" id="guess" name="guess" required>
      <button type="submit">Guess again!</button>
    </form>
  `);
  };

  
  // Route for handling the form submission
  app.post('/guess', (req, res) => {
    handleGuess(req,res);
  });
  
  


const PORT = 1337;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});