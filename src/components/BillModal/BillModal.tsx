import type { IBill, IMenuItems } from "../../utils/customTypes";
import SuccessIcon from "../../assets/images/icon-order-confirmed.svg";
import "./BillModal.scss";

const BillModal = (props: {
  bill: IBill;
  isModalOn: boolean;
  setIsModalOn: (arg: boolean) => void;
  menuItems: IMenuItems[];
}) => {
  const { bill, isModalOn, setIsModalOn, menuItems } = props; // Destructured props
  const cartItems = Object.keys(JSON.parse(bill.cartItems));

  const orderPreview = cartItems.map((cartItem, index) => {
    return (
      <li className="order-preview__item" key={index}>
        <div className="order-preview__item-wrapper">
          <img
            src={
              menuItems.find((item) => item.name === cartItem)?.image.thumbnail
            }
            alt={cartItem}
            className="order-preview__item-thumbnail"
          />
        </div>
        <div className="order-preview__item-wrapper">
          <div className="order-preview__details">
            <h3 className="order-preview__details-name">{cartItem}</h3>
            <span className="order-preview__details-count">1x</span>
            <span className="order-preview__details-price">@ $5.50</span>
          </div>
        </div>
        <div className="order-preview__item-wrapper">
          <h4 className="order-preview__item-subtotal">$5.50</h4>
        </div>
      </li>
    );
  });

  return (
    <div
      className={
        !isModalOn ? "modal-overlay" : "modal-overlay modal-overlay--true"
      }
    >
      <article className="bill-modal">
        <div className="bill-modal__content">
          <img src={SuccessIcon} alt="" className="bill-modal__icon" />
          <h2 className="bill-modal__header">Order Confirmed</h2>
          <p className="bill-modal__subheader">We hope you enjoy your food!</p>
          <div className="bill-modal__order-preview">
            <ul className="order-preview">
              {orderPreview}
              <h5 className="order-preview__grand-total">
                Order Total
                <span className="order-preview__grand-price">
                  {`$${bill.grandTotal.toFixed(2)}`}
                </span>
              </h5>
            </ul>
          </div>
        </div>
        <button
          className="bill-modal__btn-new"
          onClick={() => {
            setIsModalOn(false);
          }}
        >
          Start New Order
        </button>
      </article>
    </div>
  );
};

export { BillModal };
