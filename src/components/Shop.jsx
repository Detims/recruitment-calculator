import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
        const data = await (
            await fetch(
            'https://fakestoreapi.com/products',
            )
        ).json()
        .catch((error) => setError(error))
        .finally(() => setLoading(false))

        // set state when the data received
        setData(data)
        }

        dataFetch();
    }, [])

    console.log(data)

    if (loading) return <p>Loading...</p>
    if (error) return <p>An error has occurred.</p>

    return(
        <div className="min-h-screen flex flex-col mx-auto text-center justify-center pt-32">
            {/* Desktop Layout */}
            <ul className="flex flex-col md:grid md:grid-cols-4 gap-8 mx-auto w-8/12">
                {data.map((item) => {
                    return(
                    <li key={item.id} className="w-full hover:shadow-2xl rounded-xl cursor-pointer">
                        <Link to={`/shop/${item.id}`}>
                        <img 
                            src={item.image} alt="item" 
                            className="p-1"
                        />
                        <h2 className="mt-4">{item.title}</h2>
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Shop