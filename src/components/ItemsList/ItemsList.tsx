import {
  addToCartHandler,
  decreaseCountHandler,
  increaseCountHandler,
} from "../../utils/btnFunctions";
import type { IPropsItemList } from "../../utils/customTypes";
import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import IncreaseIcon from "../../assets/images/icon-increment-quantity.svg";
import DecreaseIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./ItemsList.scss";

const ItemsList = (props: IPropsItemList) => {
  const {
    menuItems,
    storage,
    totalItems,
    setTotalItems,
    grandTotal,
    setGrandTotal,
  } = props; // Destructured props

  const menuCards = menuItems.map((menuItem, index) => {
    return (
      <article className="card" key={index}>
        <div className="card__img-container">
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet={`${import.meta.env.BASE_URL}${menuItem.image.desktop}`}
            />
            <img
              src={`${import.meta.env.BASE_URL}${menuItem.image.mobile}`}
              alt={menuItem.name}
              className={
                storage[menuItem.name]
                  ? "card__item-img card__item-img--border-on"
                  : "card__item-img"
              }
            />
          </picture>
          <button
            className={
              storage[menuItem.name]
                ? "card__btn-atc card__btn-atc--hidden"
                : "card__btn-atc"
            }
            onClick={() => {
              addToCartHandler(
                menuItem.name,
                menuItem.price,
                totalItems,
                setTotalItems,
                grandTotal,
                setGrandTotal
              );
            }}
          >
            <img
              src={AddToCartIcon}
              alt="Add to cart icon"
              className="card__icon-atc"
            />
            Add to Cart
          </button>
          <div
            className={
              storage[menuItem.name]
                ? "card__item-counter card__item-counter--visible"
                : "card__item-counter"
            }
            aria-label={`${menuItem.name} Count`}
          >
            <button
              className="card__btn-counter"
              onClick={() => {
                decreaseCountHandler(
                  menuItem.name,
                  menuItem.price,
                  storage,
                  totalItems,
                  setTotalItems,
                  grandTotal,
                  setGrandTotal
                );
              }}
            >
              <img src={DecreaseIcon} alt="Decrease Value" />
            </button>
            <span className="card__item-count" aria-label="Current Item Count">
              {!storage[menuItem.name]
                ? 0
                : JSON.parse(storage[menuItem.name]).count}
            </span>
            <button
              className="card__btn-counter"
              onClick={() => {
                increaseCountHandler(
                  menuItem.name,
                  menuItem.price,
                  storage,
                  totalItems,
                  setTotalItems,
                  grandTotal,
                  setGrandTotal
                );
              }}
            >
              <img src={IncreaseIcon} alt="Increase value" />
            </button>
          </div>
        </div>
        <p className="card__item-category">{menuItem.category}</p>
        <h2 className="card__item-name">{menuItem.name}</h2>
        <h3 className="card__item-price">{`$${menuItem.price.toFixed(2)}`}</h3>
      </article>
    );
  });
  return <>{menuCards}</>;
};

export { ItemsList };
