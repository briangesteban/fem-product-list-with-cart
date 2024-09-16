import menuData from "../../data/data.json";
import "./ItemsList.scss";

const ItemsList = () => {
  const menuCards = menuData.map((menuItem, index) => {
    return (
      <article className="card" key={index}>
        <div className="card__img-container">
          <img
            src={menuItem.image.mobile}
            alt={menuItem.name}
            className="card__item-img"
          />
          <button className="card__btn-atc">Add to Cart</button>
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
