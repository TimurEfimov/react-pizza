import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function fullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  const fetchPizzaById = async () => {
    try {
      const { data } = await axios.get(
        `https://e0f09f95f87ac222.mokky.dev/pizzas/${id}`
      );
      setPizza(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPizzaById();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h2 style={{textAlign: 'center'}}>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
