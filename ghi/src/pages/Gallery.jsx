import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const [images, setImages] = useState([])
    const foodItems = ['california roll', 'noodle soup']

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const fetchedImages = await Promise.all(
                    foodItems.map(async (item) => {
                        const response = await fetch(`/gallery?query=${item}`)
                        const data = await response.json()
                        return data.image
                    })
                )
                setImages(fetchedImages)
            } catch (error) {
                console.error("Couldn't fetch images:", error)
            }
        }
        fetchImages()
    }, [])

    return (
        <div>
            <div className="col-12">
                <h1 className="text-center m-1">Gallery</h1>
            </div>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-image">
                        <img src={image} alt={`Food ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery
