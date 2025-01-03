import React, { useState } from "react";

export default function Categories({ value, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={value == i ? "active" : ""}
            key={i}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
