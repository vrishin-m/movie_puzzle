const port = 3000
const express = require("express");
const cors = require("cors");
const app = express()
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ override: true });

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

const { GoogleGenAI } = require("@google/genai");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    console.log("Success! User created.");
    return res.status(201).json({ 
      message: "User created", 
      token: data.session?.access_token,
      user: data.user 
    });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});



app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json(error);
  res.json({ token: data.session.access_token });
});





const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: "No token provided. Please log in." });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }

  req.user = user;
  next(); 
};









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

send_puzzle("easy");

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
      difficulty: difficulty};
    
    console.log(puzzle_json); 

}

function check_guess() {
  if (guess.toLowerCase() === puzzle_json.answer.toLowerCase()) {
    result = true
  } else {
    result = false
  }
}