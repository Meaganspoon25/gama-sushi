import React, { useState } from 'react';

const API_HOST = import.meta.env.VITE_API_HOST;

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${API_HOST}/accounts`;
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setSuccessMessage(`Thank you for signing up ${formData.first_name}!`);
            setFormData({
                username: '',
                password: '',
                email: '',
                first_name: '',
                last_name: ''
            });
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        });
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>New User</h1>
                    {successMessage && (
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} id="create-user-form">
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.username}
                                placeholder="Username"
                                required
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.password}
                                placeholder="Password"
                                required
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.email}
                                placeholder="Email"
                                required
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.first_name}
                                placeholder="First Name"
                                required
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="form-control"
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.last_name}
                                placeholder="Last Name"
                                required
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-control"
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
