import { useState, useEffect } from "react";
import menuData from "../../data/data.json";
import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import IncreaseIcon from "../../assets/images/icon-increment-quantity.svg";
import DecreaseIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./ItemsList.scss";

const ItemsList = () => {
  const [countChange, setCountChange] = useState<number>(1);
  const [locStorage, setLocStorage] = useState<object>(localStorage);
  const [locStorageLen, setLocStorageLen] = useState<number>(
    Object.keys(locStorage).length
  );

  // Tracks local storage length to update local storage value, and re-render.
  useEffect(() => {
    setLocStorage(localStorage);
  }, [locStorageLen, countChange]);

  // Add to Cart Button Handler
  const addToCartHandler = (item: string): void => {
    // Creates key/value on local storage or update it's value
    if (!locStorage[item as keyof typeof locStorage]) {
      localStorage.setItem(item, "1");
      setLocStorageLen(locStorageLen + 1);
    } else {
      localStorage.setItem(
        item,
        (Number(localStorage.getItem(item)) + 1).toString()
      );
    }
  };

  // Decrease Item Count Button Handler
  const decreaseCountHandler = (item: string): void => {
    let newCount: number =
      Number(locStorage[item as keyof typeof locStorage]) - 1;
    if (!newCount) {
      localStorage.removeItem(item);
      setLocStorageLen(Object.keys(locStorage).length - 1);
      setCountChange(0);
    } else {
      localStorage.setItem(item, newCount.toString());
      setCountChange(newCount);
    }
  };

  // Increase Item Count Button Handler
  const increaseCountHandler = (item: string): void => {
    let newCount: number =
      Number(locStorage[item as keyof typeof locStorage]) + 1;
    if (newCount > 50) {
      setCountChange(newCount);
    } else {
      localStorage.setItem(item, newCount.toString());
      setCountChange(newCount);
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
            <button
              className="card__btn-counter"
              aria-label="Decrease value"
              onClick={() => {
                decreaseCountHandler(menuItem.name);
              }}
            >
              <img src={DecreaseIcon} alt="Decrease icon" />
            </button>
            <span className="card__item-count" aria-label="Item Count">
              {locStorage[menuItem.name as keyof typeof locStorage]}
            </span>
            <button
              className="card__btn-counter"
              aria-label="Increase value"
              onClick={() => {
                increaseCountHandler(menuItem.name);
              }}
            >
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
