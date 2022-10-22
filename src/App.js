import React from 'react';
import { RequestWork } from './page/ReqestWork';
import Signin from './page/signin';
import {Route, Routes } from 'react-router-dom';
import NaviBar from './page/NavBar';
import SimpleMap from './page/Map';
import { Home } from './page/Home';
function App() {
  return (
    <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/home" element={<Home />} />
    <Route path="/map" element={<SimpleMap/>} />
    <Route path="/work" element={<RequestWork />} />
  </Routes>
  );
}

export default App;
