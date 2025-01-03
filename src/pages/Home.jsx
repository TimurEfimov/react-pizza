import { useEffect, useState } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

export default function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortName, setSortName] = useState({
    name: "популярности",
    sort: "rating",
  });

  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&title=*${searchValue}*` : "";

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://e0f09f95f87ac222.mokky.dev/pizzas?page=${currentPage}&limit=4&${category}&sortBy=-${sortName.sort}${search}`;
    axios.get(apiUrl).then((resp) => {
      const allPizzas = resp.data.items;
      setItems(allPizzas);
      setPages(resp.data.meta);
      setLoading(false);
    });
  }, [categoryId, sortName, searchValue, currentPage]);

  console.log(currentPage)

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          <Sort value={sortName} onClickSort={(i) => setSortName(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
        </div>
        <Pagination
          pages={pages.total_pages}
          per_page={pages.per_page}
          onChangePage={(number) => setCurrentPage(number)}
        />
      </div>
    </>
  );
}
