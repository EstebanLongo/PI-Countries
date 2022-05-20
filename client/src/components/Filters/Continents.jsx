import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByContinent,
  orderAZ,
  orderByPopulation,
} from "../../redux/actions";
import styles from './filters.module.css'

export default function Continents({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
    console.log(e.target.value);
  }

  useEffect(() => {
    dispatch(orderByPopulation());
    dispatch(orderAZ());
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      <span>Filter by continent</span>
      <br/>
      <select onChange={(e) => handleFilterContinent(e)} className={styles.select}>
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="South America">South America</option>
        <option value="North America">North America</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
