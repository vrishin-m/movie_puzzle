import { useEffect, useState } from 'react'
import './App.css'

var num_attempts =0
var guess =""

function App() {
    var [question, setQuestion] = useState<string | null>(null);
    var [hints, setHints] = useState<string[]>([]);
    var [answer, setAnswer] = useState<string | null>(null);



    

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(
                "http://localhost:3000/api/puzzle"
            );
            
            const data = await res.json();
          
            console.log(data);
            setQuestion(data.puzzle);
            setHints(data.hints);
            setAnswer(data.answer);
            console.log(question);
          }
         fetchData();
    }, []);
   


   

  

   
    

 const [currentInput, setCurrentInput] = useState("");
 
 const handleSubmit = () => {
   
    guess = currentInput;
    num_attempts++;
    setCurrentInput("");
    
    sendData()
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
      <h1> {question}</h1>
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

const sendData = async () => {
    console.log(guess);
    const res = await fetch("http://localhost:3000/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            guess: guess
            
        })
    });

    const data = await res.json();

    console.log(data);
};



export default App
