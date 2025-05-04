import { Link } from "react-router-dom"

const Home = () => {
    return(
        <div className="min-h-screen flex flex-col text-center justify-center">
            <Link to="/shop">
                <h1 className='text-xl'>Start Shopping</h1>
            </Link>
        </div>
    )
}

export default Home