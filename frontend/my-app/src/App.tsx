import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from '../auth.tsx';

var num_attempts =0
var guess =""
var result = false
var num_hints=0;

function App() {

  //login stuff
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };










    var [question, setQuestion] = useState<string | null>(null);
    var [unlockedHints, setUnlockedHints] = useState<string[]>([]);
    var [hints, setHints] = useState<string[]>([]);
    var [answer, setAnswer] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState("easy");

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
      if (!result) {
        guess = currentInput;
        num_attempts++;
        setCurrentInput("");
        sendData()
      };
    };
    const get_hint = (num: number) => {
      if (!result) {
      if (num < hints.length) {
        setUnlockedHints([...unlockedHints, hints[num]]);
        num_hints++;
        console.log(unlockedHints);
      }
    };};

    const show_answer = () => {
      alert("the answer was " + answer);
      next_puzzle();
    }


      const next_puzzle = async () => {
  
          const res = await fetch("http://localhost:3000/api/next", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    next: "true",
                    difficulty: difficulty
                    
                })
            });
          
          window.location.reload();
        };


      
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
        
      } else {
        alert("incorrect. check if you entered the exact title of the movie, or try a different movie. you can also get a hint");
      }
    };

    if (!token) {
    return <Auth onLogin={handleLogin} />;
  }
  else {


  return (
    <>
    <div className="titlebar">
      <h1>Movie Puzzle Game</h1>
      <br />
       <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <h2> Made by Gandalf</h2>
      
    </div>
    <div className = "nextPuzzle">

     <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <br /><br />
      {result=== false?<> 
      <button onClick={() => next_puzzle()}>Give Up</button>
      </>:
      <> 
      <button onClick={() => next_puzzle()}>Next Puzzle</button>
      </> }

    </div>

      

    <div className="game_ui">
      
      <h1> {question}</h1>
      <br /> <br /> 
      <h3> {num_hints>=1?unlockedHints[0]:<br/>}</h3>
      <h3> {num_hints>=2?unlockedHints[1]:<br/>}</h3>
      <h3> {num_hints>=3?unlockedHints[2]:<br/>}</h3>
      <br /><br />
      
      <div className="submit">
        <textarea 
          value={currentInput}
          onChange={(e) => !result? setCurrentInput(e.target.value):{} }
          
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
}





export default App
