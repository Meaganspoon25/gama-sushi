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
// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */
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
