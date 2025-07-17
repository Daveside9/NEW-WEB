// UserProfileList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    const fetchUserProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/');
            setUserProfiles(response.data); // Store data in state
        } catch (error) {
            console.error('Error fetching user profiles:', error);
        }
    };

    useEffect(() => {
        fetchUserProfiles();
    }, []); // Empty dependency array to run only on mount

    return (
        <div>
            <h1>User Profiles</h1>
            <ul>
                {userProfiles.map((profile) => (
                    <li key={profile.id}>{profile.name}</li> // Display profile names or other data
                ))}
            </ul>
        </div>
    );
};

export default UserProfileList;
