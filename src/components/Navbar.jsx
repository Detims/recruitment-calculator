import { Link, Outlet } from "react-router-dom"
import { assets } from "../assets/assets"

const Navbar = () => {
    return(
        <>
            <nav className="fixed w-full bg-amber-600 p-4 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo Link */}
                    <Link to="/" className="text-lg">
                        <img src={assets.hoshinodump} alt="logo" className="w-12 h-12"/>
                    </Link>
                    
                    <ul className="hidden md:flex md:space-x-6 items-center text-lg">
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                Cart
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar