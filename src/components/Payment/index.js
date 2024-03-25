import './index.css'

const Payment = () => (
  <div className="payments-container">
    <img
      src="https://res.cloudinary.com/dghnaymwn/image/upload/v1711200692/check-circle.1_1_t4iepy.png"
      alt="payment"
      className="payment-image"
    />
    <h1 className="payment-text">Payment Successful</h1>
    <p className="payment-sub-text">
      Thank you for orderingYour payment is successfully completed.
    </p>
  </div>
)

export default Payment
