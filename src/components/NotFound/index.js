import './index.css'

const NotFound = props => {
  const {history} = props
  const onClickHomeButton = () => {
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dghnaymwn/image/upload/v1710910421/erroring_1_ibbdys.png"
        alt="errorimage"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <button
        type="button"
        className="home-page-btn"
        onClick={onClickHomeButton}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
