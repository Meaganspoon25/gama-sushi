import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/css/contactus.css';
import Restaurant from '../images/hours.jpeg'

const API_HOST = import.meta.env.VITE_API_HOST;

const ContactForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                message: message,
            };

            const url = `${API_HOST}/contactus`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Contact message submitted:', data);
                setSubmitSuccess(true);
                clearForm();
            } else {
                console.error('Failed to submit contact message:', response.status);
            }
        } catch (error) {
            console.error('Error submitting contact message:', error);
        }
    };

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div
            className="bg-image"
            style={{ backgroundImage: `url(${Restaurant})`, height: '100vh' }}
        >
            <div
                className="mask"
                style={{
                    backgroundColor: 'rgba(186, 186, 172, 0.6)',
                    height: '100%',
                }}
            >
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="container">
                        <div className="row">
                            <div className="offset-md-3 col-md-6">
                                <div className="shadow p-4 mt-4">
                                    <h1>
                                        <b>Contact Us</b>
                                    </h1>
                                    {submitSuccess && (
                                        <p className="text-black">
                                            Form submitted successfully!
                                        </p>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <Form.Control
                                                placeholder="First Name"
                                                required
                                                type="text"
                                                name="first_name"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                            />
                                            <Form.Label htmlFor="first_name">
                                                <b>First Name</b>
                                            </Form.Label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <Form.Control
                                                placeholder="Last Name"
                                                required
                                                type="text"
                                                name="last_name"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                            />
                                            <Form.Label htmlFor="last_name">
                                                <b>Last Name</b>
                                            </Form.Label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <Form.Control
                                                placeholder="Email"
                                                required
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <Form.Label htmlFor="email">
                                                <b>Email</b>
                                            </Form.Label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <Form.Control
                                                placeholder="Your message..."
                                                required
                                                name="message"
                                                as="textarea"
                                                rows="5"
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                            />
                                            <Form.Label htmlFor="message">
                                                <b>Message</b>
                                            </Form.Label>
                                        </div>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactForm;
