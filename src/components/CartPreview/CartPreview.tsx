import {
  removeItemHandler,
  confirmOrderHandler,
} from "../../utils/btnFunctions";
import EmptyCartIllustration from "../../assets/images/illustration-empty-cart.svg";
import RemoveItemIcon from "../../assets/images/icon-remove-item.svg";
import CarbonNeutralIcon from "../../assets/images/icon-carbon-neutral.svg";
import "./CartPreview.scss";

const CartPreview = (props: {
  totalItems: number;
  storage: Record<string, string>;
  grandTotal: number;
  setGrandTotal: (arg: number) => void;
  setTotalItems: (arg: number) => void;
  setBill: (arg: { cartItems: string; grandTotal: number }) => void;
  setIsModalOn: (arg: boolean) => void;
}) => {
  const {
    totalItems,
    storage,
    grandTotal,
    setGrandTotal,
    setTotalItems,
    setBill,
    setIsModalOn,
  } = props; // Destructured props
  let storageKeys: string[] = [];
  let cartList: JSX.Element[] = [];

  // If there's item on cart, get storage keys.
  if (totalItems) {
    storageKeys = Object.keys(storage);
    cartList = storageKeys.map((key, index) => {
      return (
        <li className="cart-list__item" key={index}>
          <div className="cart-list__divider">
            <h3 className="cart-list__item-name">{key}</h3>
            <span className="cart-list__item-count">
              {storage[key] && JSON.parse(storage[key]).count}x
            </span>
            <span className="cart-list__item-price">
              {storage[key] &&
                `@ $${JSON.parse(storage[key]).price.toFixed(2)}`}
            </span>
            <span className="cart-list__item-subtotal">
              {storage[key] &&
                `$${JSON.parse(storage[key]).subTotal.toFixed(2)}`}
            </span>
          </div>
          <div className="cart-list__divider">
            <button
              className="cart-list__btn-remove"
              aria-label="Remove Item"
              onClick={() => {
                removeItemHandler(
                  key,
                  JSON.parse(storage[key]).count,
                  JSON.parse(storage[key]).subTotal,
                  totalItems,
                  setTotalItems,
                  grandTotal,
                  setGrandTotal
                );
              }}
            >
              <img
                src={RemoveItemIcon}
                alt="Remove Item Icon"
                className="cart-list__btn-icon"
              />
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <section className="cart-preview">
      <h2 className="cart-preview__header">{`Your Cart (${totalItems})`}</h2>
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
      <div
        className={
          totalItems
            ? "cart-preview__cart-list cart-preview__cart-list--true"
            : "cart-preview__cart-list"
        }
      >
        <ul className="cart-list">{totalItems && cartList}</ul>
        <h4 className="cart-preview__order-total">
          Order Total
          <span className="cart-preview__total-price">{`$${grandTotal.toFixed(
            2
          )}`}</span>
        </h4>
        <div className="cart-preview__badge">
          <img src={CarbonNeutralIcon} alt="" className="cart-preview__icon" />
          <p className="cart-preview__tagline">
            This is a <strong>carbon-neutral</strong> delivery
          </p>
        </div>
        <button
          className="cart-preview__btn-confirm"
          onClick={() => {
            confirmOrderHandler(
              storage,
              grandTotal,
              setGrandTotal,
              setTotalItems,
              setBill,
              setIsModalOn
            );
          }}
        >
          Confirm Order
        </button>
      </div>
    </section>
  );
};

export { CartPreview };
