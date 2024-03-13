import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
const API_HOST = import.meta.env.VITE_API_HOST

const GiftcardForm = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${API_HOST}/gitcards` // Endpoint for creating a gift card
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, amount }),
            });
            if (response.ok) {
                // Assuming the server responds with the created gift card data
                const data = await response.json();
                // Handle the response data as needed
                console.log('Gift card created:', data);
            } else {
                console.error('Failed to create gift card:', response.status);
            }
        } catch (error) {
            console.error('Error creating gift card:', error);
        }
    };

    return (
        <Form className="custom-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Select
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                >
                    <option value="">Select amount</option>
                    <option value="20">$20</option>
                    <option value="50">$50</option>
                    <option value="100">$100</option>
                    <option value="200">$200</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default GiftcardForm;
