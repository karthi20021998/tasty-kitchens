import {Switch, Route, Redirect} from 'react-router-dom'
import {useState} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

import CartContext from './context/CartContext'

const getcartItemsfromLocalStorage = () => {
  const stringifiedList = localStorage.getItem('cartDetails')
  const parsedList = JSON.parse(stringifiedList)
  if (parsedList === null) {
    return []
  }
  return parsedList
}

const App = () => {
  const [cartList, setCartList] = useState(getcartItemsfromLocalStorage())

  const addCartItem = food => {
    const foodAlreadyExists = cartList.find(
      eachItem => eachItem.foodId === food.foodId,
    )

    if (foodAlreadyExists) {
      setCartList(prevState =>
        prevState.map(item =>
          item.foodId === food.foodId
            ? {...item, quantity: item.quantity + food.quantity}
            : {...item},
        ),
      )
    } else {
      setCartList(prevState => [...prevState, food])
    }
  }

  const deleteCartItem = foodId => {
    const filteredResults = cartList.filter(
      eachItem => eachItem.foodId !== foodId,
    )
    setCartList(filteredResults)
  }

  const incrementCartItemQuantity = foodId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.foodId === foodId
          ? {...item, quantity: item.quantity + 1}
          : {...item},
      ),
    )
  }

  const decrementCartItemQuantity = foodId => {
    const dishAlreadyExists = cartList.find(
      eachItem => eachItem.foodId === foodId,
    )
    if (dishAlreadyExists.quantity > 1) {
      setCartList(prevState =>
        prevState.map(item =>
          item.foodId === foodId
            ? {...item, quantity: item.quantity - 1}
            : {...item},
        ),
      )
    } else {
      deleteCartItem(foodId)
    }
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  localStorage.setItem('cartDetails', JSON.stringify(cartList))

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        deleteCartItem,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute
          exact
          path='/restaurant/:id'
          component={SpecificRestaurant}
        />
        <ProtectedRoute exact path='/cart' component={Cart} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
