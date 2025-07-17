import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import ProfilePage from './ProfilePage';
import DashboardPage from './DashboardPage';
import LoginPage from './Login';
import SignUpPage from './Signup';
import UserProfileList from './UserProfileList'; // Import the new component

// Home Page Component with Sign Up and Login buttons in the top right corner
function HomePage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <div className="overlay-content">
        <h1>Welcome to PairNest</h1>
        <p>Your journey to finding love starts here.</p>
      </div>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user-profiles" element={<UserProfileList />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
