import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  selectFilter,
} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

type Pizza = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type PizzaState = {
  items: Pizza[];
  pages: {
    total_pages: number;
    per_page: number;
  };
  status: string;
};

type FilterState = {
  categoryId: number;
  sort: {
    sortProperty: string;
  };
  currentPage: number;
  searchValue: string;
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, pages, status }: PizzaState = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue }: FilterState =
    useSelector(selectFilter);

  const sortType = sort.sortProperty;

  function onClickCategory(id: number) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(num: number) {
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
};

export default Home;
