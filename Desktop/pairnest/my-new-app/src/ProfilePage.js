import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function ProfilePage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    nationality: '',
    state: '',
    lga: '',
    height: '',
    profession: '',
    skills: '',
    hobby: '',
    aboutMe: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log(formData);
    // Redirect to the dashboard page after submission
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Surname:</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />

        <label>Gender:</label>
        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />

        <label>Nationality:</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} />

        <label>State of Residence:</label>
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} />

        <label>LGA:</label>
        <input type="text" name="lga" value={formData.lga} onChange={handleInputChange} />

        <label>Height:</label>
        <input type="text" name="height" value={formData.height} onChange={handleInputChange} />

        <label>Profession:</label>
        <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} />

        <label>Skills:</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} />

        <label>Hobby:</label>
        <input type="text" name="hobby" value={formData.hobby} onChange={handleInputChange} />

        <label>About Me (30 words):</label>
        <textarea
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleInputChange}
          maxLength="150"
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
