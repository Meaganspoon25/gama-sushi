import React from 'react'
import '../styles/css/menu.css'
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

const Menu = () => {
    const sushiAppetizers = {
        Edamame: 5.0,
        'Seaweed Salad': 7.0,
        'Shrimp Tempura': 8.5,
        'Miso Soup': 4.0,
        'Tuna Tartare': 12.0,
        'Scallop Carpaccio': 13.0,
        'Wakame Salad': 6.5,
        'Pork Gyoza': 7.5,
        'Shrimp Shumai': 7.5,
    }

    const soupsAndNoodles = {
        'Miso Soup': 3.99,
        Ramen: 9.99,
        'Udon Noodle Soup': 8.49,
        Pho: 10.99,
        'Tom Yum Soup': 7.99,
        'Soba Noodles': 8.99,
        'Hot and Sour Soup': 5.49,
        'Tonkotsu Ramen': 11.99,
        Laksa: 12.49,
    }

    const NigiriSushi = [
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
    ]

    const PremiumRolls = [
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
    ]

    return (
        <div className="container mt-3">
            <h1 className="text-center mr-5 mb-4">Our Menu</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h2>Appetizers</h2>
                    <ul className="list-unstyled">
                        {Object.entries(sushiAppetizers).map(
                            ([dish, price], index) => (
                                <li key={index} className="mb-3">
                                    <strong>{dish}</strong>: ${price.toFixed(2)}
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div className="col-md-6 text-center">
                    <h2>Soups and Noodles</h2>
                    <ul className="list-unstyled">
                        {Object.entries(soupsAndNoodles).map(
                            ([dish, price], index) => (
                                <li key={index} className="mb-3">
                                    <strong>{dish}</strong>: ${price.toFixed(2)}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="col-12">
                    <h2 className="text-center">Sushi (Nigiri)</h2>
                    <div className="row">
                        {NigiriSushi.map((image, index) => (
                            <div key={index} className="col-3 mb-4">
                                <img
                                    src={image}
                                    alt={`Sushi ${index + 1}`}
                                    className="img-fluid"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-12">
                    <h2 className="text-center mt-5">Rolls</h2>
                    <div className="row">
                        {PremiumRolls.map((image, index) => (
                            <div key={index} className="col-3 mb-4">
                                <img
                                    src={image}
                                    alt={`Rolls ${index + 1}`}
                                    className="img-fluid"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
