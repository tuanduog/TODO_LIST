import React from "react";
import Home from './Home/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Home/Home" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;