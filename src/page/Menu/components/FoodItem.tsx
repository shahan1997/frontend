import React, { useContext } from "react";
import "./FoodItem.css";
import { selectBasketItems } from "../store/BasketSelector";
import { useSelector } from "react-redux";
import addIconWhite from "../../../assets/images/add_icon_white.png";
import addIconGreen from "../../../assets/images/add_icon_green.png";

import removeIcon from "../../../assets/images/remove_icon_red.png";

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  const selectItem = useSelector(selectBasketItems);

  const cartTotalItems = selectItem
    .filter((item) => item._id === id)
    .reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image cursor-pointer"
          src={image}
          alt={name}
        />
        {cartTotalItems === 0 ? (
          <img className="add" src={addIconWhite} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img src={removeIcon} alt="Remove" />
            <p className="cartitemsp">{cartTotalItems}</p>
            <img src={addIconGreen} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="namewe">{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
