import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/css/orderconfirmation.css'


const OrderConfirmation = () => {
    const location = useLocation()
    const { cart, tip } = location.state || {}

    const calculateSubtotal = () => {
        const subtotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
        return subtotal
    }

    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        const total = subtotal * 1.1 + tip // Total with 10% tax and tip
        return total.toFixed(2)
    }

return (
        <div className="order-confirmation-container">
            <h2>Order Complete Successfully!</h2>
            <h3>Order Details:</h3>
            <ul>
                {cart &&
                    cart.map((item, index) => (
                        <li key={index}>
                            {item.item} - ${item.price} - Quantity:{' '}
                            {item.quantity}
                        </li>
                    ))}
            </ul>
            <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
            <div>Tax (10%): ${(calculateSubtotal() * 0.1).toFixed(2)}</div>
            <div>Tip: ${tip}</div>
            <div>Total: ${calculateTotal()}</div>
        </div>
)}

export default OrderConfirmation
