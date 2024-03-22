import React, { useState, useEffect } from 'react'
import '../styles/css/placeorder.css'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
import eel from '../images/eel.png'
import octopus from '../images/octopus.png'
import salmon from '../images/salmon.png'
import tuna from '../images/tuna.png'
import toro from '../images/toro.png'
import sweetshrimp from '../images/sweetshrimp.png'
import shrimp from '../images/shrimp.png'
import snowcrab from '../images/snowcrab.png'
import yellowtail from '../images/yellowtail.png'
import tamago from '../images/tamago.png'
import squid from '../images/squid.png'
import premiumbeef from '../images/premiumbeef.png'
import californiacrabroll from '../images/californiacrabroll.png'
import tempuraroll from '../images/tempuraroll.png'
import caterpillarroll from '../images/caterpillarroll.png'
import crunchyroll from '../images/crunchyroll.png'
import crunchytunahandroll from '../images/crunchytunahandroll.png'
import philadelphiaroll from '../images/philadelphiaroll.png'
import rainbowroll from '../images/rainbowroll.png'
import reddragonroll from '../images/reddragonroll.png'
import spicysalmonhandroll from '../images/spicysalmonhandroll.png'
import salmonhandroll from '../images/salmonhandroll.png'
import spicytunaroll from '../images/spicytunaroll.png'
import spicyscallophandroll from '../images/spicyscallophandroll.png'
import edamame from '../images/edamame.jpg'
import seaweedsalad from '../images/seaweedsalad.jpg'
import shrimptempura from '../images/shrimptempura.png'
import misosoup from '../images/misosoup.png'
import tunatartare from '../images/tunatartare.jpg'
import scallopcarpaccio from '../images/scallopcarpaccio.webp'
import wakamesalad from '../images/wakamesalad.webp'
import porkgyoza from '../images/porkgyoza.jpg'
import shrimpshumai from '../images/shrimpshumai.jpg'
import misosoupone from '../images/misosoup.jpg'
import ramen from '../images/ramen.jpg'
import udonnoodlesoup from '../images/udonnoodlesoup.jpg'
import pho from '../images/pho.jpg'
import tomyumsoup from '../images/tomyumsoup.jpg'
import sobanoodles from '../images/sobanoodles.jpg'
import hotandsoursoup from '../images/hotandsoursoup.jpg'
import tonkotsuramen from '../images/tonkotsuramen.webp'
import laksa from '../images/laksa.webp'
import coke from '../images/coke.jpeg'
import sprite from '../images/sprite.jpeg'
import lemonade from '../images/lemonade.jpeg'

const API_HOST = import.meta.env.VITE_API_HOST

const PlaceOrder = () => {
    const [cart, setCart] = useState([])
    const [tip, setTip] = useState(0)
    const { token } = useToken()
    const navigate = useNavigate()

    const API_HOST = import.meta.env.VITE_API_HOST

    const addToCart = async (category, item_name, item_price) => {
        try {
            if (!token) {
                alert('Please login to add items to the cart.')
                return
            }

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
                return {
                    ...cartItem,
                    quantity: Math.min(Math.max(0, newQuantity), 10),
                } // Prevent quantity from going below zero
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
        if (cart.length > 0) {
            navigate('/orderconfirmation', { state: { cart, tip } })
        }
    }

    const menuItems = [
        {
            category: 'Appetizers',
            items: [
                'Edamame',
                'Seaweed Salad',
                'Shrimp Tempura',
                'Miso Soup',
                'Tuna Tartare',
                'Scallop Carpaccio',
                'Wakame Salad',
                'Pork Gyoza',
                'Shrimp Shumai',
            ],
            price: [
                '1.00',
                '6.99',
                '7.99',
                '1.00',
                '6.99',
                '7.99',
                '1.00',
                '6.99',
                '7.99',
            ],
            image: [
                edamame,
                seaweedsalad,
                shrimptempura,
                misosoup,
                tunatartare,
                scallopcarpaccio,
                wakamesalad,
                porkgyoza,
                shrimpshumai,
            ],
        },
        {
            category: 'Soups and Noodles',
            items: [
                'Miso Soup',
                'Ramen',
                'Udon Noodle Soup',
                'Pho',
                'Tom Yum Soup',
                'Soba Noodles',
                'Hot and Sour Soup',
                'Tonkotsu Ramen',
                'Laksa',
            ],
            price: [
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
            ],
            image: [
                misosoupone,
                ramen,
                udonnoodlesoup,
                pho,
                tomyumsoup,
                sobanoodles,
                hotandsoursoup,
                tonkotsuramen,
                laksa,
            ],
        },
        {
            category: 'Rolls',
            items: [
                'California Crab Roll',
                'Caterpillar Roll',
                'Crunchy Roll',
                'Crunchy Tuna Hand Roll',
                'Philadelphia Roll',
                'Rainbow Roll',
                'Red Dragon Roll',
                'Spicy Salmon Hand Roll',
                'Salmon Hand Roll',
                'Spicy Tuna Roll',
                'Spicy Scallop Hand Roll',
                'Tempura Roll',
            ],
            price: [
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
            ],
            image: [
                eel,
                octopus,
                salmon,
                tuna,
                toro,
                sweetshrimp,
                snowcrab,
                yellowtail,
                tamago,
                squid,
                premiumbeef,
                shrimp,
            ],
        },
        {
            category: 'Sushi',
            items: [
                'Eel',
                'Octopus',
                'Salmon',
                'Tuna',
                'Toro',
                'Sweet Shrimp',
                'Snow Crab',
                'Yellow Tail',
                'Tamago',
                'Squid',
                'Premium Beef',
                'Shrimp',
            ],
            price: [
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
                '5.99',
                '6.99',
                '7.99',
            ],
            image: [
                californiacrabroll,
                caterpillarroll,
                crunchyroll,
                crunchytunahandroll,
                philadelphiaroll,
                rainbowroll,
                reddragonroll,
                spicysalmonhandroll,
                salmonhandroll,
                spicytunaroll,
                spicyscallophandroll,
                tempuraroll,
            ],
        },
        {
            category: 'Drinks',
            items: ['Coke', 'Sprite', 'Lemonade'],
            price: ['5.99', '6.99', '7.99'],
            image: [coke, sprite, lemonade],
        },
    ]

    return (
        <div className="place-order-container">
            <div className="menu-items">
                <h2>Allergen Information</h2>
                <h6>
                    SEAFOOD, SHELLFISH OR EGGS MAY INCREASE YOUR RISK OF
                    FOODBORNE ILLNESS, ESPECIALLY IF YOU HAVE CERTAIN MEDICAL
                    CONDITIONS. To our guests with food sensitivities, allergies
                    or special dietary needs: Our restaurants prepare and serve
                    products that contain peanuts, tree nuts, fish, shellfish,
                    eggs, milk, soy and gluten. Regular kitchen operations
                    involve shared cooking and preparation areas, and food
                    variations may occur due to differences in suppliers,
                    ingredient substitutions, recipe revisions, and/or
                    preparation at the restaurant. For these reasons, we cannot
                    guarantee that any menu item will be completely free of
                    allergens.
                </h6>
                {menuItems.map((category) => (
                    <div key={category.category}>
                        <h3>{category.category}</h3>
                        <ul>
                            {category.items.map((item, index) => (
                                <li key={item}>
                                    <div className="item-container">
                                        <span className="item-text">
                                            {item} - ${category.price[index]}
                                        </span>
                                        <img
                                            className="item-image"
                                            src={category.image[index]}
                                            alt={`Image ${index}`}
                                        />
                                    </div>
                                    <button
                                        onClick={() =>
                                            addToCart(
                                                category.category,
                                                item,
                                                category.price[index],
                                                item
                                                    .toLowerCase()
                                                    .replace(/\s+/g, '')
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
                <h2>Your Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <div className="cart-item">
                                <span className="item-name">{item.item}</span>
                                <span className="item-price">
                                    ${item.price}
                                </span>
                                <span className="item-quantity">
                                    Quantity:
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.item,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    {item.quantity}
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.item,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </span>
                                <button
                                    onClick={() =>
                                        removeFromCart(item.order_id)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
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
