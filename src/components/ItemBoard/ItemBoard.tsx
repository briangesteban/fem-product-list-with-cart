import { ItemsList } from "../ItemsList/ItemsList";
import { CartPreview } from "../CartPreview/CartPreview";
import "./ItemBoard.scss";

const ItemBoard = () => {
  return (
    <main className="item-board">
      <h1 className="item-board__header">Desserts</h1>
      <section className="item-board__menu-list">
        <ItemsList />
        <CartPreview />
      </section>
    </main>
  );
};

export { ItemBoard };
