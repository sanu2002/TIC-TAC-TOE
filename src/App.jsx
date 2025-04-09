import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Tictack } from './TicTacToe/Tictack'

import {Leaderboard} from './Components/Leaderboard'

import { BrowserRouter, Routes, Route } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { setschemId, setwinner } from './features/Slicedata'

function App() {
  const [count, setCount] = useState(0)
  




  return (
    <>  

     
       <Routes>

            <Route path="/" element={<Tictack />}/>
            <Route path="/leaderboard" element={<Leaderboard />}/>



       </Routes>


    </>
  )
}

export default App
