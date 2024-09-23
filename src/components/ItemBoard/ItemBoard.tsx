import { useState, useEffect } from "react";
import { ItemsList } from "../ItemsList/ItemsList";
import { CartPreview } from "../CartPreview/CartPreview";
import "./ItemBoard.scss";

interface IBillList {
  name: string;
  price: number;
  count: number;
}

const ItemBoard = () => {
  const [countChange, setCountChange] = useState<number>(1);
  const [locStorage, setLocStorage] =
    useState<Record<string, string>>(localStorage);
  const [locStorageLen, setLocStorageLen] = useState<number>(
    Object.keys(locStorage).length
  );
  const [totalItems, setTotalItems] = useState<number>(0);
  const [billList, setBillList] = useState<IBillList[]>([]);

  // Tracks dependencies to update local storage value, and re-render.
  useEffect(() => {
    setLocStorage(localStorage);

    if (!totalItems) {
      let tempVal: number = 0;
      for (let i: number = 0; i < locStorageLen; i++) {
        tempVal += Number(locStorage[Object.keys(locStorage)[i]]);
      }
      setTotalItems(tempVal);
    }

    console.log(billList);
  }, [locStorageLen, countChange]);

  return (
    <main className="item-board">
      <h1 className="item-board__header">Desserts</h1>
      <section className="item-board__menu-list">
        <ItemsList
          setCountChange={setCountChange}
          locStorage={locStorage}
          locStorageLen={locStorageLen}
          setLocStorageLen={setLocStorageLen}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          billList={billList}
          setBillList={setBillList}
        />
        <CartPreview
          locStorage={locStorage}
          locStorageLen={locStorageLen}
          totalItems={totalItems}
        />
      </section>
    </main>
  );
};

export { ItemBoard };
