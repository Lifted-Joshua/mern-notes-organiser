import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Toaster } from 'react-hot-toast'



const App = () => {
  return (
  
  <div className='relative h-full w-full'>
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
     [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,hsl(var(--p))_100%)]" />
    
    <Toaster />

    {/* The code below is the routes. e.g: localhost:5173/create, takes you to CreatePage.jsx */}
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='/note/:id' element={<NoteDetailPage />} />
    </Routes>

    
  </div>
  )
}

export default App