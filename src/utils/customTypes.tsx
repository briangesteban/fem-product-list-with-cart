interface IMenuItems {
  category: string;
  image: { desktop: string; mobile: string; tablet: string; thumbnail: string };
  name: string;
  price: number;
}

interface IPropsItemList {
  menuItems: IMenuItems[];
  storage: Record<string, string>;
  totalItems: number;
  setTotalItems: (arg: number) => void;
  grandTotal: number;
  setGrandTotal: (arg: number) => void;
}

interface IBill {
  cartItems: string;
  grandTotal: number;
}

export type { IMenuItems, IPropsItemList, IBill };
