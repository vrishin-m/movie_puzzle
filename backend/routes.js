const express = require('express');
const router = express.Router();
const puzzleController = require('./puzzles.js'); 
const check_guess = require('./puzzles.js');

router.get('/next', puzzleController.send_puzzle);


module.exports = router;


app.listen(port, () => {
  console.log(`backend is listening on port ${port}`)
})

app.post("/api/guess", (req, res) => {
    console.log(req.body.guess);
    guess = req.body.guess;
    check_guess();
    res.json({
        success: true,
        result: result
    });
});


app.post("/api/next", (req, res) => {
    if (req.body.next === "true") {
      console.log("SANJAAAAAAAY")
        send_puzzle(req.body.difficulty);
    }
    res.json({ success: true });
  });

