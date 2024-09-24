import EmptyCartIllustration from "../../assets/images/illustration-empty-cart.svg";
import "./CartPreview.scss";

const CartPreview = (props: {
  totalItems: number;
  storage: Record<string, string>;
}) => {
  const { totalItems, storage } = props; // Destructured props
  let storageKeys: string[] = [];
  let cartList: JSX.Element[] = [];

  // If there's item on cart, get storage keys.
  if (totalItems) {
    storageKeys = Object.keys(storage);
    cartList = storageKeys.map((key, index) => {
      return (
        <li className="cart-list__item" key={index}>
          <h3>{key}</h3>
          <span>{storage[key] && JSON.parse(storage[key]).count}x</span>
          <span className="cart-list__price">
            {storage[key] && `@$${JSON.parse(storage[key]).price.toFixed(2)}`}
          </span>
          <span className="cart-list__sub-total">
            {storage[key] && `$${JSON.parse(storage[key]).subTotal.toFixed(2)}`}
          </span>
          <button className="cart-list__btn-remove">x</button>
        </li>
      );
    });
  }

  return (
    <section className="cart-preview">
      <h2 className="cart-preview__header">Your Cart &#40;{totalItems}&#41;</h2>
      <div
        className={
          totalItems
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
        <ul className="cart-list">{totalItems && cartList}</ul>
      </div>
    </section>
  );
};

export { CartPreview };
