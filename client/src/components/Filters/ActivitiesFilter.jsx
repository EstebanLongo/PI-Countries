import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteActivity,
  filterActivities,
  getActivities,
} from "../../redux/actions";
import styles from "./filters.module.css";

export default function ActtivitiesFilter({ setCurrentPage }) {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
    dispatch(filterActivities());
  }, [dispatch]);

  function handleFilterActivity(e) {
    e.preventDefault();
    dispatch(filterActivities(e.target.value));
    setCurrentPage(1);
    console.log(e.target.value);
  }

  return (
    <div className={styles.orders}>
      <span>Filter by activities</span>
      <br />
      <select
        className={styles.select}
        onChange={(e) => handleFilterActivity(e)}
      >
        <option value="All">All</option>
        {activity.length &&
          activity.map((el) => {
            return <option value={el.name}>{el.name}</option>;
          })}
      </select>
    </div>
  );
}
