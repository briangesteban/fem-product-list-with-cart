// Add to Cart Button Handler
const addToCartHandler = (
  item: string,
  price: number,
  totalItems: number,
  setTotalItems: (arg: number) => void
): void => {
  localStorage.setItem(item, JSON.stringify({ count: 1, price })); // Create key/value pair on local storage.
  setTotalItems(totalItems + 1); // Update total items to trigger re-render.
};

// Decrease Item Count Button Handler
const decreaseCountHandler = (
  item: string,
  storage: Record<string, string>,
  totalItems: number,
  setTotalItems: (arg: number) => void
): void => {
  const currValue: { count: number; price: number } = JSON.parse(storage[item]); // Parse storage key/value pair.
  const newValue: number = currValue.count - 1; // Decrase item count.

  // If item value reached 0, remove item for local storage, else decrease total items and update item count.
  if (!newValue) {
    setTotalItems(totalItems - 1);
    localStorage.removeItem(item);
  } else {
    setTotalItems(totalItems - 1);
    localStorage.setItem(
      item,
      JSON.stringify({ count: newValue, price: currValue.price })
    );
  }
};

// Increase Item Count Button Handler
const increaseCountHandler = (
  item: string,
  storage: Record<string, string>,
  totalItems: number,
  setTotalItems: (arg: number) => void
): void => {
  const currValue: { count: number; price: number } = JSON.parse(storage[item]); // Parse storage key/value pair.
  const newValue: number = currValue.count + 1; // add one to item count.

  // Item value !> 50, add 1 to total items and updates item count.
  if (!(newValue > 50)) {
    setTotalItems(totalItems + 1);
    localStorage.setItem(
      item,
      JSON.stringify({ count: newValue, price: currValue.price })
    );
  }
};

export { addToCartHandler, decreaseCountHandler, increaseCountHandler };
