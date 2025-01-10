import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories: string[] = [
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
            className={value === i ? "active" : ""}
            key={i}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
