import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Chat from './Pages/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/contact" element={<Home />} */}
      </Routes>
    </Router>
  );
};

export default App;