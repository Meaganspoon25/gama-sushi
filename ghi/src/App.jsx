import { Outlet } from 'react-router-dom'
import Nav from './components/Navbar/Nav'
import Footer from './components/Footer/Footer'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'

const App = () => {
    const baseUrl = import.meta.env.VITE_API_HOST
    return (
        <AuthProvider baseUrl={baseUrl}>
            <div>
                <Nav />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App
