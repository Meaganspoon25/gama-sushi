import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);

            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUpClick = () => {
        navigate('/accounts'); // Navigate to the sign-up page when the button is clicked
    };

    return (
    <div className="card text-bg-light mb-3 d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="card-body" style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
            <h5 className="card-header text-center">Login</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        name="username"
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3 d-grid gap-2">
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Login"
                    />
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={handleSignUpClick}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
);
    }
export default Login;

