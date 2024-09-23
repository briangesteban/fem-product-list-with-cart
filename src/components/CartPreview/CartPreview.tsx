import EmptyCartIllustration from "../../assets/images/illustration-empty-cart.svg";
import "./CartPreview.scss";

interface IProps {
  locStorage: Record<string, string>;
  locStorageLen: number;
  totalItems: number;
}

const CartPreview = (props: IProps) => {
  const { locStorage, locStorageLen, totalItems } = props;
  const keys: string[] = Object.keys(locStorage);

  const cartList = keys.map((key, index) => {
    return (
      <li key={index}>
        <h3>{key}</h3>
        <div>
          <span>
            <strong>{locStorage[key]}x</strong>
          </span>
          <span></span>
        </div>
      </li>
    );
  });

  return (
    <section className="cart-preview">
      <h2 className="cart-preview__header">Your Cart &#40;{totalItems}&#41;</h2>
      <div
        className={
          totalItems
            ? "cart-preview__empty-cart cart-preview__empty-cart--false"
            : "cart-preview__empty-cart"
        }
      >
        <img
          src={EmptyCartIllustration}
          alt=""
          className="cart-preview__illustration"
        />
        <p className="cart-preview__information">
          Your added items will appear here
        </p>
      </div>
      <div className="cart-preview__cart-active">
        <ul>{cartList}</ul>
      </div>
    </section>
  );
};

export { CartPreview };
