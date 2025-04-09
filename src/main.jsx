import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Tictack } from "./TicTacToe/Tictack.jsx"; // adjust path

import { Provider } from 'react-redux'
import { Buffer } from 'buffer';
window.Buffer = Buffer;


import { BrowserRouter, Routes, Route } from "react-router";
import store from './app/store.js';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
       <App />

  </Provider>


  </BrowserRouter>,
)
