const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


var guess =''
var puzzle_json = {}
var result = false

async function send_puzzle(difficulty) {
  await generate_puzzle(difficulty);
  app.get("/api/puzzle", (req, res) => {
    res.json(puzzle_json);
  
});

}


async function generate_puzzle(difficulty) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `generate a ${difficulty} level puzzle that describes a famous movie in a ridiculous way. make the description as unidentifiable as possible, and keep it short. do not give any obvious indicators of the movie. also give the answer and 3 hints. keep the hints in small sentences. the second hint should be a bit more revealing than the first. example puzzle: A billionaire beats up the mentally ill while wearing a rubber suit → The Dark Knight. i need your response to contain a list where first element is the puzzle, second element is the answer, third element is a list of hints. do not include anything else in your response, only the list.`
  });


    const parsedResponse = JSON.parse(response.text);
    puzzle_json = {
      puzzle: parsedResponse[0],
      answer: parsedResponse[1],
      hints: parsedResponse[2],
      difficulty: parsedResponse[3]};
    
    console.log(puzzle_json);
    

}

function check_guess() {
  if (guess.toLowerCase() === puzzle_json.answer.toLowerCase()) {
    result = true
  } else {
    result = false
  }

}

module.exports = {
  send_puzzle,
  check_guess
}