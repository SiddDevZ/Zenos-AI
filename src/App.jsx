import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Chat';
import SignIn from './Pages/Sign_in/SignIn';
import SignUp from './Pages/Sign_up/SignUp';
import AIChat from './Pages/Chat/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/aichat" element={<AIChat />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/contact" element={<Home />} */}
      </Routes>
    </Router>
  );
};

export default App;