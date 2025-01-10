import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, selectCartItemById } from "../../redux/slices/cartSlice";
import { CartItem } from "../../redux/slices/cartSlice";

const typeNames = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type selectCartItem = {
  id: number;
  count: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  price,
  title,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id)) as
    | selectCartItem
    | undefined;

  const [activeIndexSize, setActiveIndexSize] = useState(0);
  const [activeIndexType, setActiveIndexType] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  function onClickAdd() {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeIndexType],
      size: sizes[activeIndexSize],
      count: 0,
    };
    dispatch(addProduct(item));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => (
              <li
                className={activeIndexType == i ? "active" : ""}
                onClick={() => setActiveIndexType(type)}
                key={i}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                onClick={() => setActiveIndexSize(i)}
                className={activeIndexSize == i ? "active" : ""}
                key={i}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
