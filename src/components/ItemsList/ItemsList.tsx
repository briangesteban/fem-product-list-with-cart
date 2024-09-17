import { useState } from "react";
import menuData from "../../data/data.json";
import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import IncreaseIcon from "../../assets/images/icon-increment-quantity.svg";
import DecreaseIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./ItemsList.scss";

const ItemsList = () => {
  // Cart State
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);

  // Add to Cart Button Handler
  const addToCartHandler = (): void => {
    setIsCartEmpty(false);
  };

  const menuCards = menuData.map((menuItem, index) => {
    return (
      <article className="card" key={index}>
        <div className="card__img-container">
          <img
            src={menuItem.image.mobile}
            alt={menuItem.name}
            className={
              !isCartEmpty
                ? "card__item-img card__item-img--border-on"
                : "card__item-img"
            }
          />
          <button
            className={
              !isCartEmpty
                ? "card__btn-atc card__btn-atc--hidden"
                : "card__btn-atc"
            }
            onClick={() => {
              addToCartHandler();
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
              !isCartEmpty
                ? "card__item-counter card__item-counter--visible"
                : "card__item-counter"
            }
            aria-label={`${menuItem.name} Count`}
          >
            <button className="card__btn-counter" aria-label="Decrease value">
              <img src={DecreaseIcon} alt="Decrease icon" />
            </button>
            <span className="card__item-count" aria-label="Item Count">
              1
            </span>
            <button className="card__btn-counter" aria-label="Increase value">
              <img src={IncreaseIcon} alt="Increase icon" />
            </button>
          </div>
        </div>
        <p className="card__item-category">{menuItem.category}</p>
        <h2 className="card__item-name">{menuItem.name}</h2>
        <h3 className="card__item-price">${menuItem.price.toFixed(2)}</h3>
      </article>
    );
  });
  return <>{menuCards}</>;
};

export { ItemsList };
