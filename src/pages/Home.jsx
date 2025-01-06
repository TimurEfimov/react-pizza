import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

export default function Home() {
  const dispatch = useDispatch();

  const { items, pages, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(num) {
    dispatch(setCurrentPage(num));
  }

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&title=*${searchValue}*` : "";
    const sortBy = `&sortBy=${sortType}`;

    try {
      dispatch(
        fetchPizzas({
          category,
          search,
          sortBy,
          currentPage,
        })
      );
    } catch (error) {
      alert("Ошибка при получении пицц");
      console.log(error);
    }
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
        <Pagination
          pages={pages.total_pages}
          per_page={pages.per_page}
          onChangePage={onChangePage}
        />
      </div>
    </>
  );
}
