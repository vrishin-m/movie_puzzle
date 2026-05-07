import { useState } from 'react'
import './App.css'
var question = "placeholder question potato tomato icecream thomas the train tung tung sahur"
var answer = ""
var num_attempts =0


function App() {
 const [submitted_answer, set_submitted_answer] = useState("");
 const [currentInput, setCurrentInput] = useState("");
 
 const handleSubmit = () => {
    set_submitted_answer(currentInput);
    num_attempts++;
    setCurrentInput("");
  };




  return (
    <>
    <div className="titlebar">
      <h1>Movie Puzzle Game</h1>
      <br />
      <h2> Made by Gandalf</h2>
    </div>
    
    <div className="game_ui">
      <br /> <br /> <br /> <br /> 
      <h1> "{question}"</h1>
      <br /><br /> <br /><br /><br /><br />
      
      <div className="submit">
        <textarea 
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Write your guess here"
        />
      
        <button onClick={handleSubmit}>Submit Answer</button>
      </div>

      <br />
      
      <p>Attempts: {num_attempts}</p>
      {num_attempts >= 2 && <button className="hint_button">Get Hint</button>}

    </div>

    

    </>
  )
}



export default App
