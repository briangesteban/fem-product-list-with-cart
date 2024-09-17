import EmptyCartIllustration from "../../assets/images/illustration-empty-cart.svg";
import "./CartPreview.scss";

const CartPreview = () => {
  return (
    <section className="cart-preview">
      <h2 className="cart-preview__header">Your Cart &#40;0&#41;</h2>
      <img
        src={EmptyCartIllustration}
        alt=""
        className="cart-preview__illustration"
      />
      <p className="cart-preview__information">
        Your added items will appear here
      </p>
    </section>
  );
};

export { CartPreview };
