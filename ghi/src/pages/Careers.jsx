import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Careers from '../images/careers.jpeg'

const API_HOST = import.meta.env.VITE_API_HOST

const CareerForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [resume, setResume] = useState('') // Changed null to empty string
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            

             const requestData = {
                 first_name: firstName,
                 last_name: lastName,
                 email: email,
                 phone_number: phoneNumber,
                 resume: resume,
             }

             const url = `${API_HOST}/careers`
             const response = await fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(requestData),
             })

         
            if (response.ok) {
                const data = await response.json()
                console.log('Career form submitted:', data)
                setSubmitSuccess(true)
                clearForm()
            } else {
                console.error('Failed to submit career form:', response.status)
            }
        } catch (error) {
            console.error('Error submitting career form:', error)
        }
    }

    const clearForm = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setResume('') 
    }

    return (
        <div
            className="bg-image"
            style={{ backgroundImage: `url(${Careers})`, height: '100vh' }}
        >
            <div
                className="mask"
                style={{
                    backgroundColor: 'rgba(186, 186, 172, 0.6)',
                    height: '100%',
                }}
            >
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="container" style={{ marginTop: '-200px' }}>
                        <div className="row">
                            <div className="offset-md-3 col-md-6">
                                <div className="shadow p-4 mt-4">
                                    <h1>
                                        <b>Careers (Join our Team!)</b>
                                    </h1>
                                    {submitSuccess && (
                                        <p className="text-black">
                                            Form submitted successfully!
                                        </p>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input
                                                placeholder="First Name"
                                                required
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                            />
                                            <label htmlFor="first_name">
                                                <b>First Name</b>
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                placeholder="Last Name"
                                                required
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                            />
                                            <label htmlFor="last_name">
                                                <b>Last Name</b>
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                placeholder="Email"
                                                required
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <label htmlFor="email">
                                                <b>Email</b>
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                placeholder="Phone Number"
                                                required
                                                type="text"
                                                name="phone_number"
                                                className="form-control"
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label htmlFor="phone_number">
                                                <b>Phone Number</b>
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <label htmlFor="resume">
                                                <b>LinkedIn Url</b>
                                            </label>
                                            <input
                                                placeholder="LinkedIn Url"
                                                type="text"
                                                name="resume"
                                                id="resume"
                                                className="form-control"
                                                value={resume}
                                                onChange={(e) =>
                                                    setResume(e.target.value)
                                                }
                                            />
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
}

export default CareerForm
