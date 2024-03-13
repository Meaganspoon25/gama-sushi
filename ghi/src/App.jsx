import { Outlet } from 'react-router-dom'
import Nav from './components/Navbar/Nav'
import Footer from './components/Footer/Footer'
const App = () => {
    return (
            <div>
                <Nav />
                <Outlet />
                <Footer />
            </div>
    )
}

export default App
