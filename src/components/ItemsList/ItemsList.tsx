import menuData from "../../data/data.json";
import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import IncreaseIcon from "../../assets/images/icon-increment-quantity.svg";
import DecreaseIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./ItemsList.scss";

interface IBillList {
  name: string;
  price: number;
  count: number;
}

interface IProps {
  setCountChange: (arg: number) => void;
  locStorage: Record<string, string>;
  locStorageLen: number;
  setLocStorageLen: (arg: number) => void;
  totalItems: number;
  setTotalItems: (arg: number) => void;
  billList: IBillList[];
  setBillList: (arg: IBillList[]) => void;
}

const ItemsList = (props: IProps) => {
  const {
    setCountChange,
    locStorage,
    locStorageLen,
    setLocStorageLen,
    totalItems,
    setTotalItems,
    billList,
    setBillList,
  } = props;

  // Add to Cart Button Handler
  const addToCartHandler = (item: string, price: number): void => {
    // Creates key/value on local storage or update it's value
    if (!locStorage[item as keyof typeof locStorage]) {
      localStorage.setItem(item, "1");
      setLocStorageLen(locStorageLen + 1);
      setTotalItems(totalItems + 1);
      setBillList([...billList, { name: item, price, count: 1 }]);
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
      if (totalItems > 0) setTotalItems(totalItems - 1);
    } else {
      localStorage.setItem(item, newCount.toString());
      setCountChange(newCount);
      setTotalItems(totalItems - 1);
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
      setTotalItems(totalItems + 1);
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
              addToCartHandler(menuItem.name, menuItem.price);
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
