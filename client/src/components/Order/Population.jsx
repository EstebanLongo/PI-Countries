import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries, filterByContinent, orderByPopulation, orderAZ } from "../../redux/actions";
// import { orderByPopulation } from "../../redux/actions";
import styles from './orders.module.css'

export default function Population({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();

  function handlePopulation(e) {
    e.preventDefault();
    if (e.target.value !== "default") {
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1);
      setOrder(e.target.value);
    } else {
      dispatch(getCountries());
      setCurrentPage(1);
      setOrder(e.target.value);
    }
  }

  useEffect(() => {
    dispatch(filterByContinent())
    dispatch(orderAZ());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.orders}>
        Order by population
        <br/>
        <select onChange={(e) => handlePopulation(e)}>
          <option value="default" key="default">
            All
          </option>
          <option value="asc" key="asc">
            Asc
          </option>
          <option value="desc" key="desc">
            Desc
          </option>
        </select>
      </div>
    </div>
  );
}
