import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent } from "../../redux/actions";
import styles from "./filters.module.css";

export default function Continents({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={styles.orders}>
      <span>Filter by continent</span>
      <br />
      <select
        onChange={(e) => handleFilterContinent(e)}
        className={styles.select}
      >
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
