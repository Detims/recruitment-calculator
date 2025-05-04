import { TiDelete } from "react-icons/ti";

const Cart = ({cart, removeItem}) => {
    const total = cart.reduce((acc, {quantity, price}) => acc + quantity * price, 0)

    const list = cart.map((item) => {
        return (
            <li className="flex flex-wrap items-center justify-between mb-8 pl-8 pr-8">
                <img src={item.image} alt={item.title} className="h-48 w-48" />

                <h2 className="text-lg">{item.title}</h2>
                <h2 className="text-lg">${item.price}</h2>
                <h3 className="text-lg">Quantity: {item.quantity}</h3>
                <TiDelete onClick={() => removeItem(item)} className="h-12 w-12 cursor-pointer" />
            </li>
        )
    })

    return(
        <div className="relative min-h-screen flex flex-col text-center justify-center">
            {cart.length === 0 ? (
                <h1 className="text-xl">Your cart is empty</h1>
            ) : (
                <>
                    <ul className="p-12 mt-16">{list}</ul>
                    <h1 className="text-xl">Total: ${total.toFixed(2)}</h1>
                    <button className="w-fit mx-auto mt-8 p-4 rounded-2xl text-lg">Proceed to Checkout</button>
                </>
            )}
        </div>
    )
}

export default Cart