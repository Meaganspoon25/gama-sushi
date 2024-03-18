import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'

const API_HOST = import.meta.env.VITE_API_HOST

const OrderHistory = () => {
    const { user_id } = useParams()
    const [orderHistory, setOrderHistory] = useState([])
    const { token } = useToken()

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if (!token) {
                    return
                }
                const response = await fetch(`${API_HOST}/orders/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch order history')
                }
                const data = await response.json()
                console.log('Order history:', data);
                setOrderHistory(data)
            } catch (error) {
                console.error('Error fetching order history:', error)
            }
        }

        fetchOrderHistory()
    }, [user_id, token])

    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orderHistory.map((order) => (
                    <li key={order.id}>
                        <h3>Order ID: {order.id}</h3>
                        <p>Items:{order.item_name}</p>
                        <p>Quantity: {order.item_quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default OrderHistory
