import { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation'
import Chat from './Components/Chat'

function App() {
  return (
    <>
    <div className="interface flex">
      <Navigation/>
      <Chat/>
    </div>
    </>
  )
}

export default App
