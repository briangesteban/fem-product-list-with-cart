import { ItemsList } from "../ItemsList/ItemsList";
import { CartPreview } from "../CartPreview/CartPreview";
import "./ItemBoard.scss";

const ItemBoard = () => {
  return (
    <section className="item-board">
      <h1 className="item-board__header">Desserts</h1>
      <section className="item-board__menu-list">
        <ItemsList />
        <CartPreview />
      </section>
    </section>
  );
};

export { ItemBoard };
