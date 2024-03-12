import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Hours from './components/Footer/Hours'
import Footer from './components/Footer/Footer'
import ContactUs from './components/Footer/ContactUs'
import ReviewList from './components/Footer/ReviewList'

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import GiftcardForm from './GiftcardForm';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/giftcards" element={<GiftcardForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
