import React from 'react'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import './index.css'   // or App.css, wherever you put the container rules

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <AppRoutes />
      </main>
    </>
  )
}
