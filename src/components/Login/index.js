import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onClickLoginButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="main-container">
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dghnaymwn/image/upload/v1708001737/karthi/Frame_274_je9cyu.jpg"
            alt="website logo"
            className="tasty-logo"
          />
          <h2 className="tasty-heading">Tasty Kitchens</h2>
          <img
            src="https://res.cloudinary.com/dghnaymwn/image/upload/v1708693508/karthi/Rectangle_1457_bm7e6s.jpg"
            alt="website login"
            className="small-device-image"
          />
          <form className="form-container" onSubmit={this.onClickLoginButton}>
            <h1 className="form-heading">Login</h1>
            <label htmlFor="username" className="form-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="form-input"
              onChange={this.onChangeUserName}
            />
            <label htmlFor="userpassword" className="form-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="userpassword"
              value={password}
              className="form-input"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="form-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <div className="image-container" />
      </div>
    )
  }
}

export default Login
