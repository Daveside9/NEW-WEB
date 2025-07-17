import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [userInfo, setUserInfo] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Perform signup logic (e.g., API call)
        // On successful signup:
        navigate('/profile-setup'); // Navigate to the profile setup page
    };

    return (
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Username"
                value={userInfo.username}
                onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                required
            />
            {/* Removed the button here to avoid duplicate sign-up */}
        </form>
    );
};

export default SignupPage;
