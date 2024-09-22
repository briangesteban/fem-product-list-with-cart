import { useState, useEffect } from "react";
import menuData from "../../data/data.json";
import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import IncreaseIcon from "../../assets/images/icon-increment-quantity.svg";
import DecreaseIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./ItemsList.scss";

const ItemsList = () => {
  const [locStorage, setLocStorage] = useState<object>(localStorage);
  const [locStorageLen, setLocStorageLen] = useState<number>(
    localStorage.length
  );

  useEffect(() => {
    setLocStorage(localStorage);
  }, [locStorageLen]);

  // Add to Cart Button Handler
  const addToCartHandler = (item: string): void => {
    // Creates key/value on local storage or update it's value
    if (!localStorage.getItem(item)) {
      localStorage.setItem(item, "1");
      setLocStorageLen(locStorageLen + 1);
    } else {
      localStorage.setItem(
        item,
        (Number(localStorage.getItem(item)) + 1).toString()
      );
    }
  };

  const menuCards = menuData.map((menuItem, index) => {
    return (
      <article className="card" key={index}>
        <div className="card__img-container">
          <img
            src={menuItem.image.mobile}
            alt={menuItem.name}
            className={
              locStorage[menuItem.name as keyof typeof locStorage]
                ? "card__item-img card__item-img--border-on"
                : "card__item-img"
            }
          />
          <button
            className={
              locStorage[menuItem.name as keyof typeof locStorage]
                ? "card__btn-atc card__btn-atc--hidden"
                : "card__btn-atc"
            }
            onClick={() => {
              addToCartHandler(menuItem.name);
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
              locStorage[menuItem.name as keyof typeof locStorage]
                ? "card__item-counter card__item-counter--visible"
                : "card__item-counter"
            }
            aria-label={`${menuItem.name} Count`}
          >
            <button className="card__btn-counter" aria-label="Decrease value">
              <img src={DecreaseIcon} alt="Decrease icon" />
            </button>
            <span className="card__item-count" aria-label="Item Count">
              {locStorage[menuItem.name as keyof typeof locStorage]}
            </span>
            <button className="card__btn-counter" aria-label="Increase value">
              <img src={IncreaseIcon} alt="Increase icon" />
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
