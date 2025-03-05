import React from "react";

import categoryImg01 from "../../../assets/images/category-01.png";
import categoryImg02 from "../../../assets/images/category-02.png";
import categoryImg03 from "../../../assets/images/category-03.png";
import categoryImg04 from "../../../assets/images/category-04.png";
import "./delivery.css";

const categoryData = [
  {
    display: "Burger",
    imgUrl: categoryImg01,
  },
  {
    display: "Pizza",
    imgUrl: categoryImg02,
  },

  {
    display: "Kebab",
    imgUrl: categoryImg03,
  },

  {
    display: "Meat",
    imgUrl: categoryImg04,
  },
];

const Category = () => {
  return (
    <div className="category-container">
      <div className="category-header">
        <h2>What We Serve</h2>
        <p>
          Sit back, relax, and enjoy a variety of dishes delivered straight to
          you
        </p>
      </div>
      <div className="category-row">
        {categoryData.map((item, index) => (
          <div className="category-item" key={index}>
            <div className="category-img">
              <img src={item.imgUrl} alt="category__item" />
            </div>
            <h6>{item.display}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
