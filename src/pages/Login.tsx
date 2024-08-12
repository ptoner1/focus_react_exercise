import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginUser = async () => {
        try {
            const response = await fetch('http://localhost:4001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful
                alert('User logged in successfully');
            } else {
                // Handle errors
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div>
            <form className="form-container">
                <div className="form-field">
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="button" onClick={loginUser}>Log In</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login
