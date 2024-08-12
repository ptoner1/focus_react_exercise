// const Signup = () => {

//     function registerUser() {

//     }

//     return (

//         <div>
//             <form>
//                 <label htmlFor="username">User Name</label>
//                 <input type="text" name="username" />

//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" />

//                 <button type="button" onClick={registerUser}>Register</button>
//             </form>
//         </div>

//     )
// }
// export default Signup

import React, { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const registerUser = async () => {
        try {
            const response = await fetch('http://localhost:4001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Registration successful
                alert('User registered successfully');
            } else {
                // Handle errors (e.g., user already exists)
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

                <button type="button" onClick={registerUser}>Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Signup;
