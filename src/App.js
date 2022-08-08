import React from "react"
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"

import "./App.css"

import Header from "./Components/Header/Header"
import { Education } from "./Components/Pages/Education"
import {Home} from './Components/Pages/Home'
import { Support } from "./Components/Pages/Support"
import { Transport } from "./Components/Pages/Transport"
import { Work } from "./Components/Pages/Work"
import { Taxes } from './Components/Pages/Taxes'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/education" element={<Education />} />
        <Route exact path="/work" element={<Work />} />
        <Route exact path="/support" element={<Support />} />
        <Route exact path="/transport" element={<Transport />} />
        <Route exact path="/taxes" element={<Taxes />} />
      </Routes>
    </Router>
  );
}

export default App;