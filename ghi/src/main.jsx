import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { 
    createBrowserRouter, 
    RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import GiftcardForm from './pages/GiftcardForm.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Hours from './pages/Hours.jsx'
import ReviewList from './pages/ReviewList.jsx'
import Careers from './pages/Careers.jsx'
import Menu from './pages/Menu.jsx'
import OurVision from './pages/OurVision.jsx'
import PlaceAnOrder from './pages/PlaceAnOrder.jsx'
import Gallery from './pages/Gallery.jsx'
import CreateReview from './pages/CreateReview.jsx'
import LogIn from './pages/LogIn.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'giftcards',
                element: <GiftcardForm />,
            },
            {
                path: 'contact-us',
                element: <ContactUs />,
            },
            {
                path: 'hours',
                element: <Hours />,
            },
            {
                path: 'reviews',
                element: <ReviewList />,
            },
            {
                path: 'career',
                element: <Careers />,
            },
            {
                path: 'menu',
                element: <Menu />,
            },
            {
                path: 'ourvision',
                element: <OurVision />,
            },
            {
                path: 'placeanorder',
                element: <PlaceAnOrder />,
            },
            {
                path: 'gallery',
                element: <Gallery />,
            },
            {
                path: 'reviews/create',
                element: <CreateReview />,
            },
            {
                path: 'token',
                element: <LogIn />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
