// UserProfiles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profiles from the backend
    const fetchUserProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/');
            setProfiles(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Use useEffect to call the function when the component mounts
    useEffect(() => {
        fetchUserProfiles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Profiles</h1>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        {profile.name} - {profile.email} - Age: {profile.age}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfiles;
