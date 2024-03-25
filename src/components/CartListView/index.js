import {useContext} from 'react'
import {TiDelete} from 'react-icons/ti'
import CartContext from '../../context/CartContext'
import './index.css'

const CartListView = props => {
  const {cartDetails} = props
  const {foodId, imageUrl, cost, name, quantity} = cartDetails

  const {incrementCartItemQuantity, deleteCartItem} = useContext(CartContext)
  const {decrementCartItemQuantity} = useContext(CartContext)

  const onIncreaseQty = () => {
    incrementCartItemQuantity(foodId)
  }

  const onDecreaseQty = () => {
    decrementCartItemQuantity(foodId)
  }

  const onRemoveCartItem = () => {
    deleteCartItem(foodId)
  }

  return (
    <li className="cart-item-container">
      <div className="image-card">
        <img src={imageUrl} alt="cartItemImage" className="cart-item-image" />
        <h1 className="cart-item-name">{name}</h1>
      </div>
      <div className="control-btn-group">
        <button type="button" className="control-btn" onClick={onDecreaseQty}>
          -
        </button>
        <p className="cart-item-quantity">{quantity}</p>
        <button type="button" className="control-btn" onClick={onIncreaseQty}>
          +
        </button>
      </div>
      <div className="price-card">
        <p className="cart-item-price">{cost * quantity} Rs</p>
        <button type="button" className="remove-btn" onClick={onRemoveCartItem}>
          <TiDelete className="remove-btn-icon" />
        </button>
      </div>
    </li>
  )
}

export default CartListView
