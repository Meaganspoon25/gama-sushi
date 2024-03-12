import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Hours from './components/Footer/Hours'
import Footer from './components/Footer/Footer'
import ContactUs from './components/Footer/ContactUs'
import ReviewList from './components/Footer/ReviewList'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/hours" element={<Hours />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/reviews" element={<ReviewList />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
