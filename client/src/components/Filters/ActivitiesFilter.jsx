import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActivities, getActivities } from "../../redux/actions";
import styles from "./filters.module.css";

export default function ActivitiesFilter({ setCurrentPage }) {
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
            return <option key={el.name} value={el.name}>{el.name}</option>;
          })}
      </select>
    </div>
  );
}
