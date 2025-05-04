import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const Details = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {setQuantity(quantity + 1)}

    const decreaseQuantity = () => {
        if (quantity === 1) return
        setQuantity(quantity - 1)
    }

    const quantityHandler = (e) => {
        setQuantity(e.target.value)
    }

    const setDefaultQuantity = () => {
        if (quantity <= 0) {setQuantity(1)}
    }

    // Call the Fakestore API to get the right product using the page id
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
        const data = await (
            await fetch(
            `https://fakestoreapi.com/products/${id}`,
            )
        ).json()
        .catch((error) => setError(error))
        .finally(() => setLoading(false))

        // set state when the data received
        setData(data)
        }

        dataFetch()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>An error has occurred.</p>

    return(
        <div className="flex flex-wrap justify-center pt-32">
            <img 
                src={data.image}
                className="w-96 object-cover"
            />
            <div className="w-96 p-8">
                <h1 className="text-3xl">{data.title}</h1>
                <h2 className="mt-8">{data.description}</h2>
                <h2 className="text-xl mt-8">${data.price}</h2>
                <div className="mt-8">
                    <h2 className="text-lg">Quantity: </h2>
                    <button 
                        className="rounded-full h-10 w-10 text-center"
                        onClick={decreaseQuantity}
                    >-</button>
                    <input
                        type="number"
                        value={quantity || 1}
                        className="w-12 p-1.5 mt-4 ml-2.5 mr-2.5 text-lg text-center border-1"
                        onChange={quantityHandler}
                        onBlur={setDefaultQuantity}
                    />
                    <button 
                        className="rounded-full h-10 w-10 text-center"
                        onClick={increaseQuantity}
                    >+</button>
                </div>
            </div>
        </div>
    )
}

export default Details