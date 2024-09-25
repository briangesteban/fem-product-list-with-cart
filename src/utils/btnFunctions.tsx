// Add to Cart Button Handler
const addToCartHandler = (
  item: string,
  price: number,
  totalItems: number,
  setTotalItems: (arg: number) => void,
  grandTotal: number,
  setGrandTotal: (arg: number) => void
): void => {
  localStorage.setItem(
    item,
    JSON.stringify({ count: 1, price, subTotal: price })
  ); // Create key/value pair on local storage.
  setTotalItems(totalItems + 1); // Update total items to trigger re-render.
  setGrandTotal(grandTotal + price);
};

// Decrease Item Count Button Handler
const decreaseCountHandler = (
  item: string,
  price: number,
  storage: Record<string, string>,
  totalItems: number,
  setTotalItems: (arg: number) => void,
  grandTotal: number,
  setGrandTotal: (arg: number) => void
): void => {
  const currValue: { count: number; price: number; subTotal: number } =
    JSON.parse(storage[item]); // Parse storage key/value pair.
  const newValue: number = currValue.count - 1; // Decrase item count.

  // If item value reached 0, remove item for local storage, else decrease total items and update item count and sub total.
  if (!newValue) {
    setTotalItems(totalItems - 1);
    setGrandTotal(grandTotal - price);
    localStorage.removeItem(item);
  } else {
    setTotalItems(totalItems - 1);
    setGrandTotal(grandTotal - price);
    localStorage.setItem(
      item,
      JSON.stringify({
        count: newValue,
        price: currValue.price,
        subTotal: currValue.subTotal - currValue.price,
      })
    );
  }
};

// Increase Item Count Button Handler
const increaseCountHandler = (
  item: string,
  price: number,
  storage: Record<string, string>,
  totalItems: number,
  setTotalItems: (arg: number) => void,
  grandTotal: number,
  setGrandTotal: (arg: number) => void
): void => {
  const currValue: { count: number; price: number; subTotal: number } =
    JSON.parse(storage[item]); // Parse storage key/value pair.
  const newValue: number = currValue.count + 1; // add one to item count.

  // Item value !> 50, add 1 to total items and updates item count and sub total.
  if (!(newValue > 50)) {
    setTotalItems(totalItems + 1);
    setGrandTotal(grandTotal + price);
    localStorage.setItem(
      item,
      JSON.stringify({
        count: newValue,
        price: currValue.price,
        subTotal: currValue.subTotal + currValue.price,
      })
    );
  }
};

export { addToCartHandler, decreaseCountHandler, increaseCountHandler };
