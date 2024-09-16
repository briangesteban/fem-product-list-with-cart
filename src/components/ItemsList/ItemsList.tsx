import menuData from "../../data/data.json";
import "./ItemsList.scss";

const ItemsList = () => {
  const menuCards = menuData.map((menuItem) => {
    return (
      <article className="card">
        <img
          src={menuItem.image.mobile}
          alt={menuItem.name}
          className="card__item-img"
        />
        <p className="card__item-category">{menuItem.category}</p>
        <h2 className="card__item-name">{menuItem.name}</h2>
        <h3 className="card__item-price">${menuItem.price.toFixed(2)}</h3>
      </article>
    );
  });
  return <>{menuCards}</>;
};

export { ItemsList };
