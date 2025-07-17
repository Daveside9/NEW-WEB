import React, { useState } from 'react';
import './DashboardPage.css'; // Ensure you're linking to the correct CSS file

function DashboardPage() {
  const [showAdvisors, setShowAdvisors] = useState(false);

  const toggleAdvisors = () => {
    setShowAdvisors(!showAdvisors);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DATING</h1>
        <nav>
          <ul className="dashboard-menu">
            <li><a href="/view">View</a></li>
            <li><button className="advisor-button" onClick={toggleAdvisors}>Advisor</button></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/review">Review</a></li>
            <li><a href="/interest">Interest</a></li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="intro-section">
          <h2>100% ONLINE DATING & PERSONALS</h2>
          <p>At painest</p>
          <p>we connect</p>
          <p>we councel</p>
        </div>

        {showAdvisors && (
          <div className="advisor-list">
            <p>OYINBO ANTHONIA</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
