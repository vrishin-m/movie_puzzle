import { useEffect, useState } from 'react'
import './App.css'

var num_attempts =0
var guess =""
var result = false
var num_hints=0;

function App() {
    var [question, setQuestion] = useState<string | null>(null);
    var [unlockedHints, setUnlockedHints] = useState<string[]>([]);
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

const get_hint = (num: number) => {
  if (num < hints.length) {
    setUnlockedHints([...unlockedHints, hints[num]]);
    num_hints++;
    console.log(unlockedHints);
  }
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
      <br /> <br /> 
      <h3> {num_hints>=1?unlockedHints[0]:<br/>}</h3>
      <h3> {num_hints>=2?unlockedHints[1]:<br/>}</h3>
      <h3> {num_hints>=3?unlockedHints[2]:<br/>}</h3>
      <br /><br /> <br />
      
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
      {num_attempts >= 2 && num_hints < 3 ? (
      <button className="hint_button" onClick = {() => get_hint(num_hints)}>Get Hint</button>
      ) : num_hints >= 3 ? (
        <p>You have exhausted the hints</p>
      ): (
        <p>Hint is unlocked after 2 attempts</p>
      )}

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
    result = data.result;
    console.log(data);
    handle_result()
};

const handle_result = () => {
  if (result) {
    alert("you won in " + num_attempts + " attempts!");
    next_puzzle();
  } else {
    alert("incorrect. check if you entered the exact title of the movie, or try a different movie. you can also get a hint");
  }
};

const next_puzzle = () => {
  //make this function
};

export default App
