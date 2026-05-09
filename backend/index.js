const port = 3000
const express = require("express");
const cors = require("cors");
const app = express()
require('dotenv').config({ override: true });

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

const { GoogleGenAI } = require("@google/genai");



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


var guess =''
var puzzle_json = {}

async function main() {
  await generate_puzzle();
  app.get("/api/puzzle", (req, res) => {
    res.json(puzzle_json);
  
});

}

main();

app.listen(port, () => {
  console.log(`backend is listening on port ${port}`)
})

app.post("/api/guess", (req, res) => {
    console.log(req.body.guess);
    guess = req.body.guess;
    res.json({
        success: true
    });
});








async function generate_puzzle() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "generate a puzzle that describes a movie in a ridiculous way. make the description as unidentifiable as possible, and keep it short. do not give any obvious indicators of the movie. stick to very famous movies. also give the answer and 3 hints. keep the hints in small sentences. example puzzle: A billionaire beats up the mentally ill while wearing a rubber suit → The Dark Knight. i need your response to contain a list where first element is the puzzle, second element is the answer, third element is a list of hints, and fourth element is the difficulty level (easy, medium or hard). do not include anything else in your response, only the list."
  });

  

  
    const parsedResponse = JSON.parse(response.text);
    puzzle_json = {
      puzzle: parsedResponse[0],
      answer: parsedResponse[1],
      hints: parsedResponse[2],
      difficulty: parsedResponse[3]};
    
    console.log(puzzle_json);
    

}
