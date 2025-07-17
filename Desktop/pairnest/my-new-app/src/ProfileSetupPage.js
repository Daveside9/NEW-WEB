import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './App.css';

const ProfileSetupPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Perform profile save logic here (e.g., API call)
    
    // On successful profile setup, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile Setup</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="profile-photo">
            {profileImage ? (
              <img src={profileImage} alt="Profile" width="100" height="100" />
            ) : (
              <img
                src="https://via.placeholder.com/100"
                alt="Placeholder"
                width="100"
                height="100"
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </div>

          {/* Other input fields like name, gender, etc. */}
          <input type="text" placeholder="Name & Surname" required />
          {/* Add the other fields... */}
          
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
