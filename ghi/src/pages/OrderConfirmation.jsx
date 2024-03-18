import React from 'react'
import { useLocation, useNavigate, useParams} from 'react-router-dom'

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user_id } = useParams();
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
      const handlePlaceOrderHistory = () => {
          return navigate(`/orders/${user_id}`)
      }

    return (
        <div>
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

            <button onClick={handlePlaceOrderHistory}>Order History</button>
        </div>
    )
}

export default OrderConfirmation
