import { useState, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";

import Home from './pages/Home';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element="">
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter