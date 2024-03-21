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
    const sushiAppetizers = [
        'Edamame',
        ' Seaweed Salad',
        ' Shrimp Tempura',
        ' Tuna Tartare',
        ' Scallop Carpaccio',
        ' Wakame Salad',
        ' Pork Gyoza',
        ' Shrimp Shumai',
    ]

    const soupsAndNoodles = [
        ' Miso Soup',
        ' Ramen',
        ' Udon Noodle Soup',
        ' Pho',
        ' Tom Yum Soup',
        ' Soba Noodles',
        ' Hot and Sour Soup',
        ' Tonkotsu Ramen',
        ' Laksa',
    ]

    const NigiriSushi = [
        { name: 'Eel', src: eel },
        { name: 'Octopus', src: octopus },
        { name: 'Salmon', src: salmon },
        { name: 'Tuna', src: tuna },
        { name: 'Toro', src: toro },
        { name: 'Sweet Shrimp', src: sweetshrimp },
        { name: 'Shrimp', src: shrimp },
        { name: 'Snow Crab', src: snowcrab },
        { name: 'Yellowtail', src: yellowtail },
        { name: 'Tamago', src: tamago },
        { name: 'Squid', src: squid },
        { name: 'Premium Beef', src: premiumbeef },
    ]

    const PremiumRolls = [
        { name: 'California Crab Roll', src: californiacrabroll },
        { name: 'Tempura Roll', src: tempuraroll },
        { name: 'Caterpillar Roll', src: caterpillarroll },
        { name: 'Crunchy Roll', src: crunchyroll },
        { name: 'Crunchy Tuna Hand Roll', src: crunchytunahandroll },
        { name: 'Philadelphia Roll', src: philadelphiaroll },
        { name: 'Rainbow Roll', src: rainbowroll },
        { name: 'Red Dragon Roll', src: reddragonroll },
        { name: 'Spicy Salmon Hand Roll', src: spicysalmonhandroll },
        { name: 'Salmon Hand Roll', src: salmonhandroll },
        { name: 'Spicy Tuna Roll', src: spicytunaroll },
        { name: 'Spicy Scallop Hand Roll', src: spicyscallophandroll },
    ]

    return (
        <div className="container mt-3">
            <h1 className="text-center mr-5 mb-4">Our Menu</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h2>Appetizers</h2>
                    <ul className="list-unstyled">
                        {sushiAppetizers.map((dish, index) => (
                            <li key={index} className="mb-3">
                                {dish}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 text-center">
                    <h2>Soups & Noodles</h2>
                    <ul className="list-unstyled bulleted-appetizers">
                        {soupsAndNoodles.map((dish, index) => (
                            <li key={index} className="mb-3">
                                {dish}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-12">
                    <h2 className="text-center">Sushi (Nigiri)</h2>
                    <div className="row">
                        {NigiriSushi.map((item, index) => (
                            <div key={index} className="col-3 mb-4 text-center">
                                <img
                                    src={item.src}
                                    alt={`Sushi ${item.name}`}
                                    className="img-fluid"
                                />
                                <p className="font-weight-bold">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-12">
                    <h2 className="text-center mt-5">Rolls</h2>
                    <div className="row">
                        {PremiumRolls.map((item, index) => (
                            <div key={index} className="col-3 mb-4 text-center">
                                <img
                                    src={item.src}
                                    alt={`Rolls ${item.name}`}
                                    className="img-fluid"
                                />
                                <p className="font-weight-bold">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
