import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Shop from './components/Shop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Cart from './components/Cart'
import Details from './components/Details'
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])

  {/* Check if item type is already in cart and increments it, otherwise adds new item */}
  const addToCart = (current) => {
    if (cart.some((item) => current.id === item.id)) {
      setCart(
        cart.map((item) =>
          item.id === current.id
          ? {...item, quantity: item.quantity + current.quantity}
          : item
        )
      )
      return
    }

    setCart((items) => {
      return [...items, current]
    })
  }

  const removeItem = (current) => {
    setCart(cart.filter((item) => item.id !== current.id))
  }

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <div className='grow'>
          <Navbar cart={cart} />
          <Routes>
              <Route path='/' element={<main><Home /></main>} />
              <Route path='/shop' element={<main><Shop /></main>} />
              <Route path='/shop/:id' element={<main><Details addToCart={addToCart} /></main>} />
              <Route path='/cart' element={<main><Cart cart={cart} removeItem={removeItem} /></main>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

  // return (
  //   <div className='flex flex-col min-h-screen'>
  //     <Navbar />
  //     <div className='flex flex-col grow-1 mx-auto text-center justify-center'>
  //       <Link to="/shop">
  //         <h1 className='text-xl'>Start Shopping</h1>
  //       </Link>
  //     </div>
  //     <Footer />
  //   </div>
  // )

  // const [data, setData] = useState();

  // useEffect(() => {
  //   // fetch data
  //   const dataFetch = async () => {
  //     const data = await (
  //       await fetch(
  //         'https://fakestoreapi.com/products',
  //       )
  //     ).json();

  //     // set state when the data received
  //     setData(data);
  //   };

  //   dataFetch();
  // }, []);

  // console.log(data)