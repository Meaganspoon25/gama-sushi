import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './ContactUs';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';

function App() {
    return (
        <BrowserRouter>
        <div className="container">
        <Routes>
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/create" element={<CreateReview />} />
        </Routes>
        </div>
        </BrowserRouter>
    );
}
export default App
