import { Link, Outlet } from "react-router-dom"
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = ({cart}) => {
    const [open, setOpen] = useState(false)
    const cartItems = cart.reduce((acc, { quantity }) => acc + quantity, 0)
    
    return(
        <>
            <nav className="fixed w-full bg-green-600 p-4 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo Link */}
                    <Link to="/" className="text-lg pl-4">
                        <SiHomeassistantcommunitystore className=" fill-white w-12 h-12"/>
                    </Link>
                    
                    <ul className="hidden md:flex md:space-x-6 items-center text-lg pr-4">
                        <li>
                            <Link to="/">
                                <h2 className="text-white">Home</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="flex items-center">
                                <HiShoppingCart className="fill-white w-10 h-10"/>
                                <h2 className="text-lg text-white">{cartItems !== 0 && `(${cartItems})`}</h2>
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu */}

                    <div className="md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <GrClose fill="white" /> : <GiHamburgerMenu fill="white" />}
                    </div>

                    <ul className={`md:hidden flex flex-col items-center ${open ? "" : "hidden"}`}>
                    <Link to="/" replace onClick={() => setOpen(!open)}>
                        Home
                    </Link>
                    <Link to="/shop" replace onClick={() => setOpen(!open)}>
                        Shop
                    </Link>
                    <Link to="/cart" replace onClick={() => setOpen(!open)}>
                        Cart ({cartItems})
                    </Link>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar