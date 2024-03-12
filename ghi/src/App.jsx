import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import GiftcardForm from './GiftcardForm'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Routes>
                    <Route path="/giftcards" element={<GiftcardForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App
