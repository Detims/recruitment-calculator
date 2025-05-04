import { Link } from "react-router-dom"

const Home = () => {
    return(
        <div className="home min-h-screen flex flex-col text-center justify-center">
            <h1 className="text-5xl font-bold mb-8 text-white">Only the best.</h1>
            <Link to="/shop">
                <button className='w-fit mx-auto mt-8 p-4 rounded-2xl'><h1 className="text-xl">Start Shopping</h1></button>
            </Link>
        </div>
    )
}

export default Home