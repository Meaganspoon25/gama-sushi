import React, { useEffect, useState } from 'react'
import '../styles/css/gallery.css'

const Gallery = () => {
    const [images, setImages] = useState([])
    const foodItems = [
        'salmon crunchy roll',
        'thai tom yum',
        'salmon sushi artsy',
        'fancy sushi',
        'premium sushi rolls',
        'ramen noodles',
        'miso soup',
        'pork buns',
        'squid sushi',
        'shrimp sushi',
        'deep fried sushi roll',
        'eel sushi'
    ]

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const fetchedImages = await Promise.all(
                    foodItems.map(async (item) => {
                        const response = await fetch(
                            `http://localhost:8000/gallery?query=${item}`
                        )
                        const data = await response.json()
                        return data.image
                    })
                )
                setImages(fetchedImages)
            } catch (error) {
                console.error("Can't fetch images:", error)
            }
        }
        fetchImages()
    }, [])

    return (
        <div>
            <div className="col-12">
                <h1 className="text-center m-1">Gallery</h1>
            </div>
            <div className="row gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-image col-3 mb-4">
                        <img
                            src={image}
                            alt={`Food ${index}`}
                            className="small-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery
