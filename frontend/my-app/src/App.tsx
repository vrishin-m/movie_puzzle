import { useState } from 'react'
import './App.css'
var question = ""
function App() {
  

  return (
    <>
    <div className="titlebar">
      <h1>Movie Puzzle Game</h1>
      <br />
      <h2> Made by Gandalf</h2>
    </div>

    <Game_ui />

    
    </>
  )
}

function Game_ui(){
  return(
    <div className="game_ui">
      <h2> {question}</h2>

      
      
      
      
      
    </div>
  )
}
export default App
