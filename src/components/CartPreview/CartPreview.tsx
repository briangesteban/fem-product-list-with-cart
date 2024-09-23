import EmptyCartIllustration from "../../assets/images/illustration-empty-cart.svg";
import "./CartPreview.scss";

const CartPreview = (props: { totalItems: number }) => {
  const { totalItems } = props; // Destructured props

  return (
    <section className="cart-preview">
      <h2 className="cart-preview__header">Your Cart &#40;{totalItems}&#41;</h2>
      <div
        className={
          false
            ? "cart-preview__empty-cart cart-preview__empty-cart--false"
            : "cart-preview__empty-cart"
        }
      >
        <img
          src={EmptyCartIllustration}
          alt=""
          className="cart-preview__illustration"
        />
        <p className="cart-preview__information">
          Your added items will appear here
        </p>
      </div>
      <div className="cart-preview__cart-active">
        <ul></ul>
      </div>
    </section>
  );
};

export { CartPreview };
