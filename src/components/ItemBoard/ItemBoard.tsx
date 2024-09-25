import { useState, useEffect } from "react";
import type { IMenuItems } from "../../utils/customTypes";
import menuData from "../../data/data.json";
import { ItemsList } from "../ItemsList/ItemsList";
import { CartPreview } from "../CartPreview/CartPreview";
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

  // Tracks changes on totalItems state to trigger re-render.
  useEffect(() => {
    setStorage(localStorage);
  }, [totalItems]);

  return (
    <main className="item-board">
      <h1 className="item-board__header">Desserts</h1>
      <section className="item-board__menu-list">
        <ItemsList
          menuItems={menuItems}
          storage={storage}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          grandTotal={grandTotal}
          setGrandTotal={setGrandTotal}
        />
        <CartPreview
          totalItems={totalItems}
          storage={storage}
          grandTotal={grandTotal}
        />
      </section>
    </main>
  );
};

export { ItemBoard };
