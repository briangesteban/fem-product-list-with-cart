import { useState, useEffect } from "react";
import type { IMenuItems, IBill } from "../../utils/customTypes";
import menuData from "../../data/data.json";
import { ItemsList } from "../ItemsList/ItemsList";
import { CartPreview } from "../CartPreview/CartPreview";
import { BillModal } from "../BillModal/BillModal";
import "./ItemBoard.scss";

let initTotalItems: number = 0;
let initGrandTotal: number = 0;

// Run if, there's item on local storage.
if (localStorage.length) {
  for (let i: number = 0; i < localStorage.length; i++) {
    initTotalItems += JSON.parse(
      localStorage.getItem(localStorage.key(i) as string) as string
    ).count;
    initGrandTotal += JSON.parse(
      localStorage.getItem(localStorage.key(i) as string) as string
    ).subTotal;
  }
}

const ItemBoard = () => {
  const [menuItems] = useState<IMenuItems[]>(menuData);
  const [storage, setStorage] = useState<Record<string, string>>(localStorage);
  const [totalItems, setTotalItems] = useState<number>(initTotalItems);
  const [grandTotal, setGrandTotal] = useState<number>(initGrandTotal);
  const [bill, setBill] = useState<IBill>({
    cartItems: JSON.stringify(storage),
    grandTotal: initGrandTotal,
  });
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

  // Tracks changes on totalItems state to trigger re-render.
  useEffect(() => {
    setStorage(localStorage);
  }, [totalItems]);

  return (
    <main className={!isModalOn ? "item-board" : "item-board item-board--true"}>
      <section className="item-board__menu">
        <h1 className="item-board__header">Desserts</h1>
        <div className="item-board__menu-list">
          <ItemsList
            menuItems={menuItems}
            storage={storage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
          />
        </div>
      </section>
      <CartPreview
        totalItems={totalItems}
        storage={storage}
        grandTotal={grandTotal}
        setGrandTotal={setGrandTotal}
        setTotalItems={setTotalItems}
        setBill={setBill}
        setIsModalOn={setIsModalOn}
      />
      <BillModal
        bill={bill}
        isModalOn={isModalOn}
        setIsModalOn={setIsModalOn}
        menuItems={menuItems}
      />
    </main>
  );
};

export { ItemBoard };
