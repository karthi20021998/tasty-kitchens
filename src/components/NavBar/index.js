import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const NavBar = props => {
  const {history} = props

  const {cartList} = useContext(CartContext)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-heading-card">
        <Link to="/" className="nav-link">
          <img
            src="https://res.cloudinary.com/dghnaymwn/image/upload/v1708001737/karthi/Frame_274_je9cyu.jpg"
            alt="website logo"
            className="navbar-logo"
          />
        </Link>
        <h1 className="navbar-heading">Tasty Kitchens</h1>
      </div>
      <div className="large-device-container">
        <Link to="/" className="nav-link">
          <p className="nav-home">Home</p>
        </Link>
        <Link to="/cart" className="nav-link">
          <p className="nav-cart">
            Cart<span className="cartitems-text">{cartList.length}</span>
          </p>
        </Link>
        <button
          type="button"
          className="nav-logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
