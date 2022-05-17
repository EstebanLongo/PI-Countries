import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCountries,
  filterByContinent,
  orderAZ,
  orderByPopulation,
} from "../../redux/actions";
import styles from './orders.module.css'

export default function Name({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();

  function handleName(e) {
    e.preventDefault(e);
    if (e.target.value !== "All") {
      dispatch(orderAZ(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value);
    } else {
      dispatch(getCountries());
      setCurrentPage(1);
      setOrder(e.target.value);
    }
  }

  useEffect(() => {
    dispatch(filterByContinent());
    dispatch(orderByPopulation());
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      <span>Order by name</span>
      <br/>
      <select onChange={(e) => handleName(e)}>
        <option value="All">All</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}
