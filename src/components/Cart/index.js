import {useContext} from 'react'
import Popup from 'reactjs-popup'
import NavBar from '../NavBar'
import CartListView from '../CartListView'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = props => {
  const {history} = props
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const onClickOrderNow = () => {
    history.push('/')
  }

  const onRemoveAll = () => {
    removeAllCartItems()
  }

  let orderTotal = 0

  cartList.forEach(eachItem => {
    orderTotal += eachItem.cost * eachItem.quantity
  })

  const renderCartItems = () => (
    <div className="cart-container">
      <button type="button" className="remove-all" onClick={onRemoveAll}>
        Remove All
      </button>
      <ul className="cart-list-container">
        <li className="table-card">
          <h1 className="items">Item</h1>
          <h1 className="quantity">Quantity</h1>
          <h1 className="price">Price</h1>
        </li>
        {cartList.map(eachCartItem => (
          <CartListView cartDetails={eachCartItem} key={eachCartItem.foodId} />
        ))}
      </ul>
      <hr className="hr-line" />
      <div className="order-container">
        <h1 className="order-title">Order Total:</h1>
        <div>
          <h1 className="order-price">{orderTotal} Rs</h1>
          <Popup
            modal
            trigger={
              <button type="button" className="order-btn">
                Place Order
              </button>
            }
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      </div>
    </div>
  )

  const emptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dghnaymwn/image/upload/v1711016120/cooking_1_xexcb1.png"
        alt="emptycart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty.Add something from the menu
      </p>
      <button type="button" className="order-now-btn" onClick={onClickOrderNow}>
        Order Now
      </button>
    </div>
  )

  return (
    <>
      <NavBar />
      {cartList.length === 0 ? emptyCartView() : renderCartItems()}
    </>
  )
}

export default Cart
