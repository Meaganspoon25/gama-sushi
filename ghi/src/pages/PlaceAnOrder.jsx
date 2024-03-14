import React, { useState } from 'react'
import '../styles/css/placeorder.css'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
const API_HOST = import.meta.env.VITE_API_HOST

const PlaceOrder = () => {
    const [cart, setCart] = useState([])
    const [tip, setTip] = useState(0)
    const { token } = useToken()
    const navigate = useNavigate();

    console.log('Cart state:', cart) // Debugging cart state

    const addToCart = async (category, item_name, item_price) => {
        try {
            const response = await fetch(`${API_HOST}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    item_name,
                    item_price,
                    item_quantity: 1,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to add item to cart')
            }

            const jsonResponse = await response.json()
            console.log('Response JSON:', jsonResponse)

            const id = jsonResponse.id // Assuming the response includes the order ID
            console.log('Extracted id:', id)

            // Define updatedCart outside the try block
            let updatedCart = [...cart]

            // Check if the item already exists in the cart
            const existingItemIndex = cart.findIndex(
                (cartItem) => cartItem.item === item_name
            )

            if (existingItemIndex !== -1) {
                // If the item exists, update its quantity
                updatedCart = cart.map((cartItem, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        }
                    }
                    return cartItem
                })
            } else {
                // If the item does not exist, add it to the cart
                updatedCart.push({
                    order_id: id,
                    category,
                    item: item_name,
                    price: item_price,
                    quantity: 1,
                })
            }

            setCart(updatedCart)
            console.log('Updated state:', updatedCart)
        } catch (error) {
            console.error('Error adding item to cart:', error)
        }
    }




    const removeFromCart = async (order_id) => {
        try {
            const response = await fetch(`${API_HOST}/orders/${order_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                throw new Error('Failed to remove item from cart')
            }
            const updatedCart = cart.filter(
                (cartItem) => cartItem.order_id !== order_id
            )
            setCart(updatedCart)
        } catch (error) {
            console.error('Error removing item from cart:', error)
        }
    }

    const updateQuantity = (item, newQuantity) => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.item === item) {
                return { ...cartItem, quantity: newQuantity }
            }
            return cartItem
        })
        setCart(updatedCart)
    }

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

    const handleTipChange = (e) => {
        const value = parseFloat(e.target.value) || 0
        setTip(value)
    }

    const handlePlaceOrder = () => {
        return (
            navigate('/orderconfirmation')
        )
    }

    const menuItems = [
        {
            category: 'Appetizers',
            items: ['Crab Rangoon', 'Chicken Karage', 'Spicy Tuna'],
            price: ['1.00', '6.99', '7.99'],
        },
        {
            category: 'Soups and Noodles',
            items: ['Miso Soup', 'Miso Ramen', 'Shoyu Ramen'],
            price: ['5.99', '6.99', '7.99'],
        },
        {
            category: 'Rolls',
            items: [
                'Caterpillar Roll',
                'Vegetable Hand Roll',
                'Spider Hand Roll',
            ],
            price: ['5.99', '6.99', '7.99'],
        },
        {
            category: 'Sushi',
            items: ['Conch', 'Dashi Olive Salmon', 'Hamburger steak'],
            price: ['5.99', '6.99', '7.99'],
        },
        {
            category: 'Drinks',
            items: ['Coke', 'Sprite', 'Lemonade'],
            price: ['5.99', '6.99', '7.99'],
        },
    ]

    return (
        <div className="place-order-container">
            <div className="menu-items">
                <h2>Allergen Information</h2>
                {/* Menu items */}
                {menuItems.map((category) => (
                    <div key={category.category}>
                        <h3>{category.category}</h3>
                        <ul>
                            {category.items.map((item, index) => (
                                <li key={item}>
                                    {item} - ${category.price[index]}
                                    <button
                                        onClick={() =>
                                            addToCart(
                                                category.category,
                                                item,
                                                category.price[index]
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h2>Cart</h2>
                {/* Cart items */}
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.item} - ${item.price} - Quantity:
                            <button
                                onClick={() =>
                                    updateQuantity(item.item, item.quantity - 1)
                                }
                            >
                                -
                            </button>
                            {item.quantity}
                            <button
                                onClick={() =>
                                    updateQuantity(item.item, item.quantity + 1)
                                }
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(item.order_id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div>Subtotal: ${calculateSubtotal()}</div>
                <div>Tax (10%): ${(calculateSubtotal() * 0.1).toFixed(2)}</div>
                <div>
                    Tip:{' '}
                    <input
                        id="tip-input"
                        type="number"
                        value={tip}
                        onChange={handleTipChange}
                    />
                </div>
                <div>Total: ${calculateTotal()}</div>
                <button onClick={handlePlaceOrder}>Place an Order</button>
            </div>
        </div>
    )
}

export default PlaceOrder
